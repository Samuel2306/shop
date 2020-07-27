import mongoose from'mongoose'
import {
  UsersSchema,
} from './schema'

let UsersModel = mongoose.model('user', UsersSchema);

export {
  UsersModel
}
