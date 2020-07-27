import {
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

export default router
