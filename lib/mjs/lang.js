import { each } from './array';
/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function getTag(value) {
    if (value == null) {
        return value === undefined ? '[object Undefined]' : '[object Null]';
    }
    return Object.prototype.toString.call(value);
}
/**
 * A no-operation function.
 */
export function noop() {
    return;
}
;
/**
 * Determines equality of a value or complex object.
 * @param a
 * @param b
 */
export function isEqual(a, b) {
    let equal = false;
    if (a === b) {
        return true;
    }
    if (a && b && (Array.isArray(a) || isObject(a)) && Object.keys(a).length === Object.keys(b).length) {
        equal = true;
        each(a, (val, key) => {
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
export function isString(val) {
    return typeof val === 'string';
}
// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_isempty
export function isEmpty(val) {
    return [Object, Array].includes((val || {}).constructor) && !Object.entries((val || {})).length;
}
export function isInteger(val) {
    return Number.isInteger(val);
}
export function isNaN(val) {
    return Number.isNaN(val);
}
export function isNil(val) {
    return val == null;
}
export function isNull(val) {
    return val === null;
}
export function isArray(val) {
    return Array.isArray(val);
}
export function isObjectLike(val) {
    return typeof val === 'object' && (val !== null);
}
export function isObject(val) {
    const type = typeof val;
    return val != null && (type === 'object' || type === 'function');
}
export function isPlainObject(value) {
    if (!isObjectLike(value) || getTag(value) != '[object Object]') {
        return false;
    }
    if (Object.getPrototypeOf(value) === null) {
        return true;
    }
    let proto = value;
    while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(value) === proto;
}
export function isNumber(val) {
    return typeof val === 'number' || (isObjectLike(val) && getTag(val) == '[object Number]');
}
export function isBoolean(val) {
    return val === true || val === false || (isObjectLike(val) && getTag(val) == '[object Boolean]');
}
export function isRegExp(val) {
    return isObjectLike(val) && getTag(val) == '[object RegExp]';
}
