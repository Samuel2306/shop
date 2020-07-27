import mongoose from'mongoose'
import bcrypt from 'bcryptjs'
let Schema = mongoose.Schema;

const UsersSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    set(val){
      return bcrypt.hashSync(val)
    }
  },
  token: {
    type: String
  }
})


export {
  UsersSchema,
}
