(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./src/main");

},{"./src/main":17}],2:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./lib"));

},{"./lib":5}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function useNodeAsWebComponent(node) {
    window.customElements.define(`s-${node.__property('tag')}`, class extends HTMLElement {
        constructor() {
            super();
            this.innerHTML = 'Feature in progress.';
        }
    });
}
exports.useNodeAsWebComponent = useNodeAsWebComponent;

},{}],4:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./_web-component"));

},{"./_web-component":3}],5:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./src"));

},{"./src":7}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("../../../node");
const shared_1 = require("../../../shared");
const helpers_1 = require("../helpers");
function createComponent(tag, dataAccessor) {
    return shared_1.tryAndCatchOrReturn(function () {
        const node = node_1.createNode({
            domElement: undefined,
            tag,
            scriptedTemplate: ''
        }, dataAccessor);
        const component = Object.assign(Object.assign({}, node), { useAsWebComponent() {
                helpers_1.useNodeAsWebComponent(this);
            } });
        return component;
    });
}
exports.createComponent = createComponent;

},{"../../../node":18,"../../../shared":31,"../helpers":4}],7:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./_factory"));

},{"./_factory":6}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kernel_1 = require("../kernel");
const shared_1 = require("../shared");
function createInjectable(id, dataAccessor) {
    return shared_1.tryAndCatchOrReturn(function () {
        const injectablesIds = new Array();
        if (dataAccessor) {
            injectablesIds.push(...kernel_1.fnArgumentsNames(dataAccessor));
        }
        return {
            id() {
                return id;
            },
            dataAccessor() {
                return dataAccessor;
            },
            injectablesIds() {
                return [...injectablesIds];
            }
        };
    });
}
exports.createInjectable = createInjectable;

},{"../kernel":16,"../shared":31}],9:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./_lib"));

},{"./_lib":8}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function findCommentMarkedByUid(uid, element) {
    const childNodesLength = element.childNodes.length;
    for (let i = 0; i < childNodesLength; ++i) {
        const childNode = element.childNodes[i];
        if (childNode.nodeType === 8 && childNode.nodeValue === uid) {
            return childNode;
        }
        else {
            const node = findCommentMarkedByUid(uid, childNode);
            if (node) {
                return node;
            }
        }
    }
}
exports.findCommentMarkedByUid = findCommentMarkedByUid;

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function throwNewError(message) {
    throw new Error(message);
}
exports.throwNewError = throwNewError;

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventTypes;
(function (EventTypes) {
    EventTypes[EventTypes["click"] = 0] = "click";
    EventTypes[EventTypes["keypress"] = 1] = "keypress";
    EventTypes[EventTypes["keydown"] = 2] = "keydown";
    EventTypes[EventTypes["keyup"] = 3] = "keyup";
    EventTypes[EventTypes["mouseover"] = 4] = "mouseover";
    EventTypes[EventTypes["submit"] = 5] = "submit";
})(EventTypes = exports.EventTypes || (exports.EventTypes = {}));

},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function warning(error) {
    console.error(error);
}
exports.warning = warning;

},{}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function templateBindingRgx() {
    return /(\{{.*?\}})/gm;
}
exports.templateBindingRgx = templateBindingRgx;
function bindingMarkRgx() {
    return /(\<!--.*?\-->)/gm;
}
exports.bindingMarkRgx = bindingMarkRgx;
function arrowFunctionRgx() {
    return /^[^{]+?=>/gm;
}
exports.arrowFunctionRgx = arrowFunctionRgx;

},{}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("../shared");
function timestamp() {
    return `${new Date().getTime().toString()}`;
}
exports.timestamp = timestamp;
function snakeComponentCommonAttribute() {
    return 'snake-id';
}
exports.snakeComponentCommonAttribute = snakeComponentCommonAttribute;
function fnArgumentsNames(fn) {
    let params;
    if (shared_1.isAnArrowFn(fn)) {
        params = fn
            .toString()
            .replace(/\s*=>\s*\(*{.*/gs, '')
            .replace(/\(|\)/gm, '')
            .replace(/\s*/gm, '');
    }
    else {
        params = fn
            .toString()
            .replace(/[/][/].*$/gm, '')
            .replace(/\s+/g, '')
            .replace(/[/][*][^/*]*[*][/]/g, '')
            .split('){', 1)[0]
            .replace(/^[^(]*[(]/, '')
            .replace(/=[^,]+/g, '');
    }
    if (params !== '') {
        return params.split(',');
    }
    else {
        return [];
    }
}
exports.fnArgumentsNames = fnArgumentsNames;
function runCodeBindingObject(codeToRun, obj) {
    Object.keys(obj).forEach(function (key) {
        codeToRun = codeToRun.replace(key, `this.${key}`);
    });
    return new Function(`return ${codeToRun}`).bind(obj)();
}
exports.runCodeBindingObject = runCodeBindingObject;

},{"../shared":31}],16:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./_dom"));
__export(require("./_error"));
__export(require("./_event"));
__export(require("./_logger"));
__export(require("./_regex"));
__export(require("./_utils"));

},{"./_dom":10,"./_error":11,"./_event":12,"./_logger":13,"./_regex":14,"./_utils":15}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("./component");
const injectable_1 = require("./injectable");
const snake_1 = require("./snake");
globalThis.createComponent = component_1.createComponent;
globalThis.createInjectable = injectable_1.createInjectable;
globalThis.snake = snake_1.snake;

},{"./component":2,"./injectable":9,"./snake":32}],18:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./lib"));

},{"./lib":28}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kernel_1 = require("../../../kernel");
const _injectables_1 = require("./_injectables");
function runDataAccessor(node, _dataAccessor) {
    if (_dataAccessor) {
        const injectablesIds = kernel_1.fnArgumentsNames(_dataAccessor);
        const computedData = _dataAccessor(..._injectables_1.translateInjectables(node, injectablesIds));
        if (!computedData) {
            kernel_1.throwNewError('Node data setting must always return an object.');
        }
        return computedData;
    }
    else {
        return {};
    }
}
exports.runDataAccessor = runDataAccessor;

},{"../../../kernel":16,"./_injectables":20}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kernel_1 = require("../../../kernel");
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
        const injectable = node.__property('injectableDictionnay')[injectableId];
        if (!injectable) {
            kernel_1.throwNewError(`"${injectableId}" is not declared as injectable in the "${node.__property('tag')}" node.`);
        }
        const dependencies = new Array();
        if (injectable.injectablesIds().length) {
            dependencies.push(...translateInjectables(node, injectable.injectablesIds()));
        }
        return injectable.dataAccessor()(...dependencies);
    });
}
exports.translateInjectables = translateInjectables;

},{"../../../kernel":16}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function transferTemplateInjectionUsingValueToChildComponents(node) {
    node.__property('components').forEach(function (component) {
        component.__setTemplateInjectionUsing(node.__property('templateInjectionUsing'));
    });
}
exports.transferTemplateInjectionUsingValueToChildComponents = transferTemplateInjectionUsingValueToChildComponents;

},{}],22:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./rendering"));
__export(require("./_data-accessor"));
__export(require("./_template-injection"));
__export(require("./_injectables"));

},{"./_data-accessor":19,"./_injectables":20,"./_template-injection":21,"./rendering":27}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kernel_1 = require("../../../../kernel");
function runDomElementInjection(node, nodeDomElement) {
    const markedBindedPoints = node.__property('scriptedTemplate').match(kernel_1.bindingMarkRgx()) || [];
    markedBindedPoints.forEach(function (markedBindedPoint) {
        const uid = markedBindedPoint.replace(/(<!--|-->)/gm, '');
        const comment = kernel_1.findCommentMarkedByUid(uid, nodeDomElement);
        const commentParent = comment.parentNode;
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

},{"../../../../kernel":16}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kernel_1 = require("../../../../kernel");
const _dom_elements_1 = require("./_dom-elements");
const _outputs_1 = require("./_outputs");
const _render_node_1 = require("./_render-node");
function loadNodeView(node, nodeDomElement) {
    if (!node.__property('templateInjectionUsing')) {
        node.__property('components').forEach(function (component) {
            nodeDomElement
                .querySelectorAll(`[${kernel_1.snakeComponentCommonAttribute()}="${component.__property('tag')}"]`)
                .forEach(function (element) {
                component.setTemplate(element.innerHTML);
                nodeDomElement.replaceChild(window.document.createElement(`s-${component.__property('tag')}`), element);
            });
        });
        node.setTemplate(nodeDomElement.innerHTML);
    }
    nodeDomElement.innerHTML = node.__property('scriptedTemplate');
    node.__property('components').forEach(function (component) {
        nodeDomElement.querySelectorAll(`s-${component.__property('tag')}`).forEach(function (element) {
            element.outerHTML = `<div ${kernel_1.snakeComponentCommonAttribute()}="${component.__property('tag')}">${component.__property('scriptedTemplate')}</div>`;
            _render_node_1.renderNode(component);
        });
    });
    _outputs_1.runOutputsWatching(node, nodeDomElement);
    if (node.__property('domElementsInjectionOperationTread') > 0) {
        _dom_elements_1.runDomElementInjection(node, nodeDomElement);
    }
    node.__setViewAsLoaded();
}
exports.loadNodeView = loadNodeView;

},{"../../../../kernel":16,"./_dom-elements":23,"./_outputs":25,"./_render-node":26}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kernel_1 = require("../../../../kernel");
function runOutputsWatching(node, nodeDomElement) {
    Object.keys(kernel_1.EventTypes).forEach(function (eventType) {
        const eventAttribute = `s-on-${eventType}`;
        nodeDomElement.querySelectorAll(`[${eventAttribute}]`).forEach(function (element) {
            const attributeValue = element.attributes.getNamedItem(eventAttribute).value;
            element.addEventListener(eventType, function (event) {
                if (attributeValue.match(/(\(.*\))/gm)) {
                    let propertyName = attributeValue.replace(/(\(.*?\))/gm, '');
                    if (node.__data().hasOwnProperty(propertyName) && typeof node.__data()[propertyName] === 'function') {
                        const propertyParams = attributeValue
                            .replace(/^([a-z]|[A-Z])*\(|\)/gm, '')
                            .split(',')
                            .map(function (param) {
                            return param.replace(/\s/g, '');
                        });
                        const params = [];
                        propertyParams.forEach(function (property) {
                            if (property === '$event') {
                                params.push(event);
                            }
                            else {
                                if (node.__data().hasOwnProperty(property)) {
                                    params.push(node.__data()[property]);
                                }
                                else {
                                    kernel_1.throwNewError(`"${property}" is not a property of component "${node.__property('tag')}".`);
                                }
                            }
                        });
                        node.__data()[propertyName](...params);
                    }
                    else {
                        kernel_1.throwNewError(`"${propertyName}" method is not callable on component "${node.__property('tag')}".`);
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

},{"../../../../kernel":16}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kernel_1 = require("../../../../kernel");
const _dom_elements_1 = require("./_dom-elements");
const _load_node_view_1 = require("./_load-node-view");
function renderNode(_node) {
    const node = Object.assign({}, _node);
    let nodeDomElement = node.__property('domElement');
    if (!nodeDomElement) {
        nodeDomElement = window.document.querySelector(`[${kernel_1.snakeComponentCommonAttribute()}=${node.__property('tag')}]`);
    }
    if (!nodeDomElement) {
        kernel_1.throwNewError(`'${node.__property('tag')}' component is unknowned for the DOM.`);
    }
    if (!node.__property('isViewLoaded')) {
        _load_node_view_1.loadNodeView(node, nodeDomElement);
    }
    _dom_elements_1.injectContentsToBindedDomElements(node);
}
exports.renderNode = renderNode;

},{"../../../../kernel":16,"./_dom-elements":23,"./_load-node-view":24}],27:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./_dom-elements"));
__export(require("./_outputs"));
__export(require("./_load-node-view"));
__export(require("./_render-node"));

},{"./_dom-elements":23,"./_load-node-view":24,"./_outputs":25,"./_render-node":26}],28:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./src"));

},{"./src":30}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kernel_1 = require("../../../kernel");
const shared_1 = require("../../../shared");
const helpers_1 = require("../helpers");
function createNode(_properties, _dataAccessor) {
    const properties = Object.assign(Object.assign({}, _properties), { bindedDomElements: {}, components: new Array(), domElementsInjectionOperationTread: 0, injectableDictionnay: {}, isViewLoaded: false, scriptedData: {}, templateInjectionUsing: true });
    let data;
    const node = {
        __closeOneDomElementsInjectionOperation() {
            properties.domElementsInjectionOperationTread--;
        },
        __data() {
            if (!data) {
                data = new Proxy(helpers_1.runDataAccessor(this, _dataAccessor), {
                    set(target, property, value) {
                        target[property] = value;
                        helpers_1.renderNode(node);
                        return true;
                    }
                });
            }
            return data;
        },
        __injectContentToBindedDomElement(content, uid) {
            properties.bindedDomElements[uid].textContent = content;
        },
        __property(key) {
            const value = properties[key];
            if (key === 'domElement') {
                return value;
            }
            else if (typeof value === 'object') {
                return Array.isArray(value) ? [...value] : Object.assign({}, value);
            }
            else {
                return value;
            }
        },
        __setViewAsLoaded() {
            properties.isViewLoaded = true;
        },
        __setTemplateInjectionUsing(value = true) {
            properties.templateInjectionUsing = value;
            helpers_1.transferTemplateInjectionUsingValueToChildComponents(this);
        },
        registerComponent(component) {
            properties.components = [...properties.components, component];
            helpers_1.transferInjectablesToChildComponents(this);
            helpers_1.transferTemplateInjectionUsingValueToChildComponents(this);
            return this;
        },
        registerComponents(...components) {
            components.forEach((component) => {
                this.registerComponent(component);
            });
            return this;
        },
        registerInjectable(injectable) {
            const patch = {};
            patch[injectable.id()] = injectable;
            properties.injectableDictionnay = Object.assign(Object.assign({}, properties.injectableDictionnay), patch);
            helpers_1.transferInjectablesToChildComponents(this);
            return this;
        },
        registerInjectables(...injectables) {
            injectables.forEach((injectable) => {
                this.registerInjectable(injectable);
            });
            return this;
        },
        render() {
            helpers_1.renderNode(this);
            return this;
        },
        setTemplate(template) {
            if (!template) {
                kernel_1.throwNewError('Please define a correct template.');
            }
            const scriptedTerms = template.match(kernel_1.templateBindingRgx());
            if (scriptedTerms) {
                scriptedTerms.forEach(function (scriptedTerm) {
                    const termBeforeComputing = scriptedTerm.replace(/({{|}})/gm, '');
                    const uid = shared_1.uniqueId();
                    properties.scriptedData[uid] = termBeforeComputing;
                    properties.bindedDomElements[uid] = window.document.createTextNode('');
                    properties.domElementsInjectionOperationTread++;
                    template = template.replace(scriptedTerm, `<!--${uid}-->`);
                });
            }
            properties.scriptedTemplate = template;
            return this;
        }
    };
    return node;
}
exports.createNode = createNode;

},{"../../../kernel":16,"../../../shared":31,"../helpers":22}],30:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./_factory"));

},{"./_factory":29}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kernel_1 = require("./kernel");
function isAnArrowFn(fn) {
    return typeof fn === 'function' && kernel_1.arrowFunctionRgx().test(fn.toString());
}
exports.isAnArrowFn = isAnArrowFn;
function tryAndCatchOrReturn(fn) {
    try {
        return fn();
    }
    catch (err) {
        kernel_1.warning(err);
    }
}
exports.tryAndCatchOrReturn = tryAndCatchOrReturn;
function uniqueId() {
    return `${kernel_1.timestamp()}${Math.floor(Math.random() * 10000)}`;
}
exports.uniqueId = uniqueId;

},{"./kernel":16}],32:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./lib"));

},{"./lib":33}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kernel_1 = require("../kernel");
const node_1 = require("../node");
const shared_1 = require("../shared");
function snake(_selector, _data) {
    return shared_1.tryAndCatchOrReturn(function () {
        if (!globalThis.window) {
            kernel_1.throwNewError(`Window object is unknowned.`);
        }
        const domElement = window.document.querySelector(_selector);
        if (!domElement) {
            kernel_1.throwNewError(`"${_selector}" element doesn't exist in DOM.`);
        }
        const snake = Object.assign(Object.assign({}, node_1.createNode({
            domElement,
            tag: _selector,
            scriptedTemplate: `<h1>Congratulations !</h1>
          <p>You just created a Snake.js app here.</h1>`
        }, _data)), { enableTemplateInjection(value = true) {
                this.__setTemplateInjectionUsing(value);
                return this;
            } });
        return snake;
    });
}
exports.snake = snake;

},{"../kernel":16,"../node":18,"../shared":31}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwYWNrYWdlcy9jb3JlL2luZGV4LnRzIiwicGFja2FnZXMvY29yZS9zcmMvY29tcG9uZW50L2luZGV4LnRzIiwicGFja2FnZXMvY29yZS9zcmMvY29tcG9uZW50L2xpYi9oZWxwZXJzL193ZWItY29tcG9uZW50LnRzIiwicGFja2FnZXMvY29yZS9zcmMvY29tcG9uZW50L2xpYi9oZWxwZXJzL2luZGV4LnRzIiwicGFja2FnZXMvY29yZS9zcmMvY29tcG9uZW50L2xpYi9pbmRleC50cyIsInBhY2thZ2VzL2NvcmUvc3JjL2NvbXBvbmVudC9saWIvc3JjL19mYWN0b3J5LnRzIiwicGFja2FnZXMvY29yZS9zcmMvY29tcG9uZW50L2xpYi9zcmMvaW5kZXgudHMiLCJwYWNrYWdlcy9jb3JlL3NyYy9pbmplY3RhYmxlL19saWIudHMiLCJwYWNrYWdlcy9jb3JlL3NyYy9pbmplY3RhYmxlL2luZGV4LnRzIiwicGFja2FnZXMvY29yZS9zcmMva2VybmVsL19kb20udHMiLCJwYWNrYWdlcy9jb3JlL3NyYy9rZXJuZWwvX2Vycm9yLnRzIiwicGFja2FnZXMvY29yZS9zcmMva2VybmVsL19ldmVudC50cyIsInBhY2thZ2VzL2NvcmUvc3JjL2tlcm5lbC9fbG9nZ2VyLnRzIiwicGFja2FnZXMvY29yZS9zcmMva2VybmVsL19yZWdleC50cyIsInBhY2thZ2VzL2NvcmUvc3JjL2tlcm5lbC9fdXRpbHMudHMiLCJwYWNrYWdlcy9jb3JlL3NyYy9rZXJuZWwvaW5kZXgudHMiLCJwYWNrYWdlcy9jb3JlL3NyYy9tYWluLnRzIiwicGFja2FnZXMvY29yZS9zcmMvbm9kZS9pbmRleC50cyIsInBhY2thZ2VzL2NvcmUvc3JjL25vZGUvbGliL2hlbHBlcnMvX2RhdGEtYWNjZXNzb3IudHMiLCJwYWNrYWdlcy9jb3JlL3NyYy9ub2RlL2xpYi9oZWxwZXJzL19pbmplY3RhYmxlcy50cyIsInBhY2thZ2VzL2NvcmUvc3JjL25vZGUvbGliL2hlbHBlcnMvX3RlbXBsYXRlLWluamVjdGlvbi50cyIsInBhY2thZ2VzL2NvcmUvc3JjL25vZGUvbGliL2hlbHBlcnMvaW5kZXgudHMiLCJwYWNrYWdlcy9jb3JlL3NyYy9ub2RlL2xpYi9oZWxwZXJzL3JlbmRlcmluZy9fZG9tLWVsZW1lbnRzLnRzIiwicGFja2FnZXMvY29yZS9zcmMvbm9kZS9saWIvaGVscGVycy9yZW5kZXJpbmcvX2xvYWQtbm9kZS12aWV3LnRzIiwicGFja2FnZXMvY29yZS9zcmMvbm9kZS9saWIvaGVscGVycy9yZW5kZXJpbmcvX291dHB1dHMudHMiLCJwYWNrYWdlcy9jb3JlL3NyYy9ub2RlL2xpYi9oZWxwZXJzL3JlbmRlcmluZy9fcmVuZGVyLW5vZGUudHMiLCJwYWNrYWdlcy9jb3JlL3NyYy9ub2RlL2xpYi9oZWxwZXJzL3JlbmRlcmluZy9pbmRleC50cyIsInBhY2thZ2VzL2NvcmUvc3JjL25vZGUvbGliL2luZGV4LnRzIiwicGFja2FnZXMvY29yZS9zcmMvbm9kZS9saWIvc3JjL19mYWN0b3J5LnRzIiwicGFja2FnZXMvY29yZS9zcmMvbm9kZS9saWIvc3JjL2luZGV4LnRzIiwicGFja2FnZXMvY29yZS9zcmMvc2hhcmVkLnRzIiwicGFja2FnZXMvY29yZS9zcmMvc25ha2UvaW5kZXgudHMiLCJwYWNrYWdlcy9jb3JlL3NyYy9zbmFrZS9saWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLHNCQUFvQjs7Ozs7Ozs7QUNBcEIsMkJBQXNCOzs7OztBQ0V0QixTQUFnQixxQkFBcUIsQ0FBQyxJQUFVO0lBQzlDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUMxQixLQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFDN0IsS0FBTSxTQUFRLFdBQVc7UUFDdkI7WUFDRSxLQUFLLEVBQUUsQ0FBQztZQUNSLElBQUksQ0FBQyxTQUFTLEdBQUcsc0JBQXNCLENBQUM7UUFDMUMsQ0FBQztLQUNGLENBQ0Ys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QyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBWSxDQUFDO1FBRXZFLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDZixzQkFBYSxDQUFDLElBQUksU0FBUyxpQ0FBaUMsQ0FBQyxDQUFDO1NBQy9EO1FBRUQsTUFBTSxLQUFLLG1DQUNOLGlCQUFVLENBQ1g7WUFDRSxVQUFVO1lBQ1YsR0FBRyxFQUFFLFNBQVM7WUFDZCxnQkFBZ0IsRUFBRTt3REFDNEI7U0FDL0MsRUFDRCxLQUFLLENBQ04sS0FFRCx1QkFBdUIsQ0FBQyxLQUFLLEdBQUcsSUFBSTtnQkFDbEMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUV4QyxPQUFPLElBQUksQ0FBQztZQUNkLENBQUMsR0FDRixDQUFDO1FBRUYsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFoQ0Qsc0JBZ0NDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0ICcuL3NyYy9tYWluJztcbiIsImV4cG9ydCAqIGZyb20gJy4vbGliJztcbmV4cG9ydCAqIGZyb20gJy4vX3R5cGVzJztcbiIsImltcG9ydCB7IE5vZGUgfSBmcm9tICcuLi8uLi8uLi9ub2RlJztcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZU5vZGVBc1dlYkNvbXBvbmVudChub2RlOiBOb2RlKTogdm9pZCB7XG4gIHdpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoXG4gICAgYHMtJHtub2RlLl9fcHJvcGVydHkoJ3RhZycpfWAsXG4gICAgY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5pbm5lckhUTUwgPSAnRmVhdHVyZSBpbiBwcm9ncmVzcy4nO1xuICAgICAgfVxuICAgIH1cbiAgKTtcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vX3dlYi1jb21wb25lbnQnO1xuIiwiZXhwb3J0ICogZnJvbSAnLi9zcmMnO1xuIiwiaW1wb3J0IHsgRGF0YUFjY2Vzc29yIH0gZnJvbSAnLi4vLi4vLi4va2VybmVsJztcbmltcG9ydCB7IGNyZWF0ZU5vZGUgfSBmcm9tICcuLi8uLi8uLi9ub2RlJztcbmltcG9ydCB7IHRyeUFuZENhdGNoT3JSZXR1cm4gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQnO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vX3R5cGVzJztcbmltcG9ydCB7IHVzZU5vZGVBc1dlYkNvbXBvbmVudCB9IGZyb20gJy4uL2hlbHBlcnMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50PEM+KHRhZzogc3RyaW5nLCBkYXRhQWNjZXNzb3I/OiBEYXRhQWNjZXNzb3I8Qz4pOiBDb21wb25lbnQ8Qz4ge1xuICByZXR1cm4gdHJ5QW5kQ2F0Y2hPclJldHVybihmdW5jdGlvbigpIHtcbiAgICBjb25zdCBub2RlID0gY3JlYXRlTm9kZShcbiAgICAgIHtcbiAgICAgICAgZG9tRWxlbWVudDogdW5kZWZpbmVkLFxuICAgICAgICB0YWcsXG4gICAgICAgIHNjcmlwdGVkVGVtcGxhdGU6ICcnXG4gICAgICB9LFxuICAgICAgZGF0YUFjY2Vzc29yXG4gICAgKTtcblxuICAgIGNvbnN0IGNvbXBvbmVudDogQ29tcG9uZW50PEM+ID0ge1xuICAgICAgLi4ubm9kZSxcblxuICAgICAgdXNlQXNXZWJDb21wb25lbnQoKTogdm9pZCB7XG4gICAgICAgIHVzZU5vZGVBc1dlYkNvbXBvbmVudCh0aGlzKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgfSk7XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL19mYWN0b3J5JztcbiIsImltcG9ydCB7IERhdGFBY2Nlc3NvciwgZm5Bcmd1bWVudHNOYW1lcyB9IGZyb20gJy4uL2tlcm5lbCc7XG5pbXBvcnQgeyB0cnlBbmRDYXRjaE9yUmV0dXJuIH0gZnJvbSAnLi4vc2hhcmVkJztcbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdGFibGVJZCB9IGZyb20gJy4vX3R5cGVzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUluamVjdGFibGU8ST4oaWQ6IEluamVjdGFibGVJZCwgZGF0YUFjY2Vzc29yOiBEYXRhQWNjZXNzb3I8ST4pOiBJbmplY3RhYmxlPEk+IHtcbiAgcmV0dXJuIHRyeUFuZENhdGNoT3JSZXR1cm4oZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgaW5qZWN0YWJsZXNJZHMgPSBuZXcgQXJyYXk8SW5qZWN0YWJsZUlkPigpO1xuXG4gICAgaWYgKGRhdGFBY2Nlc3Nvcikge1xuICAgICAgaW5qZWN0YWJsZXNJZHMucHVzaCguLi5mbkFyZ3VtZW50c05hbWVzKGRhdGFBY2Nlc3NvcikpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBpZCgpOiBJbmplY3RhYmxlSWQge1xuICAgICAgICByZXR1cm4gaWQ7XG4gICAgICB9LFxuICAgICAgZGF0YUFjY2Vzc29yKCk6IERhdGFBY2Nlc3NvcjxJPiB7XG4gICAgICAgIHJldHVybiBkYXRhQWNjZXNzb3I7XG4gICAgICB9LFxuICAgICAgaW5qZWN0YWJsZXNJZHMoKTogQXJyYXk8SW5qZWN0YWJsZUlkPiB7XG4gICAgICAgIHJldHVybiBbLi4uaW5qZWN0YWJsZXNJZHNdO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9fbGliJztcbmV4cG9ydCAqIGZyb20gJy4vX3R5cGVzJztcbiIsImV4cG9ydCBmdW5jdGlvbiBmaW5kQ29tbWVudE1hcmtlZEJ5VWlkKHVpZDogc3RyaW5nLCBlbGVtZW50OiBDaGlsZE5vZGUpOiBDaGlsZE5vZGUge1xuICBjb25zdCBjaGlsZE5vZGVzTGVuZ3RoID0gZWxlbWVudC5jaGlsZE5vZGVzLmxlbmd0aDtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkTm9kZXNMZW5ndGg7ICsraSkge1xuICAgIGNvbnN0IGNoaWxkTm9kZSA9IGVsZW1lbnQuY2hpbGROb2Rlc1tpXTtcblxuICAgIGlmIChjaGlsZE5vZGUubm9kZVR5cGUgPT09IDggJiYgY2hpbGROb2RlLm5vZGVWYWx1ZSA9PT0gdWlkKSB7XG4gICAgICByZXR1cm4gY2hpbGROb2RlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBub2RlID0gZmluZENvbW1lbnRNYXJrZWRCeVVpZCh1aWQsIGNoaWxkTm9kZSk7XG5cbiAgICAgIGlmIChub2RlKSB7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIHRocm93TmV3RXJyb3IobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XG4gIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbn1cbiIsImV4cG9ydCBlbnVtIEV2ZW50VHlwZXMge1xuICBjbGljayxcbiAga2V5cHJlc3MsXG4gIGtleWRvd24sXG4gIGtleXVwLFxuICBtb3VzZW92ZXIsXG4gIHN1Ym1pdFxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIHdhcm5pbmcoZXJyb3I6IEVycm9yKTogdm9pZCB7XG4gIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIHRlbXBsYXRlQmluZGluZ1JneCgpOiBSZWdFeHAge1xuICByZXR1cm4gLyhcXHt7Lio/XFx9fSkvZ207XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBiaW5kaW5nTWFya1JneCgpOiBSZWdFeHAge1xuICByZXR1cm4gLyhcXDwhLS0uKj9cXC0tPikvZ207XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcnJvd0Z1bmN0aW9uUmd4KCk6IFJlZ0V4cCB7XG4gIHJldHVybiAvXltee10rPz0+L2dtO1xufVxuIiwiaW1wb3J0IHsgaXNBbkFycm93Rm4gfSBmcm9tICcuLi9zaGFyZWQnO1xuXG5leHBvcnQgZnVuY3Rpb24gdGltZXN0YW1wKCk6IHN0cmluZyB7XG4gIHJldHVybiBgJHtuZXcgRGF0ZSgpLmdldFRpbWUoKS50b1N0cmluZygpfWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzbmFrZUNvbXBvbmVudENvbW1vbkF0dHJpYnV0ZSgpOiBzdHJpbmcge1xuICByZXR1cm4gJ3NuYWtlLWlkJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZuQXJndW1lbnRzTmFtZXMoZm46IEZ1bmN0aW9uKTogQXJyYXk8c3RyaW5nPiB7XG4gIGxldCBwYXJhbXM6IHN0cmluZztcbiAgaWYgKGlzQW5BcnJvd0ZuKGZuKSkge1xuICAgIHBhcmFtcyA9IGZuXG4gICAgICAudG9TdHJpbmcoKVxuICAgICAgLnJlcGxhY2UoL1xccyo9PlxccypcXCgqey4qL2dzLCAnJylcbiAgICAgIC5yZXBsYWNlKC9cXCh8XFwpL2dtLCAnJylcbiAgICAgIC5yZXBsYWNlKC9cXHMqL2dtLCAnJyk7XG4gIH0gZWxzZSB7XG4gICAgcGFyYW1zID0gZm5cbiAgICAgIC50b1N0cmluZygpXG4gICAgICAucmVwbGFjZSgvWy9dWy9dLiokL2dtLCAnJylcbiAgICAgIC5yZXBsYWNlKC9cXHMrL2csICcnKVxuICAgICAgLnJlcGxhY2UoL1svXVsqXVteLypdKlsqXVsvXS9nLCAnJylcbiAgICAgIC5zcGxpdCgnKXsnLCAxKVswXVxuICAgICAgLnJlcGxhY2UoL15bXihdKlsoXS8sICcnKVxuICAgICAgLnJlcGxhY2UoLz1bXixdKy9nLCAnJyk7XG4gIH1cbiAgaWYgKHBhcmFtcyAhPT0gJycpIHtcbiAgICByZXR1cm4gcGFyYW1zLnNwbGl0KCcsJyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBydW5Db2RlQmluZGluZ09iamVjdDxPPihjb2RlVG9SdW46IHN0cmluZywgb2JqOiBPKTogdW5rbm93biB7XG4gIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChmdW5jdGlvbihrZXk6IHN0cmluZykge1xuICAgIGNvZGVUb1J1biA9IGNvZGVUb1J1bi5yZXBsYWNlKGtleSwgYHRoaXMuJHtrZXl9YCk7XG4gIH0pO1xuXG4gIHJldHVybiBuZXcgRnVuY3Rpb24oYHJldHVybiAke2NvZGVUb1J1bn1gKS5iaW5kKG9iaikoKTtcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vX2RvbSc7XG5leHBvcnQgKiBmcm9tICcuL19lcnJvcic7XG5leHBvcnQgKiBmcm9tICcuL19ldmVudCc7XG5leHBvcnQgKiBmcm9tICcuL19sb2dnZXInO1xuZXhwb3J0ICogZnJvbSAnLi9fcmVnZXgnO1xuZXhwb3J0ICogZnJvbSAnLi9fdHlwZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9fdXRpbHMnO1xuIiwiaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnQnO1xuaW1wb3J0IHsgY3JlYXRlSW5qZWN0YWJsZSB9IGZyb20gJy4vaW5qZWN0YWJsZSc7XG5pbXBvcnQgeyBzbmFrZSB9IGZyb20gJy4vc25ha2UnO1xuXG5nbG9iYWxUaGlzLmNyZWF0ZUNvbXBvbmVudCA9IGNyZWF0ZUNvbXBvbmVudDtcbmdsb2JhbFRoaXMuY3JlYXRlSW5qZWN0YWJsZSA9IGNyZWF0ZUluamVjdGFibGU7XG5nbG9iYWxUaGlzLnNuYWtlID0gc25ha2U7XG4iLCJleHBvcnQgKiBmcm9tICcuL2xpYic7XG5leHBvcnQgKiBmcm9tICcuL190eXBlcyc7XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlSWQgfSBmcm9tICcuLi8uLi8uLi9pbmplY3RhYmxlJztcbmltcG9ydCB7IERhdGFBY2Nlc3NvciwgZm5Bcmd1bWVudHNOYW1lcywgdGhyb3dOZXdFcnJvciB9IGZyb20gJy4uLy4uLy4uL2tlcm5lbCc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi4vLi4vX3R5cGVzJztcbmltcG9ydCB7IHRyYW5zbGF0ZUluamVjdGFibGVzIH0gZnJvbSAnLi9faW5qZWN0YWJsZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gcnVuRGF0YUFjY2Vzc29yPEQgPSBhbnk+KG5vZGU6IE5vZGU8RD4sIF9kYXRhQWNjZXNzb3I/OiBEYXRhQWNjZXNzb3I8RD4pOiBEIHwgYW55IHtcbiAgaWYgKF9kYXRhQWNjZXNzb3IpIHtcbiAgICBjb25zdCBpbmplY3RhYmxlc0lkczogQXJyYXk8SW5qZWN0YWJsZUlkPiA9IGZuQXJndW1lbnRzTmFtZXMoX2RhdGFBY2Nlc3Nvcik7XG5cbiAgICBjb25zdCBjb21wdXRlZERhdGE6IEQgPSBfZGF0YUFjY2Vzc29yKC4uLnRyYW5zbGF0ZUluamVjdGFibGVzKG5vZGUsIGluamVjdGFibGVzSWRzKSk7XG5cbiAgICBpZiAoIWNvbXB1dGVkRGF0YSkge1xuICAgICAgdGhyb3dOZXdFcnJvcignTm9kZSBkYXRhIHNldHRpbmcgbXVzdCBhbHdheXMgcmV0dXJuIGFuIG9iamVjdC4nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29tcHV0ZWREYXRhO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB7fTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50JztcbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdGFibGVEaWN0aW9ubmF5LCBJbmplY3RhYmxlSWQgfSBmcm9tICcuLi8uLi8uLi9pbmplY3RhYmxlJztcbmltcG9ydCB7IERlcGVuZGVuY3ksIHRocm93TmV3RXJyb3IgfSBmcm9tICcuLi8uLi8uLi9rZXJuZWwnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4uLy4uL190eXBlcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2ZlckluamVjdGFibGVzVG9DaGlsZENvbXBvbmVudHMobm9kZTogTm9kZSk6IHZvaWQge1xuICAobm9kZS5fX3Byb3BlcnR5KCdjb21wb25lbnRzJykgYXMgQXJyYXk8Q29tcG9uZW50PikuZm9yRWFjaChmdW5jdGlvbihjb21wb25lbnQ6IENvbXBvbmVudCk6IHZvaWQge1xuICAgIE9iamVjdC52YWx1ZXMobm9kZS5fX3Byb3BlcnR5KCdpbmplY3RhYmxlRGljdGlvbm5heScpIGFzIEluamVjdGFibGVEaWN0aW9ubmF5KS5mb3JFYWNoKGZ1bmN0aW9uKFxuICAgICAgaW5qZWN0YWJsZTogSW5qZWN0YWJsZVxuICAgICkge1xuICAgICAgY29tcG9uZW50LnJlZ2lzdGVySW5qZWN0YWJsZShpbmplY3RhYmxlKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2xhdGVJbmplY3RhYmxlcyhub2RlOiBOb2RlLCBpbmplY3RhYmxlc0lkczogQXJyYXk8SW5qZWN0YWJsZUlkPik6IERlcGVuZGVuY3lbXSB7XG4gIHJldHVybiBpbmplY3RhYmxlc0lkcy5tYXAoZnVuY3Rpb24oaW5qZWN0YWJsZUlkOiBzdHJpbmcpIHtcbiAgICBjb25zdCBpbmplY3RhYmxlOiBJbmplY3RhYmxlID0gbm9kZS5fX3Byb3BlcnR5KCdpbmplY3RhYmxlRGljdGlvbm5heScpW2luamVjdGFibGVJZF07XG5cbiAgICBpZiAoIWluamVjdGFibGUpIHtcbiAgICAgIHRocm93TmV3RXJyb3IoYFwiJHtpbmplY3RhYmxlSWR9XCIgaXMgbm90IGRlY2xhcmVkIGFzIGluamVjdGFibGUgaW4gdGhlIFwiJHtub2RlLl9fcHJvcGVydHkoJ3RhZycpfVwiIG5vZGUuYCk7XG4gICAgfVxuXG4gICAgY29uc3QgZGVwZW5kZW5jaWVzID0gbmV3IEFycmF5PERlcGVuZGVuY3k+KCk7XG5cbiAgICBpZiAoaW5qZWN0YWJsZS5pbmplY3RhYmxlc0lkcygpLmxlbmd0aCkge1xuICAgICAgZGVwZW5kZW5jaWVzLnB1c2goLi4udHJhbnNsYXRlSW5qZWN0YWJsZXMobm9kZSwgaW5qZWN0YWJsZS5pbmplY3RhYmxlc0lkcygpKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGluamVjdGFibGUuZGF0YUFjY2Vzc29yKCkoLi4uZGVwZW5kZW5jaWVzKTtcbiAgfSk7XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnQnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4uLy4uL190eXBlcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2ZlclRlbXBsYXRlSW5qZWN0aW9uVXNpbmdWYWx1ZVRvQ2hpbGRDb21wb25lbnRzKG5vZGU6IE5vZGUpOiB2b2lkIHtcbiAgKG5vZGUuX19wcm9wZXJ0eSgnY29tcG9uZW50cycpIGFzIEFycmF5PENvbXBvbmVudD4pLmZvckVhY2goZnVuY3Rpb24oY29tcG9uZW50OiBDb21wb25lbnQpOiB2b2lkIHtcbiAgICBjb21wb25lbnQuX19zZXRUZW1wbGF0ZUluamVjdGlvblVzaW5nKG5vZGUuX19wcm9wZXJ0eSgndGVtcGxhdGVJbmplY3Rpb25Vc2luZycpIGFzIGJvb2xlYW4pO1xuICB9KTtcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vcmVuZGVyaW5nJztcbmV4cG9ydCAqIGZyb20gJy4vX2RhdGEtYWNjZXNzb3InO1xuZXhwb3J0ICogZnJvbSAnLi9fdGVtcGxhdGUtaW5qZWN0aW9uJztcbmV4cG9ydCAqIGZyb20gJy4vX2luamVjdGFibGVzJztcbiIsImltcG9ydCB7IGJpbmRpbmdNYXJrUmd4LCBmaW5kQ29tbWVudE1hcmtlZEJ5VWlkLCBydW5Db2RlQmluZGluZ09iamVjdCB9IGZyb20gJy4uLy4uLy4uLy4uL2tlcm5lbCc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi4vLi4vLi4vX3R5cGVzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHJ1bkRvbUVsZW1lbnRJbmplY3Rpb24obm9kZTogTm9kZSwgbm9kZURvbUVsZW1lbnQ6IEVsZW1lbnQpOiB2b2lkIHtcbiAgY29uc3QgbWFya2VkQmluZGVkUG9pbnRzID0gKG5vZGUuX19wcm9wZXJ0eSgnc2NyaXB0ZWRUZW1wbGF0ZScpIGFzIHN0cmluZykubWF0Y2goYmluZGluZ01hcmtSZ3goKSkgfHwgW107XG5cbiAgbWFya2VkQmluZGVkUG9pbnRzLmZvckVhY2goZnVuY3Rpb24obWFya2VkQmluZGVkUG9pbnQ6IHN0cmluZykge1xuICAgIGNvbnN0IHVpZCA9IG1hcmtlZEJpbmRlZFBvaW50LnJlcGxhY2UoLyg8IS0tfC0tPikvZ20sICcnKTtcblxuICAgIGNvbnN0IGNvbW1lbnQgPSBmaW5kQ29tbWVudE1hcmtlZEJ5VWlkKHVpZCwgbm9kZURvbUVsZW1lbnQpIGFzIENoaWxkTm9kZTtcblxuICAgIGNvbnN0IGNvbW1lbnRQYXJlbnQgPSBjb21tZW50LnBhcmVudE5vZGU7XG5cbiAgICBjb21tZW50UGFyZW50LnJlcGxhY2VDaGlsZChub2RlLl9fcHJvcGVydHkoJ2JpbmRlZERvbUVsZW1lbnRzJylbdWlkXSwgY29tbWVudCk7XG5cbiAgICBub2RlLl9fY2xvc2VPbmVEb21FbGVtZW50c0luamVjdGlvbk9wZXJhdGlvbigpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluamVjdENvbnRlbnRzVG9CaW5kZWREb21FbGVtZW50cyhub2RlOiBOb2RlKTogdm9pZCB7XG4gIE9iamVjdC5rZXlzKG5vZGUuX19wcm9wZXJ0eSgnYmluZGVkRG9tRWxlbWVudHMnKSkuZm9yRWFjaChmdW5jdGlvbih1aWQ6IHN0cmluZykge1xuICAgIG5vZGUuX19pbmplY3RDb250ZW50VG9CaW5kZWREb21FbGVtZW50KFxuICAgICAgcnVuQ29kZUJpbmRpbmdPYmplY3Qobm9kZS5fX3Byb3BlcnR5KCdzY3JpcHRlZERhdGEnKVt1aWRdLCBub2RlLl9fZGF0YSgpKSBhcyBzdHJpbmcsXG4gICAgICB1aWRcbiAgICApO1xuICB9KTtcbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uLy4uL2NvbXBvbmVudCc7XG5pbXBvcnQgeyBzbmFrZUNvbXBvbmVudENvbW1vbkF0dHJpYnV0ZSB9IGZyb20gJy4uLy4uLy4uLy4uL2tlcm5lbCc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi4vLi4vLi4vX3R5cGVzJztcbmltcG9ydCB7IHJ1bkRvbUVsZW1lbnRJbmplY3Rpb24gfSBmcm9tICcuL19kb20tZWxlbWVudHMnO1xuaW1wb3J0IHsgcnVuT3V0cHV0c1dhdGNoaW5nIH0gZnJvbSAnLi9fb3V0cHV0cyc7XG5pbXBvcnQgeyByZW5kZXJOb2RlIH0gZnJvbSAnLi9fcmVuZGVyLW5vZGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gbG9hZE5vZGVWaWV3KG5vZGU6IE5vZGUsIG5vZGVEb21FbGVtZW50OiBFbGVtZW50KSB7XG4gIGlmICghbm9kZS5fX3Byb3BlcnR5KCd0ZW1wbGF0ZUluamVjdGlvblVzaW5nJykpIHtcbiAgICAobm9kZS5fX3Byb3BlcnR5KCdjb21wb25lbnRzJykgYXMgQXJyYXk8Q29tcG9uZW50PikuZm9yRWFjaChmdW5jdGlvbihjb21wb25lbnQ6IENvbXBvbmVudCk6IHZvaWQge1xuICAgICAgbm9kZURvbUVsZW1lbnRcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoYFske3NuYWtlQ29tcG9uZW50Q29tbW9uQXR0cmlidXRlKCl9PVwiJHtjb21wb25lbnQuX19wcm9wZXJ0eSgndGFnJyl9XCJdYClcbiAgICAgICAgLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudDogRWxlbWVudCk6IHZvaWQge1xuICAgICAgICAgIGNvbXBvbmVudC5zZXRUZW1wbGF0ZShlbGVtZW50LmlubmVySFRNTCk7XG5cbiAgICAgICAgICBub2RlRG9tRWxlbWVudC5yZXBsYWNlQ2hpbGQod2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYHMtJHtjb21wb25lbnQuX19wcm9wZXJ0eSgndGFnJyl9YCksIGVsZW1lbnQpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIG5vZGUuc2V0VGVtcGxhdGUobm9kZURvbUVsZW1lbnQuaW5uZXJIVE1MKTtcbiAgfVxuXG4gIG5vZGVEb21FbGVtZW50LmlubmVySFRNTCA9IG5vZGUuX19wcm9wZXJ0eSgnc2NyaXB0ZWRUZW1wbGF0ZScpIGFzIHN0cmluZztcblxuICAobm9kZS5fX3Byb3BlcnR5KCdjb21wb25lbnRzJykgYXMgQXJyYXk8Q29tcG9uZW50PikuZm9yRWFjaChmdW5jdGlvbihjb21wb25lbnQ6IENvbXBvbmVudCk6IHZvaWQge1xuICAgIG5vZGVEb21FbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYHMtJHtjb21wb25lbnQuX19wcm9wZXJ0eSgndGFnJyl9YCkuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50OiBFbGVtZW50KTogdm9pZCB7XG4gICAgICBlbGVtZW50Lm91dGVySFRNTCA9IGA8ZGl2ICR7c25ha2VDb21wb25lbnRDb21tb25BdHRyaWJ1dGUoKX09XCIke2NvbXBvbmVudC5fX3Byb3BlcnR5KFxuICAgICAgICAndGFnJ1xuICAgICAgKX1cIj4ke2NvbXBvbmVudC5fX3Byb3BlcnR5KCdzY3JpcHRlZFRlbXBsYXRlJyl9PC9kaXY+YDtcblxuICAgICAgcmVuZGVyTm9kZShjb21wb25lbnQpO1xuICAgIH0pO1xuICB9KTtcblxuICBydW5PdXRwdXRzV2F0Y2hpbmcobm9kZSwgbm9kZURvbUVsZW1lbnQpO1xuXG4gIGlmIChub2RlLl9fcHJvcGVydHkoJ2RvbUVsZW1lbnRzSW5qZWN0aW9uT3BlcmF0aW9uVHJlYWQnKSA+IDApIHtcbiAgICBydW5Eb21FbGVtZW50SW5qZWN0aW9uKG5vZGUsIG5vZGVEb21FbGVtZW50KTtcbiAgfVxuXG4gIG5vZGUuX19zZXRWaWV3QXNMb2FkZWQoKTtcbn1cbiIsImltcG9ydCB7IEV2ZW50VHlwZXMsIHJ1bkNvZGVCaW5kaW5nT2JqZWN0LCB0aHJvd05ld0Vycm9yIH0gZnJvbSAnLi4vLi4vLi4vLi4va2VybmVsJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICcuLi8uLi8uLi9fdHlwZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gcnVuT3V0cHV0c1dhdGNoaW5nKG5vZGU6IE5vZGUsIG5vZGVEb21FbGVtZW50OiBFbGVtZW50KTogdm9pZCB7XG4gIE9iamVjdC5rZXlzKEV2ZW50VHlwZXMpLmZvckVhY2goZnVuY3Rpb24oZXZlbnRUeXBlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBldmVudEF0dHJpYnV0ZSA9IGBzLW9uLSR7ZXZlbnRUeXBlfWA7XG5cbiAgICBub2RlRG9tRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbJHtldmVudEF0dHJpYnV0ZX1dYCkuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50OiBFbGVtZW50KTogdm9pZCB7XG4gICAgICBjb25zdCBhdHRyaWJ1dGVWYWx1ZSA9IGVsZW1lbnQuYXR0cmlidXRlcy5nZXROYW1lZEl0ZW0oZXZlbnRBdHRyaWJ1dGUpLnZhbHVlO1xuXG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBmdW5jdGlvbihldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKGF0dHJpYnV0ZVZhbHVlLm1hdGNoKC8oXFwoLipcXCkpL2dtKSkge1xuICAgICAgICAgIGxldCBwcm9wZXJ0eU5hbWUgPSBhdHRyaWJ1dGVWYWx1ZS5yZXBsYWNlKC8oXFwoLio/XFwpKS9nbSwgJycpO1xuXG4gICAgICAgICAgaWYgKG5vZGUuX19kYXRhKCkuaGFzT3duUHJvcGVydHkocHJvcGVydHlOYW1lKSAmJiB0eXBlb2Ygbm9kZS5fX2RhdGEoKVtwcm9wZXJ0eU5hbWVdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9wZXJ0eVBhcmFtcyA9IGF0dHJpYnV0ZVZhbHVlXG4gICAgICAgICAgICAgIC5yZXBsYWNlKC9eKFthLXpdfFtBLVpdKSpcXCh8XFwpL2dtLCAnJylcbiAgICAgICAgICAgICAgLnNwbGl0KCcsJylcbiAgICAgICAgICAgICAgLm1hcChmdW5jdGlvbihwYXJhbTogc3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmFtLnJlcGxhY2UoL1xccy9nLCAnJyk7XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb25zdCBwYXJhbXMgPSBbXTtcblxuICAgICAgICAgICAgcHJvcGVydHlQYXJhbXMuZm9yRWFjaChmdW5jdGlvbihwcm9wZXJ0eTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgICAgICAgIGlmIChwcm9wZXJ0eSA9PT0gJyRldmVudCcpIHtcbiAgICAgICAgICAgICAgICBwYXJhbXMucHVzaChldmVudCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUuX19kYXRhKCkuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XG4gICAgICAgICAgICAgICAgICBwYXJhbXMucHVzaChub2RlLl9fZGF0YSgpW3Byb3BlcnR5XSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHRocm93TmV3RXJyb3IoYFwiJHtwcm9wZXJ0eX1cIiBpcyBub3QgYSBwcm9wZXJ0eSBvZiBjb21wb25lbnQgXCIke25vZGUuX19wcm9wZXJ0eSgndGFnJyl9XCIuYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbm9kZS5fX2RhdGEoKVtwcm9wZXJ0eU5hbWVdKC4uLnBhcmFtcyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93TmV3RXJyb3IoYFwiJHtwcm9wZXJ0eU5hbWV9XCIgbWV0aG9kIGlzIG5vdCBjYWxsYWJsZSBvbiBjb21wb25lbnQgXCIke25vZGUuX19wcm9wZXJ0eSgndGFnJyl9XCIuYCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJ1bkNvZGVCaW5kaW5nT2JqZWN0KGF0dHJpYnV0ZVZhbHVlLCBub2RlLl9fZGF0YSgpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBlbGVtZW50LmF0dHJpYnV0ZXMucmVtb3ZlTmFtZWRJdGVtKGV2ZW50QXR0cmlidXRlKTtcbiAgICB9KTtcbiAgfSk7XG59XG4iLCJpbXBvcnQgeyBzbmFrZUNvbXBvbmVudENvbW1vbkF0dHJpYnV0ZSwgdGhyb3dOZXdFcnJvciB9IGZyb20gJy4uLy4uLy4uLy4uL2tlcm5lbCc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi4vLi4vLi4vX3R5cGVzJztcbmltcG9ydCB7IGluamVjdENvbnRlbnRzVG9CaW5kZWREb21FbGVtZW50cyB9IGZyb20gJy4vX2RvbS1lbGVtZW50cyc7XG5pbXBvcnQgeyBsb2FkTm9kZVZpZXcgfSBmcm9tICcuL19sb2FkLW5vZGUtdmlldyc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJOb2RlPFQ+KF9ub2RlOiBOb2RlPFQ+KTogdm9pZCB7XG4gIGNvbnN0IG5vZGUgPSB7IC4uLl9ub2RlIH07XG5cbiAgbGV0IG5vZGVEb21FbGVtZW50ID0gbm9kZS5fX3Byb3BlcnR5KCdkb21FbGVtZW50JykgYXMgRWxlbWVudDtcblxuICBpZiAoIW5vZGVEb21FbGVtZW50KSB7XG4gICAgbm9kZURvbUVsZW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgWyR7c25ha2VDb21wb25lbnRDb21tb25BdHRyaWJ1dGUoKX09JHtub2RlLl9fcHJvcGVydHkoJ3RhZycpfV1gKTtcbiAgfVxuXG4gIGlmICghbm9kZURvbUVsZW1lbnQpIHtcbiAgICB0aHJvd05ld0Vycm9yKGAnJHtub2RlLl9fcHJvcGVydHkoJ3RhZycpfScgY29tcG9uZW50IGlzIHVua25vd25lZCBmb3IgdGhlIERPTS5gKTtcbiAgfVxuXG4gIGlmICghbm9kZS5fX3Byb3BlcnR5KCdpc1ZpZXdMb2FkZWQnKSkge1xuICAgIGxvYWROb2RlVmlldyhub2RlLCBub2RlRG9tRWxlbWVudCk7XG4gIH1cblxuICBpbmplY3RDb250ZW50c1RvQmluZGVkRG9tRWxlbWVudHMobm9kZSk7XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL19kb20tZWxlbWVudHMnO1xuZXhwb3J0ICogZnJvbSAnLi9fb3V0cHV0cyc7XG5leHBvcnQgKiBmcm9tICcuL19sb2FkLW5vZGUtdmlldyc7XG5leHBvcnQgKiBmcm9tICcuL19yZW5kZXItbm9kZSc7XG4iLCJleHBvcnQgKiBmcm9tICcuL3NyYyc7XG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnQnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0YWJsZURpY3Rpb25uYXkgfSBmcm9tICcuLi8uLi8uLi9pbmplY3RhYmxlJztcbmltcG9ydCB7IERhdGFBY2Nlc3NvciwgdGVtcGxhdGVCaW5kaW5nUmd4LCB0aHJvd05ld0Vycm9yIH0gZnJvbSAnLi4vLi4vLi4va2VybmVsJztcbmltcG9ydCB7IHVuaXF1ZUlkIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkJztcbmltcG9ydCB7IE5vZGUsIE5vZGVQcm9wZXJ0aWVzSW5wdXQsIE5vZGVQcm9wZXJ0eUtleSwgTm9kZVByb3BlcnR5VmFsdWUsIE5vZGVQcm9wZXJ0aWVzIH0gZnJvbSAnLi4vLi4vX3R5cGVzJztcbmltcG9ydCB7XG4gIHJlbmRlck5vZGUsXG4gIHJ1bkRhdGFBY2Nlc3NvcixcbiAgdHJhbnNmZXJJbmplY3RhYmxlc1RvQ2hpbGRDb21wb25lbnRzLFxuICB0cmFuc2ZlclRlbXBsYXRlSW5qZWN0aW9uVXNpbmdWYWx1ZVRvQ2hpbGRDb21wb25lbnRzXG59IGZyb20gJy4uL2hlbHBlcnMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTm9kZTxOPihfcHJvcGVydGllczogTm9kZVByb3BlcnRpZXNJbnB1dCwgX2RhdGFBY2Nlc3Nvcj86IERhdGFBY2Nlc3NvcjxOPik6IE5vZGU8Tj4ge1xuICBjb25zdCBwcm9wZXJ0aWVzOiBOb2RlUHJvcGVydGllcyA9IHtcbiAgICAuLi5fcHJvcGVydGllcyxcbiAgICBiaW5kZWREb21FbGVtZW50czoge30sXG4gICAgY29tcG9uZW50czogbmV3IEFycmF5PENvbXBvbmVudD4oKSxcbiAgICBkb21FbGVtZW50c0luamVjdGlvbk9wZXJhdGlvblRyZWFkOiAwLFxuICAgIGluamVjdGFibGVEaWN0aW9ubmF5OiB7fSxcbiAgICBpc1ZpZXdMb2FkZWQ6IGZhbHNlLFxuICAgIHNjcmlwdGVkRGF0YToge30sXG4gICAgdGVtcGxhdGVJbmplY3Rpb25Vc2luZzogdHJ1ZVxuICB9O1xuXG4gIGxldCBkYXRhOiBOO1xuXG4gIGNvbnN0IG5vZGU6IE5vZGU8Tj4gPSB7XG4gICAgX19jbG9zZU9uZURvbUVsZW1lbnRzSW5qZWN0aW9uT3BlcmF0aW9uKCk6IHZvaWQge1xuICAgICAgcHJvcGVydGllcy5kb21FbGVtZW50c0luamVjdGlvbk9wZXJhdGlvblRyZWFkLS07XG4gICAgfSxcblxuICAgIF9fZGF0YSgpOiBOIHtcbiAgICAgIGlmICghZGF0YSkge1xuICAgICAgICBkYXRhID0gbmV3IFByb3h5KHJ1bkRhdGFBY2Nlc3Nvcih0aGlzLCBfZGF0YUFjY2Vzc29yKSwge1xuICAgICAgICAgIHNldCh0YXJnZXQ6IE4sIHByb3BlcnR5OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICAgICAgICAgIHRhcmdldFtwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIHJlbmRlck5vZGUobm9kZSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfSxcblxuICAgIF9faW5qZWN0Q29udGVudFRvQmluZGVkRG9tRWxlbWVudChjb250ZW50OiBzdHJpbmcsIHVpZDogc3RyaW5nKTogdm9pZCB7XG4gICAgICBwcm9wZXJ0aWVzLmJpbmRlZERvbUVsZW1lbnRzW3VpZF0udGV4dENvbnRlbnQgPSBjb250ZW50O1xuICAgIH0sXG5cbiAgICBfX3Byb3BlcnR5KGtleTogTm9kZVByb3BlcnR5S2V5KTogTm9kZVByb3BlcnR5VmFsdWUge1xuICAgICAgY29uc3QgdmFsdWUgPSBwcm9wZXJ0aWVzW2tleV07XG4gICAgICBpZiAoa2V5ID09PSAnZG9tRWxlbWVudCcpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHZhbHVlKSA/IFsuLi52YWx1ZV0gOiB7IC4uLnZhbHVlIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9XG4gICAgfSxcblxuICAgIF9fc2V0Vmlld0FzTG9hZGVkKCk6IHZvaWQge1xuICAgICAgcHJvcGVydGllcy5pc1ZpZXdMb2FkZWQgPSB0cnVlO1xuICAgIH0sXG5cbiAgICBfX3NldFRlbXBsYXRlSW5qZWN0aW9uVXNpbmcodmFsdWUgPSB0cnVlKTogdm9pZCB7XG4gICAgICBwcm9wZXJ0aWVzLnRlbXBsYXRlSW5qZWN0aW9uVXNpbmcgPSB2YWx1ZTtcblxuICAgICAgdHJhbnNmZXJUZW1wbGF0ZUluamVjdGlvblVzaW5nVmFsdWVUb0NoaWxkQ29tcG9uZW50cyh0aGlzKTtcbiAgICB9LFxuXG4gICAgcmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50OiBDb21wb25lbnQpOiBOb2RlPE4+IHtcbiAgICAgIHByb3BlcnRpZXMuY29tcG9uZW50cyA9IFsuLi5wcm9wZXJ0aWVzLmNvbXBvbmVudHMsIGNvbXBvbmVudF07XG5cbiAgICAgIHRyYW5zZmVySW5qZWN0YWJsZXNUb0NoaWxkQ29tcG9uZW50cyh0aGlzKTtcblxuICAgICAgdHJhbnNmZXJUZW1wbGF0ZUluamVjdGlvblVzaW5nVmFsdWVUb0NoaWxkQ29tcG9uZW50cyh0aGlzKTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIHJlZ2lzdGVyQ29tcG9uZW50cyguLi5jb21wb25lbnRzOiBBcnJheTxDb21wb25lbnQ+KTogTm9kZTxOPiB7XG4gICAgICBjb21wb25lbnRzLmZvckVhY2goKGNvbXBvbmVudDogQ29tcG9uZW50KSA9PiB7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50KTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIHJlZ2lzdGVySW5qZWN0YWJsZShpbmplY3RhYmxlOiBJbmplY3RhYmxlKTogTm9kZTxOPiB7XG4gICAgICBjb25zdCBwYXRjaDogSW5qZWN0YWJsZURpY3Rpb25uYXkgPSB7fTtcblxuICAgICAgcGF0Y2hbaW5qZWN0YWJsZS5pZCgpXSA9IGluamVjdGFibGU7XG5cbiAgICAgIHByb3BlcnRpZXMuaW5qZWN0YWJsZURpY3Rpb25uYXkgPSB7IC4uLnByb3BlcnRpZXMuaW5qZWN0YWJsZURpY3Rpb25uYXksIC4uLnBhdGNoIH07XG5cbiAgICAgIHRyYW5zZmVySW5qZWN0YWJsZXNUb0NoaWxkQ29tcG9uZW50cyh0aGlzKTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIHJlZ2lzdGVySW5qZWN0YWJsZXMoLi4uaW5qZWN0YWJsZXM6IEFycmF5PEluamVjdGFibGU+KTogTm9kZTxOPiB7XG4gICAgICBpbmplY3RhYmxlcy5mb3JFYWNoKChpbmplY3RhYmxlOiBJbmplY3RhYmxlKSA9PiB7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJJbmplY3RhYmxlKGluamVjdGFibGUpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgcmVuZGVyKCk6IE5vZGU8Tj4ge1xuICAgICAgcmVuZGVyTm9kZSh0aGlzKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBzZXRUZW1wbGF0ZSh0ZW1wbGF0ZTogc3RyaW5nKTogTm9kZTxOPiB7XG4gICAgICBpZiAoIXRlbXBsYXRlKSB7XG4gICAgICAgIHRocm93TmV3RXJyb3IoJ1BsZWFzZSBkZWZpbmUgYSBjb3JyZWN0IHRlbXBsYXRlLicpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzY3JpcHRlZFRlcm1zID0gdGVtcGxhdGUubWF0Y2godGVtcGxhdGVCaW5kaW5nUmd4KCkpO1xuXG4gICAgICBpZiAoc2NyaXB0ZWRUZXJtcykge1xuICAgICAgICBzY3JpcHRlZFRlcm1zLmZvckVhY2goZnVuY3Rpb24oc2NyaXB0ZWRUZXJtOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgICBjb25zdCB0ZXJtQmVmb3JlQ29tcHV0aW5nID0gc2NyaXB0ZWRUZXJtLnJlcGxhY2UoLyh7e3x9fSkvZ20sICcnKTtcblxuICAgICAgICAgIGNvbnN0IHVpZCA9IHVuaXF1ZUlkKCk7XG5cbiAgICAgICAgICBwcm9wZXJ0aWVzLnNjcmlwdGVkRGF0YVt1aWRdID0gdGVybUJlZm9yZUNvbXB1dGluZztcblxuICAgICAgICAgIHByb3BlcnRpZXMuYmluZGVkRG9tRWxlbWVudHNbdWlkXSA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG5cbiAgICAgICAgICBwcm9wZXJ0aWVzLmRvbUVsZW1lbnRzSW5qZWN0aW9uT3BlcmF0aW9uVHJlYWQrKztcblxuICAgICAgICAgIHRlbXBsYXRlID0gdGVtcGxhdGUucmVwbGFjZShzY3JpcHRlZFRlcm0sIGA8IS0tJHt1aWR9LS0+YCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBwcm9wZXJ0aWVzLnNjcmlwdGVkVGVtcGxhdGUgPSB0ZW1wbGF0ZTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBub2RlO1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9fZmFjdG9yeSc7XG4iLCJpbXBvcnQgeyBhcnJvd0Z1bmN0aW9uUmd4LCB0aW1lc3RhbXAsIHdhcm5pbmcgfSBmcm9tICcuL2tlcm5lbCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0FuQXJyb3dGbihmbjogRnVuY3Rpb24pOiBib29sZWFuIHtcbiAgcmV0dXJuIHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJyAmJiBhcnJvd0Z1bmN0aW9uUmd4KCkudGVzdChmbi50b1N0cmluZygpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRyeUFuZENhdGNoT3JSZXR1cm48VD4oZm46ICgpID0+IFQpOiBUIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZm4oKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgd2FybmluZyhlcnIpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bmlxdWVJZCgpOiBzdHJpbmcge1xuICByZXR1cm4gYCR7dGltZXN0YW1wKCl9JHtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMCl9YDtcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vbGliJztcbmV4cG9ydCAqIGZyb20gJy4vdHlwZXMnO1xuIiwiaW1wb3J0IHsgRGF0YUFjY2Vzc29yLCB0aHJvd05ld0Vycm9yIH0gZnJvbSAnLi4va2VybmVsJztcbmltcG9ydCB7IGNyZWF0ZU5vZGUgfSBmcm9tICcuLi9ub2RlJztcbmltcG9ydCB7IHRyeUFuZENhdGNoT3JSZXR1cm4gfSBmcm9tICcuLi9zaGFyZWQnO1xuaW1wb3J0IHsgU25ha2UgfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHNuYWtlPFM+KF9zZWxlY3Rvcjogc3RyaW5nLCBfZGF0YT86IERhdGFBY2Nlc3NvcjxTPik6IFNuYWtlPFM+IHtcbiAgcmV0dXJuIHRyeUFuZENhdGNoT3JSZXR1cm4oZnVuY3Rpb24oKSB7XG4gICAgaWYgKCFnbG9iYWxUaGlzLndpbmRvdykge1xuICAgICAgdGhyb3dOZXdFcnJvcihgV2luZG93IG9iamVjdCBpcyB1bmtub3duZWQuYCk7XG4gICAgfVxuXG4gICAgY29uc3QgZG9tRWxlbWVudCA9IHdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKF9zZWxlY3RvcikgYXMgRWxlbWVudDtcblxuICAgIGlmICghZG9tRWxlbWVudCkge1xuICAgICAgdGhyb3dOZXdFcnJvcihgXCIke19zZWxlY3Rvcn1cIiBlbGVtZW50IGRvZXNuJ3QgZXhpc3QgaW4gRE9NLmApO1xuICAgIH1cblxuICAgIGNvbnN0IHNuYWtlOiBTbmFrZTxTPiA9IHtcbiAgICAgIC4uLmNyZWF0ZU5vZGU8Uz4oXG4gICAgICAgIHtcbiAgICAgICAgICBkb21FbGVtZW50LFxuICAgICAgICAgIHRhZzogX3NlbGVjdG9yLFxuICAgICAgICAgIHNjcmlwdGVkVGVtcGxhdGU6IGA8aDE+Q29uZ3JhdHVsYXRpb25zICE8L2gxPlxuICAgICAgICAgIDxwPllvdSBqdXN0IGNyZWF0ZWQgYSBTbmFrZS5qcyBhcHAgaGVyZS48L2gxPmBcbiAgICAgICAgfSxcbiAgICAgICAgX2RhdGFcbiAgICAgICksXG5cbiAgICAgIGVuYWJsZVRlbXBsYXRlSW5qZWN0aW9uKHZhbHVlID0gdHJ1ZSk6IFNuYWtlPFM+IHtcbiAgICAgICAgdGhpcy5fX3NldFRlbXBsYXRlSW5qZWN0aW9uVXNpbmcodmFsdWUpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gc25ha2U7XG4gIH0pO1xufVxuIl19
