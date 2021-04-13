import { isString, } from './lang';
import { get } from './object';

function mathOp(a: number, op: any, precision: number = 0) {
    if (!precision) {
        return op(a);
    }
    precision = Math.pow(10, precision);
    return op(a * precision) / precision;
}

function compareBy(arr: any, fn: any, op: any) {
    const first = arr[0];
    if (arr.length <= 1) {
        return first;
    }
    const fnString = isString(fn);
    return arr.slice(1).reduce((current: any, next: any) => {
        const currentValue = fnString ? get(current, fn) : fn(current);
        const nextValue = fnString ? get(next, fn) : fn(next);
        const result = op(currentValue, nextValue);
        return (result === nextValue) ? next : current;
    }, first);
}

function valueBy(arr: any, fn: any, op: any) {
    const first = arr[0];
    if (arr.length <= 1) {
        return first;
    }
    const fnString = isString(fn);
    return arr.slice(1).reduce((current: any, next: any) => op(current, fnString ? get(next, fn) : fn(next)), fnString ? get(first, fn) : fn(first));
}

/**
 * @link https://lodash.com/docs/4.17.15#add
 * @param augend
 * @param addend
 * @returns
 */
export function add(augend: number, addend: number) {
    return augend + addend;
}

/**
 * @link https://lodash.com/docs/4.17.15#ceil
 * @param num
 * @param precision
 * @returns
 */
export function ceil(num: number, precision: number = 0) {
    return mathOp(num, Math.ceil, precision);
}

/**
 * https://lodash.com/docs/4.17.15#divide
 * @param dividend
 * @param divisor
 * @returns
 */
export function divide(dividend: number, divisor: number) {
    return dividend / divisor;
}

/**
 * @link https://lodash.com/docs/4.17.15#floor
 * @param num
 * @param precision
 * @returns
 */
export function floor(num: number, precision: number = 0) {
    return mathOp(num, Math.floor, precision);
}

/**
 * @link https://lodash.com/docs/4.17.15#max
 * @param arr
 * @returns
 */
export function max(arr: any) {
    return Math.max(...arr);
}

/**
 * @link https://lodash.com/docs/4.17.15#maxBy
 */
export function maxBy(arr: any, fn: any) {
    return compareBy(arr, fn, Math.max);
}

/**
 * @link https://lodash.com/docs/4.17.15#mean
 * @param arr
 * @returns
 */
export function mean(arr: any) {
    return sum(arr) / arr.length;
}

/**
 * @link https://lodash.com/docs/4.17.15#meanBy
 * @param arr
 * @param fn
 * @returns
 */
export function meanBy(arr: any, fn: any) {
    return sumBy(arr, fn) / arr.length;
}

/**
 * @link https://lodash.com/docs/4.17.15#min
 * @param arr
 * @returns
 */
export function min(arr: any) {
    return Math.min(...arr);
}

/**
 * @link https://lodash.com/docs/4.17.15#minBy
 * @param arr
 * @param fn
 * @returns
 */
export function minBy(arr: any, fn: any) {
    return compareBy(arr, fn, Math.min);
}

/**
 * @link https://lodash.com/docs/4.17.15#multiply
 * @param multiplier
 * @param multiplicand
 * @returns
 */
export function multiply(multiplier: number, multiplicand: number) {
    return multiplier * multiplicand;
}

/**
 * @link https://lodash.com/docs/4.17.15#round
 * @param num
 * @param precision
 * @returns
 */
export function round(num: number, precision: number = 0) {
    return mathOp(num, Math.round, precision);
}

/**
 * @link https://lodash.com/docs/4.17.15#subtract
 * @param a
 * @param b
 * @returns
 */
export function subtract(minuend: number, subtrahend: number) {
    return minuend - subtrahend;
}

/**
 * Perform a modulus operation between two numbers.
 * @param a
 * @param b
 * @returns
 */
export function mod(a: number, b: number) {
    return a % b;
}

/**
 * @link https://lodash.com/docs/4.17.15#sum
 * @param arr
 * @returns
 */
export function sum(arr: any) {
    return arr.reduce(add, 0);
}

/**
 * @link https://lodash.com/docs/4.17.15#sumBy
 * @param arr
 * @param fn
 * @returns
 */
export function sumBy(arr: any, fn: any) {
    return valueBy(arr, fn, (a: number, b: number) => (a + b));
}