import { isArray, isObject } from './lang';
import { each } from './array';

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

function propertyIsOnObject(object: any, property: string) {
	try {
		return property in object
	} catch(_) {
		return false
	}
}

// Protects from prototype poisoning and unexpected merging up the prototype chain.
function propertyIsUnsafe(target: any, key: string) {
	return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
		&& !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
        && Object.propertyIsEnumerable.call(target, key)) // and also unsafe if they're nonenumerable.
}

/**
 * Merge a single object.
 *
 * @param target
 * @param source
 * @returns
 */
function mergeObject(target: any, source: any) {
    for (let key in source) {
        if (source.hasOwnProperty(key)) {
            if (propertyIsUnsafe(target, key)) {
                return
            }

            if (propertyIsOnObject(target, key)) {
                target[key] = merge(target[key], source[key]);
            } else {
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
function mergeArray(target: Array<any>, source: Array<any>) {
    source.forEach((subSource: any, index: number) => {
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
 export function merge(...args: any) {
    const first = args.shift();
    return args.reduce((target: any, source: any, index: number) => {
        if (target === source) {
            return cloneDeep(source);
        }
        else if (isArray(source)) {
            // If there is no target array, then make it one.
            if (!isArray(target)) {
                args[index] = target = [];
            }
            return mergeArray(target, source);
        }
        else {
            return mergeObject(target, source);
        }
    }, first);
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