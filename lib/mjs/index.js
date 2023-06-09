import * as ArrayFunctions from './array';
class Chainable {
    chain = [];
    currentValue = [];
    constructor(val) {
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
export default chain;
export { chain };
export * from './array';
export * from './function';
export * from './lang';
export * from './math';
export * from './object';
export * from './string';
