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