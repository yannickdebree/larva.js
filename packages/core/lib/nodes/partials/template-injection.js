"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function transferTemplateInjectionUsingValueToChildComponents(node) {
    node.__property('components').forEach(function (component) {
        component.__setTemplateInjectionUsing(node.__property('templateInjectionUsing'));
    });
}
exports.transferTemplateInjectionUsingValueToChildComponents = transferTemplateInjectionUsingValueToChildComponents;
