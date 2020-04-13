"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kernel_1 = require("../kernel");
function createRgx() {
    return /^(create|c)$/gm;
}
exports.createRgx = createRgx;
function create() {
    kernel_1.info('create');
}
exports.create = create;
