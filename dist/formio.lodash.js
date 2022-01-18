/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["_"] = factory();
	else
		root["_"] = factory();
})(self, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./lib/array.js":
/*!**********************!*\
  !*** ./lib/array.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.intersection = exports.map = exports.head = exports.last = exports.filter = exports.findEach = exports.matches = exports.findIndex = exports.find = exports.each = exports.dropRight = exports.drop = exports.difference = exports.concat = exports.compact = exports.chunk = void 0;\nvar lang_1 = __webpack_require__(/*! ./lang */ \"./lib/lang.js\");\nvar object_1 = __webpack_require__(/*! ./object */ \"./lib/object.js\");\n// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_chunk\nfunction chunk(input, size) {\n    return input.reduce(function (arr, item, idx) {\n        return idx % size === 0\n            ? __spreadArray(__spreadArray([], arr, true), [[item]], false) : __spreadArray(__spreadArray([], arr.slice(0, -1), true), [__spreadArray(__spreadArray([], arr.slice(-1)[0], true), [item], false)], false);\n    }, []);\n}\nexports.chunk = chunk;\n;\n// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_compact\nfunction compact(input) {\n    return input.filter(Boolean);\n}\nexports.compact = compact;\n/**\n * @link https://lodash.com/docs/4.17.15#concat\n * @param input\n * @param args\n * @returns\n */\nfunction concat(input) {\n    var args = [];\n    for (var _i = 1; _i < arguments.length; _i++) {\n        args[_i - 1] = arguments[_i];\n    }\n    return input.concat.apply(input, args);\n}\nexports.concat = concat;\n// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_difference\nfunction difference() {\n    var arrays = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        arrays[_i] = arguments[_i];\n    }\n    return arrays.reduce(function (a, b) {\n        return a.filter(function (value) {\n            return !b.includes(value);\n        });\n    });\n}\nexports.difference = difference;\n// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_drop\nfunction drop(arr, index) {\n    if (index === void 0) { index = 1; }\n    return (index > 0) ? arr.slice(index) : arr;\n}\nexports.drop = drop;\n// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_dropright\nfunction dropRight(arr, index) {\n    if (index === void 0) { index = 1; }\n    return (index > 0) ? arr.slice(0, -index) : arr;\n}\nexports.dropRight = dropRight;\n/**\n * Iterate through a collection or array.\n * @param collection\n * @param _each\n */\nfunction each(collection, _each) {\n    var isArray = Array.isArray(collection);\n    for (var i in collection) {\n        if (collection.hasOwnProperty(i)) {\n            if (_each(collection[i], isArray ? Number(i) : i) === true) {\n                break;\n            }\n            ;\n        }\n    }\n}\nexports.each = each;\n/**\n * Perform a find operation.\n * @param arr\n * @param query\n */\nfunction find(arr, query, findIndex) {\n    if (findIndex === void 0) { findIndex = false; }\n    if (!arr) {\n        return undefined;\n    }\n    if (Array.isArray(arr) && typeof query === 'function') {\n        return findIndex ? arr.findIndex(query) : arr.find(query);\n    }\n    var found = undefined;\n    var foundIndex = 0;\n    findEach(arr, query, function (item, index) {\n        found = item;\n        foundIndex = index;\n        return true;\n    });\n    return findIndex ? foundIndex : found;\n}\nexports.find = find;\n/**\n * Find an index.\n *\n * @param arr\n * @param query\n * @returns\n */\nfunction findIndex(arr, query) {\n    return find(arr, query, true);\n}\nexports.findIndex = findIndex;\n/**\n * Returns a function to perform matches.\n * @param query\n * @returns\n */\nfunction matches(query) {\n    var keys = [];\n    var compare = {};\n    if (typeof query === 'string') {\n        keys = [query];\n        compare[query] = true;\n    }\n    else {\n        keys = Object.keys(query);\n        compare = query;\n    }\n    return function (comp) {\n        return (0, lang_1.isEqual)((0, object_1.pick)(comp, keys), compare);\n    };\n}\nexports.matches = matches;\n/**\n * Perform a find operation on each item in an array.\n * @param arr\n * @param query\n * @param fn\n */\nfunction findEach(arr, query, fn) {\n    each(arr, function (item, index) {\n        if (matches(query)(item)) {\n            if (fn(item, index) === true) {\n                return true;\n            }\n        }\n    });\n}\nexports.findEach = findEach;\n/**\n * Perform a filter operation.\n * @param arr\n * @param fn\n */\nfunction filter(arr, fn) {\n    if (!arr) {\n        return [];\n    }\n    if (!fn) {\n        fn = function (val) { return !!val; };\n    }\n    if (Array.isArray(arr) && typeof fn === 'function') {\n        return arr.filter(fn);\n    }\n    var found = [];\n    findEach(arr, fn, function (item, index) {\n        found.push(item);\n        if (Array.isArray(item)) {\n            arr.splice(index, 1);\n        }\n        else {\n            delete arr[index];\n        }\n    });\n    return found;\n}\nexports.filter = filter;\n/**\n * Get the last item in an array.\n * @param arr\n */\nfunction last(arr) {\n    return arr[arr.length - 1];\n}\nexports.last = last;\n/**\n * https://lodash.com/docs/4.17.15#head\n * @param arr\n * @returns\n */\nfunction head(arr) {\n    return arr[0];\n}\nexports.head = head;\n/**\n * https://lodash.com/docs/4.17.15#map\n * @param arr\n * @param fn\n * @returns\n */\nfunction map(arr, fn) {\n    return arr.map(fn);\n}\nexports.map = map;\n/**\n * Get the intersection of two objects.\n * @param a\n * @param b\n */\nfunction intersection(a, b) {\n    return a.filter(function (value) { return b.includes(value); });\n}\nexports.intersection = intersection;\n\n\n//# sourceURL=webpack://_/./lib/array.js?");

