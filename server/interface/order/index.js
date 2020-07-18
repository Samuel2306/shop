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
  OrdersModel
} from '../../model/order/model'
import {
  SuccessResult,
  ErrorResult,
  Queue,
  replaceAll,
} from '../../util'

OrdersModel.queue = new Queue(10)
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

function validateFile(currentFile, clearQueue){
  if(clearQueue == 1) {   // 1表示清除所有文件名的缓存
    OrdersModel.queue.clear()
  }
  let fileName = currentFile.name
  /*根据文件名称避免重复上传*/
  if(OrdersModel.queue.isInQueue(fileName)){
    return {
      body: new ErrorResult("该文件已上传，请勿重复上传"),
      flag: false
    }
  }
  /*根据文件名称避免重复上传*/

  /*文件格式验证*/
  if(!checkExcelType(currentFile) && !checkCSVType(currentFile)){
    return {
      body: new ErrorResult("请上传正确格式的表格"),
      flag: false
    }
  }

  return {
    flag: true
  }
}

// 格式化订单数据
function fileDataConvert(orders, orderAttrs, platform, createDate){
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
  return orders
}

/*验证文件数据是否重复*/
function validateData(data, nums, all){
  let flags = []
  let promiseList = []
  if(all){
    for (let i = 0; i < nums; i++) {
      promiseList.push(new Promise(function(resolve, reject){
        OrdersModel.findOne({"orderNo": data[i].orderNo}, function (err, order) {
          if(err) {
            console.log("查找出错")
            resolve(true)
          }
          if(order){
            resolve(false)
          }else{
            resolve(true)
          }

          resolve()
        })
      }))
    }
  }else{
    let indexs = []
    while(indexs.length < nums){
      let randomNum = Math.floor(Math.random() * data.length);
      if(indexs.indexOf(randomNum) < 0){
        indexs.push(randomNum)
      }
    }
    for(let j = 0; j < indexs.length; j++){
      let index = indexs[j]
      promiseList.push(new Promise(function(resolve, reject){
        OrdersModel.findOne({"orderNo": data[index].orderNo}, function (err, order) {
          if(err) {
            console.log("查找出错")
            resolve(true)
          }

          if(order){
            resolve(false)
          }else{
            resolve(true)
          }
        })
      }))
    }

    return Promise.all(promiseList,(list) => {
      return list
    })
  }
}

async function fileContentValidate(orders){
  /*对数据重复性进行验证,随机抽样一定的数据看，看是否是同一个文件*/
  let contentFlag = true
  let list = []
  if(orders.length < 5){
    list = await validateData(orders, orders.length, true)
  }else if(orders.length < 50){
    list = await validateData(orders, 5)
  }else if(Math.ceil(orders.length / 10) < 10){
    list = await validateData(orders, Math.ceil(orders.length / 10))
  }else{
    list = await validateData(orders, 10)
  }
  contentFlag = list.every((item) => {
    return item
  })
  return contentFlag
  /*对数据重复性进行验证*/
}



let router = require('koa-router')();
// 设置模块名为接口前缀
router.prefix('/api/v1/order')

// 上传文件
router.post('/upload', async ctx => {
  // koa-body会将文件保存在request的files属性中
  let files = ctx.request.files
  let platform = ctx.request.body.platform   // 'tb': 淘宝，'dy'：抖音
  let orderAttrs = platform == 'tb' ? tbAttrNames : dyAttrNames
  let createDate = ctx.request.body.createDate
  let clearQueue = ctx.request.body.clearQueue || false

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

    let valid = validateFile(currentFile, clearQueue)
    if(!valid.flag){
      ctx.body = valid.body
      return
    }

    let path = currentFile.path || ''
    if(checkExcelType(res[i])){
      let excelData = xlsx2json.parse(path)
      let dataList = fileDataConvert(excelData[0].data, orderAttrs, platform, createDate)
      let flag = await fileContentValidate(dataList)
      if(flag){
        OrdersModel.queue.add(currentFile.name)
        orders = orders.concat(dataList)
      }else{
        ctx.body = new ErrorResult("请勿重复上传数据相同的文件")
        return
      }
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


        let dataList = fileDataConvert(res, orderAttrs, platform, createDate)
        let flag = await fileContentValidate(dataList)
        if(flag){
          OrdersModel.queue.add(currentFile.name)
          orders = orders.concat(dataList)
        }else{
          ctx.body = new ErrorResult("请勿重复上传文件")
          return
        }
      } catch (e) {
        console.log(e)
      }
    }
  }



  /*删除换存在服务器的文件*/
  let uploadDir = path.join(__dirname,'../../upload')
  delDir(uploadDir)
  /*删除换存在服务器的文件*/




  await new Promise(function(resolve, reject){
    OrdersModel.create(orders, function (err, res) {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
    .then((res) => {
      // ctx.body = orders
      ctx.body = new SuccessResult("插入数据成功")
    })
    .catch((err) => {
      ctx.body = new ErrorResult(err ? err : "插入数据失败")
    })
})

// 查询订单
router.post('/query', async ctx => {
  let pageSize = ctx.request.body.pageSize
  let pageNum = ctx.request.body.pageNum
  let orderNo = ctx.request.body.orderNo
  let productName = ctx.request.body.productName

  if(!pageSize){
    ctx.body = new SuccessResult("缺少pageSize参数")
    return
  }
  if(!pageNum){
    ctx.body = new SuccessResult("缺少pageNum参数")
    return
  }

  await new Promise(function(resolve, reject){
    OrdersModel.find({}, function (err, res) {
      console.log(err)
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
    .then((res) => {
      ctx.body = new SuccessResult('获取数据成功',res)
    })
    .catch((err) => {
      ctx.body = new ErrorResult(err ? err : "获取数据失败")
    })
})

export default router
