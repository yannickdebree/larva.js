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
var nodes_1 = require("../nodes");
var shared_1 = require("../shared");
var __use_node_as_web_component_1 = require("./__use-node-as-web-component");
function createComponent(tag, dataAccessor) {
    return shared_1.tryAndCatchOrReturn(function () {
        var node = nodes_1.createNode({
            domElement: undefined,
            tag: tag,
            scriptedTemplate: ''
        }, dataAccessor);
        var component = __assign({}, node, { useAsWebComponent: function () {
                __use_node_as_web_component_1.useNodeAsWebComponent(this);
            } });
        return component;
    });
}
exports.createComponent = createComponent;
