import {
  ProductsModel,
} from '../../model'
let router = require('koa-router')();
// 设置模块名为接口前缀
router.prefix('/api/v1/product')
router.get('/aaa',async (ctx)=>{
  ctx.body="首页";
})


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
    ctx.body = new ErrorResult({
      msg: "请选择相应文件进行上传",
      code: '0006'
    })
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
        ctx.body = new ErrorResult({
          msg: "请勿重复上传数据相同的文件",
          code: '0010'
        })
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
          ctx.body = new ErrorResult({
            msg: "请勿重复上传文件",
            code: '0010'
          })
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

  // 淘宝数据存在多条数据属于一个订单的情况
  let obj = {}
  let idx = []
  orders.forEach((order, index) => {
    if(!obj[order.orderNo]){
      obj[order.orderNo] = order
      order.relativeOrder = []
    }else{
      obj[order.orderNo].relativeOrder.push(order)
      idx.push(index)
    }
  })
  for (let i = idx.length - 1; i >= 0; i--) {
    orders.splice(idx[i], 1)
  }

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
      ctx.body = new SuccessResult({
        msg: "插入数据成功"
      })
    })
    .catch((err) => {
      ctx.body = new ErrorResult({
        msg: err ? err : "导入数据失败"
      })
    })
})

export default router
