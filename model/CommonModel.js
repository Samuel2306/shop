import BaseModel from './BaseModel'

class CommonModel extends BaseModel {
  constructor(config) {
    config.baseURL = config.url || '/api/v1/' + config.api;
    super(config);
  }
  post(param, config) {
    if (!param) {
      param = {};
    }
    param["_sid"] = param._sid|| store.state.homeState.userInfo._sid
    /*var token = supreme.localCache.get("token").token
    param["token"] = token*/
    return super.post(param, config);
  }
  get(param) {

  }
}
export default CommonModel;
