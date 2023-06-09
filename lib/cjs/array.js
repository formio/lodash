"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intersection = exports.map = exports.head = exports.last = exports.filter = exports.findEach = exports.matches = exports.findIndex = exports.find = exports.each = exports.dropRight = exports.drop = exports.difference = exports.concat = exports.compact = exports.chunk = void 0;
const lang_1 = require("./lang");
const object_1 = require("./object");
// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_chunk
function chunk(input, size) {
    return input.reduce((arr, item, idx) => {
        return idx % size === 0
            ? [...arr, [item]]
            : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
    }, []);
}
exports.chunk = chunk;
;
// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_compact
function compact(input) {
    return input.filter(Boolean);
}
exports.compact = compact;
/**
 * @link https://lodash.com/docs/4.17.15#concat
 * @param input
 * @param args
 * @returns
 */
function concat(input, ...args) {
    return input.concat(...args);
}
exports.concat = concat;
// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_difference
function difference(...arrays) {
    return arrays.reduce((a, b) => {
        return a.filter((value) => {
            return !b.includes(value);
        });
    });
}
exports.difference = difference;
// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_drop
function drop(arr, index = 1) {
    return (index > 0) ? arr.slice(index) : arr;
}
exports.drop = drop;
// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_dropright
function dropRight(arr, index = 1) {
    return (index > 0) ? arr.slice(0, -index) : arr;
}
exports.dropRight = dropRight;
/**
 * Iterate through a collection or array.
 * @param collection
 * @param _each
 */
function each(collection, _each) {
    const isArray = Array.isArray(collection);
    for (let i in collection) {
        if (collection.hasOwnProperty(i)) {
            if (_each(collection[i], isArray ? Number(i) : i) === true) {
                break;
            }
            ;
        }
    }
}
exports.each = each;
/**
 * Perform a find operation.
 * @param arr
 * @param query
 */
function find(arr, query, findIndex = false) {
    if (!arr) {
        return undefined;
    }
    if (Array.isArray(arr) && typeof query === 'function') {
        return findIndex ? arr.findIndex(query) : arr.find(query);
    }
    let found = undefined;
    let foundIndex = 0;
    findEach(arr, query, (item, index) => {
        found = item;
        foundIndex = index;
        return true;
    });
    return findIndex ? foundIndex : found;
}
exports.find = find;
/**
 * Find an index.
 *
 * @param arr
 * @param query
 * @returns
 */
function findIndex(arr, query) {
    return find(arr, query, true);
}
exports.findIndex = findIndex;
/**
 * Returns a function to perform matches.
 * @param query
 * @returns
 */
function matches(query) {
    let keys = [];
    let compare = {};
    if (typeof query === 'string') {
        keys = [query];
        compare[query] = true;
    }
    else {
        keys = Object.keys(query);
        compare = query;
    }
    return function (comp) {
        return (0, lang_1.isEqual)((0, object_1.pick)(comp, keys), compare);
    };
}
exports.matches = matches;
/**
 * Perform a find operation on each item in an array.
 * @param arr
 * @param query
 * @param fn
 */
function findEach(arr, query, fn) {
    each(arr, (item, index) => {
        if (matches(query)(item)) {
            if (fn(item, index) === true) {
                return true;
            }
        }
    });
}
exports.findEach = findEach;
/**
 * Perform a filter operation.
 * @param arr
 * @param fn
 */
function filter(arr, fn) {
    if (!arr) {
        return [];
    }
    if (!fn) {
        fn = (val) => !!val;
    }
    if (Array.isArray(arr) && typeof fn === 'function') {
        return arr.filter(fn);
    }
    let found = [];
    findEach(arr, fn, (item, index) => {
        found.push(item);
        if (Array.isArray(item)) {
            arr.splice(index, 1);
        }
        else {
            delete arr[index];
        }
    });
    return found;
}
exports.filter = filter;
/**
 * Get the last item in an array.
 * @param arr
 */
function last(arr) {
    return arr[arr.length - 1];
}
exports.last = last;
/**
 * https://lodash.com/docs/4.17.15#head
 * @param arr
 * @returns
 */
function head(arr) {
    return arr[0];
}
exports.head = head;
/**
 * https://lodash.com/docs/4.17.15#map
 * @param arr
 * @param fn
 * @returns
 */
function map(arr, fn) {
    return arr.map(fn);
}
exports.map = map;
/**
 * Get the intersection of two objects.
 * @param a
 * @param b
 */
function intersection(a, b) {
    return a.filter((value) => b.includes(value));
}
exports.intersection = intersection;
