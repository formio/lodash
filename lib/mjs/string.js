// From https://youmightnotneed.com/lodash/#trim
export function trim(str, c = '\\s') {
    return str.replace(new RegExp(`^([${c}]*)(.*?)([${c}]*)$`), '$2');
}
// Polyfill from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (search, this_len) {
        if (this_len === undefined || this_len > this.length) {
            this_len = this.length;
        }
        // @ts-ignore: Object is possibly 'undefined'
        return this.substring(this_len - search.length, this_len) === search;
    };
}
// From https://youmightnotneed.com/lodash/#endsWith
export function endsWith(str, c) {
    return str.endsWith(c);
}
