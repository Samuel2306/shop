import {
  ProductsModel,
  StocksModel, UsersModel
} from '../../model'
import {ErrorResult, SuccessResult} from "../../util";

let router = require('koa-router')();
// 设置模块名为接口前缀
router.prefix('/api/v1/stock')

// 存为草稿
router.post('/createAndUpdateDraft',async (ctx)=>{
  let warehouseDocType = ctx.request.body.warehouseDocType
  let productList = ctx.request.body.productList || []
  let id = ctx.request.body.id || []
  let warehouseDocStatus = 0
  await new Promise(async function(resolve, reject){
    StocksModel.findById(id, function(err, data){
      if (!data){
        let model = new StocksModel({
          warehouseDocType: warehouseDocType,
          warehouseDocStatus: warehouseDocStatus,
          productList: productList
        })
        model.save(function(err, res){
          if (err) {
            reject(err)
          }
          else {
            resolve(res)
          }
        })
      } else {
        StocksModel.findByIdAndUpdate(id, {
          warehouseDocType: warehouseDocType,
          warehouseDocStatus: warehouseDocStatus,
          productList: productList
        }, function(err, res){
          if (err) {
            reject(err)
          }
          else {
            resolve(res)
          }
        })
      }
    })
  })
    .then((res) => {
      ctx.body = new SuccessResult({
        msg: '创建单据草稿成功'
      });
    })
    .catch((err) => {
      ctx.body = new ErrorResult({
        code: '0001',
        msg: err && err.msg ? err.msg : "服务器错误"
      })
    })
})

// 存为完成的仓库单据
router.post('/save',async (ctx)=>{
  let warehouseDocType = ctx.request.body.warehouseDocType
  let productList = ctx.request.body.productList || []
  let id = ctx.request.body.id || []
  let warehouseDocStatus = 0
  await new Promise(async function(resolve, reject){
    StocksModel.findById(id, function(err, data){
      if (!data){
        let model = new StocksModel({
          warehouseDocType: warehouseDocType,
          warehouseDocStatus: warehouseDocStatus,
          productList: productList
        })
        model.save(function(err, res){
          if (err) {
            reject(err)
          }
          else {
            resolve(res)
          }
        })
      } else {
        StocksModel.findByIdAndUpdate(id, {
          warehouseDocType: warehouseDocType,
          warehouseDocStatus: warehouseDocStatus,
          productList: productList
        }, function(err, res){
          if (err) {
            reject(err)
          }
          else {
            resolve(res)
          }
        })
      }
    })
  })
    .then((res) => {
      ctx.body = new SuccessResult({
        msg: '创建单据成功'
      });
    })
    .catch((err) => {
      console.log(err)
      ctx.body = new ErrorResult({
        code: '0001',
        msg: err && err.msg ? err.msg : "服务器错误"
      })
    })
})



// 查询单子
router.post('/query',async (ctx)=>{
  let pageSize = ctx.request.body.pageSize
  let pageNum = ctx.request.body.pageNum
  let relativeOrderNo = ctx.request.body.relativeOrderNo || ''
  let datetime = ctx.request.body.datetime || ''
  let warehouseDocType = ctx.request.body.warehouseDocType
  let warehouseDocStatus = ctx.request.body.warehouseDocStatus

  let relativeOrderNoReg = new RegExp(relativeOrderNo, 'i')

  await new Promise(async function(resolve, reject){

    let documentCount
    await StocksModel.count({
      $and : [ //多条件，数组
        {warehouseDocType : warehouseDocType},
        {relativeOrderNo : {$regex : relativeOrderNoReg}},
      ]
        .concat(warehouseDocStatus ? [{warehouseDocStatus: warehouseDocStatus}] : [])
        .concat(datetime ? [{datetime: datetime}] : [])
    }, (err, count) => {
      documentCount = err ? 0 : parseInt(count)
    })


    let stockModel = StocksModel.find(
      {
        $and : [ //多条件，数组
          {warehouseDocType : warehouseDocType},
          {relativeOrderNo : {$regex : relativeOrderNoReg}},
        ]
          .concat(warehouseDocStatus ? [{warehouseDocStatus: warehouseDocStatus}] : [])
          .concat(datetime ? [{datetime: datetime}] : [])
      }
    )
    stockModel.skip((pageNum - 1) * pageSize).limit(parseInt(pageSize))
    stockModel.exec(function (err, res) {
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
        msg: '获取数据成功',
        data: res
      })
    })
    .catch((err) => {
      ctx.body = new ErrorResult({
        msg: err ? err : "获取数据失败"
      })
    })
})

export default router
