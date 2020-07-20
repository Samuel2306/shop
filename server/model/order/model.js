import mongoose from'mongoose'
import {
  OrdersSchema,
} from './schema'


let OrdersModel = mongoose.model('order', OrdersSchema);


export {
  OrdersModel
}
