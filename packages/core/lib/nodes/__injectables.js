"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kernel_1 = require("../kernel");
function transferInjectablesToChildComponents(node) {
    node.__property('components').forEach(function (component) {
        Object.values(node.__property('injectableDictionnay')).forEach(function (injectable) {
            component.registerInjectable(injectable);
        });
    });
}
exports.transferInjectablesToChildComponents = transferInjectablesToChildComponents;
function translateInjectables(node, injectablesIds) {
    return injectablesIds.map(function (injectableId) {
        var injectable = node.__property('injectableDictionnay')[injectableId];
        if (!injectable) {
            kernel_1.throwNewError("\"" + injectableId + "\" is not declared as injectable in the \"" + node.__property('tag') + "\" node.");
        }
        var dependencies = new Array();
        if (injectable.injectablesIds().length) {
            dependencies.push.apply(dependencies, translateInjectables(node, injectable.injectablesIds()));
        }
        return injectable.dataAccessor().apply(void 0, dependencies);
    });
}
exports.translateInjectables = translateInjectables;
