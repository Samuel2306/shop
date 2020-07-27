/**
 * @description 请求接口列表
 */
let orderPrefix = 'order'
let orderAPI = {
  queryOrder: orderPrefix + '/query',
  importOrder: orderPrefix + '/upload',
  insertOrder: orderPrefix + '/insert',
}
let produtPrefix = 'product'
let productAPI = {
  importProduct: produtPrefix + '/upload',
  queryProduct: produtPrefix + '/query',
  insertProduct: produtPrefix + '/insert',
  updateProduct: produtPrefix + '/update',
  prodStockCheck: produtPrefix + '/stockCheck',
}
let userPrefix = 'user'
let userAPI = {
  userLogin: userPrefix + '/login',
  userLoginOut: userPrefix + '/loginOut',
  userRegister: userPrefix + '/register',
}
let stockPrefix = 'stock'
let stockAPI = {
  createAndUpdateDraft: stockPrefix + '/createAndUpdateDraft',
  saveStockOrder: stockPrefix + '/save',
  queryStockOrder: stockPrefix + '/query',
}
export default {
  ...orderAPI,
  ...productAPI,
  ...userAPI,
  ...stockAPI,
}
