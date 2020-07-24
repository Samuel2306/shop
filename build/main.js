require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__connect__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__interface__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_nuxt__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_nuxt__);


const koaBody = __webpack_require__(7);
const path = __webpack_require__(2);



async function start() {
  const app = new __WEBPACK_IMPORTED_MODULE_0_koa___default.a();
  const host = process.env.HOST || '127.0.0.1';
  const port = process.env.PORT || 3000;

  // Import and Set Nuxt.js options
  const config = __webpack_require__(24);
  config.dev = !(app.env === 'production');

  // Instantiate nuxt.js
  const nuxt = new __WEBPACK_IMPORTED_MODULE_3_nuxt__["Nuxt"](config);

  // Build in development
  if (config.dev) {
    const builder = new __WEBPACK_IMPORTED_MODULE_3_nuxt__["Builder"](nuxt);
    await builder.build();
  }

  // body parser 中间件
  app.use(koaBody({
    // 支持文件格式
    multipart: true,
    encoding: 'utf-8',
    formidable: {
      // 上传目录
      uploadDir: path.join(__dirname, 'upload'),
      // 保留文件扩展名
      keepExtensions: true
    }
  }));

  /* 将所有接口引入 */
  for (let prop in __WEBPACK_IMPORTED_MODULE_2__interface__["a" /* default */]) {
    let router = __WEBPACK_IMPORTED_MODULE_2__interface__["a" /* default */][prop];
    app.use(router.routes());
    app.use(router.allowedMethods());
  }
  app.use(ctx => {
    ctx.status = 200;
    ctx.respond = false; // Mark request as handled for Koa
    ctx.req.ctx = ctx; // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res);
  });

  app.listen(port, host);
  console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console
}

Object(__WEBPACK_IMPORTED_MODULE_1__connect__["a" /* default */])().then(res => {
  console.log(res);
  start();
}).catch(error => {
  console.log(error);
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, "server"))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_envConfig__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_envConfig___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__config_envConfig__);



let url = __WEBPACK_IMPORTED_MODULE_1__config_envConfig___default.a.envName == 'test' ? __WEBPACK_IMPORTED_MODULE_1__config_envConfig___default.a.db.testUrl : __WEBPACK_IMPORTED_MODULE_1__config_envConfig___default.a.db.prodUrl;
let options = {
  server: {
    poolSize: __WEBPACK_IMPORTED_MODULE_1__config_envConfig___default.a.db.poolSize
  },
  user: __WEBPACK_IMPORTED_MODULE_1__config_envConfig___default.a.db.userName,
  pass: __WEBPACK_IMPORTED_MODULE_1__config_envConfig___default.a.db.password,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  authSource: 'admin' // 用户验证到admin数据库去验证
};

/* harmony default export */ __webpack_exports__["a"] = (function () {
  return new Promise(function (resolve, reject) {
    __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.connect(url, options).then(() => resolve('已成功链接数据库')).catch(err => reject(err));
  });
});

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = {"envName":"test","db":{"testUrl":"mongodb://localhost:27017/shop","userName":"samuel2306","password":"123456","poolSize":5,"prodUrl":""}}

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("koa-body");

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__user__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__product__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__order__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stock__ = __webpack_require__(22);





