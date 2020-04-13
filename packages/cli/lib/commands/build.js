"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kernel_1 = require("../kernel");
function buildRgx() {
    return /^build$/gm;
}
exports.buildRgx = buildRgx;
function build() {
    kernel_1.info('build');
}
exports.build = build;