/***/ }),

/***/ "./lib/function.js":
/*!*************************!*\
  !*** ./lib/function.js ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.debounce = void 0;\n/**\n * Debounc the call of a function for a given amount of time.\n *\n * @param func\n * @param wait\n * @returns\n */\nfunction debounce(func, wait) {\n    if (wait === void 0) { wait = 100; }\n    var timeout;\n    return function () {\n        var args = [];\n        for (var _i = 0; _i < arguments.length; _i++) {\n            args[_i] = arguments[_i];\n        }\n        if (timeout) {\n            clearTimeout(timeout);\n        }\n        timeout = setTimeout(function () {\n            timeout = null;\n            func.apply(void 0, args);\n        }, wait);\n    };\n}\nexports.debounce = debounce;\n\n\n//# sourceURL=webpack://_/./lib/function.js?");

/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nvar __exportStar = (this && this.__exportStar) || function(m, exports) {\n    for (var p in m) if (p !== \"default\" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);\n};\nvar __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.chain = void 0;\nvar ArrayFunctions = __importStar(__webpack_require__(/*! ./array */ \"./lib/array.js\"));\nvar Chainable = /** @class */ (function () {\n    function Chainable(val) {\n        this.chain = [];\n        this.currentValue = [];\n        this.currentValue = val;\n    }\n    Chainable.prototype.value = function () {\n        return this.chain.reduce(function (current, func) {\n            var _a;\n            return (_a = ArrayFunctions)[func.method].apply(_a, __spreadArray([current], func.args, false));\n        }, this.currentValue);\n    };\n    return Chainable;\n}());\nvar _loop_1 = function (method) {\n    if (ArrayFunctions.hasOwnProperty(method)) {\n        Chainable.prototype[method] = function () {\n            var args = [];\n            for (var _i = 0; _i < arguments.length; _i++) {\n                args[_i] = arguments[_i];\n            }\n            this.chain.push({ method: method, args: args });\n            return this;\n        };\n    }\n};\nfor (var method in ArrayFunctions) {\n    _loop_1(method);\n}\n/**\n * Create a chainable array of methods.\n * @param val\n * @returns\n */\nfunction chain(val) {\n    return new Chainable(val);\n}\nexports.chain = chain;\nexports[\"default\"] = chain;\n__exportStar(__webpack_require__(/*! ./array */ \"./lib/array.js\"), exports);\n__exportStar(__webpack_require__(/*! ./function */ \"./lib/function.js\"), exports);\n__exportStar(__webpack_require__(/*! ./lang */ \"./lib/lang.js\"), exports);\n__exportStar(__webpack_require__(/*! ./math */ \"./lib/math.js\"), exports);\n__exportStar(__webpack_require__(/*! ./object */ \"./lib/object.js\"), exports);\n__exportStar(__webpack_require__(/*! ./string */ \"./lib/string.js\"), exports);\n\n\n//# sourceURL=webpack://_/./lib/index.js?");

/***/ }),

