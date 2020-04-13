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
var __dom_elements_1 = require("./__dom-elements");
var __load_node_view_1 = require("./__load-node-view");
function renderNode(_node) {
    var node = __assign({}, _node);
    var nodeDomElement = node.__property('domElement');
    if (!nodeDomElement) {
        nodeDomElement = window.document.querySelector("[" + kernel_1.snakeComponentCommonAttribute() + "=" + node.__property('tag') + "]");
    }
    if (!nodeDomElement) {
        kernel_1.throwNewError("'" + node.__property('tag') + "' component is unknowned for the DOM.");
    }
    if (!node.__property('isViewLoaded')) {
        __load_node_view_1.loadNodeView(node, nodeDomElement);
    }
    __dom_elements_1.injectContentsToBindedDomElements(node);
}
exports.renderNode = renderNode;
