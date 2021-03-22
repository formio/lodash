"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trim = void 0;
// From https://youmightnotneed.com/lodash/#trim
function trim(str, c) {
    if (c === void 0) { c = '\\s'; }
    return str.replace(new RegExp("^([" + c + "]*)(.*?)([" + c + "]*)$"), '$2');
}
exports.trim = trim;
