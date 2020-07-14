import {
  checkExcelType,
  checkCSVType,
} from '../../../utils/utils'
import fs from 'fs'
const path = require('path')
import xlsx2json from "node-xlsx";
import iconv_lite from'iconv-lite';


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
  'createTime', // "创建时间"
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
router.post('/upload', ctx => {
  // koa-body会将文件保存在request的files属性中
  let files = ctx.request.files
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
          res = res.split("\r\n")
          res.forEach((item,index) => {
            res[index] = res[index].split(',')
          })
          orders = orders.concat(res)
        } catch (e) {
          console.log(e)
        }
      }
    }
  }

  orders = orders.slice(1).map((item) => {
    let obj = {}
    item.forEach((attr, idx) => {
      if(tbAttrNames[idx] != 'createTime'){
        obj[tbAttrNames[idx]] = attr
      }else {
        if(!attr || attr == 'null'){
          obj[tbAttrNames[idx]] = new Date()
        }else{
          obj[tbAttrNames[idx]] = new Date(attr)
        }
      }
    })
    return obj
  })

  let uploadDir = path.join(__dirname,'../../upload')
  delDir(uploadDir)
  ctx.body = orders
})

export default router
