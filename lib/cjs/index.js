"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.chain = void 0;
const ArrayFunctions = __importStar(require("./array"));
class Chainable {
    constructor(val) {
        this.chain = [];
        this.currentValue = [];
        this.currentValue = val;
    }
    value() {
        return this.chain.reduce((current, func) => {
            return ArrayFunctions[func.method](current, ...func.args);
        }, this.currentValue);
    }
}
for (let method in ArrayFunctions) {
    if (ArrayFunctions.hasOwnProperty(method)) {
        Chainable.prototype[method] = function (...args) {
            this.chain.push({ method, args });
            return this;
        };
    }
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
