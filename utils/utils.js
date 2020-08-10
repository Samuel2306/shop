const checkExcelType = (file) =>{
  let type = file.type;
  let name = file.name;
  if(type.indexOf("xlsx") > -1 ||
    type.indexOf("xls") > -1 ||
    type.indexOf("xltx") > -1 ||
    type.indexOf("xlt") > -1 ||
    type.indexOf("xlsm") > -1 ||
    type.indexOf("xlsb") > -1 ||
    type.indexOf("xltm") > -1 ||
    name.indexOf("xlsx") > -1 ||
    name.indexOf("xls") > -1 ||
    name.indexOf("xltx") > -1 ||
    name.indexOf("xlt") > -1 ||
    name.indexOf("xlsm") > -1 ||
    name.indexOf("xlsb") > -1 ||
    name.indexOf("xltm") > -1
  ){
    return true
  }else{
    return false;
  }
};

const checkCSVType = (file) =>{
  let type = file.type;
  let name = file.name;
  if(type.indexOf("csv") > -1 || name.indexOf("csv") > -1){
    return true
  }else{
    return false;
  }
};

function getType(obj){
  //tostring会返回对应不同的标签的构造函数
  let toString = Object.prototype.toString;
  let map = {
    '[object Boolean]'  : 'boolean',
    '[object Number]'   : 'number',
    '[object String]'   : 'string',
    '[object Function]' : 'function',
    '[object Array]'    : 'array',
    '[object Date]'     : 'date',
    '[object RegExp]'   : 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]'     : 'null',
    '[object Object]'   : 'object'
  };
  if(obj instanceof Element) {
    return 'element';
  }
  return map[toString.call(obj)];
}

function deepClone(data){
  let type = getType(data);
  let obj;
  if(type === 'array'){
    obj = [];
  } else if(type === 'object'){
    obj = {};
  } else {
    //不再具有下一层次
    return data;
  }
  if(type === 'array'){
    for(let i = 0, len = data.length; i < len; i++){
      obj.push(deepClone(data[i]));
    }
  } else if(type === 'object'){
    for(let key in data){
      obj[key] = deepClone(data[key]);
    }
  }
  return obj;
}


const replaceAll = function(str, oldContent, newContent){
  if(typeof str != 'string'){
    return str
  }
  while(str.indexOf(oldContent) > -1){
    str = str.replace(oldContent, newContent)
  }
  return str
}

const runQueue = function(list, params){ // params：传给list中第一个promise对象的参数
  let p = Promise.resolve(params);
  p = list.reduce((origin, item) => {
    return origin.then((res) => {  // res是上一个promise对象传过来的结果
      return new Promise(async (resolve, reject) => {
        item(res, resolve, reject)
      })
    });
  }, p)
  return p
}


export {
  checkExcelType,
  checkCSVType,
  getType,
  deepClone,
  replaceAll,
  runQueue,
}
