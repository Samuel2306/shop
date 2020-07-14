import mongoose from "mongoose";

let url = 'mongodb://localhost:27017/shop';
let options = {
  server: { poolSize: 5 },
  user: "Samuel2306",
  pass: "Samuel2306",
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

