(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./src/main");

},{"./src/main":18}],2:[function(require,module,exports){
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
const node_1 = require("../../node");
const shared_1 = require("../../shared");
const _web_component_1 = require("./_web-component");
function createComponent(tag, dataAccessor) {
    return shared_1.tryAndCatchOrReturn(function () {
        const node = node_1.createNode({
            domElement: undefined,
            tag,
            scriptedTemplate: ''
        }, dataAccessor);
        const component = Object.assign(Object.assign({}, node), { useAsWebComponent() {
                _web_component_1.useNodeAsWebComponent(this);
            } });
        return component;
    });
}
exports.createComponent = createComponent;

},{"../../node":20,"../../shared":25,"./_web-component":5}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function useNodeAsWebComponent(node) {
    console.log('test');
    window.customElements.define(`s-${node.__property('tag')}`, class extends HTMLElement {
        constructor() {
            super();
            this.innerHTML = 'Feature in progress.';
        }
    });
}
exports.useNodeAsWebComponent = useNodeAsWebComponent;

},{}],6:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./_factory"));
__export(require("./_web-component"));

},{"./_factory":4,"./_web-component":5}],7:[function(require,module,exports){
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

},{"../kernel":17,"../shared":25}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],9:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./_lib"));
__export(require("./_types"));

},{"./_lib":7,"./_types":8}],10:[function(require,module,exports){
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
function arrowFnErrorMessage() {
    return 'Function in params must be a closed scope function, not an arrow function.';
}
exports.arrowFnErrorMessage = arrowFnErrorMessage;

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

},{}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
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

},{"./_dom":10,"./_error":11,"./_event":12,"./_logger":13,"./_regex":14,"./_types":15,"./_utils":16}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("./component");
const injectable_1 = require("./injectable");
const snake_1 = require("./snake");
globalThis.createComponent = component_1.createComponent;
globalThis.createInjectable = injectable_1.createInjectable;
globalThis.snake = snake_1.snake;

},{"./component":3,"./injectable":9,"./snake":26}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],20:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./lib"));
__export(require("./_types"));

},{"./_types":19,"./lib":24}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kernel_1 = require("../../kernel");
const shared_1 = require("../../shared");
const _hydratation_1 = require("./_hydratation");
const _rendering_1 = require("./_rendering");
function createNode(_properties, _dataAccessor) {
    if (_dataAccessor && shared_1.isAnArrowFn(_dataAccessor)) {
        kernel_1.throwNewError(kernel_1.arrowFnErrorMessage());
    }
    const propertiesManager = Object.assign(Object.assign({}, _properties), { bindedDomElements: {}, components: new Array(), domElementsInjectionOperationTread: 0, injectableDictionnay: {}, isViewLoaded: false, scriptedData: {}, templateInjectionUsing: true });
    function translateInjectables(injectablesIds) {
        return injectablesIds.map(function (injectableId) {
            const injectable = propertiesManager.injectableDictionnay[injectableId];
            if (!injectable) {
                kernel_1.throwNewError(`"${injectableId}" is not declared as injectable in the "${propertiesManager.tag}" node.`);
            }
            const dependencies = new Array();
            if (injectable.injectablesIds().length) {
                dependencies.push(...translateInjectables(injectable.injectablesIds()));
            }
            return injectable.dataAccessor()(...dependencies);
        });
    }
    function runDataAccessor(_dataAccessor) {
        if (_dataAccessor) {
            const injectablesIds = kernel_1.fnArgumentsNames(_dataAccessor);
            const computedData = _dataAccessor(...translateInjectables(injectablesIds));
            if (!computedData) {
                return kernel_1.throwNewError('Node data setting must always return an object.');
            }
            return computedData;
        }
        else {
            return {};
        }
    }
    let data;
    const node = {
        __closeOneDomElementsInjectionOperation() {
            return node;
        },
        __data() {
            if (!data) {
                data = new Proxy(runDataAccessor(_dataAccessor), {
                    set(target, property, value) {
                        target[property] = value;
                        _rendering_1.renderNode(node);
                        return true;
                    }
                });
            }
            return data;
        },
        __injectContentToBindedDomElement(content, uid) {
            propertiesManager.bindedDomElements[uid].textContent = content;
        },
        __property(key) {
            const value = propertiesManager[key];
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
        registerComponent(component) {
            propertiesManager.components = [...propertiesManager.components, component];
            _hydratation_1.hydrateChildComponents(node);
            return node;
        },
        registerInjectable(injectable) {
            const patch = {};
            patch[injectable.id()] = injectable;
            propertiesManager.injectableDictionnay = Object.assign(Object.assign({}, propertiesManager.injectableDictionnay), patch);
            _hydratation_1.hydrateChildComponents(node);
            return node;
        },
        __setViewAsLoaded() {
            propertiesManager.isViewLoaded = true;
        },
        render() {
            _rendering_1.renderNode(node);
            return node;
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
                    propertiesManager.scriptedData[uid] = termBeforeComputing;
                    propertiesManager.bindedDomElements[uid] = window.document.createTextNode('');
                    propertiesManager.domElementsInjectionOperationTread++;
                    template = template.replace(scriptedTerm, `<!--${uid}-->`);
                });
            }
            propertiesManager.scriptedTemplate = template;
            return node;
        }
    };
    return node;
}
exports.createNode = createNode;

},{"../../kernel":17,"../../shared":25,"./_hydratation":22,"./_rendering":23}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function hydrateChildComponents(node) {
    node.__property('components').forEach(function (component) {
        Object.values(node.__property('injectableDictionnay')).forEach(function (injectable) {
            component.registerInjectable(injectable);
        });
    });
}
exports.hydrateChildComponents = hydrateChildComponents;

},{}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kernel_1 = require("../../kernel");
function renderNode(_node) {
    const node = Object.assign({}, _node);
    let nodeDomElement = node.__property('domElement');
    if (!nodeDomElement) {
        nodeDomElement = window.document.querySelector(`[${kernel_1.snakeComponentCommonAttribute()}=${node.__property('tag')}]`);
    }
    if (!nodeDomElement) {
        kernel_1.throwNewError(`'${node.__property('tag')}' component is unknowned for the DOM.`);
    }
    const nodeData = node.__data();
    if (!node.__property('isViewLoaded')) {
        nodeDomElement.innerHTML = node.__property('scriptedTemplate');
        node.__property('components').forEach(function (component) {
            nodeDomElement.querySelectorAll(`s-${component.__property('tag')}`).forEach(function (element) {
                element.outerHTML = `<div ${kernel_1.snakeComponentCommonAttribute()}="${component.__property('tag')}">${component.__property('scriptedTemplate')}</div>`;
                renderNode(component);
            });
        });
        Object.keys(kernel_1.EventTypes).forEach(function (eventType) {
            const eventAttribute = `s-on-${eventType}`;
            nodeDomElement.querySelectorAll(`[${eventAttribute}]`).forEach(function (element) {
                const attributeValue = element.attributes.getNamedItem(eventAttribute).value;
                element.addEventListener(eventType, function (event) {
                    if (attributeValue.match(/(\(.*\))/gm)) {
                        let propertyName = attributeValue.replace(/(\(.*?\))/gm, '');
                        if (nodeData.hasOwnProperty(propertyName) && typeof nodeData[propertyName] === 'function') {
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
                                    if (nodeData.hasOwnProperty(property)) {
                                        params.push(nodeData[property]);
                                    }
                                    else {
                                        kernel_1.throwNewError(`"${property}" is not a property of component "${node.__property('tag')}".`);
                                    }
                                }
                            });
                            nodeData[propertyName](...params);
                        }
                        else {
                            kernel_1.throwNewError(`"${propertyName}" method is not callable on component "${node.__property('tag')}".`);
                        }
                    }
                    else {
                        kernel_1.runCodeBindingObject(attributeValue, nodeData);
                    }
                });
                element.attributes.removeNamedItem(eventAttribute);
            });
        });
        node.__setViewAsLoaded();
        if (node.__property('domElementsInjectionOperationTread') > 0) {
            const markedBindedPoints = node.__property('scriptedTemplate').match(kernel_1.bindingMarkRgx()) || [];
            markedBindedPoints.forEach(function (markedBindedPoint) {
                const uid = markedBindedPoint.replace(/(<!--|-->)/gm, '');
                const comment = kernel_1.findCommentMarkedByUid(uid, nodeDomElement);
                const commentParent = comment.parentNode;
                commentParent.replaceChild(node.__property('bindedDomElements')[uid], comment);
                node.__closeOneDomElementsInjectionOperation();
            });
        }
    }
    Object.keys(node.__property('bindedDomElements')).forEach(function (uid) {
        node.__injectContentToBindedDomElement(kernel_1.runCodeBindingObject(node.__property('scriptedData')[uid], nodeData), uid);
    });
}
exports.renderNode = renderNode;

},{"../../kernel":17}],24:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./_factory"));
__export(require("./_hydratation"));
__export(require("./_rendering"));

},{"./_factory":21,"./_hydratation":22,"./_rendering":23}],25:[function(require,module,exports){
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

},{"./kernel":17}],26:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./lib"));
__export(require("./types"));

},{"./lib":27,"./types":28}],27:[function(require,module,exports){
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
        }, _data)), { disableTemplateInjection() {
                return this;
            } });
        return snake;
    });
}
exports.snake = snake;

},{"../kernel":17,"../node":20,"../shared":25}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwYWNrYWdlcy9jb3JlL2luZGV4LnRzIiwicGFja2FnZXMvY29yZS9zcmMvY29tcG9uZW50L2luZGV4LnRzIiwicGFja2FnZXMvY29yZS9zcmMvY29tcG9uZW50L2xpYi9fZmFjdG9yeS50cyIsInBhY2thZ2VzL2NvcmUvc3JjL2NvbXBvbmVudC9saWIvX3dlYi1jb21wb25lbnQudHMiLCJwYWNrYWdlcy9jb3JlL3NyYy9jb21wb25lbnQvbGliL2luZGV4LnRzIiwicGFja2FnZXMvY29yZS9zcmMvaW5qZWN0YWJsZS9fbGliLnRzIiwicGFja2FnZXMvY29yZS9zcmMvaW5qZWN0YWJsZS9pbmRleC50cyIsInBhY2thZ2VzL2NvcmUvc3JjL2tlcm5lbC9fZG9tLnRzIiwicGFja2FnZXMvY29yZS9zcmMva2VybmVsL19lcnJvci50cyIsInBhY2thZ2VzL2NvcmUvc3JjL2tlcm5lbC9fZXZlbnQudHMiLCJwYWNrYWdlcy9jb3JlL3NyYy9rZXJuZWwvX2xvZ2dlci50cyIsInBhY2thZ2VzL2NvcmUvc3JjL2tlcm5lbC9fcmVnZXgudHMiLCJwYWNrYWdlcy9jb3JlL3NyYy9rZXJuZWwvX3V0aWxzLnRzIiwicGFja2FnZXMvY29yZS9zcmMva2VybmVsL2luZGV4LnRzIiwicGFja2FnZXMvY29yZS9zcmMvbWFpbi50cyIsInBhY2thZ2VzL2NvcmUvc3JjL25vZGUvaW5kZXgudHMiLCJwYWNrYWdlcy9jb3JlL3NyYy9ub2RlL2xpYi9fZmFjdG9yeS50cyIsInBhY2thZ2VzL2NvcmUvc3JjL25vZGUvbGliL19oeWRyYXRhdGlvbi50cyIsInBhY2thZ2VzL2NvcmUvc3JjL25vZGUvbGliL19yZW5kZXJpbmcudHMiLCJwYWNrYWdlcy9jb3JlL3NyYy9ub2RlL2xpYi9pbmRleC50cyIsInBhY2thZ2VzL2NvcmUvc3JjL3NoYXJlZC50cyIsInBhY2thZ2VzL2NvcmUvc3JjL3NuYWtlL2luZGV4LnRzIiwi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QztBQUZELDRCQUVDOzs7Ozs7OztBQ25CRCwyQkFBc0I7QUFDdEIsNkJBQXdCOzs7OztBQ0R4QixzQ0FBd0Q7QUFDeEQsa0NBQXFDO0FBQ3JDLHNDQUFnRDtBQUdoRCxTQUFnQixLQUFLLENBQUksU0FBaUIsRUFBRSxLQUF1QjtJQUNqRSxPQUFPLDRCQUFtQixDQUFDO1FBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFO1lBQ3RCLHNCQUFhLENBQUMsNkJBQTZCLENBQUMsQ0FBQztTQUM5QztRQUVELE1BQU0sVUFBVSxHQUFZLE1BQU0sQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXJFLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDZixzQkFBYSxDQUFDLElBQUksU0FBUyxpQ0FBaUMsQ0FBQyxDQUFDO1NBQy9EO1FBRUQsTUFBTSxLQUFLLG1DQUNOLGlCQUFVLENBQ1g7WUFDRSxVQUFVO1lBQ1YsR0FBRyxFQUFFLFNBQVM7WUFDZCxnQkFBZ0IsRUFBRTt3REFDNEI7U0FDL0MsRUFDRCxLQUFLLENBQ04sS0FFRCx3QkFBd0I7Z0JBQ3RCLE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQyxHQUNGLENBQUM7UUFFRixPQUFPLEtBQUssQ0FBQztJQUNmLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQTlCRCxzQkE4QkMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgJy4vc3JjL21haW4nO1xuIiwiZXhwb3J0ICogZnJvbSAnLi9saWInO1xuZXhwb3J0ICogZnJvbSAnLi9fdHlwZXMnO1xuIiwiaW1wb3J0IHsgRGF0YUFjY2Vzc29yIH0gZnJvbSAnLi4vLi4va2VybmVsJztcbmltcG9ydCB7IGNyZWF0ZU5vZGUgfSBmcm9tICcuLi8uLi9ub2RlJztcbmltcG9ydCB7IHRyeUFuZENhdGNoT3JSZXR1cm4gfSBmcm9tICcuLi8uLi9zaGFyZWQnO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi4vX3R5cGVzJztcbmltcG9ydCB7IHVzZU5vZGVBc1dlYkNvbXBvbmVudCB9IGZyb20gJy4vX3dlYi1jb21wb25lbnQnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50PEM+KHRhZzogc3RyaW5nLCBkYXRhQWNjZXNzb3I/OiBEYXRhQWNjZXNzb3I8Qz4pOiBDb21wb25lbnQ8Qz4ge1xuICByZXR1cm4gdHJ5QW5kQ2F0Y2hPclJldHVybihmdW5jdGlvbigpIHtcbiAgICBjb25zdCBub2RlID0gY3JlYXRlTm9kZShcbiAgICAgIHtcbiAgICAgICAgZG9tRWxlbWVudDogdW5kZWZpbmVkLFxuICAgICAgICB0YWcsXG4gICAgICAgIHNjcmlwdGVkVGVtcGxhdGU6ICcnXG4gICAgICB9LFxuICAgICAgZGF0YUFjY2Vzc29yXG4gICAgKTtcblxuICAgIGNvbnN0IGNvbXBvbmVudDogQ29tcG9uZW50PEM+ID0ge1xuICAgICAgLi4ubm9kZSxcblxuICAgICAgdXNlQXNXZWJDb21wb25lbnQoKTogdm9pZCB7XG4gICAgICAgIHVzZU5vZGVBc1dlYkNvbXBvbmVudCh0aGlzKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgfSk7XG59XG4iLCJpbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi4vLi4vbm9kZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VOb2RlQXNXZWJDb21wb25lbnQobm9kZTogTm9kZSk6IHZvaWQge1xuICBjb25zb2xlLmxvZygndGVzdCcpO1xuICB3aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFxuICAgIGBzLSR7bm9kZS5fX3Byb3BlcnR5KCd0YWcnKX1gLFxuICAgIGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuaW5uZXJIVE1MID0gJ0ZlYXR1cmUgaW4gcHJvZ3Jlc3MuJztcbiAgICAgIH1cbiAgICB9XG4gICk7XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL19mYWN0b3J5JztcbmV4cG9ydCAqIGZyb20gJy4vX3dlYi1jb21wb25lbnQnO1xuIiwiaW1wb3J0IHsgYXJyb3dGbkVycm9yTWVzc2FnZSwgRGF0YUFjY2Vzc29yLCBmbkFyZ3VtZW50c05hbWVzLCB0aHJvd05ld0Vycm9yIH0gZnJvbSAnLi4va2VybmVsJztcbmltcG9ydCB7IGlzQW5BcnJvd0ZuLCB0cnlBbmRDYXRjaE9yUmV0dXJuIH0gZnJvbSAnLi4vc2hhcmVkJztcbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdGFibGVJZCB9IGZyb20gJy4vX3R5cGVzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUluamVjdGFibGU8ST4oaWQ6IEluamVjdGFibGVJZCwgZGF0YUFjY2Vzc29yOiBEYXRhQWNjZXNzb3I8ST4pOiBJbmplY3RhYmxlPEk+IHtcbiAgcmV0dXJuIHRyeUFuZENhdGNoT3JSZXR1cm4oZnVuY3Rpb24oKSB7XG4gICAgaWYgKGRhdGFBY2Nlc3NvciAmJiBpc0FuQXJyb3dGbihkYXRhQWNjZXNzb3IpKSB7XG4gICAgICB0aHJvd05ld0Vycm9yKGFycm93Rm5FcnJvck1lc3NhZ2UoKSk7XG4gICAgfVxuXG4gICAgY29uc3QgaW5qZWN0YWJsZXNJZHMgPSBuZXcgQXJyYXk8SW5qZWN0YWJsZUlkPigpO1xuXG4gICAgaWYgKGRhdGFBY2Nlc3Nvcikge1xuICAgICAgaW5qZWN0YWJsZXNJZHMucHVzaCguLi5mbkFyZ3VtZW50c05hbWVzKGRhdGFBY2Nlc3NvcikpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBpZCgpOiBJbmplY3RhYmxlSWQge1xuICAgICAgICByZXR1cm4gaWQ7XG4gICAgICB9LFxuICAgICAgZGF0YUFjY2Vzc29yKCk6IERhdGFBY2Nlc3NvcjxJPiB7XG4gICAgICAgIHJldHVybiBkYXRhQWNjZXNzb3I7XG4gICAgICB9LFxuICAgICAgaW5qZWN0YWJsZXNJZHMoKTogQXJyYXk8SW5qZWN0YWJsZUlkPiB7XG4gICAgICAgIHJldHVybiBbLi4uaW5qZWN0YWJsZXNJZHNdO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9fbGliJztcbmV4cG9ydCAqIGZyb20gJy4vX3R5cGVzJztcbiIsImV4cG9ydCBmdW5jdGlvbiBmaW5kQ29tbWVudE1hcmtlZEJ5VWlkKHVpZDogc3RyaW5nLCBlbGVtZW50OiBDaGlsZE5vZGUpOiBDaGlsZE5vZGUge1xuICBjb25zdCBjaGlsZE5vZGVzTGVuZ3RoID0gZWxlbWVudC5jaGlsZE5vZGVzLmxlbmd0aDtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkTm9kZXNMZW5ndGg7ICsraSkge1xuICAgIGNvbnN0IGNoaWxkTm9kZSA9IGVsZW1lbnQuY2hpbGROb2Rlc1tpXTtcblxuICAgIGlmIChjaGlsZE5vZGUubm9kZVR5cGUgPT09IDggJiYgY2hpbGROb2RlLm5vZGVWYWx1ZSA9PT0gdWlkKSB7XG4gICAgICByZXR1cm4gY2hpbGROb2RlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBub2RlID0gZmluZENvbW1lbnRNYXJrZWRCeVVpZCh1aWQsIGNoaWxkTm9kZSk7XG5cbiAgICAgIGlmIChub2RlKSB7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIHRocm93TmV3RXJyb3IobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XG4gIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFycm93Rm5FcnJvck1lc3NhZ2UoKTogc3RyaW5nIHtcbiAgcmV0dXJuICdGdW5jdGlvbiBpbiBwYXJhbXMgbXVzdCBiZSBhIGNsb3NlZCBzY29wZSBmdW5jdGlvbiwgbm90IGFuIGFycm93IGZ1bmN0aW9uLic7XG59XG4iLCJleHBvcnQgZW51bSBFdmVudFR5cGVzIHtcbiAgY2xpY2ssXG4gIGtleXByZXNzLFxuICBrZXlkb3duLFxuICBrZXl1cCxcbiAgbW91c2VvdmVyLFxuICBzdWJtaXRcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiB3YXJuaW5nKGVycm9yOiBFcnJvcik6IHZvaWQge1xuICBjb25zb2xlLmVycm9yKGVycm9yKTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiB0ZW1wbGF0ZUJpbmRpbmdSZ3goKTogUmVnRXhwIHtcbiAgcmV0dXJuIC8oXFx7ey4qP1xcfX0pL2dtO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYmluZGluZ01hcmtSZ3goKTogUmVnRXhwIHtcbiAgcmV0dXJuIC8oXFw8IS0tLio/XFwtLT4pL2dtO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXJyb3dGdW5jdGlvblJneCgpOiBSZWdFeHAge1xuICByZXR1cm4gL15bXntdKz89Pi9nbTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiB0aW1lc3RhbXAoKTogc3RyaW5nIHtcbiAgcmV0dXJuIGAke25ldyBEYXRlKCkuZ2V0VGltZSgpLnRvU3RyaW5nKCl9YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNuYWtlQ29tcG9uZW50Q29tbW9uQXR0cmlidXRlKCk6IHN0cmluZyB7XG4gIHJldHVybiAnc25ha2UtaWQnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm5Bcmd1bWVudHNOYW1lcyhmbjogRnVuY3Rpb24pOiBBcnJheTxzdHJpbmc+IHtcbiAgcmV0dXJuIChmbi50b1N0cmluZygpICsgJycpXG4gICAgLnJlcGxhY2UoL1svXVsvXS4qJC9nbSwgJycpXG4gICAgLnJlcGxhY2UoL1xccysvZywgJycpXG4gICAgLnJlcGxhY2UoL1svXVsqXVteLypdKlsqXVsvXS9nLCAnJylcbiAgICAuc3BsaXQoJyl7JywgMSlbMF1cbiAgICAucmVwbGFjZSgvXlteKF0qWyhdLywgJycpXG4gICAgLnJlcGxhY2UoLz1bXixdKy9nLCAnJylcbiAgICAuc3BsaXQoJywnKVxuICAgIC5maWx0ZXIoQm9vbGVhbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBydW5Db2RlQmluZGluZ09iamVjdDxPPihjb2RlVG9SdW46IHN0cmluZywgb2JqOiBPKTogdW5rbm93biB7XG4gIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChmdW5jdGlvbihrZXk6IHN0cmluZykge1xuICAgIGNvZGVUb1J1biA9IGNvZGVUb1J1bi5yZXBsYWNlKGtleSwgYHRoaXMuJHtrZXl9YCk7XG4gIH0pO1xuXG4gIHJldHVybiBuZXcgRnVuY3Rpb24oYHJldHVybiAke2NvZGVUb1J1bn1gKS5iaW5kKG9iaikoKTtcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vX2RvbSc7XG5leHBvcnQgKiBmcm9tICcuL19lcnJvcic7XG5leHBvcnQgKiBmcm9tICcuL19ldmVudCc7XG5leHBvcnQgKiBmcm9tICcuL19sb2dnZXInO1xuZXhwb3J0ICogZnJvbSAnLi9fcmVnZXgnO1xuZXhwb3J0ICogZnJvbSAnLi9fdHlwZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9fdXRpbHMnO1xuIiwiaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnQnO1xuaW1wb3J0IHsgY3JlYXRlSW5qZWN0YWJsZSB9IGZyb20gJy4vaW5qZWN0YWJsZSc7XG5pbXBvcnQgeyBzbmFrZSB9IGZyb20gJy4vc25ha2UnO1xuXG5nbG9iYWxUaGlzLmNyZWF0ZUNvbXBvbmVudCA9IGNyZWF0ZUNvbXBvbmVudDtcbmdsb2JhbFRoaXMuY3JlYXRlSW5qZWN0YWJsZSA9IGNyZWF0ZUluamVjdGFibGU7XG5nbG9iYWxUaGlzLnNuYWtlID0gc25ha2U7XG4iLCJleHBvcnQgKiBmcm9tICcuL2xpYic7XG5leHBvcnQgKiBmcm9tICcuL190eXBlcyc7XG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb21wb25lbnQnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0YWJsZURpY3Rpb25uYXksIEluamVjdGFibGVJZCB9IGZyb20gJy4uLy4uL2luamVjdGFibGUnO1xuaW1wb3J0IHtcbiAgYXJyb3dGbkVycm9yTWVzc2FnZSxcbiAgRGF0YUFjY2Vzc29yLFxuICBEZXBlbmRlbmN5LFxuICBmbkFyZ3VtZW50c05hbWVzLFxuICB0ZW1wbGF0ZUJpbmRpbmdSZ3gsXG4gIHRocm93TmV3RXJyb3Jcbn0gZnJvbSAnLi4vLi4va2VybmVsJztcbmltcG9ydCB7IGlzQW5BcnJvd0ZuLCB1bmlxdWVJZCB9IGZyb20gJy4uLy4uL3NoYXJlZCc7XG5pbXBvcnQgeyBOb2RlLCBOb2RlUHJvcGVydGllc0lucHV0LCBOb2RlUHJvcGVydHlLZXksIE5vZGVQcm9wZXJ0eVZhbHVlIH0gZnJvbSAnLi4vX3R5cGVzJztcbmltcG9ydCB7IGh5ZHJhdGVDaGlsZENvbXBvbmVudHMgfSBmcm9tICcuL19oeWRyYXRhdGlvbic7XG5pbXBvcnQgeyByZW5kZXJOb2RlIH0gZnJvbSAnLi9fcmVuZGVyaW5nJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU5vZGU8Tj4oX3Byb3BlcnRpZXM6IE5vZGVQcm9wZXJ0aWVzSW5wdXQsIF9kYXRhQWNjZXNzb3I/OiBEYXRhQWNjZXNzb3I8Tj4pOiBOb2RlPE4+IHtcbiAgaWYgKF9kYXRhQWNjZXNzb3IgJiYgaXNBbkFycm93Rm4oX2RhdGFBY2Nlc3NvcikpIHtcbiAgICB0aHJvd05ld0Vycm9yKGFycm93Rm5FcnJvck1lc3NhZ2UoKSk7XG4gIH1cblxuICBjb25zdCBwcm9wZXJ0aWVzTWFuYWdlciA9IHtcbiAgICAuLi5fcHJvcGVydGllcyxcbiAgICBiaW5kZWREb21FbGVtZW50czoge30sXG4gICAgY29tcG9uZW50czogbmV3IEFycmF5PENvbXBvbmVudD4oKSxcbiAgICBkb21FbGVtZW50c0luamVjdGlvbk9wZXJhdGlvblRyZWFkOiAwLFxuICAgIGluamVjdGFibGVEaWN0aW9ubmF5OiB7fSxcbiAgICBpc1ZpZXdMb2FkZWQ6IGZhbHNlLFxuICAgIHNjcmlwdGVkRGF0YToge30sXG4gICAgdGVtcGxhdGVJbmplY3Rpb25Vc2luZzogdHJ1ZVxuICB9O1xuXG4gIGZ1bmN0aW9uIHRyYW5zbGF0ZUluamVjdGFibGVzKGluamVjdGFibGVzSWRzOiBBcnJheTxJbmplY3RhYmxlSWQ+KTogRGVwZW5kZW5jeVtdIHtcbiAgICByZXR1cm4gaW5qZWN0YWJsZXNJZHMubWFwKGZ1bmN0aW9uKGluamVjdGFibGVJZDogc3RyaW5nKSB7XG4gICAgICBjb25zdCBpbmplY3RhYmxlID0gcHJvcGVydGllc01hbmFnZXIuaW5qZWN0YWJsZURpY3Rpb25uYXlbaW5qZWN0YWJsZUlkXTtcblxuICAgICAgaWYgKCFpbmplY3RhYmxlKSB7XG4gICAgICAgIHRocm93TmV3RXJyb3IoYFwiJHtpbmplY3RhYmxlSWR9XCIgaXMgbm90IGRlY2xhcmVkIGFzIGluamVjdGFibGUgaW4gdGhlIFwiJHtwcm9wZXJ0aWVzTWFuYWdlci50YWd9XCIgbm9kZS5gKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGVwZW5kZW5jaWVzID0gbmV3IEFycmF5PERlcGVuZGVuY3k+KCk7XG5cbiAgICAgIGlmIChpbmplY3RhYmxlLmluamVjdGFibGVzSWRzKCkubGVuZ3RoKSB7XG4gICAgICAgIGRlcGVuZGVuY2llcy5wdXNoKC4uLnRyYW5zbGF0ZUluamVjdGFibGVzKGluamVjdGFibGUuaW5qZWN0YWJsZXNJZHMoKSkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaW5qZWN0YWJsZS5kYXRhQWNjZXNzb3IoKSguLi5kZXBlbmRlbmNpZXMpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcnVuRGF0YUFjY2Vzc29yPEQ+KF9kYXRhQWNjZXNzb3I6IERhdGFBY2Nlc3NvcjxEPik6IGFueSB7XG4gICAgaWYgKF9kYXRhQWNjZXNzb3IpIHtcbiAgICAgIGNvbnN0IGluamVjdGFibGVzSWRzOiBBcnJheTxJbmplY3RhYmxlSWQ+ID0gZm5Bcmd1bWVudHNOYW1lcyhfZGF0YUFjY2Vzc29yKTtcblxuICAgICAgY29uc3QgY29tcHV0ZWREYXRhOiBhbnkgPSBfZGF0YUFjY2Vzc29yKC4uLnRyYW5zbGF0ZUluamVjdGFibGVzKGluamVjdGFibGVzSWRzKSk7XG5cbiAgICAgIGlmICghY29tcHV0ZWREYXRhKSB7XG4gICAgICAgIHJldHVybiB0aHJvd05ld0Vycm9yKCdOb2RlIGRhdGEgc2V0dGluZyBtdXN0IGFsd2F5cyByZXR1cm4gYW4gb2JqZWN0LicpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29tcHV0ZWREYXRhO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuICB9XG5cbiAgbGV0IGRhdGE6IE47XG5cbiAgY29uc3Qgbm9kZTogTm9kZTxOPiA9IHtcbiAgICBfX2Nsb3NlT25lRG9tRWxlbWVudHNJbmplY3Rpb25PcGVyYXRpb24oKTogTm9kZTxOPiB7XG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9LFxuXG4gICAgX19kYXRhKCk6IE4ge1xuICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgIGRhdGEgPSBuZXcgUHJveHkocnVuRGF0YUFjY2Vzc29yKF9kYXRhQWNjZXNzb3IpLCB7XG4gICAgICAgICAgc2V0KHRhcmdldDogTiwgcHJvcGVydHk6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgICAgICAgICAgdGFyZ2V0W3Byb3BlcnR5XSA9IHZhbHVlO1xuICAgICAgICAgICAgcmVuZGVyTm9kZShub2RlKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9LFxuXG4gICAgX19pbmplY3RDb250ZW50VG9CaW5kZWREb21FbGVtZW50KGNvbnRlbnQ6IHN0cmluZywgdWlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgIHByb3BlcnRpZXNNYW5hZ2VyLmJpbmRlZERvbUVsZW1lbnRzW3VpZF0udGV4dENvbnRlbnQgPSBjb250ZW50O1xuICAgIH0sXG5cbiAgICBfX3Byb3BlcnR5KGtleTogTm9kZVByb3BlcnR5S2V5KTogTm9kZVByb3BlcnR5VmFsdWUge1xuICAgICAgY29uc3QgdmFsdWUgPSBwcm9wZXJ0aWVzTWFuYWdlcltrZXldO1xuICAgICAgaWYgKGtleSA9PT0gJ2RvbUVsZW1lbnQnKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyBbLi4udmFsdWVdIDogeyAuLi52YWx1ZSB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICByZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQ6IENvbXBvbmVudCk6IE5vZGU8Tj4ge1xuICAgICAgcHJvcGVydGllc01hbmFnZXIuY29tcG9uZW50cyA9IFsuLi5wcm9wZXJ0aWVzTWFuYWdlci5jb21wb25lbnRzLCBjb21wb25lbnRdO1xuXG4gICAgICBoeWRyYXRlQ2hpbGRDb21wb25lbnRzKG5vZGUpO1xuXG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9LFxuXG4gICAgcmVnaXN0ZXJJbmplY3RhYmxlKGluamVjdGFibGU6IEluamVjdGFibGUpIHtcbiAgICAgIGNvbnN0IHBhdGNoOiBJbmplY3RhYmxlRGljdGlvbm5heSA9IHt9O1xuXG4gICAgICBwYXRjaFtpbmplY3RhYmxlLmlkKCldID0gaW5qZWN0YWJsZTtcblxuICAgICAgcHJvcGVydGllc01hbmFnZXIuaW5qZWN0YWJsZURpY3Rpb25uYXkgPSB7IC4uLnByb3BlcnRpZXNNYW5hZ2VyLmluamVjdGFibGVEaWN0aW9ubmF5LCAuLi5wYXRjaCB9O1xuXG4gICAgICBoeWRyYXRlQ2hpbGRDb21wb25lbnRzKG5vZGUpO1xuXG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9LFxuXG4gICAgX19zZXRWaWV3QXNMb2FkZWQoKTogdm9pZCB7XG4gICAgICBwcm9wZXJ0aWVzTWFuYWdlci5pc1ZpZXdMb2FkZWQgPSB0cnVlO1xuICAgIH0sXG5cbiAgICByZW5kZXIoKTogTm9kZTxOPiB7XG4gICAgICByZW5kZXJOb2RlKG5vZGUpO1xuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfSxcblxuICAgIHNldFRlbXBsYXRlKHRlbXBsYXRlOiBzdHJpbmcpOiBOb2RlPE4+IHtcbiAgICAgIGlmICghdGVtcGxhdGUpIHtcbiAgICAgICAgdGhyb3dOZXdFcnJvcignUGxlYXNlIGRlZmluZSBhIGNvcnJlY3QgdGVtcGxhdGUuJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNjcmlwdGVkVGVybXMgPSB0ZW1wbGF0ZS5tYXRjaCh0ZW1wbGF0ZUJpbmRpbmdSZ3goKSk7XG5cbiAgICAgIGlmIChzY3JpcHRlZFRlcm1zKSB7XG4gICAgICAgIHNjcmlwdGVkVGVybXMuZm9yRWFjaChmdW5jdGlvbihzY3JpcHRlZFRlcm06IHN0cmluZyk6IHZvaWQge1xuICAgICAgICAgIGNvbnN0IHRlcm1CZWZvcmVDb21wdXRpbmcgPSBzY3JpcHRlZFRlcm0ucmVwbGFjZSgvKHt7fH19KS9nbSwgJycpO1xuXG4gICAgICAgICAgY29uc3QgdWlkID0gdW5pcXVlSWQoKTtcblxuICAgICAgICAgIHByb3BlcnRpZXNNYW5hZ2VyLnNjcmlwdGVkRGF0YVt1aWRdID0gdGVybUJlZm9yZUNvbXB1dGluZztcblxuICAgICAgICAgIHByb3BlcnRpZXNNYW5hZ2VyLmJpbmRlZERvbUVsZW1lbnRzW3VpZF0gPSB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuXG4gICAgICAgICAgcHJvcGVydGllc01hbmFnZXIuZG9tRWxlbWVudHNJbmplY3Rpb25PcGVyYXRpb25UcmVhZCsrO1xuXG4gICAgICAgICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5yZXBsYWNlKHNjcmlwdGVkVGVybSwgYDwhLS0ke3VpZH0tLT5gKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHByb3BlcnRpZXNNYW5hZ2VyLnNjcmlwdGVkVGVtcGxhdGUgPSB0ZW1wbGF0ZTtcblxuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBub2RlO1xufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY29tcG9uZW50JztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICcuLi9fdHlwZXMnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJy4uLy4uL2luamVjdGFibGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gaHlkcmF0ZUNoaWxkQ29tcG9uZW50cyhub2RlOiBOb2RlKTogdm9pZCB7XG4gIChub2RlLl9fcHJvcGVydHkoJ2NvbXBvbmVudHMnKSBhcyBBcnJheTxDb21wb25lbnQ+KS5mb3JFYWNoKGZ1bmN0aW9uKGNvbXBvbmVudDogQ29tcG9uZW50KTogdm9pZCB7XG4gICAgT2JqZWN0LnZhbHVlcyhub2RlLl9fcHJvcGVydHkoJ2luamVjdGFibGVEaWN0aW9ubmF5JykpLmZvckVhY2goZnVuY3Rpb24oaW5qZWN0YWJsZTogSW5qZWN0YWJsZSkge1xuICAgICAgY29tcG9uZW50LnJlZ2lzdGVySW5qZWN0YWJsZShpbmplY3RhYmxlKTtcbiAgICB9KTtcbiAgfSk7XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgYmluZGluZ01hcmtSZ3gsXG4gIEV2ZW50VHlwZXMsXG4gIGZpbmRDb21tZW50TWFya2VkQnlVaWQsXG4gIHJ1bkNvZGVCaW5kaW5nT2JqZWN0LFxuICBzbmFrZUNvbXBvbmVudENvbW1vbkF0dHJpYnV0ZSxcbiAgdGhyb3dOZXdFcnJvclxufSBmcm9tICcuLi8uLi9rZXJuZWwnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4uL190eXBlcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJOb2RlPFQ+KF9ub2RlOiBOb2RlPFQ+KTogdm9pZCB7XG4gIGNvbnN0IG5vZGUgPSB7IC4uLl9ub2RlIH07XG5cbiAgbGV0IG5vZGVEb21FbGVtZW50ID0gbm9kZS5fX3Byb3BlcnR5KCdkb21FbGVtZW50JykgYXMgRWxlbWVudDtcblxuICBpZiAoIW5vZGVEb21FbGVtZW50KSB7XG4gICAgbm9kZURvbUVsZW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgWyR7c25ha2VDb21wb25lbnRDb21tb25BdHRyaWJ1dGUoKX09JHtub2RlLl9fcHJvcGVydHkoJ3RhZycpfV1gKTtcbiAgfVxuXG4gIGlmICghbm9kZURvbUVsZW1lbnQpIHtcbiAgICB0aHJvd05ld0Vycm9yKGAnJHtub2RlLl9fcHJvcGVydHkoJ3RhZycpfScgY29tcG9uZW50IGlzIHVua25vd25lZCBmb3IgdGhlIERPTS5gKTtcbiAgfVxuXG4gIGNvbnN0IG5vZGVEYXRhOiBUID0gbm9kZS5fX2RhdGEoKTtcblxuICBpZiAoIW5vZGUuX19wcm9wZXJ0eSgnaXNWaWV3TG9hZGVkJykpIHtcbiAgICBub2RlRG9tRWxlbWVudC5pbm5lckhUTUwgPSBub2RlLl9fcHJvcGVydHkoJ3NjcmlwdGVkVGVtcGxhdGUnKSBhcyBzdHJpbmc7XG5cbiAgICAobm9kZS5fX3Byb3BlcnR5KCdjb21wb25lbnRzJykgYXMgQXJyYXk8Q29tcG9uZW50PikuZm9yRWFjaChmdW5jdGlvbihjb21wb25lbnQ6IENvbXBvbmVudCk6IHZvaWQge1xuICAgICAgbm9kZURvbUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChgcy0ke2NvbXBvbmVudC5fX3Byb3BlcnR5KCd0YWcnKX1gKS5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQ6IEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgZWxlbWVudC5vdXRlckhUTUwgPSBgPGRpdiAke3NuYWtlQ29tcG9uZW50Q29tbW9uQXR0cmlidXRlKCl9PVwiJHtjb21wb25lbnQuX19wcm9wZXJ0eShcbiAgICAgICAgICAndGFnJ1xuICAgICAgICApfVwiPiR7Y29tcG9uZW50Ll9fcHJvcGVydHkoJ3NjcmlwdGVkVGVtcGxhdGUnKX08L2Rpdj5gO1xuXG4gICAgICAgIHJlbmRlck5vZGUoY29tcG9uZW50KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgT2JqZWN0LmtleXMoRXZlbnRUeXBlcykuZm9yRWFjaChmdW5jdGlvbihldmVudFR5cGU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgY29uc3QgZXZlbnRBdHRyaWJ1dGUgPSBgcy1vbi0ke2V2ZW50VHlwZX1gO1xuXG4gICAgICBub2RlRG9tRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbJHtldmVudEF0dHJpYnV0ZX1dYCkuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50OiBFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZVZhbHVlID0gZWxlbWVudC5hdHRyaWJ1dGVzLmdldE5hbWVkSXRlbShldmVudEF0dHJpYnV0ZSkudmFsdWU7XG5cbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgZnVuY3Rpb24oZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgICAgaWYgKGF0dHJpYnV0ZVZhbHVlLm1hdGNoKC8oXFwoLipcXCkpL2dtKSkge1xuICAgICAgICAgICAgbGV0IHByb3BlcnR5TmFtZSA9IGF0dHJpYnV0ZVZhbHVlLnJlcGxhY2UoLyhcXCguKj9cXCkpL2dtLCAnJyk7XG5cbiAgICAgICAgICAgIGlmIChub2RlRGF0YS5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eU5hbWUpICYmIHR5cGVvZiBub2RlRGF0YVtwcm9wZXJ0eU5hbWVdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHByb3BlcnR5UGFyYW1zID0gYXR0cmlidXRlVmFsdWVcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXihbYS16XXxbQS1aXSkqXFwofFxcKS9nbSwgJycpXG4gICAgICAgICAgICAgICAgLnNwbGl0KCcsJylcbiAgICAgICAgICAgICAgICAubWFwKGZ1bmN0aW9uKHBhcmFtOiBzdHJpbmcpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJhbS5yZXBsYWNlKC9cXHMvZywgJycpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IFtdO1xuXG4gICAgICAgICAgICAgIHByb3BlcnR5UGFyYW1zLmZvckVhY2goZnVuY3Rpb24ocHJvcGVydHk6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0eSA9PT0gJyRldmVudCcpIHtcbiAgICAgICAgICAgICAgICAgIHBhcmFtcy5wdXNoKGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgaWYgKG5vZGVEYXRhLmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xuICAgICAgICAgICAgICAgICAgICBwYXJhbXMucHVzaChub2RlRGF0YVtwcm9wZXJ0eV0pO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3dOZXdFcnJvcihgXCIke3Byb3BlcnR5fVwiIGlzIG5vdCBhIHByb3BlcnR5IG9mIGNvbXBvbmVudCBcIiR7bm9kZS5fX3Byb3BlcnR5KCd0YWcnKX1cIi5gKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgIG5vZGVEYXRhW3Byb3BlcnR5TmFtZV0oLi4ucGFyYW1zKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRocm93TmV3RXJyb3IoYFwiJHtwcm9wZXJ0eU5hbWV9XCIgbWV0aG9kIGlzIG5vdCBjYWxsYWJsZSBvbiBjb21wb25lbnQgXCIke25vZGUuX19wcm9wZXJ0eSgndGFnJyl9XCIuYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJ1bkNvZGVCaW5kaW5nT2JqZWN0KGF0dHJpYnV0ZVZhbHVlLCBub2RlRGF0YSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBlbGVtZW50LmF0dHJpYnV0ZXMucmVtb3ZlTmFtZWRJdGVtKGV2ZW50QXR0cmlidXRlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgbm9kZS5fX3NldFZpZXdBc0xvYWRlZCgpO1xuXG4gICAgaWYgKG5vZGUuX19wcm9wZXJ0eSgnZG9tRWxlbWVudHNJbmplY3Rpb25PcGVyYXRpb25UcmVhZCcpID4gMCkge1xuICAgICAgY29uc3QgbWFya2VkQmluZGVkUG9pbnRzID0gKG5vZGUuX19wcm9wZXJ0eSgnc2NyaXB0ZWRUZW1wbGF0ZScpIGFzIHN0cmluZykubWF0Y2goYmluZGluZ01hcmtSZ3goKSkgfHwgW107XG5cbiAgICAgIG1hcmtlZEJpbmRlZFBvaW50cy5mb3JFYWNoKGZ1bmN0aW9uKG1hcmtlZEJpbmRlZFBvaW50OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgdWlkID0gbWFya2VkQmluZGVkUG9pbnQucmVwbGFjZSgvKDwhLS18LS0+KS9nbSwgJycpO1xuXG4gICAgICAgIGNvbnN0IGNvbW1lbnQgPSBmaW5kQ29tbWVudE1hcmtlZEJ5VWlkKHVpZCwgbm9kZURvbUVsZW1lbnQpO1xuXG4gICAgICAgIGNvbnN0IGNvbW1lbnRQYXJlbnQgPSBjb21tZW50LnBhcmVudE5vZGU7XG5cbiAgICAgICAgY29tbWVudFBhcmVudC5yZXBsYWNlQ2hpbGQobm9kZS5fX3Byb3BlcnR5KCdiaW5kZWREb21FbGVtZW50cycpW3VpZF0sIGNvbW1lbnQpO1xuXG4gICAgICAgIG5vZGUuX19jbG9zZU9uZURvbUVsZW1lbnRzSW5qZWN0aW9uT3BlcmF0aW9uKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBPYmplY3Qua2V5cyhub2RlLl9fcHJvcGVydHkoJ2JpbmRlZERvbUVsZW1lbnRzJykpLmZvckVhY2goZnVuY3Rpb24odWlkOiBzdHJpbmcpIHtcbiAgICBub2RlLl9faW5qZWN0Q29udGVudFRvQmluZGVkRG9tRWxlbWVudChcbiAgICAgIHJ1bkNvZGVCaW5kaW5nT2JqZWN0KG5vZGUuX19wcm9wZXJ0eSgnc2NyaXB0ZWREYXRhJylbdWlkXSwgbm9kZURhdGEpIGFzIHN0cmluZyxcbiAgICAgIHVpZFxuICAgICk7XG4gIH0pO1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9fZmFjdG9yeSc7XG5leHBvcnQgKiBmcm9tICcuL19oeWRyYXRhdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL19yZW5kZXJpbmcnO1xuIiwiaW1wb3J0IHsgYXJyb3dGbkVycm9yTWVzc2FnZSwgYXJyb3dGdW5jdGlvblJneCwgdGhyb3dOZXdFcnJvciwgdGltZXN0YW1wLCB3YXJuaW5nIH0gZnJvbSAnLi9rZXJuZWwnO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNBbkFycm93Rm4oZm46IEZ1bmN0aW9uKTogYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicgJiYgYXJyb3dGdW5jdGlvblJneCgpLnRlc3QoZm4udG9TdHJpbmcoKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0cnlBbmRDYXRjaE9yUmV0dXJuPFQ+KGZuOiAoKSA9PiBUKTogVCB7XG4gIHRyeSB7XG4gICAgaWYgKGlzQW5BcnJvd0ZuKGZuKSkge1xuICAgICAgdGhyb3dOZXdFcnJvcihhcnJvd0ZuRXJyb3JNZXNzYWdlKCkpO1xuICAgIH1cbiAgICByZXR1cm4gZm4oKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgd2FybmluZyhlcnIpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bmlxdWVJZCgpOiBzdHJpbmcge1xuICByZXR1cm4gYCR7dGltZXN0YW1wKCl9JHtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMCl9YDtcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vbGliJztcbmV4cG9ydCAqIGZyb20gJy4vdHlwZXMnO1xuIiwiaW1wb3J0IHsgRGF0YUFjY2Vzc29yLCB0aHJvd05ld0Vycm9yIH0gZnJvbSAnLi4va2VybmVsJztcbmltcG9ydCB7IGNyZWF0ZU5vZGUgfSBmcm9tICcuLi9ub2RlJztcbmltcG9ydCB7IHRyeUFuZENhdGNoT3JSZXR1cm4gfSBmcm9tICcuLi9zaGFyZWQnO1xuaW1wb3J0IHsgU25ha2UgfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHNuYWtlPFM+KF9zZWxlY3Rvcjogc3RyaW5nLCBfZGF0YT86IERhdGFBY2Nlc3NvcjxTPik6IFNuYWtlPFM+IHtcbiAgcmV0dXJuIHRyeUFuZENhdGNoT3JSZXR1cm4oZnVuY3Rpb24oKSB7XG4gICAgaWYgKCFnbG9iYWxUaGlzLndpbmRvdykge1xuICAgICAgdGhyb3dOZXdFcnJvcihgV2luZG93IG9iamVjdCBpcyB1bmtub3duZWQuYCk7XG4gICAgfVxuXG4gICAgY29uc3QgZG9tRWxlbWVudDogRWxlbWVudCA9IHdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKF9zZWxlY3Rvcik7XG5cbiAgICBpZiAoIWRvbUVsZW1lbnQpIHtcbiAgICAgIHRocm93TmV3RXJyb3IoYFwiJHtfc2VsZWN0b3J9XCIgZWxlbWVudCBkb2Vzbid0IGV4aXN0IGluIERPTS5gKTtcbiAgICB9XG5cbiAgICBjb25zdCBzbmFrZTogU25ha2U8Uz4gPSB7XG4gICAgICAuLi5jcmVhdGVOb2RlPFM+KFxuICAgICAgICB7XG4gICAgICAgICAgZG9tRWxlbWVudCxcbiAgICAgICAgICB0YWc6IF9zZWxlY3RvcixcbiAgICAgICAgICBzY3JpcHRlZFRlbXBsYXRlOiBgPGgxPkNvbmdyYXR1bGF0aW9ucyAhPC9oMT5cbiAgICAgICAgICA8cD5Zb3UganVzdCBjcmVhdGVkIGEgU25ha2UuanMgYXBwIGhlcmUuPC9oMT5gXG4gICAgICAgIH0sXG4gICAgICAgIF9kYXRhXG4gICAgICApLFxuXG4gICAgICBkaXNhYmxlVGVtcGxhdGVJbmplY3Rpb24oKTogU25ha2U8Uz4ge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIHNuYWtlO1xuICB9KTtcbn1cbiJdfQ==
