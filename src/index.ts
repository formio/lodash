import * as ArrayFunctions from './array';
class Chainable {
    private chain: Array<any> = [];
    private currentValue: Array<any> = [];
    constructor(val: any) {
        this.currentValue = val;
    }
    public value(): Array<any> {
        return this.chain.reduce((current: any, func: any) => {
            return (ArrayFunctions as any)[func.method](current, ...func.args);
        }, this.currentValue);
    }
}
for (let method in ArrayFunctions) {
    if (ArrayFunctions.hasOwnProperty(method)) {
        (Chainable.prototype as any)[method] = function(...args: any): any {
            this.chain.push({ method, args });
            return this;
        }
    }
}

/**
 * Create a chainable array of methods.
 * @param val
 * @returns
 */
function chain(val: any): any {
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
