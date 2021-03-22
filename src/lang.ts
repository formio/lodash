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
export function isEqual(a: any, b: any) {
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

export function isString(val: any) {
    return typeof val === 'string';
}

// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_isempty
export function isEmpty(obj: any) {
    return [Object, Array].includes((obj || {}).constructor) && !(Object as any).entries((obj || {})).length;
}

export function isInteger(val: any) {
    return Number.isInteger(val);
}

export function isNaN(val: any) {
    return Number.isNaN(val);
}

export function isNil(val: any) {
    return val == null;
}

export function isNull(val: any) {
    return val === null;
}

export function isArray(val: any) {
    return Array.isArray(val);
}

export function isObjectLike(val: any) {
    return typeof val === 'object' && (val !== null);
}

export function isObject(val: any) {
    const type = typeof val;
    return val != null && (type === 'object' || type === 'function')
}

export function isPlainObject(value: any) {
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

export function isNumber(value: any) {
    return typeof value === 'number' || (isObjectLike(value) && getTag(value) == '[object Number]')
}

export function isBoolean(value: any) {
    return value === true || value === false || (isObjectLike(value) && getTag(value) == '[object Boolean]')
}

export function isRegExp(value: any) {
    return isObjectLike(value) && getTag(value) == '[object RegExp]'
}