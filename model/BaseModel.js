import axios from 'axios'
import qs from 'qs';
import supreme from '../supreme'
import _ from 'lodash'
import baseConfig from '@/config/baseConfig'
import ssoAuth from '../util/ssoAuth'

/**
 * @export BaseModel
 * @class BaseModel
 * @desc model 的基类，用来继承
 * @author lei.you
 * @date 2018/2/8
 * */
class BaseModel {
  constructor(config = {}) {
    var cancel, CancelToken = axios.CancelToken
    config.cancelToke = new CancelToken(function(c) {
      cancel = c
    })
    config.preloading = !!config.preloading
    config.timeout = config.timeout || 30000
    config.headers = config.headers || {}
    this.xhttp = axios.create(config)
    this.procRequest() // 设置请求拦截器
    this.procResponse() // 设置响应拦截器
    this.cancel = cancel; // 设置取消请求的接口
    this.config = config; // 保存配置参数
  }
  procRequest(xhttp) {
    this.xhttp.interceptors.request.use((config) => {
      return config;
    }, (error) => {
      return Promise.reject(error.message)
    })
  }
  procResponse() {
    this.xhttp.interceptors.response.use((res) => {
      if (!res.config.noLoading) {
        if (res.config.preloading) {
          supreme.hideLoading()
        } else {
          setTimeout(function() {
            supreme.hideLoading()
          })
        }
      }
      if (res.data.resultCode === 'WL-0014') {
        supreme.Toast('Session expired, resign in please', 'warning')
        var domain = window.location.host
        var path = location.href.indexOf('localhost') != -1 || location.href.indexOf('127.0.0.1') != -1 ? 'http://localhost:8080/portal/login' : 'http://' + window.location.host + '/portal/login'
        if(baseConfig.enableRunAlone){
          supreme.goto('/login')
        }else {
          ssoAuth()
        }
        /*if(path.indexOf('http') != -1){
          window.location.href = path
        }else{
          supreme.goto(path)
        }*/
        return Promise.reject(res)
      }
      var successCodeReg = /0000/
      if (!successCodeReg.test(res.data.resultCode)) {
        if(!res.config.noDefaultTip){
          supreme.Toast(res.data.resultDesc || 'Server error, please check if server is running', 'warning')
        }
        return Promise.reject(res)
      }
      return res
    }, (error) => {
      supreme.hideLoading();
      if (error.message.includes("timeout")) {
        supreme.showError(error.message);
      }
      return Promise.reject(error.message)
    })
  }
  post(param, config) {
    return this.xhttp.post(this.config.url, param, config);
  }
  get(param) {
    if (param.params) {
      return this.xhttp.get(param);
    } else {
      return this.xhttp.get({
        params: param
      });
    }
  }
  cancel() {
    this.cancel();
  }

  /**
   * @desc 生成baseModel 实例
   * @param {object} config 配置文件
   * @return {baseModel} baseModel 实例
   * */
  static getInstance(config) {
    var model = new BaseModel(config);
    model.config = config;
    return model;
  }
}
export default BaseModel;