/* harmony default export */ __webpack_exports__["a"] = ({
  user: __WEBPACK_IMPORTED_MODULE_0__user__["a" /* default */],
  product: __WEBPACK_IMPORTED_MODULE_1__product__["a" /* default */],
  order: __WEBPACK_IMPORTED_MODULE_2__order__["a" /* default */],
  stock: __WEBPACK_IMPORTED_MODULE_3__stock__["a" /* default */]
});

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
let router = __webpack_require__(0)();
// 设置模块名为接口前缀
router.prefix('/api/v1/user');
router.get('/aaa', async ctx => {
  ctx.body = "首页";
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
let router = __webpack_require__(0)();
// 设置模块名为接口前缀
router.prefix('/api/v1/product');
router.get('/aaa', async ctx => {
  ctx.body = "首页";
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_utils__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fs__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_fs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_node_xlsx__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_node_xlsx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_node_xlsx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_iconv_lite__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_iconv_lite___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_iconv_lite__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__model_order_model__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__util__ = __webpack_require__(19);



const path = __webpack_require__(2);





__WEBPACK_IMPORTED_MODULE_5__model_order_model__["a" /* OrdersModel */].queue = new __WEBPACK_IMPORTED_MODULE_6__util__["b" /* Queue */](10);
let tbAttrNames = ['orderNo', // "订单编号"
'title', // "标题"
'price', // "价格"
'orderNum', // "购买数量"
'externalSysNum', // "外部系统编号"
'productAttrs', // "商品属性"
'packageInfo', // "套餐信息"
'remark', // "备注"
'orderStatus', // "订单状态"
'productCode', // "商家编码"
'createDate'];
let dyAttrNames = ['orderNo', // "订单编号"
'title', // "标题"
'price', // "价格"
'orderNum', // "购买数量"
'externalSysNum', // "外部系统编号"
'productAttrs', // "商品属性"
'packageInfo', // "套餐信息"
'remark', // "备注"
'orderStatus', // "订单状态"
'productCode', // "商家编码"
'createDate'];

function delDir(path, callback) {
  let files = [];
  if (__WEBPACK_IMPORTED_MODULE_1_fs___default.a.existsSync(path)) {
    files = __WEBPACK_IMPORTED_MODULE_1_fs___default.a.readdirSync(path);
    files.forEach((file, index) => {
      let curPath = path + "/" + file;
      if (__WEBPACK_IMPORTED_MODULE_1_fs___default.a.statSync(curPath).isDirectory()) {
        delDir(curPath); //递归删除文件夹
      } else {
        __WEBPACK_IMPORTED_MODULE_1_fs___default.a.unlinkSync(curPath); //删除文件
      }
    });
    // fs.rmdirSync(path);
  }
  callback && callback();
}

function validateFile(currentFile, clearQueue) {
  if (clearQueue == 1) {
    // 1表示清除所有文件名的缓存
    __WEBPACK_IMPORTED_MODULE_5__model_order_model__["a" /* OrdersModel */].queue.clear();
  }
  let fileName = currentFile.name;
  /*根据文件名称避免重复上传*/
  if (__WEBPACK_IMPORTED_MODULE_5__model_order_model__["a" /* OrdersModel */].queue.isInQueue(fileName)) {
    return {
      body: new __WEBPACK_IMPORTED_MODULE_6__util__["a" /* ErrorResult */]("该文件已上传，请勿重复上传"),
      flag: false
    };
  }
  /*根据文件名称避免重复上传*/

  /*文件格式验证*/
  if (!Object(__WEBPACK_IMPORTED_MODULE_0__utils_utils__["b" /* checkExcelType */])(currentFile) && !Object(__WEBPACK_IMPORTED_MODULE_0__utils_utils__["a" /* checkCSVType */])(currentFile)) {
    return {
      body: new __WEBPACK_IMPORTED_MODULE_6__util__["a" /* ErrorResult */]("请上传正确格式的表格"),
      flag: false
    };
  }

  return {
    flag: true
  };
}

// 格式化订单数据
function fileDataConvert(orders, orderAttrs, platform, createDate) {
  orders = orders.slice(1).map(item => {
    let obj = {
      platform: platform
    };
    orderAttrs.forEach((attr, idx) => {
      let val = item[idx];
      if (attr != 'createDate') {
        if (val) {
          val = Object(__WEBPACK_IMPORTED_MODULE_6__util__["d" /* replaceAll */])(val, '=\"', "");
          obj[attr] = Object(__WEBPACK_IMPORTED_MODULE_6__util__["d" /* replaceAll */])(val, '\"', "");
        } else {
          obj[attr] = val;
        }
        /*if(attr == 'orderNo'){
          obj[attr] = String(Number(val))
        }*/
      } else {
        if (!val || val == 'null') {
          obj[attr] = createDate ? __WEBPACK_IMPORTED_MODULE_2_moment___default()(new Date(createDate)).format('YYYY-MM-DD HH:mm:ss') : __WEBPACK_IMPORTED_MODULE_2_moment___default()(new Date()).format('YYYY-MM-DD HH:mm:ss');
        } else {
          obj[attr] = __WEBPACK_IMPORTED_MODULE_2_moment___default()(new Date(val)).format('YYYY-MM-DD HH:mm:ss');
        }
      }
    });
    return obj;
  });
  for (let i = orders.length - 1; i >= 0; i--) {
    if (!orders[i].orderNo && !orders[i].price) {
      orders.splice(i, 1);
    }
  }
  return orders;
}

/*验证文件数据是否重复*/
function validateData(data, nums, all) {
  let flags = [];
  let promiseList = [];
  if (all) {
    for (let i = 0; i < nums; i++) {
      promiseList.push(new Promise(function (resolve, reject) {
        __WEBPACK_IMPORTED_MODULE_5__model_order_model__["a" /* OrdersModel */].findOne({ "orderNo": data[i].orderNo }, function (err, order) {
          if (err) {
            console.log("查找出错");
            resolve(true);
          }
          if (order) {
            resolve(false);
          } else {
            resolve(true);
          }

          resolve();
        });
      }));
    }
  } else {
    let indexs = [];
    while (indexs.length < nums) {
      let randomNum = Math.floor(Math.random() * data.length);
      if (indexs.indexOf(randomNum) < 0) {
        indexs.push(randomNum);
      }
    }
    for (let j = 0; j < indexs.length; j++) {
      let index = indexs[j];
      promiseList.push(new Promise(function (resolve, reject) {
        __WEBPACK_IMPORTED_MODULE_5__model_order_model__["a" /* OrdersModel */].findOne({ "orderNo": data[index].orderNo }, function (err, order) {
          if (err) {
            console.log("查找出错");
            resolve(true);
          }

          if (order) {
            resolve(false);
          } else {
            resolve(true);
          }
        });
      }));
    }

    return Promise.all(promiseList, list => {
      return list;
    });
  }
}

async function fileContentValidate(orders) {
  /*对数据重复性进行验证,随机抽样一定的数据看，看是否是同一个文件*/
  let contentFlag = true;
  let list = [];
  if (orders.length < 5) {
    list = await validateData(orders, orders.length, true);
  } else if (orders.length < 50) {
    list = await validateData(orders, 5);
  } else if (Math.ceil(orders.length / 10) < 10) {
    list = await validateData(orders, Math.ceil(orders.length / 10));
  } else {
    list = await validateData(orders, 10);
  }
  contentFlag = list.every(item => {
    return item;
  });
  return contentFlag;
  /*对数据重复性进行验证*/
}

let router = __webpack_require__(0)();
// 设置模块名为接口前缀
router.prefix('/api/v1/order');

// 上传文件
router.post('/upload', async ctx => {
  // koa-body会将文件保存在request的files属性中
  let files = ctx.request.files;
  let platform = ctx.request.body.platform; // 'tb': 淘宝，'dy'：抖音
  let orderAttrs = platform == 'tb' ? tbAttrNames : dyAttrNames;
  let createDate = ctx.request.body.createDate;
  let clearQueue = ctx.request.body.clearQueue || false;

  // console.log(files)

  if (!files || !files.files) {
    ctx.body = new __WEBPACK_IMPORTED_MODULE_6__util__["a" /* ErrorResult */]({
      msg: "请选择相应文件进行上传",
      code: '0006'
    });
    return;
  }

  // files是接口定义的用来代表上传文件的属性，上传单个文件时files.files是File类型，多个文件files.files是数组
  let res = Array.isArray(files.files) ? files.files : [files.files];
  let orders = [];
  for (let i = 0; i < res.length; i++) {
    let currentFile = res[i];

    let valid = validateFile(currentFile, clearQueue);
    if (!valid.flag) {
      ctx.body = valid.body;
      return;
    }

    let path = currentFile.path || '';
    if (Object(__WEBPACK_IMPORTED_MODULE_0__utils_utils__["b" /* checkExcelType */])(res[i])) {
      let excelData = __WEBPACK_IMPORTED_MODULE_3_node_xlsx___default.a.parse(path);
      let dataList = fileDataConvert(excelData[0].data, orderAttrs, platform, createDate);
      let flag = await fileContentValidate(dataList);
      if (flag) {
        __WEBPACK_IMPORTED_MODULE_5__model_order_model__["a" /* OrdersModel */].queue.add(currentFile.name);
        orders = orders.concat(dataList);
      } else {
        ctx.body = new __WEBPACK_IMPORTED_MODULE_6__util__["a" /* ErrorResult */]({
          msg: "请勿重复上传数据相同的文件",
          code: '0010'
        });
        return;
      }
    } else if (Object(__WEBPACK_IMPORTED_MODULE_0__utils_utils__["a" /* checkCSVType */])(res[i])) {
      let buffer = __WEBPACK_IMPORTED_MODULE_1_fs___default.a.readFileSync(path);
      let charset = '';
      if (buffer[0] == 0xff && buffer[1] == 0xfe || buffer[0] == 0xfe && buffer[1] == 0xff) {
        charset = 'unicode';
      } else if (buffer[0] == 0xef && buffer[1] == 0xbb) {
        charset = 'utf8';
      } else {
        charset = 'gbk';
      }
      try {
        let fileData = __WEBPACK_IMPORTED_MODULE_1_fs___default.a.readFileSync(path);
        let res = __WEBPACK_IMPORTED_MODULE_4_iconv_lite___default.a.decode(fileData, charset);
        res = res.split("\n");
        res.forEach((item, index) => {
          res[index] = item.split(',');
        });

        let dataList = fileDataConvert(res, orderAttrs, platform, createDate);
        let flag = await fileContentValidate(dataList);
        if (flag) {
          __WEBPACK_IMPORTED_MODULE_5__model_order_model__["a" /* OrdersModel */].queue.add(currentFile.name);
          orders = orders.concat(dataList);
        } else {
          ctx.body = new __WEBPACK_IMPORTED_MODULE_6__util__["a" /* ErrorResult */]({
            msg: "请勿重复上传文件",
            code: '0010'
          });
          return;
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  /*删除换存在服务器的文件*/
  let uploadDir = path.join(__dirname, '../../upload');
  delDir(uploadDir);
  /*删除换存在服务器的文件*/

  // 淘宝数据存在多条数据属于一个订单的情况
  let obj = {};
  let idx = [];
  orders.forEach((order, index) => {
    if (!obj[order.orderNo]) {
      obj[order.orderNo] = order;
      order.relativeOrder = [];
    } else {
      obj[order.orderNo].relativeOrder.push(order);
      idx.push(index);
    }
  });
  for (let i = idx.length - 1; i >= 0; i--) {
    orders.splice(idx[i], 1);
  }

  await new Promise(function (resolve, reject) {
    __WEBPACK_IMPORTED_MODULE_5__model_order_model__["a" /* OrdersModel */].create(orders, function (err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  }).then(res => {
    // ctx.body = orders
    ctx.body = new __WEBPACK_IMPORTED_MODULE_6__util__["c" /* SuccessResult */]({
      msg: "插入数据成功"
    });
  }).catch(err => {
    ctx.body = new __WEBPACK_IMPORTED_MODULE_6__util__["a" /* ErrorResult */]({
      msg: err ? err : "导入数据失败"
    });
  });
});

// 查询订单
router.post('/query', async ctx => {
  let pageSize = ctx.request.body.pageSize;
  let pageNum = ctx.request.body.pageNum;
  let orderNo = ctx.request.body.orderNo || ''; // 订单编号
  let productName = ctx.request.body.productName || ''; // 商品名称， 对应文档的title标题
  let productCode = ctx.request.body.productCode || ''; // 商品编号

  if (!pageSize) {
    ctx.body = new __WEBPACK_IMPORTED_MODULE_6__util__["a" /* ErrorResult */]({
      code: '0006',
      msg: "缺少pageSize参数"
    });
    return;
  }
  if (!pageNum) {
    ctx.body = new __WEBPACK_IMPORTED_MODULE_6__util__["a" /* ErrorResult */]({
      code: '0006',
      msg: "缺少pageNum参数"
    });
    return;
  }

  await new Promise(async function (resolve, reject) {
    let orderNoReg = new RegExp(orderNo, 'i');
    let titleReg = new RegExp(productName, 'i');
    let productCodeReg = new RegExp(productCode, 'i');

    let documentCount;
    await __WEBPACK_IMPORTED_MODULE_5__model_order_model__["a" /* OrdersModel */].count({
      $and: [//多条件，数组
      { orderNo: { $regex: orderNoReg } }, { title: { $regex: titleReg } }, { productCode: { $regex: productCodeReg } }]
    }, (err, count) => {
      documentCount = err ? 0 : parseInt(count);
    });

    let orderModel = __WEBPACK_IMPORTED_MODULE_5__model_order_model__["a" /* OrdersModel */].find({
      $and: [//多条件，数组
      { orderNo: { $regex: orderNoReg } }, { title: { $regex: titleReg } }, { productCode: { $regex: productCodeReg } }]
    });
    orderModel.sort({ "createDate": -1 }).skip((pageNum - 1) * pageSize).limit(parseInt(pageSize));
    orderModel.exec(function (err, res) {
      console.log(err);
      if (err) {
        reject(err);
      } else {
        let data = {
          total: documentCount,
          data: res
        };
        resolve(data);
      }
    });
  }).then(res => {
    ctx.body = new __WEBPACK_IMPORTED_MODULE_6__util__["c" /* SuccessResult */]({
      msg: '获取数据成功',
      data: res
    });
  }).catch(err => {
    ctx.body = new __WEBPACK_IMPORTED_MODULE_6__util__["a" /* ErrorResult */]({
      msg: err ? err : "获取数据失败"
    });
  });
});

// 插入订单
router.post('/insert', async ctx => {
  let params = ctx.request.body.params ? JSON.parse(ctx.request.body.params) : {};
  await new Promise(async function (resolve, reject) {
    let orderModel = new __WEBPACK_IMPORTED_MODULE_5__model_order_model__["a" /* OrdersModel */](params);
    orderModel.save(function (err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  }).then(res => {
    ctx.body = new __WEBPACK_IMPORTED_MODULE_6__util__["c" /* SuccessResult */]({
      msg: '插入数据成功'
    });
  }).catch(err => {
    let propName = '';
    if (err && err.code == 11000) {
      let keyValue = err["keyValue"];
      for (let prop in keyValue) {
        propName = prop;
      }
    }
    ctx.body = new __WEBPACK_IMPORTED_MODULE_6__util__["a" /* ErrorResult */]({
      code: err && err.code == 11000 ? '0002' : '',
      msg: propName ? '插入数据的' + propName + '属性必须保持唯一性' : "插入数据失败"
    });
  });
});

/* harmony default export */ __webpack_exports__["a"] = (router);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, "server/interface/order"))

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return checkExcelType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return checkCSVType; });
/* unused harmony export getType */
/* unused harmony export deepClone */
const checkExcelType = file => {
  let type = file.type;
  let name = file.name;
  if (type.indexOf("xlsx") > -1 || type.indexOf("xls") > -1 || type.indexOf("xltx") > -1 || type.indexOf("xlt") > -1 || type.indexOf("xlsm") > -1 || type.indexOf("xlsb") > -1 || type.indexOf("xltm") > -1 || name.indexOf("xlsx") > -1 || name.indexOf("xls") > -1 || name.indexOf("xltx") > -1 || name.indexOf("xlt") > -1 || name.indexOf("xlsm") > -1 || name.indexOf("xlsb") > -1 || name.indexOf("xltm") > -1) {
    return true;
  } else {
    return false;
  }
};

const checkCSVType = file => {
  let type = file.type;
  let name = file.name;
  if (type.indexOf("csv") > -1 || name.indexOf("csv") > -1) {
    return true;
  } else {
    return false;
  }
};

function getType(obj) {
  //tostring会返回对应不同的标签的构造函数
  let toString = Object.prototype.toString;
  let map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  if (obj instanceof Element) {
    return 'element';
  }
  return map[toString.call(obj)];
}

function deepClone(data) {
  let type = getType(data);
  let obj;
  if (type === 'array') {
    obj = [];
  } else if (type === 'object') {
    obj = {};
  } else {
    //不再具有下一层次
    return data;
  }
  if (type === 'array') {
    for (let i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]));
    }
  } else if (type === 'object') {
    for (let key in data) {
      obj[key] = deepClone(data[key]);
    }
  }
  return obj;
}



/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("node-xlsx");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("iconv-lite");

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrdersModel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__schema__ = __webpack_require__(18);



let OrdersModel = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.model('order', __WEBPACK_IMPORTED_MODULE_1__schema__["a" /* OrdersSchema */]);



/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrdersSchema; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);

let Schema = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema;

let OrdersSchema = new Schema({
  'orderNo': {
    type: String,
    required: true,
    unique: true
  }, // "订单编号"
  'title': String, // "标题"
  'price': Number, // "价格"
  'orderNum': Number, // "购买数量"
  'externalSysNum': String, // "外部系统编号"
  'productAttrs': String, // "商品属性"
  'packageInfo': String, // "套餐信息"
  'remark': String, // "备注"
  'orderStatus': String, // "订单状态"
  'productCode': String, // "商家编码"
  'createDate': String, // "创建时间"
  'platform': String, // "所属平台"
  'relativeOrder': Array // "关联订单"
});

// 建立索引
OrdersSchema.index({ createDate: -1 });



/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return replaceAll; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__result__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tool__ = __webpack_require__(21);
/* unused harmony reexport Result */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__result__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__result__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__tool__["a"]; });



const replaceAll = function (str, oldContent, newContent) {
  if (typeof str != 'string') {
    return str;
  }
  while (str.indexOf(oldContent) > -1) {
    str = str.replace(oldContent, newContent);
  }
  return str;
};



/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Result */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SuccessResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ErrorResult; });
let resultCodeMap = {
  'WL-0000': "成功",
  'WL-0001': "未知错误",
  'WL-0002': "数据唯一性错误",
  'WL-0006': "参数缺失",
  'WL-0008': "用户没有权限",
  'WL-0010': "文件重复上传",
  'WL-0014': "用户过期"
};

