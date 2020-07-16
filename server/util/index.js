import {
  Result,
  SuccessResult,
  ErrorResult,
} from './result'
import {
  Queue,
} from './tool'


const replaceAll = function(str, oldContent, newContent){
  if(typeof str != 'string'){
    return str
  }
  while(str.indexOf(oldContent) > -1){
    str = str.replace(oldContent, newContent)
  }
  return str
}



export {
  Result,
  SuccessResult,
  ErrorResult,
  Queue,
  replaceAll,
}
