import {
  ProductsModel,
  UsersModel,
} from '../../model'
import jwt from 'jsonwebtoken'
import KoaRouter from 'koa-router'
import bcrypt from 'bcryptjs'
import {
  SuccessResult,
  ErrorResult,
} from '../../util'


function createToken(username){
  const token = jwt.sign(
    {
      id: username
    },
    'cedric1990',
    {
      expiresIn: '86400s'
    }
  )
  return token
}

const checkToken = async (ctx, next) => {
  let token = ctx.request.body.token
  if (token === '') {
    ctx.body = new ErrorResult({
      code: '0016',
      msg: '缺少用户token',
    });
  }

  // 检验 token 是否已过期
  try {
    await jwt.verify(token, 'cedric1990')
  } catch (err) {
    ctx.body = new ErrorResult({
      code: '0014',
      msg: '用户过期',
    });
  }

  await next()
}




let router = KoaRouter();
// 设置模块名为接口前缀
router.prefix('/api/v1/user')
router.post('/login', async (ctx)=>{
  let username = ctx.request.body.username
  let password = ctx.request.body.password
  await new Promise(async function(resolve, reject){
    UsersModel.find({
      username: username
    }, (err, res) => {
      if(err){
        reject({
          code: "0001",
          msg: err && err.msg ? err.msg : "未知错误"
        })
      } else if(!res.length){
        reject({
          code: "0001",
          msg: "当前用户名不存在"
        })
      }else{
        const isPasswordValid = bcrypt.compareSync(password, res[0].password)
        if(!isPasswordValid){
          reject({
            code: "0001",
            msg: "密码不正确"
          })
        }else{
          resolve()
        }
      }
    })
  })
    .then(async (res) => {
      let token = createToken(username)
      await new Promise(async function(resolve, reject){
        //第一个参数为查找，第二个为要修改的字段
        UsersModel.updateOne({"username": username}, {
          token: token
        } ,function (err, doc) {
          if (err) {reject(err)}
          else {resolve(doc)}
        })
      })
        .then((res) => {
          ctx.body = new SuccessResult({
            msg: '登录成功',
            data: {
              username: username,
              token: token
            }
          });
        })
        .catch((err) => {
          ctx.body = new ErrorResult({
            code: '0001',
            msg: "服务器错误"
          })
        })
    })
    .catch((err) => {
      ctx.body = new ErrorResult({
        code: err.code,
        msg: err.msg,
      })
    })
})


router.post('/loginOut', async (ctx)=>{
  let username = ctx.request.body.username
  await new Promise(async function(resolve, reject){
    //第一个参数为查找，第二个为要修改的字段
    UsersModel.updateOne({"username": username}, {
      token: ""
    } ,function (err, doc) {
      if (err) {reject(err)}
      else {resolve(doc)}
    })
  })
    .then((res) => {
      ctx.body = new SuccessResult({
        msg: '登出成功'
      });
    })
    .catch((err) => {
      ctx.body = new ErrorResult({
        code: '0001',
        msg: "服务器错误"
      })
    })
})



router.post('/register', async (ctx)=>{
  let username = ctx.request.body.username
  let password = ctx.request.body.password
  await new Promise(async function(resolve, reject){
    let userModel = new UsersModel({
      username: username,
      password: password,
      token: "",
    })
    userModel.save(function (err, res) {
      if (err) {
        reject(err)
      }
      else {
        resolve(res)
      }
    })
  })
    .then((res) => {
      ctx.body = new SuccessResult({
        msg: '注册成功'
      });
    })
    .catch((err) => {
      let propName = ''
      if(err && err.code == 11000){
        let keyValue = err["keyValue"]
        for (let prop in keyValue) {
          propName = prop
        }
      }
      ctx.body = new ErrorResult({
        code: err && err.code == 11000 ? '0002' : '0001',
        msg: err && err.code == 11000 ? '已存在相同用户名的账号' : "注册失败"
      })
    })
})


/*router.post('/check', checkToken, async (ctx)=>{
  ctx.body = new SuccessResult({
    msg: '用户'
  });
})*/

export default router
