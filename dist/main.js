/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/Seule/locals/init.js":
/*!*******************************************!*\
  !*** ./node_modules/Seule/locals/init.js ***!
  \*******************************************/
/***/ ((module) => {

eval("function selectElement(el, context = document) {\r\n    let element = {};\r\n\r\n    element.context = context;\r\n\r\n    try {\r\n        element.el = context.querySelector(el);\r\n        element.e = el.replace(\"#\", \"\")\r\n    } catch (e) {\r\n        element.el = el;\r\n        element.e = el.getAttribute(\"id\").replace(\"#\", \"\")\r\n    }\r\n\r\n    return element;\r\n}\r\nfunction selectStyle(name, shadow, context = document) {\r\n    if (name) {\r\n        let l = context.createElement(\"style\");\r\n        l.textContent = name;\r\n        shadow.insertBefore(l, shadow.firstChild);\r\n    }\r\n}\r\nfunction creatShadow(root) {\r\n    let parent = {};\r\n\r\n    class Root extends HTMLElement {\r\n        constructor() {\r\n            super();\r\n            const shadow = this.attachShadow({\r\n                mode: \"closed\"\r\n            });\r\n            let el;\r\n\r\n            el = root.el.cloneNode(true);\r\n            parent.html = Initial(el, root.data)\r\n\r\n            if (el.innerHTML) selectStyle(root.style, shadow);\r\n\r\n            shadow.appendChild(el);\r\n\r\n            parent.el = shadow.children[shadow.children.length - 1];\r\n            shadow.children[shadow.children.length - 1].removeAttribute(\"id\");\r\n        }\r\n    }\r\n\r\n    customElements.define(\"seule-\" + root.e, Root)\r\n\r\n    root.seule = document.createElement(\"seule-\" + root.e);\r\n    root.el.innerHTML = \"\";\r\n    root.el.removeAttribute(\"class\");\r\n    root.el.appendChild(root.seule);\r\n\r\n    return parent\r\n}\r\nfunction Initial(el, data= {}, html) {\r\n    let keys = Object.keys(data),\r\n        parent = el.innerHTML,\r\n        content = el.innerHTML;\r\n\r\n    if (html) content = html;\r\n\r\n    for (let item of keys) {\r\n        let bin = data[item].toString().replace(/<[^>]*>/g, \"\");\r\n\r\n        while (content.includes(\"{{\" + item + \"}}\"))\r\n            content = content.replace(\r\n                \"{{\" + item + \"}}\",\r\n                \"<data data-bind='\" + item + \"'>\" + bin + \"</data>\"\r\n            );\r\n    }\r\n    el.innerHTML = content;\r\n\r\n    Bind(el, data);\r\n\r\n    return parent\r\n}\r\nfunction Init(el, obj, prop, value) {\r\n    if (obj[prop] !== value) {\r\n        obj[prop] = value;\r\n        const binds = el.querySelectorAll('data[data-bind=\"' + prop + '\"]');\r\n        for (const bind of binds) bind.innerText = value;\r\n        Bind(el, obj)\r\n    }\r\n}\r\nfunction Bind(el, obj) {\r\n    const handlers = el.querySelectorAll('[data-attribute]');\r\n\r\n    for (const handler of handlers) {\r\n        const attrs = handler.getAttribute('data-attribute').split(';');\r\n\r\n        for (const attr of attrs) {\r\n            const a = attr.trim().split(':');\r\n            handler.setAttribute(a[0], obj[a[1]].toString().replace(/<[^>]*>/g, \"\"))\r\n        }\r\n    }\r\n}\r\n\r\nmodule.exports = {\r\n    selectElement: selectElement,\r\n    creatShadow: creatShadow,\r\n    init: Init,\r\n    selectStyle: selectStyle,\r\n    Initial: Initial\r\n};\n\n//# sourceURL=webpack://hello-npm/./node_modules/Seule/locals/init.js?");

/***/ }),

