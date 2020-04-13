"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kernel_1 = require("../../kernel");
function runDomElementInjection(node, nodeDomElement) {
    var markedBindedPoints = node.__property('scriptedTemplate').match(kernel_1.bindingMarkRgx()) || [];
    markedBindedPoints.forEach(function (markedBindedPoint) {
        var uid = markedBindedPoint.replace(/(<!--|-->)/gm, '');
        var comment = kernel_1.findCommentMarkedByUid(uid, nodeDomElement);
        var commentParent = comment.parentNode;
        commentParent.replaceChild(node.__property('bindedDomElements')[uid], comment);
        node.__closeOneDomElementsInjectionOperation();
    });
}
exports.runDomElementInjection = runDomElementInjection;
function injectContentsToBindedDomElements(node) {
    Object.keys(node.__property('bindedDomElements')).forEach(function (uid) {
        node.__injectContentToBindedDomElement(kernel_1.runCodeBindingObject(node.__property('scriptedData')[uid], node.__data()), uid);
    });
}
exports.injectContentsToBindedDomElements = injectContentsToBindedDomElements;
