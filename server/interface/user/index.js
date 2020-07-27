import {
  UsersModel,
} from '../../model'
import jwt from 'jsonwebtoken'
import autorefresh from 'jwt-autorefresh'
import KoaRouter from 'koa-router'
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
      expiresIn: '30s'
    }
  )
  return token
}

const checkToken = async (ctx, next) => {
  // 检验是否存在 token, axios.js 设置 authorization
  /*const authorization = ctx.get('Authorization')
  if (authorization === '') {
    ctx.throw(401, 'no token detected in http headerAuthorization')
  }

  const token = authorization.split(' ')[1]*/

  let token = ctx.request.body.token
  if (token === '') {
    console.log("no token detected in http headerAuthorization")
    ctx.throw(401, 'no token detected in http headerAuthorization')
  }

  // 检验 token 是否已过期
  try {
    await jwt.verify(token, 'cedric1990')
  } catch (err) {
    console.log("invalid token")
    ctx.throw(401, 'invalid token')
  }

  await next()
}




let router = KoaRouter();
// 设置模块名为接口前缀
router.prefix('/api/v1/user')
router.post('/login',async (ctx)=>{
  ctx.body = new SuccessResult({
    msg: '登录成功',
    data: {
      username: 'sf',
      token: createToken('sf')
    }
  });
})
router.post('/check', checkToken, async (ctx)=>{
  ctx.body = new SuccessResult({
    msg: '登录成功'
  });
})

export default router