/***/ "./lib/lang.js":
/*!*********************!*\
  !*** ./lib/lang.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.isRegExp = exports.isBoolean = exports.isNumber = exports.isPlainObject = exports.isObject = exports.isObjectLike = exports.isArray = exports.isNull = exports.isNil = exports.isNaN = exports.isInteger = exports.isEmpty = exports.isString = exports.isEqual = exports.noop = void 0;\nvar array_1 = __webpack_require__(/*! ./array */ \"./lib/array.js\");\n/**\n * Gets the `toStringTag` of `value`.\n *\n * @private\n * @param {*} value The value to query.\n * @returns {string} Returns the `toStringTag`.\n */\nfunction getTag(value) {\n    if (value == null) {\n        return value === undefined ? '[object Undefined]' : '[object Null]';\n    }\n    return Object.prototype.toString.call(value);\n}\n/**\n * A no-operation function.\n */\nfunction noop() {\n    return;\n}\nexports.noop = noop;\n;\n/**\n * Determines equality of a value or complex object.\n * @param a\n * @param b\n */\nfunction isEqual(a, b) {\n    var equal = false;\n    if (a === b) {\n        return true;\n    }\n    if (a && b && (Array.isArray(a) || isObject(a))) {\n        equal = true;\n        (0, array_1.each)(a, function (val, key) {\n            if ((Array.isArray(val) || isObject(val)) && !isEqual(b[key], val)) {\n                equal = false;\n                return true;\n            }\n            if (b[key] !== val) {\n                equal = false;\n                return true;\n            }\n        });\n    }\n    return equal;\n}\nexports.isEqual = isEqual;\nfunction isString(val) {\n    return typeof val === 'string';\n}\nexports.isString = isString;\n// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_isempty\nfunction isEmpty(obj) {\n    return [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length;\n}\nexports.isEmpty = isEmpty;\nfunction isInteger(val) {\n    return Number.isInteger(val);\n}\nexports.isInteger = isInteger;\nfunction isNaN(val) {\n    return Number.isNaN(val);\n}\nexports.isNaN = isNaN;\nfunction isNil(val) {\n    return val == null;\n}\nexports.isNil = isNil;\nfunction isNull(val) {\n    return val === null;\n}\nexports.isNull = isNull;\nfunction isArray(val) {\n    return Array.isArray(val);\n}\nexports.isArray = isArray;\nfunction isObjectLike(val) {\n    return typeof val === 'object' && (val !== null);\n}\nexports.isObjectLike = isObjectLike;\nfunction isObject(val) {\n    var type = typeof val;\n    return val != null && (type === 'object' || type === 'function');\n}\nexports.isObject = isObject;\nfunction isPlainObject(value) {\n    if (!isObjectLike(value) || getTag(value) != '[object Object]') {\n        return false;\n    }\n    if (Object.getPrototypeOf(value) === null) {\n        return true;\n    }\n    var proto = value;\n    while (Object.getPrototypeOf(proto) !== null) {\n        proto = Object.getPrototypeOf(proto);\n    }\n    return Object.getPrototypeOf(value) === proto;\n}\nexports.isPlainObject = isPlainObject;\nfunction isNumber(value) {\n    return typeof value === 'number' || (isObjectLike(value) && getTag(value) == '[object Number]');\n}\nexports.isNumber = isNumber;\nfunction isBoolean(value) {\n    return value === true || value === false || (isObjectLike(value) && getTag(value) == '[object Boolean]');\n}\nexports.isBoolean = isBoolean;\nfunction isRegExp(value) {\n    return isObjectLike(value) && getTag(value) == '[object RegExp]';\n}\nexports.isRegExp = isRegExp;\n\n\n//# sourceURL=webpack://_/./lib/lang.js?");

/***/ }),

