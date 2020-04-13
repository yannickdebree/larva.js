"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kernel_1 = require("../../kernel");
var dom_elements_1 = require("./dom-elements");
var run_outputs_watching_1 = require("./run-outputs-watching");
var render_node_1 = require("./render-node");
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
            render_node_1.renderNode(component);
        });
    });
    run_outputs_watching_1.runOutputsWatching(node, nodeDomElement);
    if (node.__property('domElementsInjectionOperationTread') > 0) {
        dom_elements_1.runDomElementInjection(node, nodeDomElement);
    }
    node.__setViewAsLoaded();
}
exports.loadNodeView = loadNodeView;
