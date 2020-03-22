(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./src/main");

},{"./src/main":7}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("./node");
function createComponent(tag, data) {
    const properties = {
        domElement: undefined,
        tag,
        template: ''
    };
    return Object.assign(Object.assign({}, node_1.createNode(properties, data)), { getTag() {
            return properties.tag;
        },
        useAsWebComponent() {
            window.customElements.define(`s-${properties.tag}`, class extends HTMLElement {
                constructor() {
                    super();
                    this.innerHTML = 'Feature in progress.';
                }
            });
        } });
}
exports.createComponent = createComponent;

},{"./node":8}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function throwNewError(message) {
    throw new Error(message);
}
exports.throwNewError = throwNewError;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventTypes;
(function (EventTypes) {
    EventTypes["click"] = "click";
    EventTypes["keydown"] = "keydown";
    EventTypes["keyup"] = "keyup";
    EventTypes["mouseover"] = "mouseover";
    EventTypes["submit"] = "submit";
})(EventTypes = exports.EventTypes || (exports.EventTypes = {}));

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getArgumentsNamesOfFunction(fn) {
    return (fn.toString() + '')
        .replace(/[/][/].*$/gm, '')
        .replace(/\s+/g, '')
        .replace(/[/][*][^/*]*[*][/]/g, '')
        .split('){', 1)[0]
        .replace(/^[^(]*[(]/, '')
        .replace(/=[^,]+/g, '')
        .split(',')
        .filter(Boolean);
}
exports.getArgumentsNamesOfFunction = getArgumentsNamesOfFunction;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("./errors");
const helpers_1 = require("./helpers");
function createInjectable(id, data) {
    if (typeof data === 'function' && /^[^{]+?=>/.test(data.toString())) {
        errors_1.throwNewError('Node data setting must be a closed scope function, not an arrow function.');
    }
    const injectablesIds = new Array();
    if (data) {
        injectablesIds.push(...helpers_1.getArgumentsNamesOfFunction(data));
    }
    return {
        getId() {
            return id;
        },
        getData() {
            return data;
        },
        getInjectablesIds() {
            return injectablesIds;
        }
    };
}
exports.createInjectable = createInjectable;

},{"./errors":3,"./helpers":5}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("./component");
const injectable_1 = require("./injectable");
const snake_1 = require("./snake");
globalThis.createComponent = component_1.createComponent;
globalThis.createInjectable = injectable_1.createInjectable;
globalThis.snake = snake_1.snake;

},{"./component":2,"./injectable":6,"./snake":9}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("./errors");
const event_1 = require("./event");
const helpers_1 = require("./helpers");
function createNode(_properties, _data) {
    const properties = Object.assign(Object.assign({}, _properties), { childComponents: new Array(), injectables: {} });
    if (_data) {
        if (typeof _data === 'function' && /^[^{]+?=>/.test(_data.toString())) {
            errors_1.throwNewError('Node data setting must be a basic function, not an arrow function.');
        }
    }
    function hydrateChildComponents() {
        properties.childComponents.forEach(function (component) {
            component.registerInjectables(...Object.keys(properties.injectables).map((injectableId) => properties.injectables[injectableId]));
        });
    }
    function translateInjectables(injectablesIds) {
        return injectablesIds.map(function (injectableId) {
            const injectable = properties.injectables[injectableId];
            if (!injectable) {
                errors_1.throwNewError(`"${injectableId}" is not declared as injectable in the "${properties.tag}" node.`);
            }
            const dependencies = new Array();
            if (injectable.getInjectablesIds().length) {
                dependencies.push(...translateInjectables(injectable.getInjectablesIds()));
            }
            return injectable.getData()(...dependencies);
        });
    }
    function computeData() {
        if (_data) {
            const injectablesIds = helpers_1.getArgumentsNamesOfFunction(_data);
            const computedData = _data(...translateInjectables(injectablesIds));
            if (!computedData) {
                return errors_1.throwNewError('Node data setting must always return an object.');
            }
            return computedData;
        }
        else {
            return {};
        }
    }
    let data;
    const node = {
        getData() {
            if (!data) {
                data = new Proxy(computeData(), {
                    set(target, property, value) {
                        target[property] = value;
                        node.render();
                        return true;
                    }
                });
            }
            return data;
        },
        getTemplate() {
            return properties.template;
        },
        registerChildComponents(...components) {
            properties.childComponents = [...properties.childComponents, ...components];
            hydrateChildComponents();
            return this;
        },
        registerInjectables(...injectables) {
            const newInjectables = {};
            injectables.forEach((injectable) => {
                newInjectables[injectable.getId()] = injectable;
            });
            properties.injectables = Object.assign(Object.assign({}, properties.injectables), newInjectables);
            hydrateChildComponents();
            return this;
        },
        render() {
            if (!properties.domElement) {
                properties.domElement = window.document.querySelector(`[s-name=${properties.tag}]`);
            }
            if (!properties.domElement) {
                errors_1.throwNewError(`'${properties.tag}' component is unknowned for the DOM.`);
            }
            const nodeData = this.getData();
            let bufferTemplate = properties.template;
            for (const propertyName in nodeData) {
                bufferTemplate = bufferTemplate.replace(`{{${propertyName}}}`, nodeData[propertyName]);
            }
            properties.domElement.innerHTML = bufferTemplate;
            Object.keys(event_1.EventTypes).forEach((eventType) => {
                const attribute = `s-on-${eventType}`;
                properties.domElement.querySelectorAll(`[${attribute}]`).forEach((element) => {
                    element.removeEventListener(eventType, () => { });
                    const attributeValue = element.attributes.getNamedItem(attribute).value;
                    element.addEventListener(eventType, (event) => {
                        if (nodeData.hasOwnProperty(attributeValue) && typeof nodeData[attributeValue] === 'function') {
                            nodeData[attributeValue](event);
                        }
                    });
                    element.attributes.removeNamedItem(attribute);
                });
            });
            properties.childComponents.forEach(function (component) {
                properties.domElement.querySelectorAll(`s-${component.getTag()}`).forEach((element) => {
                    element.outerHTML = `<div s-name="${component.getTag()}">${component.getTemplate()}</div>`;
                    component.render();
                });
            });
            return this;
        },
        setTemplate(value) {
            properties.template = value || '';
            return this;
        }
    };
    return node;
}
exports.createNode = createNode;

},{"./errors":3,"./event":4,"./helpers":5}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("./errors");
const node_1 = require("./node");
function snake(selector, data) {
    if (!window) {
        errors_1.throwNewError(`Window object is unknowned.`);
    }
    const domElement = window.document.querySelector(selector);
    if (!domElement) {
        errors_1.throwNewError(`"${selector}" element doesn't exist in DOM.`);
    }
    const properties = {
        domElement,
        tag: selector,
        template: `<h1>Congratulations !</h1>
  <p>You just created a Snake.js app here.</h1>`
    };
    return node_1.createNode(properties, data);
}
exports.snake = snake;

},{"./errors":3,"./node":8}]},{},[1]);
