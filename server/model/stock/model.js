import mongoose from'mongoose'
import {
  StockSchema,
} from './schema'

let StocksModel = mongoose.model('stock', StockSchema);

export {
  StocksModel
}
