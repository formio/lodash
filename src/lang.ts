import { each } from './array';

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
 function getTag(value: any) {
    if (value == null) {
        return value === undefined ? '[object Undefined]' : '[object Null]'
    }
    return Object.prototype.toString.call(value)
}

/**
 * A no-operation function.
 */
 export function noop() {
    return;
};

/**
 * Determines equality of a value or complex object.
 * @param a
 * @param b
 */
export function isEqual(a: any, b: any): boolean {
    let equal = false;
    if (a === b) {
        return true;
    }
    if (a && b && (Array.isArray(a) || isObject(a))) {
        equal = true;
        each(a, (val: any, key: any) => {
            if ((Array.isArray(val) || isObject(val)) && !isEqual(b[key], val)) {
                equal = false;
                return true;
            }
            if (b[key] !== val) {
                equal = false;
                return true;
            }
        });
    }
    return equal;
}

export function isString(val: any): val is string {
    return typeof val === 'string';
}

// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_isempty
export function isEmpty(val: object): boolean {
    return ([Object, Array] as any).includes((val || {}).constructor) && !(Object as any).entries((val || {})).length;
}

export function isInteger(val: any): boolean {
    return Number.isInteger(val);
}

export function isNaN(val: any): boolean {
    return Number.isNaN(val);
}

export function isNil(val: any): val is null | undefined {
    return val == null;
}

export function isNull(val: any): val is null {
    return val === null;
}

export function isArray<T>(val: any): val is T[];
export function isArray(val: any): val is any[] {
    return Array.isArray(val);
}

export function isObjectLike(val: any): boolean {
    return typeof val === 'object' && (val !== null);
}

export function isObject(val: any): val is object {
    const type = typeof val;
    return val != null && (type === 'object' || type === 'function')
}

export function isPlainObject(value: any): boolean {
    if (!isObjectLike(value) || getTag(value) != '[object Object]') {
        return false
    }
    if (Object.getPrototypeOf(value) === null) {
        return true
    }
    let proto = value
    while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto)
    }
    return Object.getPrototypeOf(value) === proto
}

export function isNumber(val: any): val is number {
    return typeof val === 'number' || (isObjectLike(val) && getTag(val) == '[object Number]')
}

export function isBoolean(val: any): val is boolean {
    return val === true || val === false || (isObjectLike(val) && getTag(val) == '[object Boolean]')
}

export function isRegExp(val: any): val is RegExp {
    return isObjectLike(val) && getTag(val) == '[object RegExp]'
}