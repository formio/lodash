import { isArray, isObject, isPlainObject } from './lang';
import { each } from './array';
/**
 * Get the keys of an Object.
 * @param obj
 */
export function keys(obj) {
    return Object.keys(obj);
}
;
/**
 * Return the values of an object or an array.
 * @param obj
 * @returns
 */
export function values(obj) {
    return isArray(obj) ? obj : Object.values(obj);
}
/**
 * Retrieve the path parts provided a path string.
 * @param path
 */
export function pathParts(path) {
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
export function get(obj, path, def) {
    const val = pathParts(path).reduce((o, k) => (o || {})[k], obj);
    return (typeof def !== 'undefined' &&
        typeof val === 'undefined') ? def : val;
}
export function property(path) {
    return (obj) => get(obj, path);
}
export function propertyOf(obj) {
    return (path) => get(obj, path);
}
/**
 * Determine if a value is set.
 *
 * @param obj
 * @param path
 */
export function has(obj, path) {
    return get(obj, path, undefined) !== undefined;
}
/**
 * Sets the value of an item within an array or object.
 * @param obj
 * @param path
 * @param value
 */
export function set(obj, path, value) {
    const parts = pathParts(path);
    parts.reduce((o, k, i) => {
        if (!isNaN(Number(k))) {
            k = Number(k);
        }
        if ((Array.isArray(o) ? (k >= o.length) : !o.hasOwnProperty(k)) ||
            ((i < (parts.length - 1)) && !Array.isArray(o[k]) && !isObject(o[k]))) {
            o[k] = !isNaN(Number(parts[i + 1])) ? [] : {};
        }
        if (i === (parts.length - 1)) {
            o[k] = value;
        }
        return o[k];
    }, obj);
    return obj;
}
;
function propertyIsOnObject(object, property) {
    try {
        return property in object;
    }
    catch (_) {
        return false;
    }
}
// Protects from prototype poisoning and unexpected merging up the prototype chain.
function propertyIsUnsafe(target, key) {
    return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
        && !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
            && Object.propertyIsEnumerable.call(target, key)); // and also unsafe if they're nonenumerable.
}
/**
 * Merge a single object.
 *
 * @param target
 * @param source
 * @returns
 */
function mergeObject(target, source) {
    for (let key in source) {
        if (source.hasOwnProperty(key)) {
            if (propertyIsUnsafe(target, key)) {
                return;
            }
            if (propertyIsOnObject(target, key)) {
                target[key] = merge(target[key], source[key]);
            }
            else {
                target[key] = cloneDeep(source[key]);
            }
        }
    }
    return target;
}
/**
 * Merge two arrays.
 * @param target
 * @param source
 */
function mergeArray(target, source) {
    source.forEach((subSource, index) => {
        target[index] = merge(target[index], subSource);
    });
    return target;
}
/**
 * Merges a complex data object.
 *
 * @param a
 * @param b
 * @param options
 */
export function merge(...args) {
    const first = args.shift();
    return args.reduce((target, source, index) => {
        if (!target || (target === source)) {
            return cloneDeep(source);
        }
        else if (isArray(source)) {
            // If there is no target array, then make it one.
            if (!isArray(target)) {
                args[index] = target = [];
            }
            return mergeArray(target, source);
        }
        else if (isPlainObject(source)) {
            return mergeObject(target, source);
        }
        else {
            return cloneDeep(source);
        }
    }, first);
}
/**
 * Performs a fast clone deep operation.
 *
 * @param obj
 */
export function fastCloneDeep(obj) {
    try {
        return JSON.parse(JSON.stringify(obj));
    }
    catch (err) {
        console.log(`Clone Failed: ${err.message}`);
        return null;
    }
}
/**
 * Performs a shallow clone of an object.
 * @param src
 */
export function clone(src) {
    if (Array.isArray(src)) { // for arrays
        return [...src];
    }
    else {
        return { ...src };
    }
}
/**
 * Performs a recursive cloneDeep operation.
 * @param src
 * @returns
 */
export function cloneDeep(src) {
    if (Array.isArray(src)) { // for arrays
        return src.map(cloneDeep);
    }
    if (src === null || typeof src !== 'object') { // for primitives / functions / non-references/pointers
        return src;
    }
    return Object.fromEntries(Object.entries(src).map(([key, val]) => ([key, cloneDeep(val)])));
}
/**
 * Sets the defaults of an object.
 *
 * @param obj
 * @param defs
 */
export function defaults(obj, defs) {
    each(defs, (value, key) => {
        if (!obj.hasOwnProperty(key)) {
            obj[key] = value;
        }
    });
    return obj;
}
/**
 * Pick an item in an object.
 * @param object
 * @param keys
 */
export function pick(object, keys) {
    return keys.reduce((obj, key) => {
        if (object && object.hasOwnProperty(key)) {
            obj[key] = object[key];
        }
        return obj;
    }, {});
}
;
