import mongoose from'mongoose'
import {
  ProductSchema,
} from './schema'

let ProductsModel = mongoose.model('product', ProductSchema);

export {
  ProductsModel
}
