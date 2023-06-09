import { isString, } from './lang';
import { get } from './object';
function mathOp(a, op, precision = 0) {
    if (!precision) {
        return op(a);
    }
    precision = Math.pow(10, precision);
    return op(a * precision) / precision;
}
function compareBy(arr, fn, op) {
    const first = arr[0];
    if (arr.length <= 1) {
        return first;
    }
    const fnString = isString(fn);
    return arr.slice(1).reduce((current, next) => {
        const currentValue = fnString ? get(current, fn) : fn(current);
        const nextValue = fnString ? get(next, fn) : fn(next);
        const result = op(currentValue, nextValue);
        return (result === nextValue) ? next : current;
    }, first);
}
function valueBy(arr, fn, op) {
    const first = arr[0];
    if (arr.length <= 1) {
        return first;
    }
    const fnString = isString(fn);
    return arr.slice(1).reduce((current, next) => op(current, fnString ? get(next, fn) : fn(next)), fnString ? get(first, fn) : fn(first));
}
/**
 * @link https://lodash.com/docs/4.17.15#add
 * @param augend
 * @param addend
 * @returns
 */
export function add(augend, addend) {
    return augend + addend;
}
/**
 * @link https://lodash.com/docs/4.17.15#ceil
 * @param num
 * @param precision
 * @returns
 */
export function ceil(num, precision = 0) {
    return mathOp(num, Math.ceil, precision);
}
/**
 * https://lodash.com/docs/4.17.15#divide
 * @param dividend
 * @param divisor
 * @returns
 */
export function divide(dividend, divisor) {
    return dividend / divisor;
}
/**
 * @link https://lodash.com/docs/4.17.15#floor
 * @param num
 * @param precision
 * @returns
 */
export function floor(num, precision = 0) {
    return mathOp(num, Math.floor, precision);
}
/**
 * @link https://lodash.com/docs/4.17.15#max
 * @param arr
 * @returns
 */
export function max(arr) {
    return Math.max(...arr);
}
/**
 * @link https://lodash.com/docs/4.17.15#maxBy
 */
export function maxBy(arr, fn) {
    return compareBy(arr, fn, Math.max);
}
/**
 * @link https://lodash.com/docs/4.17.15#mean
 * @param arr
 * @returns
 */
export function mean(arr) {
    return sum(arr) / arr.length;
}
/**
 * @link https://lodash.com/docs/4.17.15#meanBy
 * @param arr
 * @param fn
 * @returns
 */
export function meanBy(arr, fn) {
    return sumBy(arr, fn) / arr.length;
}
/**
 * @link https://lodash.com/docs/4.17.15#min
 * @param arr
 * @returns
 */
export function min(arr) {
    return Math.min(...arr);
}
/**
 * @link https://lodash.com/docs/4.17.15#minBy
 * @param arr
 * @param fn
 * @returns
 */
export function minBy(arr, fn) {
    return compareBy(arr, fn, Math.min);
}
/**
 * @link https://lodash.com/docs/4.17.15#multiply
 * @param multiplier
 * @param multiplicand
 * @returns
 */
export function multiply(multiplier, multiplicand) {
    return multiplier * multiplicand;
}
/**
 * @link https://lodash.com/docs/4.17.15#round
 * @param num
 * @param precision
 * @returns
 */
export function round(num, precision = 0) {
    return mathOp(num, Math.round, precision);
}
/**
 * @link https://lodash.com/docs/4.17.15#subtract
 * @param a
 * @param b
 * @returns
 */
export function subtract(minuend, subtrahend) {
    return minuend - subtrahend;
}
/**
 * Perform a modulus operation between two numbers.
 * @param a
 * @param b
 * @returns
 */
export function mod(a, b) {
    return a % b;
}
/**
 * @link https://lodash.com/docs/4.17.15#sum
 * @param arr
 * @returns
 */
export function sum(arr) {
    return arr.reduce(add, 0);
}
/**
 * @link https://lodash.com/docs/4.17.15#sumBy
 * @param arr
 * @param fn
 * @returns
 */
export function sumBy(arr, fn) {
    return valueBy(arr, fn, (a, b) => (a + b));
}
