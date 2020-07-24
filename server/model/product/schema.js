import mongoose from'mongoose'
let Schema = mongoose.Schema;

let ProductSchema = new Schema({
  'productCode': {
    type: String,
    required: true,
    unique: true
  },  // "商品编号"
  'productName':  {
    type: String,
    required: true,
    unique: true
  }, // "商品名称"
  'price':  Number, // "价格"
  'stock':  Number, // "库存数量"
});

export {
  ProductSchema,
}