/***/ "./node_modules/Seule/view/index.js":
/*!******************************************!*\
  !*** ./node_modules/Seule/view/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const {setupShadow} = __webpack_require__(/*! ./setting */ \"./node_modules/Seule/view/setting.js\");\r\nconst { Initial, init } = __webpack_require__(/*! ../locals/init */ \"./node_modules/Seule/locals/init.js\");\r\n\r\nclass rootElement {\r\n    constructor(el, routing) {\r\n        class PageRouter extends HTMLElement {\r\n            #currentPage;\r\n            #defaultPage = routing.Home;\r\n            #app = {\r\n                style: '',\r\n                template: '',\r\n                mode: \"open\"\r\n            };\r\n\r\n            constructor() {\r\n                super();\r\n                setupShadow(this, this.#app);\r\n                Window.navigate = (newPage)=> this.#gotoNewPage(newPage);\r\n            };\r\n\r\n            connectedCallback() {\r\n                this.#currentPage = this.#getCurrentPageFromUrl();\r\n                this.#renderCorrectPage();\r\n\r\n                window.addEventListener(\"popstate\", (event) => {\r\n                    if (event.state)\r\n                        this.#currentPage = event.state;\r\n                    else\r\n                        this.#currentPage = this.#defaultPage;\r\n\r\n                    this.#renderCorrectPage();\r\n                });\r\n            }\r\n\r\n            #renderCorrectPage() {\r\n                const elementId = \"CurrentPage\";\r\n                const prevPage = this.shadowRoot.getElementById(elementId);\r\n                if (prevPage)\r\n                    this.shadowRoot.removeChild(prevPage);\r\n\r\n\r\n                const newPage = document.createElement(this.#currentPage.component);\r\n                newPage.id = elementId;\r\n                newPage.addEventListener(\"ChangePage\", (event) => {\r\n                    this.#gotoNewPage(event.detail);\r\n                    Window.navigate = event.detail;\r\n                });\r\n                this.shadowRoot.appendChild(newPage);\r\n\r\n                document.title = this.#currentPage.title;\r\n            }\r\n\r\n            #gotoNewPage(newPage) {\r\n                this.#currentPage = newPage;\r\n                this.#addCurrentPageToHistory();\r\n                this.#renderCorrectPage();\r\n            }\r\n\r\n            #addCurrentPageToHistory() {\r\n                let queryString = \"\",\r\n                    url;\r\n\r\n                if(this.#currentPage.params)\r\n                    queryString = '?' + Object.keys(this.#currentPage.params).map(key => key + '=' + this.#currentPage.params[key]).join('&');\r\n\r\n                url = window.location.origin + this.#currentPage.path + queryString;\r\n\r\n                if(this.#currentPage.path.includes(\"#\"))\r\n                    url = window.location.origin + window.location.pathname + queryString + this.#currentPage.path;\r\n\r\n                history.pushState(\r\n                    this.#currentPage,\r\n                    this.#currentPage.title,\r\n                    url\r\n                );\r\n            }\r\n\r\n            #getCurrentPageFromUrl() {\r\n                for (const current in routing) {\r\n\r\n                    if(window.location.hash) {\r\n                        const hash = window.location.hash;\r\n\r\n                        if (routing[current].path === hash)\r\n                            return routing[current];\r\n                    }\r\n                    if (routing[current].path === window.location.pathname)\r\n                        return routing[current];\r\n                }\r\n                return this.#defaultPage;\r\n            }\r\n        }\r\n        try {\r\n            customElements.define(el, PageRouter);\r\n        }catch (e) {\r\n            console.error('el property must be a <String> with two words and separated with Minus Character for exp: {el:\"home-page\"}')\r\n        }\r\n    }\r\n}\r\n\r\nclass View {\r\n    constructor(app) {\r\n        const view = ()=> class View extends HTMLElement {\r\n            #el = {};\r\n            constructor() {\r\n                super();\r\n                const params = new URL(window.location).searchParams.entries();\r\n\r\n                for (let element of params) {\r\n                    if (app.parameters) {\r\n                        app.data = app.data || {};\r\n                        app.data[element[0]] = String(element[1]);\r\n                    }\r\n                }\r\n\r\n                app.mode = \"open\";\r\n\r\n                setupShadow(this, app);\r\n                this.#el.RootElement = this.shadowRoot;\r\n\r\n                Initial(this.shadowRoot, app.data);\r\n\r\n                this.gotoPage = (page)=> {\r\n                    const event = new CustomEvent(\"ChangePage\", { detail: page });\r\n                    this.dispatchEvent(event);\r\n                }\r\n\r\n                this.#el.navigate = (page)=> this.gotoPage(page);\r\n\r\n                const handler = {\r\n                    set: (obj, prop, value) => {\r\n                        init(this.shadowRoot, obj, prop, value);\r\n                        return true;\r\n                    }\r\n                };\r\n\r\n                if (app.data) this.#el.data = new Proxy(app.data, handler);\r\n\r\n                app.handlers && app.handlers(this.#el);\r\n            }\r\n        }\r\n        try {\r\n            app.el && customElements.define(app.el, view());\r\n        }catch (e) {\r\n            console.error('el property must be a <String> with two words and separated with Minus Character for exp: {el:\"home-page\"}')\r\n        }\r\n    }\r\n}\r\n\r\n\r\nconst map = (app, routing)=>{\r\n    app.map = {...routing};\r\n\r\n    const routers = app.RootElement.querySelectorAll('[data-router]');\r\n\r\n    for (const router of routers)\r\n        router.onclick = function() {\r\n\r\n            if(this.dataset.params){\r\n                const\r\n                    params = this.dataset.params.split(\",\"),\r\n                    pass = {};\r\n\r\n                for (const param of params){\r\n                    const entry = param.split(\":\");\r\n                    const key = entry[0].trimStart();\r\n                    pass[key] = entry[1];\r\n                }\r\n\r\n                routing[this.dataset.router].params = pass;\r\n            }\r\n\r\n            Window.navigate(routing[this.dataset.router]);\r\n        }\r\n\r\n    return routing\r\n}\r\n\r\nmodule.exports = {\r\n    View: View,\r\n    Root: rootElement,\r\n    Map: map\r\n};\r\n\n\n//# sourceURL=webpack://hello-npm/./node_modules/Seule/view/index.js?");

