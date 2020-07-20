import mongoose from'mongoose'
let Schema = mongoose.Schema;

let OrdersSchema = new Schema({
  'orderNo': {
    type: String,
    index: {
      unique: true,
      dropDups: true
    }, // 建立索引
  },  // "订单编号"
  'title':  String, // "标题"
  'price':  Number, // "价格"
  'orderNum':  Number, // "购买数量"
  'externalSysNum':  String, // "外部系统编号"
  'productAttrs':  String,  // "商品属性"
  'packageInfo':  String, // "套餐信息"
  'remark':  String, // "备注"
  'orderStatus':  String, // "订单状态"
  'productCode':  String, // "商家编码"
  'createDate':  String, // "创建时间"
  'platform':  String, // "所属平台"
});

export {
  OrdersSchema,
}
