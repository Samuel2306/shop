let router = require('koa-router')();
// 设置模块名为接口前缀
router.prefix('/api/v1/order')
router.get('/aaa',async (ctx)=>{
  ctx.body="首页";
})

module.exports = router
