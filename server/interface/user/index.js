let router = require('koa-router')();
// 设置模块名为接口前缀
router.prefix('/api/v1/user')
router.get('/aaa',async (ctx)=>{
  ctx.body="首页";
})

export default router