/***/ "./lib/math.js":
/*!*********************!*\
  !*** ./lib/math.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.sumBy = exports.sum = exports.mod = exports.subtract = exports.round = exports.multiply = exports.minBy = exports.min = exports.meanBy = exports.mean = exports.maxBy = exports.max = exports.floor = exports.divide = exports.ceil = exports.add = void 0;\nvar lang_1 = __webpack_require__(/*! ./lang */ \"./lib/lang.js\");\nvar object_1 = __webpack_require__(/*! ./object */ \"./lib/object.js\");\nfunction mathOp(a, op, precision) {\n    if (precision === void 0) { precision = 0; }\n    if (!precision) {\n        return op(a);\n    }\n    precision = Math.pow(10, precision);\n    return op(a * precision) / precision;\n}\nfunction compareBy(arr, fn, op) {\n    var first = arr[0];\n    if (arr.length <= 1) {\n        return first;\n    }\n    var fnString = (0, lang_1.isString)(fn);\n    return arr.slice(1).reduce(function (current, next) {\n        var currentValue = fnString ? (0, object_1.get)(current, fn) : fn(current);\n        var nextValue = fnString ? (0, object_1.get)(next, fn) : fn(next);\n        var result = op(currentValue, nextValue);\n        return (result === nextValue) ? next : current;\n    }, first);\n}\nfunction valueBy(arr, fn, op) {\n    var first = arr[0];\n    if (arr.length <= 1) {\n        return first;\n    }\n    var fnString = (0, lang_1.isString)(fn);\n    return arr.slice(1).reduce(function (current, next) { return op(current, fnString ? (0, object_1.get)(next, fn) : fn(next)); }, fnString ? (0, object_1.get)(first, fn) : fn(first));\n}\n/**\n * @link https://lodash.com/docs/4.17.15#add\n * @param augend\n * @param addend\n * @returns\n */\nfunction add(augend, addend) {\n    return augend + addend;\n}\nexports.add = add;\n/**\n * @link https://lodash.com/docs/4.17.15#ceil\n * @param num\n * @param precision\n * @returns\n */\nfunction ceil(num, precision) {\n    if (precision === void 0) { precision = 0; }\n    return mathOp(num, Math.ceil, precision);\n}\nexports.ceil = ceil;\n/**\n * https://lodash.com/docs/4.17.15#divide\n * @param dividend\n * @param divisor\n * @returns\n */\nfunction divide(dividend, divisor) {\n    return dividend / divisor;\n}\nexports.divide = divide;\n/**\n * @link https://lodash.com/docs/4.17.15#floor\n * @param num\n * @param precision\n * @returns\n */\nfunction floor(num, precision) {\n    if (precision === void 0) { precision = 0; }\n    return mathOp(num, Math.floor, precision);\n}\nexports.floor = floor;\n/**\n * @link https://lodash.com/docs/4.17.15#max\n * @param arr\n * @returns\n */\nfunction max(arr) {\n    return Math.max.apply(Math, arr);\n}\nexports.max = max;\n/**\n * @link https://lodash.com/docs/4.17.15#maxBy\n */\nfunction maxBy(arr, fn) {\n    return compareBy(arr, fn, Math.max);\n}\nexports.maxBy = maxBy;\n/**\n * @link https://lodash.com/docs/4.17.15#mean\n * @param arr\n * @returns\n */\nfunction mean(arr) {\n    return sum(arr) / arr.length;\n}\nexports.mean = mean;\n/**\n * @link https://lodash.com/docs/4.17.15#meanBy\n * @param arr\n * @param fn\n * @returns\n */\nfunction meanBy(arr, fn) {\n    return sumBy(arr, fn) / arr.length;\n}\nexports.meanBy = meanBy;\n/**\n * @link https://lodash.com/docs/4.17.15#min\n * @param arr\n * @returns\n */\nfunction min(arr) {\n    return Math.min.apply(Math, arr);\n}\nexports.min = min;\n/**\n * @link https://lodash.com/docs/4.17.15#minBy\n * @param arr\n * @param fn\n * @returns\n */\nfunction minBy(arr, fn) {\n    return compareBy(arr, fn, Math.min);\n}\nexports.minBy = minBy;\n/**\n * @link https://lodash.com/docs/4.17.15#multiply\n * @param multiplier\n * @param multiplicand\n * @returns\n */\nfunction multiply(multiplier, multiplicand) {\n    return multiplier * multiplicand;\n}\nexports.multiply = multiply;\n/**\n * @link https://lodash.com/docs/4.17.15#round\n * @param num\n * @param precision\n * @returns\n */\nfunction round(num, precision) {\n    if (precision === void 0) { precision = 0; }\n    return mathOp(num, Math.round, precision);\n}\nexports.round = round;\n/**\n * @link https://lodash.com/docs/4.17.15#subtract\n * @param a\n * @param b\n * @returns\n */\nfunction subtract(minuend, subtrahend) {\n    return minuend - subtrahend;\n}\nexports.subtract = subtract;\n/**\n * Perform a modulus operation between two numbers.\n * @param a\n * @param b\n * @returns\n */\nfunction mod(a, b) {\n    return a % b;\n}\nexports.mod = mod;\n/**\n * @link https://lodash.com/docs/4.17.15#sum\n * @param arr\n * @returns\n */\nfunction sum(arr) {\n    return arr.reduce(add, 0);\n}\nexports.sum = sum;\n/**\n * @link https://lodash.com/docs/4.17.15#sumBy\n * @param arr\n * @param fn\n * @returns\n */\nfunction sumBy(arr, fn) {\n    return valueBy(arr, fn, function (a, b) { return (a + b); });\n}\nexports.sumBy = sumBy;\n\n\n//# sourceURL=webpack://_/./lib/math.js?");

