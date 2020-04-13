"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var kernel_1 = require("../kernel");
var nodes_1 = require("../nodes");
var shared_1 = require("../shared");
function snake(_selector, _data) {
    return shared_1.tryAndCatchOrReturn(function () {
        if (!window) {
            kernel_1.throwNewError("Window object is unknowned.");
        }
        var domElement = window.document.querySelector(_selector);
        if (!domElement) {
            kernel_1.throwNewError("\"" + _selector + "\" element doesn't exist in DOM.");
        }
        var snake = __assign({}, nodes_1.createNode({
            domElement: domElement,
            tag: _selector,
            scriptedTemplate: "<h1>Congratulations !</h1>\n          <p>You just created a Snake.js app here.</h1>"
        }, _data), { enableTemplateInjection: function (value) {
                if (value === void 0) { value = true; }
                this.__setTemplateInjectionUsing(value);
                return this;
            } });
        return snake;
    });
}
exports.snake = snake;
