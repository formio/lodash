import deepmerge from 'deepmerge';

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
    return (typeof val === "object" || typeof val === 'function') && (val !== null);
}

export function isObject(val: any) {
    return isObjectLike(val) || (typeof val === 'function');
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

/**
 * Get the keys of an Object.
 * @param obj
 */
export function keys(obj: any) {
    return Object.keys(obj);
};


/**
 * Return the values of an object or an array.
 * @param obj
 * @returns
 */
export function values(obj: any) {
    return isArray(obj) ? obj : Object.values(obj);
}

/**
 * A no-operation function.
 */
export function noop() {
    return;
};

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
 * Retrieve the path parts provided a path string.
 * @param path
 */
export function pathParts(path: string) {
    if (!path) {
        return [];
    }
    if (path[0] === '[') {
        path = path.replace(/^\[([^\]]+)\]/, '$1');
    }
    return path.
        replace(/\[/g, '.').
        replace(/\]/g, '').
        split('.');
}

/**
 * Get the value from an object or an array provided a path.
 *
 * @param obj
 * @param path
 * @param def
 */
export function get(obj: any, path: string, def?: any) {
    const val = pathParts(path).reduce((o: any, k: any) => (o || {})[k], obj);
    return (
        typeof def !== 'undefined' &&
        typeof val === 'undefined'
    ) ? def : val;
}

export function property(path: string) {
    return (obj: any) => get(obj, path);
}

export function propertyOf(obj: any) {
    return (path: string) => get(obj, path);
}

/**
 * Determine if a value is set.
 *
 * @param obj
 * @param path
 */
export function has(obj: any, path: string): boolean {
    return get(obj, path, undefined) !== undefined;
}

/**
 * Sets the value of an item within an array or object.
 * @param obj
 * @param path
 * @param value
 */
export function set(obj: any, path: string, value: any) {
    const parts = pathParts(path);
    parts.reduce((o: any, k: any, i: any) => {
        if (!isNaN(Number(k))) {
            k = Number(k);
        }
        if (
            (Array.isArray(o) ? (k >= o.length) : !o.hasOwnProperty(k)) ||
            ((i < (parts.length - 1)) && !Array.isArray(o[k]) && !isObject(o[k]))
        ) {
            o[k] = !isNaN(Number(parts[i + 1])) ? [] : {};
        }
        if (i === (parts.length - 1)) {
            o[k] = value;
        }
        return o[k];
    }, obj);
    return obj;
};

/**
 * Merges a complex data object.
 *
 * @param a
 * @param b
 * @param options
 */
export function merge(...args: any) {
    return deepmerge.all(args.map((obj: any) => (obj || {})));
}

/**
 * Performs a fast clone deep operation.
 *
 * @param obj
 */
export function fastCloneDeep(obj: any) {
    try {
        return JSON.parse(JSON.stringify(obj));
    }
    catch (err) {
        console.log(`Clone Failed: ${err.message}`);
        return null;
    }
}

/**
 * Performs a recursive cloneDeep operation.
 * @param src
 * @returns
 */
export function cloneDeep(src: any): any {
    if (Array.isArray(src)) { // for arrays
        return src.map(cloneDeep)
    }
    if (src === null || typeof src !== 'object') { // for primitives / functions / non-references/pointers
        return src
    }
    return (Object as any).fromEntries(
        Object.entries(src).map(
            ([key, val]) => ([key, cloneDeep(val)])
        )
    )
}

/**
 * Sets the defaults of an object.
 *
 * @param obj
 * @param defs
 */
export function defaults(obj: any, defs: any) {
    each(defs, (value: any, key: string) => {
        if (!obj.hasOwnProperty(key)) {
            obj[key] = value;
        }
    });
    return obj;
}

/**
 * Returns a function to perform matches.
 * @param query
 * @returns
 */
export function matches(query: any) {
    return function (comp: any) {
        return isEqual(pick(comp, Object.keys(query)), query);
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

/**
 * Pick an item in an object.
 * @param object
 * @param keys
 */
export function pick(object: any, keys?: any) {
    return keys.reduce((obj: any, key: string) => {
        if (object && object.hasOwnProperty(key)) {
            obj[key] = object[key];
        }
        return obj;
    }, {});
};

/**
 * Get the intersection of two objects.
 * @param a
 * @param b
 */
export function intersection(a: any, b: any) {
    return a.filter((value: any) => b.includes(value));
}

// From https://youmightnotneed.com/lodash/#trim
export function trim(str: string, c: string = '\\s') {
    return str.replace(new RegExp(`^([${c}]*)(.*?)([${c}]*)$`), '$2')
}

/**
 * Get the last item in an array.
 * @param arr
 */
export function last(arr: Array<any>) {
    return arr[arr.length - 1];
}

/**
 * Debounc the call of a function for a given amount of time.
 *
 * @param func
 * @param wait
 * @returns
 */
export function debounce(func: any, wait: number = 100) {
    var timeout: any;
    return (...args: any) => {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            timeout = null;
            func(...args);
        }, wait);
    };
}

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
export function drop(arr: any, index: any) {
    return arr.slice(index);
}

// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_dropright
export function dropRight(arr: any, index: any) {
    return arr.slice(0, -index);
}

export function add(a: number, b: number) {
    return a + b;
}

export function subtract(a: number, b: number) {
    return a - b;
}

export function multiply(a: number, b: number) {
    return a * b;
}

export function divide(a: number, b: number) {
    return a / b;
}

export function mod(a: number, b: number) {
    return a % b;
}

export function sum(arr: any) {
    return arr.reduce(add, 0);
}

function mathOp(a: number, op: any, precision: number = 0) {
    if (!precision) {
        return op(a);
    }
    precision = Math.pow(10, precision);
    return op(a * precision) / precision;
}

export function ceil(a: number, precision: number = 0) {
    return mathOp(a, Math.ceil, precision);
}

export function floor(a: number, precision: number = 0) {
    return mathOp(a, Math.floor, precision);
}

export function round(a: number, precision: number = 0) {
    return mathOp(a, Math.round, precision);
}

export function max(arr: any) {
    return Math.max(...arr);
}

function getBy(arr: any, fn: any, op: any) {
    const first = arr.shift();
    const fnString = isString(fn);
    return arr.reduce((current: any, item: any) => op(current, fnString ? get(item, fn) : fn(item)), first);
}

export function maxBy(arr: any, fn: any) {
    return getBy(arr, fn, Math.max);
}

export function min(arr: any) {
    return Math.min(...arr);
}

export function minBy(arr: any, fn: any) {
    return getBy(arr, fn, Math.min);
}

export function sumBy(arr: any, fn: any) {
    return getBy(arr, fn, (a: number, b: number) => (a + b));
}

export function mean(arr: any) {
    return sum(arr) / arr.length;
}

export function meanBy(arr: any, fn: any) {
    return sumBy(arr, fn) / arr.length;
}