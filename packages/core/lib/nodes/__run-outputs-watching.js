"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kernel_1 = require("../kernel");
function runOutputsWatching(node, nodeDomElement) {
    Object.keys(kernel_1.EventTypes).forEach(function (eventType) {
        var eventAttribute = "s-on-" + eventType;
        nodeDomElement.querySelectorAll("[" + eventAttribute + "]").forEach(function (element) {
            var attributeValue = element.attributes.getNamedItem(eventAttribute).value;
            element.addEventListener(eventType, function (event) {
                var _a;
                if (attributeValue.match(/(\(.*\))/gm)) {
                    var propertyName = attributeValue.replace(/(\(.*?\))/gm, '');
                    if (node.__data().hasOwnProperty(propertyName) && typeof node.__data()[propertyName] === 'function') {
                        var propertyParams = attributeValue
                            .replace(/^([a-z]|[A-Z])*\(|\)/gm, '')
                            .split(',')
                            .map(function (param) {
                            return param.replace(/\s/g, '');
                        });
                        var params_1 = [];
                        propertyParams.forEach(function (property) {
                            if (property === '$event') {
                                params_1.push(event);
                            }
                            else {
                                if (node.__data().hasOwnProperty(property)) {
                                    params_1.push(node.__data()[property]);
                                }
                                else {
                                    kernel_1.throwNewError("\"" + property + "\" is not a property of component \"" + node.__property('tag') + "\".");
                                }
                            }
                        });
                        (_a = node.__data())[propertyName].apply(_a, params_1);
                    }
                    else {
                        kernel_1.throwNewError("\"" + propertyName + "\" method is not callable on component \"" + node.__property('tag') + "\".");
                    }
                }
                else {
                    kernel_1.runCodeBindingObject(attributeValue, node.__data());
                }
            });
            element.attributes.removeNamedItem(eventAttribute);
        });
    });
}
exports.runOutputsWatching = runOutputsWatching;
