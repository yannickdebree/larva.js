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
__export(require("./o"));

},{"./o":8}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("../../../node");
const shared_1 = require("../../../shared");
const i_1 = require("../i");
function createComponent(tag, dataAccessor) {
    return shared_1.tryAndCatchOrReturn(function () {
        const node = node_1.createNode({
            domElement: undefined,
            tag,
            scriptedTemplate: ''
        }, dataAccessor);
        const component = Object.assign(Object.assign({}, node), { useAsWebComponent() {
                i_1.useNodeAsWebComponent(this);
            } });
        return component;
    });
}
exports.createComponent = createComponent;

},{"../../../node":22,"../../../shared":35,"../i":5}],8:[function(require,module,exports){
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
        if (dataAccessor && shared_1.isAnArrowFn(dataAccessor)) {
            kernel_1.throwNewError(kernel_1.arrowFnErrorMessage());
        }
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
arguments[4][2][0].apply(exports,arguments)
},{"dup":2}],11:[function(require,module,exports){
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
function arrowFnErrorMessage() {
    return 'Function in params must be a closed scope function, not an arrow function.';
}
exports.arrowFnErrorMessage = arrowFnErrorMessage;

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
arguments[4][2][0].apply(exports,arguments)
},{"dup":2}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function timestamp() {
    return `${new Date().getTime().toString()}`;
}
exports.timestamp = timestamp;
function snakeComponentCommonAttribute() {
    return 'snake-id';
}
exports.snakeComponentCommonAttribute = snakeComponentCommonAttribute;
function fnArgumentsNames(fn) {
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
exports.fnArgumentsNames = fnArgumentsNames;
function runCodeBindingObject(codeToRun, obj) {
    Object.keys(obj).forEach(function (key) {
        codeToRun = codeToRun.replace(key, `this.${key}`);
    });
    return new Function(`return ${codeToRun}`).bind(obj)();
}
exports.runCodeBindingObject = runCodeBindingObject;

},{}],19:[function(require,module,exports){
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
arguments[4][2][0].apply(exports,arguments)
},{"dup":2}],22:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"./_types":21,"./lib":32,"dup":3}],23:[function(require,module,exports){
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
    console.log(node);
    console.log(nodeDomElement);
    if (!node.__property('templateInjectionUsing')) {
    }
    else {
        nodeDomElement.innerHTML = node.__property('scriptedTemplate');
        node.__property('components').forEach(function (component) {
            nodeDomElement.querySelectorAll(`s-${component.__property('tag')}`).forEach(function (element) {
                element.outerHTML = `<div ${kernel_1.snakeComponentCommonAttribute()}="${component.__property('tag')}">${component.__property('scriptedTemplate')}</div>`;
                _render_node_1.renderNode(component);
            });
        });
    }
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
    console.log(node.__property('tag'));
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
arguments[4][6][0].apply(exports,arguments)
},{"./o":34,"dup":6}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kernel_1 = require("../../../kernel");
const shared_1 = require("../../../shared");
const i_1 = require("../i");
function createNode(_properties, _dataAccessor) {
    if (_dataAccessor && shared_1.isAnArrowFn(_dataAccessor)) {
        kernel_1.throwNewError(kernel_1.arrowFnErrorMessage());
    }
    const properties = Object.assign(Object.assign({}, _properties), { bindedDomElements: {}, components: new Array(), domElementsInjectionOperationTread: 0, injectableDictionnay: {}, isViewLoaded: false, scriptedData: {}, templateInjectionUsing: true });
    let data;
    const node = {
        __closeOneDomElementsInjectionOperation() {
            properties.domElementsInjectionOperationTread--;
        },
        __data() {
            if (!data) {
                data = new Proxy(i_1.runDataAccessor(this, _dataAccessor), {
                    set(target, property, value) {
                        target[property] = value;
                        i_1.renderNode(this);
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
            i_1.transferTemplateInjectionUsingValueToChildComponents(this);
        },
        registerComponent(component) {
            properties.components = [...properties.components, component];
            i_1.transferInjectablesToChildComponents(this);
            i_1.transferTemplateInjectionUsingValueToChildComponents(this);
            return this;
        },
        registerInjectable(injectable) {
            const patch = {};
            patch[injectable.id()] = injectable;
            properties.injectableDictionnay = Object.assign(Object.assign({}, properties.injectableDictionnay), patch);
            i_1.transferInjectablesToChildComponents(this);
            return this;
        },
        render() {
            i_1.renderNode(this);
            return this;
        },
        setTemplate(template) {
            if (!properties.templateInjectionUsing) {
                kernel_1.throwNewError('You have to enable template injection to use template setting.');
            }
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

},{"../../../kernel":19,"../../../shared":35,"../i":26}],34:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"./_factory":33,"dup":8}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kernel_1 = require("./kernel");
function isAnArrowFn(fn) {
    return typeof fn === 'function' && kernel_1.arrowFunctionRgx().test(fn.toString());
}
exports.isAnArrowFn = isAnArrowFn;
function tryAndCatchOrReturn(fn) {
    try {
        if (isAnArrowFn(fn)) {
            kernel_1.throwNewError(kernel_1.arrowFnErrorMessage());
        }
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
arguments[4][2][0].apply(exports,arguments)
},{"dup":2}]},{},[1]);
