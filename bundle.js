/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var home = __webpack_require__(1);

	$(document).ready(function(){
	    //home.init();
	    //$('.main').append(home.template);
	    new Vue({
	        el: '#vuemain',
	        data: {
	            name: 'vue test'
	        },
	        ready: function(){
	            console.log('vue object ready!');
	        },
	        components: {
	            'vue-home': __webpack_require__(7)
	        }
	    });
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(2);

	module.exports = {
	    template: __webpack_require__(6),

	    init: function () {
	        console.log('init home module');

	        var myHome = angular.module('myHome', []);


	        myHome.controller('demo', [function(){
	            var that = this;
	            that.click = function(){
	                that.status += 1;
	            };
	            that.status = 0;
	            return that;
	        }]);


	    }
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./home.less", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./home.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "body {\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  padding: 0;\n}\nbody > div {\n  margin: 20px 0;\n}\n.home {\n  background-color: #efefef;\n  color: black;\n  padding: 5px;\n}\n", ""]);

	// exports


/***/ },
/* 4 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = "<div class=\"home\" ng-app=\"myHome\">\r\n    <h2>Todo</h2>\r\n    <div ng-controller=\"demo as d\">\r\n\r\n        <button ng-click=\"d.click()\">click me</button>\r\n        <span>click {{d.status}} times!</span>\r\n\r\n    </div>\r\n</div>";

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(8);

	module.exports = {
	    template: __webpack_require__(10),
	    data: function(){
	        return {
	            timer: null,
	            title: 'VUE Module',
	            message: '',
	            secret: 'The secret variable',
	            edge: 1460,
	            deviation: 30,
	            displaySize: 0,
	            calRotate: {}
	        }
	    },
	    ready: function(){
	        var w = $(document).width()*0.4 + 'px';
	        this.displaySize = {
	            width:  w,
	            height: w
	        };
	        this.calRotate = {
	            transform: 'rotate('+ this.calAngle +'deg)'
	        };
	    },
	    methods: {
	        cleanInput: function(){
	            $('.editor').val('');
	        }
	    },
	    watch: {
	        edge: function(){
	            this.deviation = 0;
	        },
	        deviation: function(){
	            var that = this;
	            if(that.timer){
	                clearTimeout(that.timer);
	            }
	            that.timer = setTimeout(function(){
	                that.calRotate = {
	                    transform: 'rotate('+ that.calAngle +'deg)'
	                };
	            },200);
	        }
	    },
	    computed: {
	        'fullContent': function(){
	            return this.title + this.message;
	        },
	        'calAngle': function(){
	            //if(this.deviation > this.maxDeviation){
	            //    return '无法计算旋转角度，偏离值不能超过'+ this.maxDeviation;
	            //}
	            function angle (a, d) {
	                return 45 - Math.acos( Math.sqrt(2)/2 + Math.sqrt(2)*d/a ) * (180/Math.PI);
	            }
	            return angle(Number(this.edge), Number(this.deviation));
	        },
	        maxDeviation: function(){
	            return  ( Math.sqrt(2) - 1 ) * this.edge / 2
	        }
	        //calRotate: function(){
	        //    return {
	        //        transform: 'rotate('+ this.calAngle +'deg)'
	        //    };
	        //}
	    }
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(9);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./vuehome.less", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./vuehome.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, ".vue-home {\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  background-color: #eeeeee;\n  padding: 10px 10px 30px 10px;\n  border-radius: 10px;\n  box-shadow: 5px 10px 10px #aaa;\n}\n.vue-home .geo-block label {\n  display: inline-block;\n  width: 80px;\n  margin: 5px 0;\n}\n.vue-home .geo-block .result {\n  color: #fa0000;\n}\n.vue-home .geo-block .graphic {\n  margin-top: 30px;\n  text-align: center;\n}\n.vue-home .geo-block .graphic .base {\n  display: inline-block;\n  border: 1px solid #aaa;\n  width: 400px;\n  height: 400px;\n}\n.vue-home .geo-block .graphic .base .rect {\n  transition: all 1s;\n  border: 1px solid #0b97c4;\n  display: inline-block;\n  width: 100%;\n  height: 100%;\n}\n", ""]);

	// exports


/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = "<div class=\"vue-home\">\r\n    <!--<h4>{{title}}</h4>-->\r\n    <!--<p>message: {{message}}</p>-->\r\n    <!--<hr>-->\r\n    <!--<input class=\"editor\" type=\"text\" v-model=\"message\" placeholder=\"edit message\">-->\r\n    <!--<button @click=\"cleanInput\">clean message</button>-->\r\n\r\n    <div class=\"geo-block\">\r\n        <label>边长：</label>\r\n        <input type=\"number\" id=\"edge\" v-model=\"edge\"/>\r\n        <br/>\r\n        <label>偏离值：</label>\r\n        <input type=\"range\" id=\"deviation\" min=\"0\" v-bind:max=\"maxDeviation\" v-model=\"deviation\"/>\r\n        <span>{{deviation}}<br>(max:{{maxDeviation}})</span>\r\n        <hr>\r\n        <label>旋转角度：</label>\r\n        <!--<input type=\"text\" id=\"angle\" v-model=\"angle\"/>-->\r\n        <span class=\"result\">{{calAngle}}</span>\r\n        <br/>\r\n\r\n        <div class=\"graphic\">\r\n            <div class=\"base\" v-bind:style=\"displaySize\">\r\n                <div class=\"rect\" v-bind:style=\"calRotate\"></div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }
/******/ ]);