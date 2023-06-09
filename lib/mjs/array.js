import { isEqual } from './lang';
import { pick } from './object';
// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_chunk
export function chunk(input, size) {
    return input.reduce((arr, item, idx) => {
        return idx % size === 0
            ? [...arr, [item]]
            : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
    }, []);
}
;
// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_compact
export function compact(input) {
    return input.filter(Boolean);
}
/**
 * @link https://lodash.com/docs/4.17.15#concat
 * @param input
 * @param args
 * @returns
 */
export function concat(input, ...args) {
    return input.concat(...args);
}
// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_difference
export function difference(...arrays) {
    return arrays.reduce((a, b) => {
        return a.filter((value) => {
            return !b.includes(value);
        });
    });
}
// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_drop
export function drop(arr, index = 1) {
    return (index > 0) ? arr.slice(index) : arr;
}
// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_dropright
export function dropRight(arr, index = 1) {
    return (index > 0) ? arr.slice(0, -index) : arr;
}
/**
 * Iterate through a collection or array.
 * @param collection
 * @param _each
 */
export function each(collection, _each) {
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
/**
 * Perform a find operation.
 * @param arr
 * @param query
 */
export function find(arr, query, findIndex = false) {
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
/**
 * Find an index.
 *
 * @param arr
 * @param query
 * @returns
 */
export function findIndex(arr, query) {
    return find(arr, query, true);
}
/**
 * Returns a function to perform matches.
 * @param query
 * @returns
 */
export function matches(query) {
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
        return isEqual(pick(comp, keys), compare);
    };
}
/**
 * Perform a find operation on each item in an array.
 * @param arr
 * @param query
 * @param fn
 */
export function findEach(arr, query, fn) {
    each(arr, (item, index) => {
        if (matches(query)(item)) {
            if (fn(item, index) === true) {
                return true;
            }
        }
    });
}
/**
 * Perform a filter operation.
 * @param arr
 * @param fn
 */
export function filter(arr, fn) {
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
/**
 * Get the last item in an array.
 * @param arr
 */
export function last(arr) {
    return arr[arr.length - 1];
}
/**
 * https://lodash.com/docs/4.17.15#head
 * @param arr
 * @returns
 */
export function head(arr) {
    return arr[0];
}
/**
 * https://lodash.com/docs/4.17.15#map
 * @param arr
 * @param fn
 * @returns
 */
export function map(arr, fn) {
    return arr.map(fn);
}
/**
 * Get the intersection of two objects.
 * @param a
 * @param b
 */
export function intersection(a, b) {
    return a.filter((value) => b.includes(value));
}