/***/ }),

/***/ "./lib/object.js":
/*!***********************!*\
  !*** ./lib/object.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nvar __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.pick = exports.defaults = exports.cloneDeep = exports.clone = exports.fastCloneDeep = exports.merge = exports.set = exports.has = exports.propertyOf = exports.property = exports.get = exports.pathParts = exports.values = exports.keys = void 0;\nvar lang_1 = __webpack_require__(/*! ./lang */ \"./lib/lang.js\");\nvar array_1 = __webpack_require__(/*! ./array */ \"./lib/array.js\");\n/**\n * Get the keys of an Object.\n * @param obj\n */\nfunction keys(obj) {\n    return Object.keys(obj);\n}\nexports.keys = keys;\n;\n/**\n * Return the values of an object or an array.\n * @param obj\n * @returns\n */\nfunction values(obj) {\n    return (0, lang_1.isArray)(obj) ? obj : Object.values(obj);\n}\nexports.values = values;\n/**\n * Retrieve the path parts provided a path string.\n * @param path\n */\nfunction pathParts(path) {\n    if (!path) {\n        return [];\n    }\n    if (path[0] === '[') {\n        path = path.replace(/^\\[([^\\]]+)\\]/, '$1');\n    }\n    return path.\n        replace(/\\[/g, '.').\n        replace(/\\]/g, '').\n        split('.');\n}\nexports.pathParts = pathParts;\n/**\n * Get the value from an object or an array provided a path.\n *\n * @param obj\n * @param path\n * @param def\n */\nfunction get(obj, path, def) {\n    var val = pathParts(path).reduce(function (o, k) { return (o || {})[k]; }, obj);\n    return (typeof def !== 'undefined' &&\n        typeof val === 'undefined') ? def : val;\n}\nexports.get = get;\nfunction property(path) {\n    return function (obj) { return get(obj, path); };\n}\nexports.property = property;\nfunction propertyOf(obj) {\n    return function (path) { return get(obj, path); };\n}\nexports.propertyOf = propertyOf;\n/**\n * Determine if a value is set.\n *\n * @param obj\n * @param path\n */\nfunction has(obj, path) {\n    return get(obj, path, undefined) !== undefined;\n}\nexports.has = has;\n/**\n * Sets the value of an item within an array or object.\n * @param obj\n * @param path\n * @param value\n */\nfunction set(obj, path, value) {\n    var parts = pathParts(path);\n    parts.reduce(function (o, k, i) {\n        if (!isNaN(Number(k))) {\n            k = Number(k);\n        }\n        if ((Array.isArray(o) ? (k >= o.length) : !o.hasOwnProperty(k)) ||\n            ((i < (parts.length - 1)) && !Array.isArray(o[k]) && !(0, lang_1.isObject)(o[k]))) {\n            o[k] = !isNaN(Number(parts[i + 1])) ? [] : {};\n        }\n        if (i === (parts.length - 1)) {\n            o[k] = value;\n        }\n        return o[k];\n    }, obj);\n    return obj;\n}\nexports.set = set;\n;\nfunction propertyIsOnObject(object, property) {\n    try {\n        return property in object;\n    }\n    catch (_) {\n        return false;\n    }\n}\n// Protects from prototype poisoning and unexpected merging up the prototype chain.\nfunction propertyIsUnsafe(target, key) {\n    return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,\n        && !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,\n            && Object.propertyIsEnumerable.call(target, key)); // and also unsafe if they're nonenumerable.\n}\n/**\n * Merge a single object.\n *\n * @param target\n * @param source\n * @returns\n */\nfunction mergeObject(target, source) {\n    for (var key in source) {\n        if (source.hasOwnProperty(key)) {\n            if (propertyIsUnsafe(target, key)) {\n                return;\n            }\n            if (propertyIsOnObject(target, key)) {\n                target[key] = merge(target[key], source[key]);\n            }\n            else {\n                target[key] = cloneDeep(source[key]);\n            }\n        }\n    }\n    return target;\n}\n/**\n * Merge two arrays.\n * @param target\n * @param source\n */\nfunction mergeArray(target, source) {\n    source.forEach(function (subSource, index) {\n        target[index] = merge(target[index], subSource);\n    });\n    return target;\n}\n/**\n * Merges a complex data object.\n *\n * @param a\n * @param b\n * @param options\n */\nfunction merge() {\n    var args = [];\n    for (var _i = 0; _i < arguments.length; _i++) {\n        args[_i] = arguments[_i];\n    }\n    var first = args.shift();\n    return args.reduce(function (target, source, index) {\n        if (!target || (target === source)) {\n            return cloneDeep(source);\n        }\n        else if ((0, lang_1.isArray)(source)) {\n            // If there is no target array, then make it one.\n            if (!(0, lang_1.isArray)(target)) {\n                args[index] = target = [];\n            }\n            return mergeArray(target, source);\n        }\n        else if ((0, lang_1.isPlainObject)(source)) {\n            return mergeObject(target, source);\n        }\n        else {\n            return cloneDeep(source);\n        }\n    }, first);\n}\nexports.merge = merge;\n/**\n * Performs a fast clone deep operation.\n *\n * @param obj\n */\nfunction fastCloneDeep(obj) {\n    try {\n        return JSON.parse(JSON.stringify(obj));\n    }\n    catch (err) {\n        console.log(\"Clone Failed: \".concat(err.message));\n        return null;\n    }\n}\nexports.fastCloneDeep = fastCloneDeep;\n/**\n * Performs a shallow clone of an object.\n * @param src\n */\nfunction clone(src) {\n    if (Array.isArray(src)) { // for arrays\n        return __spreadArray([], src, true);\n    }\n    else {\n        return __assign({}, src);\n    }\n}\nexports.clone = clone;\n/**\n * Performs a recursive cloneDeep operation.\n * @param src\n * @returns\n */\nfunction cloneDeep(src) {\n    if (Array.isArray(src)) { // for arrays\n        return src.map(cloneDeep);\n    }\n    if (src === null || typeof src !== 'object') { // for primitives / functions / non-references/pointers\n        return src;\n    }\n    return Object.fromEntries(Object.entries(src).map(function (_a) {\n        var key = _a[0], val = _a[1];\n        return ([key, cloneDeep(val)]);\n    }));\n}\nexports.cloneDeep = cloneDeep;\n/**\n * Sets the defaults of an object.\n *\n * @param obj\n * @param defs\n */\nfunction defaults(obj, defs) {\n    (0, array_1.each)(defs, function (value, key) {\n        if (!obj.hasOwnProperty(key)) {\n            obj[key] = value;\n        }\n    });\n    return obj;\n}\nexports.defaults = defaults;\n/**\n * Pick an item in an object.\n * @param object\n * @param keys\n */\nfunction pick(object, keys) {\n    return keys.reduce(function (obj, key) {\n        if (object && object.hasOwnProperty(key)) {\n            obj[key] = object[key];\n        }\n        return obj;\n    }, {});\n}\nexports.pick = pick;\n;\n\n\n//# sourceURL=webpack://_/./lib/object.js?");

/***/ }),

/***/ "./lib/string.js":
/*!***********************!*\
  !*** ./lib/string.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports) {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.endsWith = exports.trim = void 0;\n// From https://youmightnotneed.com/lodash/#trim\nfunction trim(str, c) {\n    if (c === void 0) { c = '\\\\s'; }\n    return str.replace(new RegExp(\"^([\".concat(c, \"]*)(.*?)([\").concat(c, \"]*)$\")), '$2');\n}\nexports.trim = trim;\n// From https://youmightnotneed.com/lodash/#endsWith\nfunction endsWith(str, c) {\n    return str.endsWith(c);\n}\nexports.endsWith = endsWith;\n\n\n//# sourceURL=webpack://_/./lib/string.js?");

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./lib/index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});