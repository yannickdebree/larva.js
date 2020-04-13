"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function timestamp() {
    return "" + new Date().getTime().toString();
}
exports.timestamp = timestamp;
function snakeComponentCommonAttribute() {
    return 'snake-id';
}
exports.snakeComponentCommonAttribute = snakeComponentCommonAttribute;
function runCodeBindingObject(codeToRun, obj) {
    Object.keys(obj).forEach(function (key) {
        codeToRun = codeToRun.replace(key, "this." + key);
    });
    return new Function("return " + codeToRun).bind(obj)();
}
exports.runCodeBindingObject = runCodeBindingObject;
