import mongoose from'mongoose'
import {
  importOrdersSchema
} from './schema'


let importOrdersModel = mongoose.model('tb.orders', importOrdersSchema);


export {
  importOrdersModel
}
