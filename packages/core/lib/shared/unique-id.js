"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kernel_1 = require("../kernel");
function uniqueId() {
    return "" + kernel_1.timestamp() + Math.floor(Math.random() * 10000);
}
exports.uniqueId = uniqueId;
