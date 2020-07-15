import mongoose from'mongoose'
import {
  importOrdersSchema
} from './schema'


let importOrdersModel = mongoose.model('orders', importOrdersSchema);


export {
  importOrdersModel
}
