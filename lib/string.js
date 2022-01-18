"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endsWith = exports.trim = void 0;
// From https://youmightnotneed.com/lodash/#trim
function trim(str, c) {
    if (c === void 0) { c = '\\s'; }
    return str.replace(new RegExp("^([".concat(c, "]*)(.*?)([").concat(c, "]*)$")), '$2');
}
exports.trim = trim;
// From https://youmightnotneed.com/lodash/#endsWith
function endsWith(str, c) {
    return str.endsWith(c);
}
exports.endsWith = endsWith;
