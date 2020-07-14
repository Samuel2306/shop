import mongoose from "mongoose";
import envConfig from '../config/envConfig'

let url = envConfig.envName == 'test' ? envConfig.db.testUrl : envConfig.db.prodUrl
let options = {
  server: { poolSize: 5 },
  user: envConfig.db.userName,
  pass: envConfig.db.password,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  authSource: 'admin',  // 用户验证到admin数据库去验证
}

export default function() {
  return new Promise(function (resolve, reject) {
    mongoose.connect(url, options)
      .then(() => resolve('已成功链接数据库'))
      .catch((err) => reject(err));
  })
}

