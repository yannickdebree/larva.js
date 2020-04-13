"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kernel_1 = require("../kernel");
function tryAndCatchOrReturn(fn) {
    try {
        return fn();
    }
    catch (err) {
        kernel_1.warning(err);
    }
}
exports.tryAndCatchOrReturn = tryAndCatchOrReturn;