/***/ }),

/***/ "./node_modules/Seule/view/setting.js":
/*!********************************************!*\
  !*** ./node_modules/Seule/view/setting.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"setupShadow\": () => (/* binding */ setupShadow)\n/* harmony export */ });\nconst setupShadow = (element ,app)=>{\r\n    const shadow = element.attachShadow({ mode: app.mode });\r\n    const template = document.createElement(\"template\");\r\n\r\n    template.innerHTML = \"<style>\"+ app.style + \"</style>\" + app.template;\r\n    const templateContent = template.content;\r\n    shadow.appendChild(templateContent.cloneNode(true));\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://hello-npm/./node_modules/Seule/view/setting.js?");

/***/ }),

/***/ "./src/index.html":
/*!************************!*\
  !*** ./src/index.html ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/html-loader/dist/runtime/getUrl.js */ \"./node_modules/html-loader/dist/runtime/getUrl.js\");\n/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__);\n// Imports\n\nvar ___HTML_LOADER_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./favicon.ico */ \"./src/favicon.ico\"), __webpack_require__.b);\nvar ___HTML_LOADER_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./css/main.css */ \"./src/css/main.css\"), __webpack_require__.b);\nvar ___HTML_LOADER_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ./css/app.css */ \"./src/css/app.css\"), __webpack_require__.b);\nvar ___HTML_LOADER_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ./img/s-logo.svg */ \"./src/img/s-logo.svg\"), __webpack_require__.b);\n// Module\nvar ___HTML_LOADER_REPLACEMENT_0___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_0___);\nvar ___HTML_LOADER_REPLACEMENT_1___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_1___);\nvar ___HTML_LOADER_REPLACEMENT_2___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_2___);\nvar ___HTML_LOADER_REPLACEMENT_3___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_3___);\nvar code = \"<!DOCTYPE html>\\r\\n<html lang=\\\"en\\\">\\r\\n<head>\\r\\n    <meta charset=\\\"UTF-8\\\">\\r\\n    <meta name=\\\"viewport\\\" content=\\\"width=device-width, initial-scale=1\\\">\\r\\n    <meta name=\\\"description\\\" content=\\\"description of your project\\\">\\r\\n    <meta name=\\\"keywords\\\" content=\\\"key1, key2, ...\\\">\\r\\n    <meta name=\\\"author\\\" content=\\\"your name\\\">\\r\\n    <title>Project Title</title>\\r\\n    <link rel=\\\"icon shortcut\\\" href=\\\"\" + ___HTML_LOADER_REPLACEMENT_0___ + \"\\\">\\r\\n    <link rel=\\\"stylesheet\\\" href=\\\"\" + ___HTML_LOADER_REPLACEMENT_1___ + \"\\\">\\r\\n    <link rel=\\\"stylesheet\\\" href=\\\"\" + ___HTML_LOADER_REPLACEMENT_2___ + \"\\\" about=\\\"app\\\">\\r\\n</head>\\r\\n<body>\\r\\n\\r\\n<div id=\\\"homePage\\\" class=\\\"shadow\\\">\\r\\n    <img src=\\\"\" + ___HTML_LOADER_REPLACEMENT_3___ + \"\\\" alt=\\\"Seule Logo\\\">\\r\\n    {{message}}\\r\\n</div>\\r\\n<home_page></home_page>\\r\\n\\r\\n\\r\\n</body>\\r\\n</html>\";\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://hello-npm/./src/index.html?");

