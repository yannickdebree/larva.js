"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function findCommentMarkedByUid(uid, element) {
    var childNodesLength = element.childNodes.length;
    for (var i = 0; i < childNodesLength; ++i) {
        var childNode = element.childNodes[i];
        if (childNode.nodeType === 8 && childNode.nodeValue === uid) {
            return childNode;
        }
        else {
            var node = findCommentMarkedByUid(uid, childNode);
            if (node) {
                return node;
            }
        }
    }
}
exports.findCommentMarkedByUid = findCommentMarkedByUid;
