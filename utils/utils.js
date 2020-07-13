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

export {
  checkExcelType,
  checkCSVType,
}
