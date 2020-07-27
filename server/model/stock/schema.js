import mongoose from 'mongoose'
let Schema = mongoose.Schema;

let StockSchema = new Schema({
  /*'warehouseDocCode': {
    type: String,
    required: true,
    unique: true
  },  // "仓库单编号"*/
  'relativeOrderNo':  {
    type: String
  }, // "关联订单号 出库单才有这个属性"
  'warehouseDocType':  {
    type: String,
    enum : ['0', '1'],
    default: '0',
    required: true
  }, // "仓库单类型： 0 入库单， 1 出库单"
  'warehouseDocStatus':  {
    type: String,
    enum : ['0', '1'],
    default: '0',
    required: true
  }, // "仓库单类型： 0 进行中， 1 已完成"
  'productList':  Array, // "商品列表"
  'datetime': String, // 入库时间
});

export {
  StockSchema,
}
