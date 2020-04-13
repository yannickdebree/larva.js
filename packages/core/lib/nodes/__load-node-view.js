"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kernel_1 = require("../kernel");
var __dom_elements_1 = require("./__dom-elements");
var __run_outputs_watching_1 = require("./__run-outputs-watching");
var __render_node_1 = require("./__render-node");
function loadNodeView(node, nodeDomElement) {
    if (!node.__property('templateInjectionUsing')) {
        node.__property('components').forEach(function (component) {
            nodeDomElement
                .querySelectorAll("[" + kernel_1.snakeComponentCommonAttribute() + "=\"" + component.__property('tag') + "\"]")
                .forEach(function (element) {
                component.setTemplate(element.innerHTML);
                nodeDomElement.replaceChild(window.document.createElement("s-" + component.__property('tag')), element);
            });
        });
        node.setTemplate(nodeDomElement.innerHTML);
    }
    nodeDomElement.innerHTML = node.__property('scriptedTemplate');
    node.__property('components').forEach(function (component) {
        nodeDomElement.querySelectorAll("s-" + component.__property('tag')).forEach(function (element) {
            element.outerHTML = "<div " + kernel_1.snakeComponentCommonAttribute() + "=\"" + component.__property('tag') + "\">" + component.__property('scriptedTemplate') + "</div>";
            __render_node_1.renderNode(component);
        });
    });
    __run_outputs_watching_1.runOutputsWatching(node, nodeDomElement);
    if (node.__property('domElementsInjectionOperationTread') > 0) {
        __dom_elements_1.runDomElementInjection(node, nodeDomElement);
    }
    node.__setViewAsLoaded();
}
exports.loadNodeView = loadNodeView;
