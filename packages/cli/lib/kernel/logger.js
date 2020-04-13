"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function info(message) {
    console.log(message);
}
exports.info = info;
function warn(message) {
    throw new Error(message);
}
exports.warn = warn;
function clear() {
    console.clear();
}
exports.clear = clear;
