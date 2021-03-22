"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chain = void 0;
var ArrayFunctions = __importStar(require("./array"));
var Chainable = /** @class */ (function () {
    function Chainable(val) {
        this.chain = [];
        this.currentValue = [];
        this.currentValue = val;
    }
    Chainable.prototype.value = function () {
        return this.chain.reduce(function (current, func) {
            var _a;
            return (_a = ArrayFunctions)[func.method].apply(_a, __spreadArray([current], func.args));
        }, this.currentValue);
    };
    return Chainable;
}());
var _loop_1 = function (method) {
    if (ArrayFunctions.hasOwnProperty(method)) {
        Chainable.prototype[method] = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.chain.push({ method: method, args: args });
            return this;
        };
    }
};
for (var method in ArrayFunctions) {
    _loop_1(method);
}
/**
 * Create a chainable array of methods.
 * @param val
 * @returns
 */
function chain(val) {
    return new Chainable(val);
}
exports.chain = chain;
exports.default = chain;
__exportStar(require("./array"), exports);
__exportStar(require("./function"), exports);
__exportStar(require("./lang"), exports);
__exportStar(require("./math"), exports);
__exportStar(require("./object"), exports);
__exportStar(require("./string"), exports);
