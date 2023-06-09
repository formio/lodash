"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pick = exports.defaults = exports.cloneDeep = exports.clone = exports.fastCloneDeep = exports.merge = exports.set = exports.has = exports.propertyOf = exports.property = exports.get = exports.pathParts = exports.values = exports.keys = void 0;
const lang_1 = require("./lang");
const array_1 = require("./array");
/**
 * Get the keys of an Object.
 * @param obj
 */
function keys(obj) {
    return Object.keys(obj);
}
exports.keys = keys;
;
/**
 * Return the values of an object or an array.
 * @param obj
 * @returns
 */
function values(obj) {
    return (0, lang_1.isArray)(obj) ? obj : Object.values(obj);
}
exports.values = values;
/**
 * Retrieve the path parts provided a path string.
 * @param path
 */
function pathParts(path) {
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
exports.pathParts = pathParts;
/**
 * Get the value from an object or an array provided a path.
 *
 * @param obj
 * @param path
 * @param def
 */
function get(obj, path, def) {
    const val = pathParts(path).reduce((o, k) => (o || {})[k], obj);
    return (typeof def !== 'undefined' &&
        typeof val === 'undefined') ? def : val;
}
exports.get = get;
function property(path) {
    return (obj) => get(obj, path);
}
exports.property = property;
function propertyOf(obj) {
    return (path) => get(obj, path);
}
exports.propertyOf = propertyOf;
/**
 * Determine if a value is set.
 *
 * @param obj
 * @param path
 */
function has(obj, path) {
    return get(obj, path, undefined) !== undefined;
}
exports.has = has;
/**
 * Sets the value of an item within an array or object.
 * @param obj
 * @param path
 * @param value
 */
function set(obj, path, value) {
    const parts = pathParts(path);
    parts.reduce((o, k, i) => {
        if (!isNaN(Number(k))) {
            k = Number(k);
        }
        if ((Array.isArray(o) ? (k >= o.length) : !o.hasOwnProperty(k)) ||
            ((i < (parts.length - 1)) && !Array.isArray(o[k]) && !(0, lang_1.isObject)(o[k]))) {
            o[k] = !isNaN(Number(parts[i + 1])) ? [] : {};
        }
        if (i === (parts.length - 1)) {
            o[k] = value;
        }
        return o[k];
    }, obj);
    return obj;
}
exports.set = set;
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
function merge(...args) {
    const first = args.shift();
    return args.reduce((target, source, index) => {
        if (!target || (target === source)) {
            return cloneDeep(source);
        }
        else if ((0, lang_1.isArray)(source)) {
            // If there is no target array, then make it one.
            if (!(0, lang_1.isArray)(target)) {
                args[index] = target = [];
            }
            return mergeArray(target, source);
        }
        else if ((0, lang_1.isPlainObject)(source)) {
            return mergeObject(target, source);
        }
        else {
            return cloneDeep(source);
        }
    }, first);
}
exports.merge = merge;
/**
 * Performs a fast clone deep operation.
 *
 * @param obj
 */
function fastCloneDeep(obj) {
    try {
        return JSON.parse(JSON.stringify(obj));
    }
    catch (err) {
        console.log(`Clone Failed: ${err.message}`);
        return null;
    }
}
exports.fastCloneDeep = fastCloneDeep;
/**
 * Performs a shallow clone of an object.
 * @param src
 */
function clone(src) {
    if (Array.isArray(src)) { // for arrays
        return [...src];
    }
    else {
        return Object.assign({}, src);
    }
}
exports.clone = clone;
/**
 * Performs a recursive cloneDeep operation.
 * @param src
 * @returns
 */
function cloneDeep(src) {
    if (Array.isArray(src)) { // for arrays
        return src.map(cloneDeep);
    }
    if (src === null || typeof src !== 'object') { // for primitives / functions / non-references/pointers
        return src;
    }
    return Object.fromEntries(Object.entries(src).map(([key, val]) => ([key, cloneDeep(val)])));
}
exports.cloneDeep = cloneDeep;
/**
 * Sets the defaults of an object.
 *
 * @param obj
 * @param defs
 */
function defaults(obj, defs) {
    (0, array_1.each)(defs, (value, key) => {
        if (!obj.hasOwnProperty(key)) {
            obj[key] = value;
        }
    });
    return obj;
}
exports.defaults = defaults;
/**
 * Pick an item in an object.
 * @param object
 * @param keys
 */
function pick(object, keys) {
    return keys.reduce((obj, key) => {
        if (object && object.hasOwnProperty(key)) {
            obj[key] = object[key];
        }
        return obj;
    }, {});
}
exports.pick = pick;
;
