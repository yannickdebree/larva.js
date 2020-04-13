"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kernel_1 = require("../kernel");
function isAnArrowFn(fn) {
    return typeof fn === 'function' && kernel_1.arrowFunctionRgx().test(fn.toString());
}
exports.isAnArrowFn = isAnArrowFn;
