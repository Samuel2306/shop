import fs from "fs";

const path = require('path')
import xlsx2json from "node-xlsx";
import {
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

export default router
