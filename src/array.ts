import { isEqual } from './lang';
import { pick } from './object';


// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_chunk
export function chunk(input: any, size: any) {
    return input.reduce((arr: any, item: any, idx: any) => {
        return idx % size === 0
            ? [...arr, [item]]
            : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
    }, []);
};

// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_compact
export function compact(input: any) {
    return input.filter(Boolean);
}

/**
 * @link https://lodash.com/docs/4.17.15#concat
 * @param input
 * @param args
 * @returns
 */
export function concat(input: any, ...args: any) {
    return input.concat(...args);
}

// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_difference
export function difference(...arrays: any) {
    return arrays.reduce((a: any, b: any) => {
        return a.filter((value: any) => {
            return !b.includes(value);
        });
    })
}

// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_drop
export function drop(arr: any, index: any = 1) {
    return (index > 0) ? arr.slice(index) : arr;
}

// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_dropright
export function dropRight(arr: any, index: any = 1) {
    return (index > 0) ? arr.slice(0, -index) : arr;
}

/**
 * Iterate through a collection or array.
 * @param collection
 * @param _each
 */
export function each(collection: any, _each: any) {
    const isArray = Array.isArray(collection);
    for (let i in collection) {
        if (collection.hasOwnProperty(i)) {
            if (_each(collection[i], isArray ? Number(i) : i) === true) {
                break;
            };
        }
    }
}

/**
 * Perform a find operation.
 * @param arr
 * @param query
 */
export function find(arr: any, query?: any, findIndex: boolean = false) {
    if (!arr) {
        return undefined;
    }
    if (Array.isArray(arr) && typeof query === 'function') {
        return findIndex ? arr.findIndex(query) : arr.find(query);
    }
    let found = undefined;
    let foundIndex = 0;
    findEach(arr, query, (item: any, index: number) => {
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
export function findIndex(arr: any, query?: any) {
    return find(arr, query, true);
}

/**
 * Returns a function to perform matches.
 * @param query
 * @returns
 */
export function matches(query: any) {
    let keys: any = [];
    let compare: any = {};
    if (typeof query === 'string') {
        keys = [query];
        compare[query] = true;
    }
    else {
        keys = Object.keys(query);
        compare = query;
    }
    return function (comp: any) {
        return isEqual(pick(comp, keys), compare);
    };
}

/**
 * Perform a find operation on each item in an array.
 * @param arr
 * @param query
 * @param fn
 */
export function findEach(arr: any, query: any, fn: any) {
    each(arr, (item: any, index: any) => {
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
export function filter(arr: any, fn?: any) {
    if (!arr) {
        return [];
    }
    if (!fn) {
        fn = (val: any) => !!val;
    }
    if (Array.isArray(arr) && typeof fn === 'function') {
        return arr.filter(fn);
    }
    let found: any = [];
    findEach(arr, fn, (item: any, index: any) => {
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
export function last(arr: Array<any>) {
    return arr[arr.length - 1];
}

/**
 * https://lodash.com/docs/4.17.15#head
 * @param arr
 * @returns
 */
export function head(arr: Array<any>) {
    return arr[0];
}

/**
 * https://lodash.com/docs/4.17.15#map
 * @param arr
 * @param fn
 * @returns
 */
export function map(arr: any, fn: any) {
    return arr.map(fn);
}

/**
 * Get the intersection of two objects.
 * @param a
 * @param b
 */
export function intersection(a: any, b: any) {
    return a.filter((value: any) => b.includes(value));
}
