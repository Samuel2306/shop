let resultCodeMap = {
  'WL-0000': "成功",
  'WL-0001': "未知错误",
  'WL-0002': "数据唯一性错误",
  'WL-0006': "参数缺失",
  'WL-0008': "用户没有权限",
  'WL-0010': "文件重复上传",
  'WL-0014': "用户过期",
}

class Result {
  constructor({code, msg, data}){
    this.resultCode = code
    this.resultResc = msg
    this.resultData = data || null
  }
}


class SuccessResult extends Result{
  constructor({msg, data}){
    super({
      code: 'WL-0000',
      msg: msg ? msg : '操作成功',
      data: data
    })
  }
}

class ErrorResult extends Result{
  constructor({code, msg}){
    super({
      code: code ? 'WL-' + code : "WL-0001",  // WL-0001未知错误
      msg: msg ? msg : '操作失败',
      data: null
    })
  }
}


export {
  Result,
  SuccessResult,
  ErrorResult,
}
