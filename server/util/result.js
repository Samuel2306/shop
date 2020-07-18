class Result {
  constructor({code, msg, data}){
    this.resultCode = code
    this.resultResc = msg
    this.resultData = data || null
  }
}


class SuccessResult extends Result{
  constructor(msg, data){
    super({code: 'WL-0000', msg: msg ? msg : '操作成功', data: data})
  }
}

class ErrorResult extends Result{
  constructor(msg){
    super({code: 'WL-0010', msg: msg ? msg : '操作失败', data: null})
  }
}


export {
  Result,
  SuccessResult,
  ErrorResult,
}