/***/ }),

/***/ "./node_modules/html-loader/dist/runtime/getUrl.js":
/*!*********************************************************!*\
  !*** ./node_modules/html-loader/dist/runtime/getUrl.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = function (url, options) {\n  if (!options) {\n    // eslint-disable-next-line no-param-reassign\n    options = {};\n  }\n\n  if (!url) {\n    return url;\n  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign\n\n\n  url = String(url.__esModule ? url.default : url);\n\n  if (options.hash) {\n    // eslint-disable-next-line no-param-reassign\n    url += options.hash;\n  }\n\n  if (options.maybeNeedQuotes && /[\\t\\n\\f\\r \"'=<>`]/.test(url)) {\n    return \"\\\"\".concat(url, \"\\\"\");\n  }\n\n  return url;\n};\n\n//# sourceURL=webpack://hello-npm/./node_modules/html-loader/dist/runtime/getUrl.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"homePage\": () => (/* binding */ homePage)\n/* harmony export */ });\n/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.html */ \"./src/index.html\");\n/* harmony import */ var Seule_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! Seule/view */ \"./node_modules/Seule/view/index.js\");\n/* harmony import */ var Seule_view__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(Seule_view__WEBPACK_IMPORTED_MODULE_1__);\n//importation of any page or a module from seule\r\n\r\n\r\n\r\n//create the view that contains the logic\r\nconst homePage = () => new Seule_view__WEBPACK_IMPORTED_MODULE_1__.View ({\r\n    el: 'home_page',\r\n    html: _index_html__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\r\n    data: {\r\n        message: \"hello from here\"\r\n    },\r\n    handlers(app){\r\n            console.log(\"hi there\")\r\n    }\r\n})\r\n\n\n//# sourceURL=webpack://hello-npm/./src/index.js?");

/***/ }),

/***/ "./src/css/app.css":
/*!*************************!*\
  !*** ./src/css/app.css ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"f8836130fa831e754ea6.css\";\n\n//# sourceURL=webpack://hello-npm/./src/css/app.css?");

/***/ }),

/***/ "./src/css/main.css":
/*!**************************!*\
  !*** ./src/css/main.css ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"6624334aff8632a63204.css\";\n\n//# sourceURL=webpack://hello-npm/./src/css/main.css?");

/***/ }),

/***/ "./src/favicon.ico":
/*!*************************!*\
  !*** ./src/favicon.ico ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"f86cff5bb1065c21dd5b.ico\";\n\n//# sourceURL=webpack://hello-npm/./src/favicon.ico?");

/***/ }),

/***/ "./src/img/s-logo.svg":
/*!****************************!*\
  !*** ./src/img/s-logo.svg ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("module.exports = __webpack_require__.p + \"caeb66e90ae31f1413fd.svg\";\n\n//# sourceURL=webpack://hello-npm/./src/img/s-logo.svg?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;