class Result {
  constructor({ code, msg, data }) {
    this.resultCode = code;
    this.resultResc = msg;
    this.resultData = data || null;
  }
}

class SuccessResult extends Result {
  constructor({ msg, data }) {
    super({
      code: 'WL-0000',
      msg: msg ? msg : '操作成功',
      data: data
    });
  }
}

class ErrorResult extends Result {
  constructor({ code, msg }) {
    super({
      code: code ? 'WL-' + code : "WL-0001", // WL-0001未知错误
      msg: msg ? msg : '操作失败',
      data: null
    });
  }
}



/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Queue; });
class Queue {
  constructor(length, queue) {
    this.maxLength = length;
    this.queue = queue && Array.isArray(queue) ? queue : [];
  }
  add(elem) {
    if (this.queue.length < this.maxLength) {
      this.queue.push(elem);
    } else {
      this.queue.shift();
      this.queue.push(elem);
    }
  }
  removeByIndex(index) {
    if (index > this.queue.length - 1) return;
    this.queue.splice(index, 1);
  }
  removeByElem(elem) {
    let index = this.queue.indexOf(elem);
    if (index > -1) this.queue.splice(index, 1);
  }
  clear() {
    this.queue = [];
  }
  isInQueue(elem) {
    return this.queue.indexOf(elem) > -1;
  }
}



/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
let router = __webpack_require__(0)();
// 设置模块名为接口前缀
router.prefix('/api/v1/stock');
router.get('/aaa', async ctx => {
  ctx.body = "首页";
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: 'Nuxt.js project' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
  ** Global CSS
  */
  css: ['~assets/css/main.css', 'element-ui/lib/theme-chalk/index.css'],
  plugins: ["@/plugins/element-ui", "@/plugins/globalComponents"],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLINT on save
     */
    extend(config, ctx) {
      if (ctx.Client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  }
};

/***/ })
/******/ ]);
//# sourceMappingURL=main.map