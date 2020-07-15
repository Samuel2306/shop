import {
  Result,
  SuccessResult,
  ErrorResult,
} from './result'


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
  replaceAll,
}
