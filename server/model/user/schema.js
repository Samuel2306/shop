import mongoose from'mongoose'
let Schema = mongoose.Schema;

const UsersSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  }
})


export {
  UsersSchema,
}
