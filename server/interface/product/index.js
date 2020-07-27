import fs from "fs";

const path = require('path')
import xlsx2json from "node-xlsx";
import {
  OrdersModel,
  ProductsModel,
} from '../../model'
import {
  SuccessResult,
  ErrorResult,
  Queue,
} from '../../util'
import {
  checkExcelType,
  replaceAll,
} from '../../../utils/utils'

ProductsModel.queue = new Queue(10)

let router = require('koa-router')();
// 设置模块名为接口前缀
router.prefix('/api/v1/product')


let productAttrNames = ['productCode', 'productName', 'price', 'stock']


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

// 格式化商品数据
function fileDataConvert(products, productAttrs){
  products = products.slice(1).map((item) => {
    let obj = {}
    productAttrs.forEach((attr, idx) => {
      let val = item[idx]
      if(val){
        val = replaceAll(val, '=\"', "")
        obj[attr] = replaceAll(val, '\"', "")
      }else{
        obj[attr] = val
      }
    })
    return obj
  })
  return products
}


// 上传文件
router.post('/upload', async ctx => {
  // koa-body会将文件保存在request的files属性中
  let files = ctx.request.files
  if(!files || !files.files ){
    ctx.body = new ErrorResult({
      msg: "请选择相应文件进行上传",
      code: '0006'
    })
    return
  }

  // files是接口定义的用来代表上传文件的属性，上传单个文件时files.files是File类型，多个文件files.files是数组
  let res = Array.isArray(files.files) ? files.files : [files.files]
  let products = []
  for(let i = 0; i < res.length; i++){
    let currentFile = res[i]

    /*文件格式验证*/
    if(!checkExcelType(currentFile)){
      return {
        body: new ErrorResult("请上传Excel文件"),
        flag: false
      }
    }
    let path = currentFile.path || ''
    let excelData = xlsx2json.parse(path)
    let dataList = fileDataConvert(excelData[0].data, productAttrNames)
    ProductsModel.queue.add(currentFile.name)
    products = products.concat(dataList)
  }



  /*删除换存在服务器的文件*/
  let uploadDir = path.join(__dirname,'../../upload')
  delDir(uploadDir)
  /*删除换存在服务器的文件*/


  await new Promise(function(resolve, reject){
    ProductsModel.create(products, function (err, res) {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
    .then((res) => {
      // ctx.body = orders
      ctx.body = new SuccessResult({
        msg: "插入商品数据成功"
      })
    })
    .catch((err) => {
      ctx.body = new ErrorResult({
        msg: err ? err : "导入数据失败"
      })

      ctx.body = new ErrorResult({
        code: err && err.code == 11000 ? '0002' : '0001',
        msg: err && err.code == 11000 ? '插入部分商品的商品编号已存在' : "服务器错误"
      })
    })
})

// 查询商品数据
router.post('/query', async ctx => {
  let pageSize = ctx.request.body.pageSize
  let pageNum = ctx.request.body.pageNum
  let productName = ctx.request.body.productName || '' // 商品名称
  let productCode = ctx.request.body.productCode || '' // 商品编号
  let stock = ctx.request.body.stock || '' // 库存

  if(!pageSize){
    ctx.body = new ErrorResult({
      code: '0006',
      msg: "缺少pageSize参数"
    })
    return
  }
  if(!pageNum){
    ctx.body = new ErrorResult({
      code: '0006',
      msg: "缺少pageNum参数"
    })
    return
  }

  await new Promise(async function(resolve, reject){
    let productNameReg = new RegExp(productName, 'i')
    let productCodeReg = new RegExp(productCode, 'i')


    let documentCount
    await ProductsModel.count({
      $and : [ //多条件，数组
        {productName : {$regex : productNameReg}},
        {productCode : {$regex : productCodeReg}},
      ].concat(stock ? [{stock: stock}] : [])
    }, (err, count) => {
      documentCount = err ? 0 : parseInt(count)
    })


    let productModel = ProductsModel.find(
      {
        $and : [ //多条件，数组
          {productName : {$regex : productNameReg}},
          {productCode : {$regex : productCodeReg}},
        ].concat(stock ? [{stock: stock}] : [])
      }
    )
    productModel.skip((pageNum - 1) * pageSize).limit(parseInt(pageSize))
    productModel.exec(function (err, res) {
      console.log(err)
      if (err) {
        reject(err)
      } else {
        let data = {
          total: documentCount,
          data: res
        }
        resolve(data)
      }
    })
  })
    .then((res) => {
      ctx.body = new SuccessResult({
        msg: '获取商品数据成功',
        data: res
      })
    })
    .catch((err) => {
      ctx.body = new ErrorResult({
        msg: err ? err : "获取商品数据失败"
      })
    })
})



// 插入商品
router.post('/insert', async ctx => {
  let params = ctx.request.body.params ? JSON.parse(ctx.request.body.params) : {}
  await new Promise(async function(resolve, reject){
    let productModel = new ProductsModel(params)
    productModel.save(function (err, res) {
      if (err) {
        reject(err)
      }
      else {
        resolve(res)
      }

    })
  })
    .then((res) => {
      ctx.body = new SuccessResult({
        msg: '插入商品成功'
      })
    })
    .catch((err) => {
      let propName = ''
      if(err && err.code == 11000){
        let keyValue = err["keyValue"]
        for (let prop in keyValue) {
          propName = prop
        }
      }
      ctx.body = new ErrorResult({
        code: err && err.code == 11000 ? '0002' : '0001',
        msg: err && err.code == 11000 ? '已存在相同商品编号的商品' : "服务器错误"
      })
    })
})


// 编辑商品
router.post('/update', async ctx => {
  let params = ctx.request.body.params ? JSON.parse(ctx.request.body.params) : {}
  let productCode = params.productCode
  if(!productCode){
    ctx.body = new ErrorResult({
      code: '0006',
      msg: "缺少商品编码（productCode）参数"
    })
  }
  await new Promise(async function(resolve, reject){
    //第一个参数为查找，第二个为要修改的字段
    ProductsModel.updateOne({"productCode": productCode}, params ,function (err, doc) {
      if (err) {
        reject(err)
      }
      else {
        resolve(doc)
      }
    })
  })
    .then((res) => {
      ctx.body = new SuccessResult({
        msg: '编辑商品成功'
      })
    })
    .catch((err) => {
      ctx.body = new ErrorResult({
        code: '0001',
        msg: "服务器错误"
      })
    })
})

export default router
