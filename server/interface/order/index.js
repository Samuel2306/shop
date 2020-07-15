import {
  checkExcelType,
  checkCSVType,
} from '../../../utils/utils'
import fs from 'fs'
import moment from 'moment'
const path = require('path')
import xlsx2json from "node-xlsx";
import iconv_lite from'iconv-lite';
import {
  importOrdersModel
} from '../../model/order/model'
import {
  SuccessResult,
  ErrorResult,
  replaceAll,
} from '../../util'


let tbAttrNames = [
  'orderNo',  // "订单编号"
  'title', // "标题"
  'price', // "价格"
  'orderNum', // "购买数量"
  'externalSysNum', // "外部系统编号"
  'productAttrs',  // "商品属性"
  'packageInfo', // "套餐信息"
  'remark', // "备注"
  'orderStatus', // "订单状态"
  'productCode', // "商家编码"
  'createDate', // "创建时间"
]
let dyAttrNames = [
  'orderNo',  // "订单编号"
  'title', // "标题"
  'price', // "价格"
  'orderNum', // "购买数量"
  'externalSysNum', // "外部系统编号"
  'productAttrs',  // "商品属性"
  'packageInfo', // "套餐信息"
  'remark', // "备注"
  'orderStatus', // "订单状态"
  'productCode', // "商家编码"
  'createDate', // "创建时间"
]

function delDir(path, callback){
  let files = [];
  if(fs.existsSync(path)){
    files = fs.readdirSync(path);
    files.forEach((file, index) => {
      let curPath = path + "/" + file;
      if(fs.statSync(curPath).isDirectory()){
        delDir(curPath); //递归删除文件夹
      } else {
        fs.unlinkSync(curPath); //删除文件
      }
    });
    // fs.rmdirSync(path);
  }
  callback && callback()
}



let router = require('koa-router')();
// 设置模块名为接口前缀
router.prefix('/api/v1/order')

// 上传文件
router.post('/upload', async ctx => {
  // console.log(ctx.request.files)
  let files = {}
  // koa-body会将文件保存在request的files属性中
  files = ctx.request.files
  let platform = ctx.request.body.platform   // 'tb': 淘宝，'dy'：抖音
  let orderAttrs = platform == 'tb' ? tbAttrNames : dyAttrNames
  let createDate = ctx.request.body.createDate

  // console.log(files)

  if(!files || !files.files ){
    ctx.body = "请选择相应文件进行上传"
    return
  }

  // files是接口定义的用来代表上传文件的属性，上传单个文件时files.files是File类型，多个文件files.files是数组
  let res = Array.isArray(files.files) ? files.files : [files.files]
  let orders = []
  for(let i = 0; i < res.length; i++){
    let currentFile = res[i]
    if(!checkExcelType(res[i]) && !checkCSVType(res[i])){
      ctx.body = "请上传正确格式的表格" + (res.length > 1 ? ",多文件上传时可能存在非表格文件" : "")
      return
    }else {
      let path = currentFile.path || ''
      if(checkExcelType(res[i])){
        let excelData = xlsx2json.parse(path)
        orders = orders.concat(excelData[0].data)
      }else if(checkCSVType(res[i])){
        let buffer = fs.readFileSync(path)
        let charset = ''
        if((buffer[0] == 0xff && buffer[1] == 0xfe) || (buffer[0] == 0xfe && buffer[1] == 0xff)){
          charset = 'unicode'
        }else if(buffer[0] == 0xef && buffer[1] == 0xbb){
          charset = 'utf8'
        }else{
          charset = 'gbk'
        }
        try {
          let fileData = fs.readFileSync(path)
          let res = iconv_lite.decode(fileData, charset)
          res = res.split("\n")
          res.forEach((item,index) => {
            res[index] = item.split(',')
          })
          orders = orders.concat(res)
        } catch (e) {
          console.log(e)
        }
      }
    }
  }

  // 格式化订单数据
  orders = orders.slice(1).map((item) => {
    let obj = {
      platform: platform
    }
    orderAttrs.forEach((attr, idx) => {
      let val = item[idx]
      if(attr != 'createDate'){
        if(val){
          val = replaceAll(val, '=\"', "")
          obj[attr] = replaceAll(val, '\"', "")
        }else{
          obj[attr] = val
        }
        /*if(attr == 'orderNo'){
          obj[attr] = String(Number(val))
        }*/
      }else {
        if(!val || val == 'null'){
          obj[attr] = createDate ? moment(new Date(createDate)).format('YYYY-MM-DD HH:mm:ss') : moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        }else{
          obj[attr] = moment(new Date(val)).format('YYYY-MM-DD HH:mm:ss')
        }
      }
    })
    return obj
  })

  for (let i = orders.length - 1; i >= 0; i--) {
    if(!orders[i].orderNo && !orders[i].price){
      orders.splice(i, 1)
    }
  }
  let uploadDir = path.join(__dirname,'../../upload')
  delDir(uploadDir)

  await new Promise(function(resolve, reject){
    importOrdersModel.create(orders, function (err, res) {
      if (err) {
        reject()
      } else {
        resolve(err)
      }
      return
    })
  })
    .then(() => {
      // ctx.body = orders
      ctx.body = new SuccessResult("插入数据成功")
    })
    .catch((err) => {
      ctx.body = new ErrorResult(err ? err : "插入数据成功")
    })
})

export default router
