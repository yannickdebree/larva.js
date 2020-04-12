(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./src/main");

},{"./src/main":20}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],3:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./lib"));
__export(require("./_types"));

},{"./_types":2,"./lib":6}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./_web-component"));

},{"./_web-component":4}],6:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./src"));

},{"./src":8}],7:[function(require,module,exports){
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

},{"../../../node":22,"../../../shared":35,"../helpers":5}],8:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./_factory"));

},{"./_factory":7}],9:[function(require,module,exports){
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

},{"../kernel":19,"../shared":35}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],11:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./_lib"));
__export(require("./_types"));

},{"./_lib":9,"./_types":10}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function throwNewError(message) {
    throw new Error(message);
}
exports.throwNewError = throwNewError;

},{}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function warning(error) {
    console.error(error);
}
exports.warning = warning;

},{}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],18:[function(require,module,exports){
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

},{"../shared":35}],19:[function(require,module,exports){
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
__export(require("./_types"));
__export(require("./_utils"));

},{"./_dom":12,"./_error":13,"./_event":14,"./_logger":15,"./_regex":16,"./_types":17,"./_utils":18}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("./component");
const injectable_1 = require("./injectable");
const snake_1 = require("./snake");
globalThis.createComponent = component_1.createComponent;
globalThis.createInjectable = injectable_1.createInjectable;
globalThis.snake = snake_1.snake;

},{"./component":3,"./injectable":11,"./snake":36}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],22:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./lib"));
__export(require("./_types"));

},{"./_types":21,"./lib":32}],23:[function(require,module,exports){
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

},{"../../../kernel":19,"./_injectables":24}],24:[function(require,module,exports){
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

},{"../../../kernel":19}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function transferTemplateInjectionUsingValueToChildComponents(node) {
    node.__property('components').forEach(function (component) {
        component.__setTemplateInjectionUsing(node.__property('templateInjectionUsing'));
    });
}
exports.transferTemplateInjectionUsingValueToChildComponents = transferTemplateInjectionUsingValueToChildComponents;

},{}],26:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./rendering"));
__export(require("./_data-accessor"));
__export(require("./_template-injection"));
__export(require("./_injectables"));

},{"./_data-accessor":23,"./_injectables":24,"./_template-injection":25,"./rendering":31}],27:[function(require,module,exports){
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

},{"../../../../kernel":19}],28:[function(require,module,exports){
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

},{"../../../../kernel":19,"./_dom-elements":27,"./_outputs":29,"./_render-node":30}],29:[function(require,module,exports){
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

},{"../../../../kernel":19}],30:[function(require,module,exports){
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

},{"../../../../kernel":19,"./_dom-elements":27,"./_load-node-view":28}],31:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./_dom-elements"));
__export(require("./_outputs"));
__export(require("./_load-node-view"));
__export(require("./_render-node"));

},{"./_dom-elements":27,"./_load-node-view":28,"./_outputs":29,"./_render-node":30}],32:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./src"));

},{"./src":34}],33:[function(require,module,exports){
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
        registerInjectable(injectable) {
            const patch = {};
            patch[injectable.id()] = injectable;
            properties.injectableDictionnay = Object.assign(Object.assign({}, properties.injectableDictionnay), patch);
            helpers_1.transferInjectablesToChildComponents(this);
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

},{"../../../kernel":19,"../../../shared":35,"../helpers":26}],34:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./_factory"));

},{"./_factory":33}],35:[function(require,module,exports){
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

},{"./kernel":19}],36:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./lib"));
__export(require("./types"));

},{"./lib":37,"./types":38}],37:[function(require,module,exports){
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

},{"../kernel":19,"../node":22,"../shared":35}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwYWNrYWdlcy9jb3JlL2luZGV4LnRzIiwicGFja2FnZXMvY29yZS9zcmMvY29tcG9uZW50L2luZGV4LnRzIiwicGFja2FnZXMvY29yZS9zcmMvY29tcG9uZW50L2xpYi9oZWxwZXJzL193ZWItY29tcG9uZW50LnRzIiwicGFja2FnZXMvY29yZS9zcmMvY29tcG9uZW50L2xpYi9oZWxwZXJzL2luZGV4LnRzIiwicGFja2FnZXMvY29yZS9zcmMvY29tcG9uZW50L2xpYi9pbmRleC50cyIsInBhY2thZ2VzL2NvcmUvc3JjL2NvbXBvbmVudC9saWIvc3JjL19mYWN0b3J5LnRzIiwicGFja2FnZXMvY29yZS9zcmMvY29tcG9uZW50L2xpYi9zcmMvaW5kZXgudHMiLCJwYWNrYWdlcy9jb3JlL3NyYy9pbmplY3RhYmxlL19saWIudHMiLCJwYWNrYWdlcy9jb3JlL3NyYy9pbmplY3RhYmxlL2luZGV4LnRzIiwicGFja2FnZXMvY29yZS9zcmMva2VybmVsL19kb20udHMiLCJwYWNrYWdlcy9jb3JlL3NyYy9rZXJuZWwvX2Vycm9yLnRzIiwicGFja2FnZXMvY29yZS9zcmMva2VybmVsL19ldmVudC50cyIsInBhY2thZ2VzL2NvcmUvc3JjL2tlcm5lbC9fbG9nZ2VyLnRzIiwicGFja2FnZXMvY29yZS9zcmMva2VybmVsL19yZWdleC50cyIsInBhY2thZ2VzL2NvcmUvc3JjL2tlcm5lbC9fdXRpbHMudHMiLCJwYWNrYWdlcy9jb3JlL3NyYy9rZXJuZWwvaW5kZXgudHMiLCJwYWNrYWdlcy9jb3JlL3NyYy9tYWluLnRzIiwicGFja2FnZXMvY29yZS9zcmMvbm9kZS9pbmRleC50cyIsInBhY2thZ2VzL2NvcmUvc3JjL25vZGUvbGliL2hlbHBlcnMvX2RhdGEtYWNjZXNzb3IudHMiLCJwYWNrYWdlcy9jb3JlL3NyYy9ub2RlL2xpYi9oZWxwZXJzL19pbmplY3RhYmxlcy50cyIsInBhY2thZ2VzL2NvcmUvc3JjL25vZGUvbGliL2hlbHBlcnMvX3RlbXBsYXRlLWluamVjdGlvbi50cyIsInBhY2thZ2VzL2NvcmUvc3JjL25vZGUvbGliL2hlbHBlcnMvaW5kZXgudHMiLCJwYWNrYWdlcy9jb3JlL3NyYy9ub2RlL2xpYi9oZWxwZXJzL3JlbmRlcmluZy9fZG9tLWVsZW1lbnRzLnRzIiwicGFja2FnZXMvY29yZS9zcmMvbm9kZS9saWIvaGVscGVycy9yZW5kZXJpbmcvX2xvYWQtbm9kZS12aWV3LnRzIiwicGFja2FnZXMvY29yZS9zcmMvbm9kZS9saWIvaGVscGVycy9yZW5kZXJpbmcvX291dHB1dHMudHMiLCJwYWNrYWdlcy9jb3JlL3NyYy9ub2RlL2xpYi9oZWxwZXJzL3JlbmRlcmluZy9fcmVuZGVyLW5vZGUudHMiLCJwYWNrYWdlcy9jb3JlL3NyYy9ub2RlL2xpYi9oZWxwZXJzL3JlbmRlcmluZy9pbmRleC50cyIsInBhY2thZ2VzL2NvcmUvc3JjL25vZGUvbGliL2luZGV4LnRzIiwicGFja2FnZXMvY29yZS9zcmMvbm9kZS9saWIvc3JjL19mYWN0b3J5LnRzIiwicGFja2FnZXMvY29yZS9zcmMvbm9kZS9saWIvc3JjL2luZGV4LnRzIiwicGFja2FnZXMvY29yZS9zcmMvc2hhcmVkLnRzIiwicGFja2FnZXMvY29yZS9zcmMvc25ha2UvaW5kZXgudHMiLCJwYWNrYWdlcy9jb3JlL3NyYy9zbmFrZS9saWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLHNCQUFvQjs7Ozs7Ozs7Ozs7O0FDQXBCLDJCQUFzQjtBQUN0Qiw4QkFBeUI7Ozs7O0FDQ3pCLFNBQWdCLHFCQUFxQixDQUFDLElBQVU7SUFDOUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQzFCLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUM3QixLQUFNLFNBQVEsV0FBVztRQUN2QjtZQUNFLEtBQUssRUFBRSxDQUFDO1lBQ1IsSUFBSSxDQUFDLFNBQVMsR0FBRyxzQkFBc0IsQ0FBQztRQUMx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QUFJLENBQUMsMkJBQTJCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRXhDLE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQyxHQUNGLENBQUM7UUFFRixPQUFPLEtBQUssQ0FBQztJQUNmLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQWhDRCxzQkFnQ0MiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgJy4vc3JjL21haW4nO1xuIiwiZXhwb3J0ICogZnJvbSAnLi9saWInO1xuZXhwb3J0ICogZnJvbSAnLi9fdHlwZXMnO1xuIiwiaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4uLy4uLy4uL25vZGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlTm9kZUFzV2ViQ29tcG9uZW50KG5vZGU6IE5vZGUpOiB2b2lkIHtcbiAgd2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZShcbiAgICBgcy0ke25vZGUuX19wcm9wZXJ0eSgndGFnJyl9YCxcbiAgICBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmlubmVySFRNTCA9ICdGZWF0dXJlIGluIHByb2dyZXNzLic7XG4gICAgICB9XG4gICAgfVxuICApO1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9fd2ViLWNvbXBvbmVudCc7XG4iLCJleHBvcnQgKiBmcm9tICcuL3NyYyc7XG4iLCJpbXBvcnQgeyBEYXRhQWNjZXNzb3IgfSBmcm9tICcuLi8uLi8uLi9rZXJuZWwnO1xuaW1wb3J0IHsgY3JlYXRlTm9kZSB9IGZyb20gJy4uLy4uLy4uL25vZGUnO1xuaW1wb3J0IHsgdHJ5QW5kQ2F0Y2hPclJldHVybiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZCc7XG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuLi8uLi9fdHlwZXMnO1xuaW1wb3J0IHsgdXNlTm9kZUFzV2ViQ29tcG9uZW50IH0gZnJvbSAnLi4vaGVscGVycyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDb21wb25lbnQ8Qz4odGFnOiBzdHJpbmcsIGRhdGFBY2Nlc3Nvcj86IERhdGFBY2Nlc3NvcjxDPik6IENvbXBvbmVudDxDPiB7XG4gIHJldHVybiB0cnlBbmRDYXRjaE9yUmV0dXJuKGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IG5vZGUgPSBjcmVhdGVOb2RlKFxuICAgICAge1xuICAgICAgICBkb21FbGVtZW50OiB1bmRlZmluZWQsXG4gICAgICAgIHRhZyxcbiAgICAgICAgc2NyaXB0ZWRUZW1wbGF0ZTogJydcbiAgICAgIH0sXG4gICAgICBkYXRhQWNjZXNzb3JcbiAgICApO1xuXG4gICAgY29uc3QgY29tcG9uZW50OiBDb21wb25lbnQ8Qz4gPSB7XG4gICAgICAuLi5ub2RlLFxuXG4gICAgICB1c2VBc1dlYkNvbXBvbmVudCgpOiB2b2lkIHtcbiAgICAgICAgdXNlTm9kZUFzV2ViQ29tcG9uZW50KHRoaXMpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gY29tcG9uZW50O1xuICB9KTtcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vX2ZhY3RvcnknO1xuIiwiaW1wb3J0IHsgRGF0YUFjY2Vzc29yLCBmbkFyZ3VtZW50c05hbWVzIH0gZnJvbSAnLi4va2VybmVsJztcbmltcG9ydCB7IHRyeUFuZENhdGNoT3JSZXR1cm4gfSBmcm9tICcuLi9zaGFyZWQnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0YWJsZUlkIH0gZnJvbSAnLi9fdHlwZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSW5qZWN0YWJsZTxJPihpZDogSW5qZWN0YWJsZUlkLCBkYXRhQWNjZXNzb3I6IERhdGFBY2Nlc3NvcjxJPik6IEluamVjdGFibGU8ST4ge1xuICByZXR1cm4gdHJ5QW5kQ2F0Y2hPclJldHVybihmdW5jdGlvbigpIHtcbiAgICBjb25zdCBpbmplY3RhYmxlc0lkcyA9IG5ldyBBcnJheTxJbmplY3RhYmxlSWQ+KCk7XG5cbiAgICBpZiAoZGF0YUFjY2Vzc29yKSB7XG4gICAgICBpbmplY3RhYmxlc0lkcy5wdXNoKC4uLmZuQXJndW1lbnRzTmFtZXMoZGF0YUFjY2Vzc29yKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGlkKCk6IEluamVjdGFibGVJZCB7XG4gICAgICAgIHJldHVybiBpZDtcbiAgICAgIH0sXG4gICAgICBkYXRhQWNjZXNzb3IoKTogRGF0YUFjY2Vzc29yPEk+IHtcbiAgICAgICAgcmV0dXJuIGRhdGFBY2Nlc3NvcjtcbiAgICAgIH0sXG4gICAgICBpbmplY3RhYmxlc0lkcygpOiBBcnJheTxJbmplY3RhYmxlSWQ+IHtcbiAgICAgICAgcmV0dXJuIFsuLi5pbmplY3RhYmxlc0lkc107XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL19saWInO1xuZXhwb3J0ICogZnJvbSAnLi9fdHlwZXMnO1xuIiwiZXhwb3J0IGZ1bmN0aW9uIGZpbmRDb21tZW50TWFya2VkQnlVaWQodWlkOiBzdHJpbmcsIGVsZW1lbnQ6IENoaWxkTm9kZSk6IENoaWxkTm9kZSB7XG4gIGNvbnN0IGNoaWxkTm9kZXNMZW5ndGggPSBlbGVtZW50LmNoaWxkTm9kZXMubGVuZ3RoO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGROb2Rlc0xlbmd0aDsgKytpKSB7XG4gICAgY29uc3QgY2hpbGROb2RlID0gZWxlbWVudC5jaGlsZE5vZGVzW2ldO1xuXG4gICAgaWYgKGNoaWxkTm9kZS5ub2RlVHlwZSA9PT0gOCAmJiBjaGlsZE5vZGUubm9kZVZhbHVlID09PSB1aWQpIHtcbiAgICAgIHJldHVybiBjaGlsZE5vZGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG5vZGUgPSBmaW5kQ29tbWVudE1hcmtlZEJ5VWlkKHVpZCwgY2hpbGROb2RlKTtcblxuICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gdGhyb3dOZXdFcnJvcihtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcbiAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xufVxuIiwiZXhwb3J0IGVudW0gRXZlbnRUeXBlcyB7XG4gIGNsaWNrLFxuICBrZXlwcmVzcyxcbiAga2V5ZG93bixcbiAga2V5dXAsXG4gIG1vdXNlb3ZlcixcbiAgc3VibWl0XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gd2FybmluZyhlcnJvcjogRXJyb3IpOiB2b2lkIHtcbiAgY29uc29sZS5lcnJvcihlcnJvcik7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gdGVtcGxhdGVCaW5kaW5nUmd4KCk6IFJlZ0V4cCB7XG4gIHJldHVybiAvKFxce3suKj9cXH19KS9nbTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJpbmRpbmdNYXJrUmd4KCk6IFJlZ0V4cCB7XG4gIHJldHVybiAvKFxcPCEtLS4qP1xcLS0+KS9nbTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFycm93RnVuY3Rpb25SZ3goKTogUmVnRXhwIHtcbiAgcmV0dXJuIC9eW157XSs/PT4vZ207XG59XG4iLCJpbXBvcnQgeyBpc0FuQXJyb3dGbiB9IGZyb20gJy4uL3NoYXJlZCc7XG5cbmV4cG9ydCBmdW5jdGlvbiB0aW1lc3RhbXAoKTogc3RyaW5nIHtcbiAgcmV0dXJuIGAke25ldyBEYXRlKCkuZ2V0VGltZSgpLnRvU3RyaW5nKCl9YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNuYWtlQ29tcG9uZW50Q29tbW9uQXR0cmlidXRlKCk6IHN0cmluZyB7XG4gIHJldHVybiAnc25ha2UtaWQnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm5Bcmd1bWVudHNOYW1lcyhmbjogRnVuY3Rpb24pOiBBcnJheTxzdHJpbmc+IHtcbiAgbGV0IHBhcmFtczogc3RyaW5nO1xuICBpZiAoaXNBbkFycm93Rm4oZm4pKSB7XG4gICAgcGFyYW1zID0gZm5cbiAgICAgIC50b1N0cmluZygpXG4gICAgICAucmVwbGFjZSgvXFxzKj0+XFxzKlxcKCp7LiovZ3MsICcnKVxuICAgICAgLnJlcGxhY2UoL1xcKHxcXCkvZ20sICcnKVxuICAgICAgLnJlcGxhY2UoL1xccyovZ20sICcnKTtcbiAgfSBlbHNlIHtcbiAgICBwYXJhbXMgPSBmblxuICAgICAgLnRvU3RyaW5nKClcbiAgICAgIC5yZXBsYWNlKC9bL11bL10uKiQvZ20sICcnKVxuICAgICAgLnJlcGxhY2UoL1xccysvZywgJycpXG4gICAgICAucmVwbGFjZSgvWy9dWypdW14vKl0qWypdWy9dL2csICcnKVxuICAgICAgLnNwbGl0KCcpeycsIDEpWzBdXG4gICAgICAucmVwbGFjZSgvXlteKF0qWyhdLywgJycpXG4gICAgICAucmVwbGFjZSgvPVteLF0rL2csICcnKTtcbiAgfVxuICBpZiAocGFyYW1zICE9PSAnJykge1xuICAgIHJldHVybiBwYXJhbXMuc3BsaXQoJywnKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gW107XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJ1bkNvZGVCaW5kaW5nT2JqZWN0PE8+KGNvZGVUb1J1bjogc3RyaW5nLCBvYmo6IE8pOiB1bmtub3duIHtcbiAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGZ1bmN0aW9uKGtleTogc3RyaW5nKSB7XG4gICAgY29kZVRvUnVuID0gY29kZVRvUnVuLnJlcGxhY2Uoa2V5LCBgdGhpcy4ke2tleX1gKTtcbiAgfSk7XG5cbiAgcmV0dXJuIG5ldyBGdW5jdGlvbihgcmV0dXJuICR7Y29kZVRvUnVufWApLmJpbmQob2JqKSgpO1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9fZG9tJztcbmV4cG9ydCAqIGZyb20gJy4vX2Vycm9yJztcbmV4cG9ydCAqIGZyb20gJy4vX2V2ZW50JztcbmV4cG9ydCAqIGZyb20gJy4vX2xvZ2dlcic7XG5leHBvcnQgKiBmcm9tICcuL19yZWdleCc7XG5leHBvcnQgKiBmcm9tICcuL190eXBlcyc7XG5leHBvcnQgKiBmcm9tICcuL191dGlscyc7XG4iLCJpbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudCc7XG5pbXBvcnQgeyBjcmVhdGVJbmplY3RhYmxlIH0gZnJvbSAnLi9pbmplY3RhYmxlJztcbmltcG9ydCB7IHNuYWtlIH0gZnJvbSAnLi9zbmFrZSc7XG5cbmdsb2JhbFRoaXMuY3JlYXRlQ29tcG9uZW50ID0gY3JlYXRlQ29tcG9uZW50O1xuZ2xvYmFsVGhpcy5jcmVhdGVJbmplY3RhYmxlID0gY3JlYXRlSW5qZWN0YWJsZTtcbmdsb2JhbFRoaXMuc25ha2UgPSBzbmFrZTtcbiIsImV4cG9ydCAqIGZyb20gJy4vbGliJztcbmV4cG9ydCAqIGZyb20gJy4vX3R5cGVzJztcbiIsImltcG9ydCB7IEluamVjdGFibGVJZCB9IGZyb20gJy4uLy4uLy4uL2luamVjdGFibGUnO1xuaW1wb3J0IHsgRGF0YUFjY2Vzc29yLCBmbkFyZ3VtZW50c05hbWVzLCB0aHJvd05ld0Vycm9yIH0gZnJvbSAnLi4vLi4vLi4va2VybmVsJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICcuLi8uLi9fdHlwZXMnO1xuaW1wb3J0IHsgdHJhbnNsYXRlSW5qZWN0YWJsZXMgfSBmcm9tICcuL19pbmplY3RhYmxlcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBydW5EYXRhQWNjZXNzb3I8RCA9IGFueT4obm9kZTogTm9kZTxEPiwgX2RhdGFBY2Nlc3NvcjogRGF0YUFjY2Vzc29yPEQ+KTogRCB8IGFueSB7XG4gIGlmIChfZGF0YUFjY2Vzc29yKSB7XG4gICAgY29uc3QgaW5qZWN0YWJsZXNJZHM6IEFycmF5PEluamVjdGFibGVJZD4gPSBmbkFyZ3VtZW50c05hbWVzKF9kYXRhQWNjZXNzb3IpO1xuXG4gICAgY29uc3QgY29tcHV0ZWREYXRhOiBEID0gX2RhdGFBY2Nlc3NvciguLi50cmFuc2xhdGVJbmplY3RhYmxlcyhub2RlLCBpbmplY3RhYmxlc0lkcykpO1xuXG4gICAgaWYgKCFjb21wdXRlZERhdGEpIHtcbiAgICAgIHRocm93TmV3RXJyb3IoJ05vZGUgZGF0YSBzZXR0aW5nIG11c3QgYWx3YXlzIHJldHVybiBhbiBvYmplY3QuJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbXB1dGVkRGF0YTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4ge307XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RhYmxlRGljdGlvbm5heSwgSW5qZWN0YWJsZUlkIH0gZnJvbSAnLi4vLi4vLi4vaW5qZWN0YWJsZSc7XG5pbXBvcnQgeyBEZXBlbmRlbmN5LCB0aHJvd05ld0Vycm9yIH0gZnJvbSAnLi4vLi4vLi4va2VybmVsJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICcuLi8uLi9fdHlwZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmZXJJbmplY3RhYmxlc1RvQ2hpbGRDb21wb25lbnRzKG5vZGU6IE5vZGUpOiB2b2lkIHtcbiAgKG5vZGUuX19wcm9wZXJ0eSgnY29tcG9uZW50cycpIGFzIEFycmF5PENvbXBvbmVudD4pLmZvckVhY2goZnVuY3Rpb24oY29tcG9uZW50OiBDb21wb25lbnQpOiB2b2lkIHtcbiAgICBPYmplY3QudmFsdWVzKG5vZGUuX19wcm9wZXJ0eSgnaW5qZWN0YWJsZURpY3Rpb25uYXknKSBhcyBJbmplY3RhYmxlRGljdGlvbm5heSkuZm9yRWFjaChmdW5jdGlvbihcbiAgICAgIGluamVjdGFibGU6IEluamVjdGFibGVcbiAgICApIHtcbiAgICAgIGNvbXBvbmVudC5yZWdpc3RlckluamVjdGFibGUoaW5qZWN0YWJsZSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNsYXRlSW5qZWN0YWJsZXMobm9kZTogTm9kZSwgaW5qZWN0YWJsZXNJZHM6IEFycmF5PEluamVjdGFibGVJZD4pOiBEZXBlbmRlbmN5W10ge1xuICByZXR1cm4gaW5qZWN0YWJsZXNJZHMubWFwKGZ1bmN0aW9uKGluamVjdGFibGVJZDogc3RyaW5nKSB7XG4gICAgY29uc3QgaW5qZWN0YWJsZTogSW5qZWN0YWJsZSA9IG5vZGUuX19wcm9wZXJ0eSgnaW5qZWN0YWJsZURpY3Rpb25uYXknKVtpbmplY3RhYmxlSWRdO1xuXG4gICAgaWYgKCFpbmplY3RhYmxlKSB7XG4gICAgICB0aHJvd05ld0Vycm9yKGBcIiR7aW5qZWN0YWJsZUlkfVwiIGlzIG5vdCBkZWNsYXJlZCBhcyBpbmplY3RhYmxlIGluIHRoZSBcIiR7bm9kZS5fX3Byb3BlcnR5KCd0YWcnKX1cIiBub2RlLmApO1xuICAgIH1cblxuICAgIGNvbnN0IGRlcGVuZGVuY2llcyA9IG5ldyBBcnJheTxEZXBlbmRlbmN5PigpO1xuXG4gICAgaWYgKGluamVjdGFibGUuaW5qZWN0YWJsZXNJZHMoKS5sZW5ndGgpIHtcbiAgICAgIGRlcGVuZGVuY2llcy5wdXNoKC4uLnRyYW5zbGF0ZUluamVjdGFibGVzKG5vZGUsIGluamVjdGFibGUuaW5qZWN0YWJsZXNJZHMoKSkpO1xuICAgIH1cblxuICAgIHJldHVybiBpbmplY3RhYmxlLmRhdGFBY2Nlc3NvcigpKC4uLmRlcGVuZGVuY2llcyk7XG4gIH0pO1xufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50JztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICcuLi8uLi9fdHlwZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmZXJUZW1wbGF0ZUluamVjdGlvblVzaW5nVmFsdWVUb0NoaWxkQ29tcG9uZW50cyhub2RlOiBOb2RlKTogdm9pZCB7XG4gIChub2RlLl9fcHJvcGVydHkoJ2NvbXBvbmVudHMnKSBhcyBBcnJheTxDb21wb25lbnQ+KS5mb3JFYWNoKGZ1bmN0aW9uKGNvbXBvbmVudDogQ29tcG9uZW50KTogdm9pZCB7XG4gICAgY29tcG9uZW50Ll9fc2V0VGVtcGxhdGVJbmplY3Rpb25Vc2luZyhub2RlLl9fcHJvcGVydHkoJ3RlbXBsYXRlSW5qZWN0aW9uVXNpbmcnKSBhcyBib29sZWFuKTtcbiAgfSk7XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL3JlbmRlcmluZyc7XG5leHBvcnQgKiBmcm9tICcuL19kYXRhLWFjY2Vzc29yJztcbmV4cG9ydCAqIGZyb20gJy4vX3RlbXBsYXRlLWluamVjdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL19pbmplY3RhYmxlcyc7XG4iLCJpbXBvcnQgeyBiaW5kaW5nTWFya1JneCwgZmluZENvbW1lbnRNYXJrZWRCeVVpZCwgcnVuQ29kZUJpbmRpbmdPYmplY3QgfSBmcm9tICcuLi8uLi8uLi8uLi9rZXJuZWwnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4uLy4uLy4uL190eXBlcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBydW5Eb21FbGVtZW50SW5qZWN0aW9uKG5vZGU6IE5vZGUsIG5vZGVEb21FbGVtZW50OiBFbGVtZW50KTogdm9pZCB7XG4gIGNvbnN0IG1hcmtlZEJpbmRlZFBvaW50cyA9IChub2RlLl9fcHJvcGVydHkoJ3NjcmlwdGVkVGVtcGxhdGUnKSBhcyBzdHJpbmcpLm1hdGNoKGJpbmRpbmdNYXJrUmd4KCkpIHx8IFtdO1xuXG4gIG1hcmtlZEJpbmRlZFBvaW50cy5mb3JFYWNoKGZ1bmN0aW9uKG1hcmtlZEJpbmRlZFBvaW50OiBzdHJpbmcpIHtcbiAgICBjb25zdCB1aWQgPSBtYXJrZWRCaW5kZWRQb2ludC5yZXBsYWNlKC8oPCEtLXwtLT4pL2dtLCAnJyk7XG5cbiAgICBjb25zdCBjb21tZW50ID0gZmluZENvbW1lbnRNYXJrZWRCeVVpZCh1aWQsIG5vZGVEb21FbGVtZW50KTtcblxuICAgIGNvbnN0IGNvbW1lbnRQYXJlbnQgPSBjb21tZW50LnBhcmVudE5vZGU7XG5cbiAgICBjb21tZW50UGFyZW50LnJlcGxhY2VDaGlsZChub2RlLl9fcHJvcGVydHkoJ2JpbmRlZERvbUVsZW1lbnRzJylbdWlkXSwgY29tbWVudCk7XG5cbiAgICBub2RlLl9fY2xvc2VPbmVEb21FbGVtZW50c0luamVjdGlvbk9wZXJhdGlvbigpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluamVjdENvbnRlbnRzVG9CaW5kZWREb21FbGVtZW50cyhub2RlOiBOb2RlKTogdm9pZCB7XG4gIE9iamVjdC5rZXlzKG5vZGUuX19wcm9wZXJ0eSgnYmluZGVkRG9tRWxlbWVudHMnKSkuZm9yRWFjaChmdW5jdGlvbih1aWQ6IHN0cmluZykge1xuICAgIG5vZGUuX19pbmplY3RDb250ZW50VG9CaW5kZWREb21FbGVtZW50KFxuICAgICAgcnVuQ29kZUJpbmRpbmdPYmplY3Qobm9kZS5fX3Byb3BlcnR5KCdzY3JpcHRlZERhdGEnKVt1aWRdLCBub2RlLl9fZGF0YSgpKSBhcyBzdHJpbmcsXG4gICAgICB1aWRcbiAgICApO1xuICB9KTtcbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uLy4uL2NvbXBvbmVudCc7XG5pbXBvcnQgeyBzbmFrZUNvbXBvbmVudENvbW1vbkF0dHJpYnV0ZSB9IGZyb20gJy4uLy4uLy4uLy4uL2tlcm5lbCc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi4vLi4vLi4vX3R5cGVzJztcbmltcG9ydCB7IHJ1bkRvbUVsZW1lbnRJbmplY3Rpb24gfSBmcm9tICcuL19kb20tZWxlbWVudHMnO1xuaW1wb3J0IHsgcnVuT3V0cHV0c1dhdGNoaW5nIH0gZnJvbSAnLi9fb3V0cHV0cyc7XG5pbXBvcnQgeyByZW5kZXJOb2RlIH0gZnJvbSAnLi9fcmVuZGVyLW5vZGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gbG9hZE5vZGVWaWV3KG5vZGU6IE5vZGUsIG5vZGVEb21FbGVtZW50OiBFbGVtZW50KSB7XG4gIGlmICghbm9kZS5fX3Byb3BlcnR5KCd0ZW1wbGF0ZUluamVjdGlvblVzaW5nJykpIHtcbiAgICAobm9kZS5fX3Byb3BlcnR5KCdjb21wb25lbnRzJykgYXMgQXJyYXk8Q29tcG9uZW50PikuZm9yRWFjaChmdW5jdGlvbihjb21wb25lbnQ6IENvbXBvbmVudCk6IHZvaWQge1xuICAgICAgbm9kZURvbUVsZW1lbnRcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoYFske3NuYWtlQ29tcG9uZW50Q29tbW9uQXR0cmlidXRlKCl9PVwiJHtjb21wb25lbnQuX19wcm9wZXJ0eSgndGFnJyl9XCJdYClcbiAgICAgICAgLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudDogRWxlbWVudCk6IHZvaWQge1xuICAgICAgICAgIGNvbXBvbmVudC5zZXRUZW1wbGF0ZShlbGVtZW50LmlubmVySFRNTCk7XG5cbiAgICAgICAgICBub2RlRG9tRWxlbWVudC5yZXBsYWNlQ2hpbGQod2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYHMtJHtjb21wb25lbnQuX19wcm9wZXJ0eSgndGFnJyl9YCksIGVsZW1lbnQpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIG5vZGUuc2V0VGVtcGxhdGUobm9kZURvbUVsZW1lbnQuaW5uZXJIVE1MKTtcbiAgfVxuXG4gIG5vZGVEb21FbGVtZW50LmlubmVySFRNTCA9IG5vZGUuX19wcm9wZXJ0eSgnc2NyaXB0ZWRUZW1wbGF0ZScpIGFzIHN0cmluZztcblxuICAobm9kZS5fX3Byb3BlcnR5KCdjb21wb25lbnRzJykgYXMgQXJyYXk8Q29tcG9uZW50PikuZm9yRWFjaChmdW5jdGlvbihjb21wb25lbnQ6IENvbXBvbmVudCk6IHZvaWQge1xuICAgIG5vZGVEb21FbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYHMtJHtjb21wb25lbnQuX19wcm9wZXJ0eSgndGFnJyl9YCkuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50OiBFbGVtZW50KTogdm9pZCB7XG4gICAgICBlbGVtZW50Lm91dGVySFRNTCA9IGA8ZGl2ICR7c25ha2VDb21wb25lbnRDb21tb25BdHRyaWJ1dGUoKX09XCIke2NvbXBvbmVudC5fX3Byb3BlcnR5KFxuICAgICAgICAndGFnJ1xuICAgICAgKX1cIj4ke2NvbXBvbmVudC5fX3Byb3BlcnR5KCdzY3JpcHRlZFRlbXBsYXRlJyl9PC9kaXY+YDtcblxuICAgICAgcmVuZGVyTm9kZShjb21wb25lbnQpO1xuICAgIH0pO1xuICB9KTtcblxuICBydW5PdXRwdXRzV2F0Y2hpbmcobm9kZSwgbm9kZURvbUVsZW1lbnQpO1xuXG4gIGlmIChub2RlLl9fcHJvcGVydHkoJ2RvbUVsZW1lbnRzSW5qZWN0aW9uT3BlcmF0aW9uVHJlYWQnKSA+IDApIHtcbiAgICBydW5Eb21FbGVtZW50SW5qZWN0aW9uKG5vZGUsIG5vZGVEb21FbGVtZW50KTtcbiAgfVxuXG4gIG5vZGUuX19zZXRWaWV3QXNMb2FkZWQoKTtcbn1cbiIsImltcG9ydCB7IEV2ZW50VHlwZXMsIHJ1bkNvZGVCaW5kaW5nT2JqZWN0LCB0aHJvd05ld0Vycm9yIH0gZnJvbSAnLi4vLi4vLi4vLi4va2VybmVsJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICcuLi8uLi8uLi9fdHlwZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gcnVuT3V0cHV0c1dhdGNoaW5nKG5vZGU6IE5vZGUsIG5vZGVEb21FbGVtZW50OiBFbGVtZW50KTogdm9pZCB7XG4gIE9iamVjdC5rZXlzKEV2ZW50VHlwZXMpLmZvckVhY2goZnVuY3Rpb24oZXZlbnRUeXBlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBldmVudEF0dHJpYnV0ZSA9IGBzLW9uLSR7ZXZlbnRUeXBlfWA7XG5cbiAgICBub2RlRG9tRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbJHtldmVudEF0dHJpYnV0ZX1dYCkuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50OiBFbGVtZW50KTogdm9pZCB7XG4gICAgICBjb25zdCBhdHRyaWJ1dGVWYWx1ZSA9IGVsZW1lbnQuYXR0cmlidXRlcy5nZXROYW1lZEl0ZW0oZXZlbnRBdHRyaWJ1dGUpLnZhbHVlO1xuXG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBmdW5jdGlvbihldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKGF0dHJpYnV0ZVZhbHVlLm1hdGNoKC8oXFwoLipcXCkpL2dtKSkge1xuICAgICAgICAgIGxldCBwcm9wZXJ0eU5hbWUgPSBhdHRyaWJ1dGVWYWx1ZS5yZXBsYWNlKC8oXFwoLio/XFwpKS9nbSwgJycpO1xuXG4gICAgICAgICAgaWYgKG5vZGUuX19kYXRhKCkuaGFzT3duUHJvcGVydHkocHJvcGVydHlOYW1lKSAmJiB0eXBlb2Ygbm9kZS5fX2RhdGEoKVtwcm9wZXJ0eU5hbWVdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9wZXJ0eVBhcmFtcyA9IGF0dHJpYnV0ZVZhbHVlXG4gICAgICAgICAgICAgIC5yZXBsYWNlKC9eKFthLXpdfFtBLVpdKSpcXCh8XFwpL2dtLCAnJylcbiAgICAgICAgICAgICAgLnNwbGl0KCcsJylcbiAgICAgICAgICAgICAgLm1hcChmdW5jdGlvbihwYXJhbTogc3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmFtLnJlcGxhY2UoL1xccy9nLCAnJyk7XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb25zdCBwYXJhbXMgPSBbXTtcblxuICAgICAgICAgICAgcHJvcGVydHlQYXJhbXMuZm9yRWFjaChmdW5jdGlvbihwcm9wZXJ0eTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgICAgICAgIGlmIChwcm9wZXJ0eSA9PT0gJyRldmVudCcpIHtcbiAgICAgICAgICAgICAgICBwYXJhbXMucHVzaChldmVudCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUuX19kYXRhKCkuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XG4gICAgICAgICAgICAgICAgICBwYXJhbXMucHVzaChub2RlLl9fZGF0YSgpW3Byb3BlcnR5XSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHRocm93TmV3RXJyb3IoYFwiJHtwcm9wZXJ0eX1cIiBpcyBub3QgYSBwcm9wZXJ0eSBvZiBjb21wb25lbnQgXCIke25vZGUuX19wcm9wZXJ0eSgndGFnJyl9XCIuYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbm9kZS5fX2RhdGEoKVtwcm9wZXJ0eU5hbWVdKC4uLnBhcmFtcyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93TmV3RXJyb3IoYFwiJHtwcm9wZXJ0eU5hbWV9XCIgbWV0aG9kIGlzIG5vdCBjYWxsYWJsZSBvbiBjb21wb25lbnQgXCIke25vZGUuX19wcm9wZXJ0eSgndGFnJyl9XCIuYCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJ1bkNvZGVCaW5kaW5nT2JqZWN0KGF0dHJpYnV0ZVZhbHVlLCBub2RlLl9fZGF0YSgpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBlbGVtZW50LmF0dHJpYnV0ZXMucmVtb3ZlTmFtZWRJdGVtKGV2ZW50QXR0cmlidXRlKTtcbiAgICB9KTtcbiAgfSk7XG59XG4iLCJpbXBvcnQgeyBzbmFrZUNvbXBvbmVudENvbW1vbkF0dHJpYnV0ZSwgdGhyb3dOZXdFcnJvciB9IGZyb20gJy4uLy4uLy4uLy4uL2tlcm5lbCc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi4vLi4vLi4vX3R5cGVzJztcbmltcG9ydCB7IGluamVjdENvbnRlbnRzVG9CaW5kZWREb21FbGVtZW50cyB9IGZyb20gJy4vX2RvbS1lbGVtZW50cyc7XG5pbXBvcnQgeyBsb2FkTm9kZVZpZXcgfSBmcm9tICcuL19sb2FkLW5vZGUtdmlldyc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJOb2RlPFQ+KF9ub2RlOiBOb2RlPFQ+KTogdm9pZCB7XG4gIGNvbnN0IG5vZGUgPSB7IC4uLl9ub2RlIH07XG5cbiAgbGV0IG5vZGVEb21FbGVtZW50ID0gbm9kZS5fX3Byb3BlcnR5KCdkb21FbGVtZW50JykgYXMgRWxlbWVudDtcblxuICBpZiAoIW5vZGVEb21FbGVtZW50KSB7XG4gICAgbm9kZURvbUVsZW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgWyR7c25ha2VDb21wb25lbnRDb21tb25BdHRyaWJ1dGUoKX09JHtub2RlLl9fcHJvcGVydHkoJ3RhZycpfV1gKTtcbiAgfVxuXG4gIGlmICghbm9kZURvbUVsZW1lbnQpIHtcbiAgICB0aHJvd05ld0Vycm9yKGAnJHtub2RlLl9fcHJvcGVydHkoJ3RhZycpfScgY29tcG9uZW50IGlzIHVua25vd25lZCBmb3IgdGhlIERPTS5gKTtcbiAgfVxuXG4gIGlmICghbm9kZS5fX3Byb3BlcnR5KCdpc1ZpZXdMb2FkZWQnKSkge1xuICAgIGxvYWROb2RlVmlldyhub2RlLCBub2RlRG9tRWxlbWVudCk7XG4gIH1cblxuICBpbmplY3RDb250ZW50c1RvQmluZGVkRG9tRWxlbWVudHMobm9kZSk7XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL19kb20tZWxlbWVudHMnO1xuZXhwb3J0ICogZnJvbSAnLi9fb3V0cHV0cyc7XG5leHBvcnQgKiBmcm9tICcuL19sb2FkLW5vZGUtdmlldyc7XG5leHBvcnQgKiBmcm9tICcuL19yZW5kZXItbm9kZSc7XG4iLCJleHBvcnQgKiBmcm9tICcuL3NyYyc7XG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnQnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0YWJsZURpY3Rpb25uYXkgfSBmcm9tICcuLi8uLi8uLi9pbmplY3RhYmxlJztcbmltcG9ydCB7IERhdGFBY2Nlc3NvciwgdGVtcGxhdGVCaW5kaW5nUmd4LCB0aHJvd05ld0Vycm9yIH0gZnJvbSAnLi4vLi4vLi4va2VybmVsJztcbmltcG9ydCB7IHVuaXF1ZUlkIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkJztcbmltcG9ydCB7IE5vZGUsIE5vZGVQcm9wZXJ0aWVzSW5wdXQsIE5vZGVQcm9wZXJ0eUtleSwgTm9kZVByb3BlcnR5VmFsdWUgfSBmcm9tICcuLi8uLi9fdHlwZXMnO1xuaW1wb3J0IHtcbiAgcmVuZGVyTm9kZSxcbiAgcnVuRGF0YUFjY2Vzc29yLFxuICB0cmFuc2ZlckluamVjdGFibGVzVG9DaGlsZENvbXBvbmVudHMsXG4gIHRyYW5zZmVyVGVtcGxhdGVJbmplY3Rpb25Vc2luZ1ZhbHVlVG9DaGlsZENvbXBvbmVudHNcbn0gZnJvbSAnLi4vaGVscGVycyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVOb2RlPE4+KF9wcm9wZXJ0aWVzOiBOb2RlUHJvcGVydGllc0lucHV0LCBfZGF0YUFjY2Vzc29yPzogRGF0YUFjY2Vzc29yPE4+KTogTm9kZTxOPiB7XG4gIGNvbnN0IHByb3BlcnRpZXMgPSB7XG4gICAgLi4uX3Byb3BlcnRpZXMsXG4gICAgYmluZGVkRG9tRWxlbWVudHM6IHt9LFxuICAgIGNvbXBvbmVudHM6IG5ldyBBcnJheTxDb21wb25lbnQ+KCksXG4gICAgZG9tRWxlbWVudHNJbmplY3Rpb25PcGVyYXRpb25UcmVhZDogMCxcbiAgICBpbmplY3RhYmxlRGljdGlvbm5heToge30sXG4gICAgaXNWaWV3TG9hZGVkOiBmYWxzZSxcbiAgICBzY3JpcHRlZERhdGE6IHt9LFxuICAgIHRlbXBsYXRlSW5qZWN0aW9uVXNpbmc6IHRydWVcbiAgfTtcblxuICBsZXQgZGF0YTogTjtcblxuICBjb25zdCBub2RlOiBOb2RlPE4+ID0ge1xuICAgIF9fY2xvc2VPbmVEb21FbGVtZW50c0luamVjdGlvbk9wZXJhdGlvbigpOiB2b2lkIHtcbiAgICAgIHByb3BlcnRpZXMuZG9tRWxlbWVudHNJbmplY3Rpb25PcGVyYXRpb25UcmVhZC0tO1xuICAgIH0sXG5cbiAgICBfX2RhdGEoKTogTiB7XG4gICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgZGF0YSA9IG5ldyBQcm94eShydW5EYXRhQWNjZXNzb3IodGhpcywgX2RhdGFBY2Nlc3NvciksIHtcbiAgICAgICAgICBzZXQodGFyZ2V0OiBOLCBwcm9wZXJ0eTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgICAgICAgICB0YXJnZXRbcHJvcGVydHldID0gdmFsdWU7XG4gICAgICAgICAgICByZW5kZXJOb2RlKG5vZGUpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0sXG5cbiAgICBfX2luamVjdENvbnRlbnRUb0JpbmRlZERvbUVsZW1lbnQoY29udGVudDogc3RyaW5nLCB1aWQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgcHJvcGVydGllcy5iaW5kZWREb21FbGVtZW50c1t1aWRdLnRleHRDb250ZW50ID0gY29udGVudDtcbiAgICB9LFxuXG4gICAgX19wcm9wZXJ0eShrZXk6IE5vZGVQcm9wZXJ0eUtleSk6IE5vZGVQcm9wZXJ0eVZhbHVlIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcHJvcGVydGllc1trZXldO1xuICAgICAgaWYgKGtleSA9PT0gJ2RvbUVsZW1lbnQnKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyBbLi4udmFsdWVdIDogeyAuLi52YWx1ZSB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBfX3NldFZpZXdBc0xvYWRlZCgpOiB2b2lkIHtcbiAgICAgIHByb3BlcnRpZXMuaXNWaWV3TG9hZGVkID0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgX19zZXRUZW1wbGF0ZUluamVjdGlvblVzaW5nKHZhbHVlID0gdHJ1ZSk6IHZvaWQge1xuICAgICAgcHJvcGVydGllcy50ZW1wbGF0ZUluamVjdGlvblVzaW5nID0gdmFsdWU7XG5cbiAgICAgIHRyYW5zZmVyVGVtcGxhdGVJbmplY3Rpb25Vc2luZ1ZhbHVlVG9DaGlsZENvbXBvbmVudHModGhpcyk7XG4gICAgfSxcblxuICAgIHJlZ2lzdGVyQ29tcG9uZW50KGNvbXBvbmVudDogQ29tcG9uZW50KTogTm9kZTxOPiB7XG4gICAgICBwcm9wZXJ0aWVzLmNvbXBvbmVudHMgPSBbLi4ucHJvcGVydGllcy5jb21wb25lbnRzLCBjb21wb25lbnRdO1xuXG4gICAgICB0cmFuc2ZlckluamVjdGFibGVzVG9DaGlsZENvbXBvbmVudHModGhpcyk7XG5cbiAgICAgIHRyYW5zZmVyVGVtcGxhdGVJbmplY3Rpb25Vc2luZ1ZhbHVlVG9DaGlsZENvbXBvbmVudHModGhpcyk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICByZWdpc3RlckluamVjdGFibGUoaW5qZWN0YWJsZTogSW5qZWN0YWJsZSkge1xuICAgICAgY29uc3QgcGF0Y2g6IEluamVjdGFibGVEaWN0aW9ubmF5ID0ge307XG5cbiAgICAgIHBhdGNoW2luamVjdGFibGUuaWQoKV0gPSBpbmplY3RhYmxlO1xuXG4gICAgICBwcm9wZXJ0aWVzLmluamVjdGFibGVEaWN0aW9ubmF5ID0geyAuLi5wcm9wZXJ0aWVzLmluamVjdGFibGVEaWN0aW9ubmF5LCAuLi5wYXRjaCB9O1xuXG4gICAgICB0cmFuc2ZlckluamVjdGFibGVzVG9DaGlsZENvbXBvbmVudHModGhpcyk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICByZW5kZXIoKTogTm9kZTxOPiB7XG4gICAgICByZW5kZXJOb2RlKHRoaXMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIHNldFRlbXBsYXRlKHRlbXBsYXRlOiBzdHJpbmcpOiBOb2RlPE4+IHtcbiAgICAgIGlmICghdGVtcGxhdGUpIHtcbiAgICAgICAgdGhyb3dOZXdFcnJvcignUGxlYXNlIGRlZmluZSBhIGNvcnJlY3QgdGVtcGxhdGUuJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNjcmlwdGVkVGVybXMgPSB0ZW1wbGF0ZS5tYXRjaCh0ZW1wbGF0ZUJpbmRpbmdSZ3goKSk7XG5cbiAgICAgIGlmIChzY3JpcHRlZFRlcm1zKSB7XG4gICAgICAgIHNjcmlwdGVkVGVybXMuZm9yRWFjaChmdW5jdGlvbihzY3JpcHRlZFRlcm06IHN0cmluZyk6IHZvaWQge1xuICAgICAgICAgIGNvbnN0IHRlcm1CZWZvcmVDb21wdXRpbmcgPSBzY3JpcHRlZFRlcm0ucmVwbGFjZSgvKHt7fH19KS9nbSwgJycpO1xuXG4gICAgICAgICAgY29uc3QgdWlkID0gdW5pcXVlSWQoKTtcblxuICAgICAgICAgIHByb3BlcnRpZXMuc2NyaXB0ZWREYXRhW3VpZF0gPSB0ZXJtQmVmb3JlQ29tcHV0aW5nO1xuXG4gICAgICAgICAgcHJvcGVydGllcy5iaW5kZWREb21FbGVtZW50c1t1aWRdID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcblxuICAgICAgICAgIHByb3BlcnRpZXMuZG9tRWxlbWVudHNJbmplY3Rpb25PcGVyYXRpb25UcmVhZCsrO1xuXG4gICAgICAgICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5yZXBsYWNlKHNjcmlwdGVkVGVybSwgYDwhLS0ke3VpZH0tLT5gKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHByb3BlcnRpZXMuc2NyaXB0ZWRUZW1wbGF0ZSA9IHRlbXBsYXRlO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIG5vZGU7XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL19mYWN0b3J5JztcbiIsImltcG9ydCB7IGFycm93RnVuY3Rpb25SZ3gsIHRpbWVzdGFtcCwgd2FybmluZyB9IGZyb20gJy4va2VybmVsJztcblxuZXhwb3J0IGZ1bmN0aW9uIGlzQW5BcnJvd0ZuKGZuOiBGdW5jdGlvbik6IGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZW9mIGZuID09PSAnZnVuY3Rpb24nICYmIGFycm93RnVuY3Rpb25SZ3goKS50ZXN0KGZuLnRvU3RyaW5nKCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdHJ5QW5kQ2F0Y2hPclJldHVybjxUPihmbjogKCkgPT4gVCk6IFQge1xuICB0cnkge1xuICAgIHJldHVybiBmbigpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICB3YXJuaW5nKGVycik7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuaXF1ZUlkKCk6IHN0cmluZyB7XG4gIHJldHVybiBgJHt0aW1lc3RhbXAoKX0ke01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwKX1gO1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9saWInO1xuZXhwb3J0ICogZnJvbSAnLi90eXBlcyc7XG4iLCJpbXBvcnQgeyBEYXRhQWNjZXNzb3IsIHRocm93TmV3RXJyb3IgfSBmcm9tICcuLi9rZXJuZWwnO1xuaW1wb3J0IHsgY3JlYXRlTm9kZSB9IGZyb20gJy4uL25vZGUnO1xuaW1wb3J0IHsgdHJ5QW5kQ2F0Y2hPclJldHVybiB9IGZyb20gJy4uL3NoYXJlZCc7XG5pbXBvcnQgeyBTbmFrZSB9IGZyb20gJy4vdHlwZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gc25ha2U8Uz4oX3NlbGVjdG9yOiBzdHJpbmcsIF9kYXRhPzogRGF0YUFjY2Vzc29yPFM+KTogU25ha2U8Uz4ge1xuICByZXR1cm4gdHJ5QW5kQ2F0Y2hPclJldHVybihmdW5jdGlvbigpIHtcbiAgICBpZiAoIWdsb2JhbFRoaXMud2luZG93KSB7XG4gICAgICB0aHJvd05ld0Vycm9yKGBXaW5kb3cgb2JqZWN0IGlzIHVua25vd25lZC5gKTtcbiAgICB9XG5cbiAgICBjb25zdCBkb21FbGVtZW50OiBFbGVtZW50ID0gd2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoX3NlbGVjdG9yKTtcblxuICAgIGlmICghZG9tRWxlbWVudCkge1xuICAgICAgdGhyb3dOZXdFcnJvcihgXCIke19zZWxlY3Rvcn1cIiBlbGVtZW50IGRvZXNuJ3QgZXhpc3QgaW4gRE9NLmApO1xuICAgIH1cblxuICAgIGNvbnN0IHNuYWtlOiBTbmFrZTxTPiA9IHtcbiAgICAgIC4uLmNyZWF0ZU5vZGU8Uz4oXG4gICAgICAgIHtcbiAgICAgICAgICBkb21FbGVtZW50LFxuICAgICAgICAgIHRhZzogX3NlbGVjdG9yLFxuICAgICAgICAgIHNjcmlwdGVkVGVtcGxhdGU6IGA8aDE+Q29uZ3JhdHVsYXRpb25zICE8L2gxPlxuICAgICAgICAgIDxwPllvdSBqdXN0IGNyZWF0ZWQgYSBTbmFrZS5qcyBhcHAgaGVyZS48L2gxPmBcbiAgICAgICAgfSxcbiAgICAgICAgX2RhdGFcbiAgICAgICksXG5cbiAgICAgIGVuYWJsZVRlbXBsYXRlSW5qZWN0aW9uKHZhbHVlID0gdHJ1ZSk6IFNuYWtlPFM+IHtcbiAgICAgICAgdGhpcy5fX3NldFRlbXBsYXRlSW5qZWN0aW9uVXNpbmcodmFsdWUpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gc25ha2U7XG4gIH0pO1xufVxuIl19
