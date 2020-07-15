class Result {
  constructor({code, msg}){
    this.resultCode = code
    this.resultResc = msg
  }
}


class SuccessResult extends Result{
  constructor(msg){
    super({code: 'WL-0000', msg: msg ? msg : '操作成功'})
  }
}

class ErrorResult extends Result{
  constructor(msg){
    super({code: 'WL-0010', msg: msg ? msg : '操作失败'})
  }
}


export {
  Result,
  SuccessResult,
  ErrorResult,
}
