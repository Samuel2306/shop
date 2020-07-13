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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interface__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nuxt__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_nuxt__);

const koaBody = __webpack_require__(4);
const path = __webpack_require__(1);



async function start() {
  const app = new __WEBPACK_IMPORTED_MODULE_0_koa___default.a();
  const host = process.env.HOST || '127.0.0.1';
  const port = process.env.PORT || 3000;

  // Import and Set Nuxt.js options
  const config = __webpack_require__(15);
  config.dev = !(app.env === 'production');

  // Instantiate nuxt.js
  const nuxt = new __WEBPACK_IMPORTED_MODULE_2_nuxt__["Nuxt"](config);

  // Build in development
  if (config.dev) {
    const builder = new __WEBPACK_IMPORTED_MODULE_2_nuxt__["Builder"](nuxt);
    await builder.build();
  }

  // body parser 中间件
  app.use(koaBody({
    // 支持文件格式
    multipart: true,
    encoding: 'uft-8',
    formidable: {
      // 上传目录
      uploadDir: path.join(__dirname, 'upload'),
      // 保留文件扩展名
      keepExtensions: true
    }
  }));

  /* 将所有接口引入 */
  for (let prop in __WEBPACK_IMPORTED_MODULE_1__interface__["a" /* default */]) {
    let router = __WEBPACK_IMPORTED_MODULE_1__interface__["a" /* default */][prop];
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

start();
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, "server"))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("koa-body");

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__user__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__product__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__order__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__stock__ = __webpack_require__(13);





/* harmony default export */ __webpack_exports__["a"] = ({
  user: __WEBPACK_IMPORTED_MODULE_0__user__["a" /* default */],
  product: __WEBPACK_IMPORTED_MODULE_1__product__["a" /* default */],
  order: __WEBPACK_IMPORTED_MODULE_2__order__["a" /* default */],
  stock: __WEBPACK_IMPORTED_MODULE_3__stock__["a" /* default */]
});

/***/ }),
/* 6 */
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
/* 7 */
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
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_utils__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fs__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_fs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_node_xlsx__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_node_xlsx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_node_xlsx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_iconv_lite__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_iconv_lite___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_iconv_lite__);


const path = __webpack_require__(1);



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

let router = __webpack_require__(0)();
// 设置模块名为接口前缀
router.prefix('/api/v1/order');

// 上传文件
router.post('/upload', ctx => {
  // koa-body会将文件保存在request的files属性中
  let files = ctx.request.files;
  if (!files || !files.files) {
    ctx.body = "请选择相应文件进行上传";
    return;
  }
  // files是接口定义的用来代表上传文件的属性，上传单个文件时files.files是File类型，多个文件files.files是数组
  let res = Array.isArray(files.files) ? files.files : [files.files];
  let orders = [];
  for (let i = 0; i < res.length; i++) {
    let currentFile = res[i];
    if (!Object(__WEBPACK_IMPORTED_MODULE_0__utils_utils__["b" /* checkExcelType */])(res[i]) && !Object(__WEBPACK_IMPORTED_MODULE_0__utils_utils__["a" /* checkCSVType */])(res[i])) {
      ctx.body = "请上传正确格式的表格" + (res.length > 1 ? ",多文件上传时可能存在非表格文件" : "");
      return;
    } else {
      let path = currentFile.path || '';
      if (Object(__WEBPACK_IMPORTED_MODULE_0__utils_utils__["b" /* checkExcelType */])(res[i])) {
        let excelData = __WEBPACK_IMPORTED_MODULE_2_node_xlsx___default.a.parse(path);
        orders = orders.concat(excelData[0].data);
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
          let res = __WEBPACK_IMPORTED_MODULE_3_iconv_lite___default.a.decode(fileData, charset);
          res = res.split("\r\n");
          res.forEach((item, index) => {
            res[index] = res[index].split(',');
          });
          orders = orders.concat(res);
        } catch (e) {
          console.log(e);
        }
      }
    }
  }

  let uploadDir = path.join(__dirname, '../../upload');
  delDir(uploadDir);
  ctx.body = orders;
});

/* harmony default export */ __webpack_exports__["a"] = (router);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, "server/interface/order"))

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return checkExcelType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return checkCSVType; });
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



/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("node-xlsx");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("iconv-lite");

/***/ }),
/* 13 */
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
/* 14 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 15 */
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
  css: ['~assets/css/main.css'],
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