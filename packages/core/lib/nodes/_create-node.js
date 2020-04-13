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
var shared_1 = require("../shared");
var __injectables_1 = require("./__injectables");
var __render_node_1 = require("./__render-node");
var __run_data_accessor_1 = require("./__run-data-accessor");
var __template_injection_1 = require("./__template-injection");
function createNode(_properties, _dataAccessor) {
    var properties = __assign({}, _properties, { bindedDomElements: {}, components: new Array(), domElementsInjectionOperationTread: 0, injectableDictionnay: {}, isViewLoaded: false, scriptedData: {}, templateInjectionUsing: true });
    var data;
    var node = {
        __closeOneDomElementsInjectionOperation: function () {
            properties.domElementsInjectionOperationTread--;
        },
        __data: function () {
            if (!data) {
                data = new Proxy(__run_data_accessor_1.runDataAccessor(this, _dataAccessor), {
                    set: function (target, property, value) {
                        target[property] = value;
                        __render_node_1.renderNode(node);
                        return true;
                    }
                });
            }
            return data;
        },
        __injectContentToBindedDomElement: function (content, uid) {
            properties.bindedDomElements[uid].textContent = content;
        },
        __property: function (key) {
            var value = properties[key];
            if (key === 'domElement') {
                return value;
            }
            else if (typeof value === 'object') {
                return Array.isArray(value) ? value.slice() : __assign({}, value);
            }
            else {
                return value;
            }
        },
        __setViewAsLoaded: function () {
            properties.isViewLoaded = true;
        },
        __setTemplateInjectionUsing: function (value) {
            if (value === void 0) { value = true; }
            properties.templateInjectionUsing = value;
            __template_injection_1.transferTemplateInjectionUsingValueToChildComponents(this);
        },
        registerComponent: function (component) {
            properties.components = properties.components.concat([component]);
            __injectables_1.transferInjectablesToChildComponents(this);
            __template_injection_1.transferTemplateInjectionUsingValueToChildComponents(this);
            return this;
        },
        registerComponents: function () {
            var _this = this;
            var components = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                components[_i] = arguments[_i];
            }
            components.forEach(function (component) {
                _this.registerComponent(component);
            });
            return this;
        },
        registerInjectable: function (injectable) {
            var patch = {};
            patch[injectable.id()] = injectable;
            properties.injectableDictionnay = __assign({}, properties.injectableDictionnay, patch);
            __injectables_1.transferInjectablesToChildComponents(this);
            return this;
        },
        registerInjectables: function () {
            var _this = this;
            var injectables = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                injectables[_i] = arguments[_i];
            }
            injectables.forEach(function (injectable) {
                _this.registerInjectable(injectable);
            });
            return this;
        },
        render: function () {
            __render_node_1.renderNode(this);
            return this;
        },
        setTemplate: function (template) {
            if (!template) {
                kernel_1.throwNewError('Please define a correct template.');
            }
            var scriptedTerms = template.match(kernel_1.templateBindingRgx());
            if (scriptedTerms) {
                scriptedTerms.forEach(function (scriptedTerm) {
                    var termBeforeComputing = scriptedTerm.replace(/({{|}})/gm, '');
                    var uid = shared_1.uniqueId();
                    properties.scriptedData[uid] = termBeforeComputing;
                    properties.bindedDomElements[uid] = window.document.createTextNode('');
                    properties.domElementsInjectionOperationTread++;
                    template = template.replace(scriptedTerm, "<!--" + uid + "-->");
                });
            }
            properties.scriptedTemplate = template;
            return this;
        }
    };
    return node;
}
exports.createNode = createNode;
