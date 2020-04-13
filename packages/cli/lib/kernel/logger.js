"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function info(message) {
    console.log(message);
}
exports.info = info;
function warn(error) {
    throw new Error(error);
}
exports.warn = warn;
function clear() {
    process.stdout.write('\x1Bc');
}
exports.clear = clear;
