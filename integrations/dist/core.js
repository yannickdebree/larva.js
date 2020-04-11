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
const a = snake_1.snake('#snake-app')
    .setTemplate('fcsf')
    .render();
setTimeout(() => {
    a.setTemplate('rfgerfgrtgrt').render();
}, 2000);

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
    const properties = Object.assign(Object.assign({}, _properties), { bindedDomElements: {}, components: new Array(), domElementsInjectionOperationTread: 0, injectableDictionnay: {}, isViewLoaded: false, scriptedData: {}, templateInjectionUsing: true });
    function translateInjectables(injectablesIds) {
        return injectablesIds.map(function (injectableId) {
            const injectable = properties.injectableDictionnay[injectableId];
            if (!injectable) {
                kernel_1.throwNewError(`"${injectableId}" is not declared as injectable in the "${properties.tag}" node.`);
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
            properties.domElementsInjectionOperationTread--;
        },
        __data() {
            if (!data) {
                data = new Proxy(runDataAccessor(_dataAccessor), {
                    set(target, property, value) {
                        target[property] = value;
                        _rendering_1.renderNode(this);
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
            properties.components.forEach(function (component) {
                component.__setTemplateInjectionUsing(value);
            });
            properties.templateInjectionUsing = value;
        },
        registerComponent(component) {
            properties.components = [...properties.components, component];
            _hydratation_1.transferInjectablesToChildComponents(this);
            return this;
        },
        registerInjectable(injectable) {
            const patch = {};
            patch[injectable.id()] = injectable;
            properties.injectableDictionnay = Object.assign(Object.assign({}, properties.injectableDictionnay), patch);
            _hydratation_1.transferInjectablesToChildComponents(this);
            return this;
        },
        render() {
            _rendering_1.renderNode(this);
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

},{"../../kernel":17,"../../shared":25,"./_hydratation":22,"./_rendering":23}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function transferInjectablesToChildComponents(node) {
    node.__property('components').forEach(function (component) {
        Object.values(node.__property('injectableDictionnay')).forEach(function (injectable) {
            component.registerInjectable(injectable);
        });
    });
}
exports.transferInjectablesToChildComponents = transferInjectablesToChildComponents;
// component.__setTemplateInjectionUsing(node.__property('templateInjectionUsing') as boolean);

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
                // if (!node.__property('templateInjectionUsing')) {
                //   component.setTemplate(element.innerHTML);
                // }
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
    // console.log('scriptedData : ', node.__property('scriptedData'));
    // console.log('nodeData : ', nodeData);
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
        }, _data)), { enableTemplateInjection(value = true) {
                this.__setTemplateInjectionUsing(value);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwYWNrYWdlcy9jb3JlL2luZGV4LnRzIiwicGFja2FnZXMvY29yZS9zcmMvY29tcG9uZW50L2luZGV4LnRzIiwicGFja2FnZXMvY29yZS9zcmMvY29tcG9uZW50L2xpYi9fZmFjdG9yeS50cyIsInBhY2thZ2VzL2NvcmUvc3JjL2NvbXBvbmVudC9saWIvX3dlYi1jb21wb25lbnQudHMiLCJwYWNrYWdlcy9jb3JlL3NyYy9jb21wb25lbnQvbGliL2luZGV4LnRzIiwicGFja2FnZXMvY29yZS9zcmMvaW5qZWN0YWJsZS9fbGliLnRzIiwicGFja2FnZXMvY29yZS9zcmMvaW5qZWN0YWJsZS9pbmRleC50cyIsInBhY2thZ2VzL2NvcmUvc3JjL2tlcm5lbC9fZG9tLnRzIiwicGFja2FnZXMvY29yZS9zcmMva2VybmVsL19lcnJvci50cyIsInBhY2thZ2VzL2NvcmUvc3JjL2tlcm5lbC9fZXZlbnQudHMiLCJwYWNrYWdlcy9jb3JlL3NyYy9rZXJuZWwvX2xvZ2dlci50cyIsInBhY2thZ2VzL2NvcmUvc3JjL2tlcm5lbC9fcmVnZXgudHMiLCJwYWNrYWdlcy9jb3JlL3NyYy9rZXJuZWwvX3V0aWxzLnRzIiwicGFja2FnZXMvY29yZS9zcmMva2VybmVsL2luZGV4LnRzIiwicGFja2FnZXMvY29yZS9zcmMvbWFpbi50cyIsInBhY2thZ2VzL2NvcmUvc3JjL25vZGUvaW5kZXgudHMiLCJwYWNrYWdlcy9jb3JlL3NyYy9ub2RlL2xpYi9fZmFjdG9yeS50cyIsInBhY2thZ2VzL2NvcmUvc3JjL25vZGUvbGliL19oeWRyYXRhdGlvbi50cyIsInBhY2thZ2VzL2NvcmUvc3JjL25vZGUvbGliL19yZW5kZXJpbmcudHMiLCJwYWNrYWdlcy9jb3JlL3NyYy9ub2RlL2xpYi9pbmRleC50cyIsInBhY2thZ2VzL2NvcmUvc3JjL3NoYXJlZC50cyIsInBhY2thZ2VzL2NvcmUvc3JjL3NuYWtlL2luZGV4LnRzIiwicGFja2FnZXMvY29yZS9zcmMvc25ha2UvbGliLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxzQkFBb0I7Ozs7Ozs7Ozs7OztBQ0FwQiwyQkFBc0I7QUFDdEIsOEJBQXlCOzs7OztBQ0F6QixxQ0FBd0M7QUFDeEMseUNBQW1EO0FBRW5ELHFEQUF5RDtBQUV6RCxTQUFnQixlQUFlLENBQUksR0FBVyxFQUFFLFlBQThCO0lBQzVFLE9BQU8sNEJBQW1CLENBQUM7UUFDekIsTUFBTSxJQUFJLEdBQUcsaUJBQVUsQ0FDckI7WUFDRSxVQUFVLEVBQUUsU0FBUztZQUNyQixHQUFHO1lBQ0gsZ0JBQWdCLEVBQUUsRUFBRTtTQUNyQixFQUNELFlBQVksQ0FDYixDQUFDO1FBRUYsTUFBTSxTQUFTLG1DQUNWLElBQUksS0FFUCxpQkFBaUI7Z0JBQ2Ysc0NBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUIsQ0FBQyxHQUNGLENBQUM7UUFFRixPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFyQkQsMENBcUJDOzs7OztBQ3pCRCxTQUFnQixxQkFBcUIsQ0FBQyxJQUFVO0lBQzlDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUMxQixLQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFDN0IsS0FBTSxTQUFRLFdBQVc7UUFDdkI7WUFDRSxLQUFLLEVBQUUsQ0FBQztZQUNSLElBQUksQ0FBQyxTQUFTLEdBQUcsc0JBQXNCLENBQUM7UUFDMUMsQ0FBQztLQUNGLENBQ0YsQ0FBQztBQUNKLENBQUM7QUFWRCxzREFVQzs7Ozs7Ozs7QUNaRCxnQ0FBMkI7QUFDM0Isc0NBQWlDOzs7OztBQ0RqQyxzQ0FBK0Y7QUFDL0Ysc0NBQTZEO0FBRzdELFNBQWdCLGdCQUFnQixDQUFJLEVBQWdCLEVBQUUsWUFBNkI7SUFDakYsT0FBTyw0QkFBbUIsQ0FBQztRQUN6QixJQUFJLFlBQVksSUFBSSxvQkFBVyxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQzdDLHNCQUFhLENBQUMsNEJBQW1CLEVBQUUsQ0FBQyxDQUFDO1NBQ3RDO1FBRUQsTUFBTSxjQUFjLEdBQUcsSUFBSSxLQUFLLEVBQWdCLENBQUM7UUFFakQsSUFBSSxZQUFZLEVBQUU7WUFDaEIsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLHlCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7U0FDeEQ7UUFFRCxPQUFPO1lBQ0wsRUFBRTtnQkFDQSxPQUFPLEVBQUUsQ0FBQztZQUNaLENBQUM7WUFDRCxZQUFZO2dCQUNWLE9BQU8sWUFBWSxDQUFDO1lBQ3RCLENBQUM7WUFDRCxjQUFjO2dCQUNaLE9BQU8sQ0FBQyxHQUFHLGNBQWMsQ0FBQyxDQUFDO1lBQzdCLENBQUM7U0FDRixDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBeEJELDRDQXdCQzs7Ozs7Ozs7Ozs7O0FDNUJELDRCQUF1QjtBQUN2Qiw4QkFBeUI7Ozs7O0FDRHpCLFNBQWdCLHNCQUFzQixDQUFDLEdBQVcsRUFBRSxPQUFrQjtJQUNwRSxNQUFNLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO0lBRW5ELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsRUFBRTtRQUN6QyxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXhDLElBQUksU0FBUyxDQUFDLFFBQVEsS0FBSyxDQUFDLElBQUksU0FBUyxDQUFDLFNBQVMsS0FBSyxHQUFHLEVBQUU7WUFDM0QsT0FBTyxTQUFTLENBQUM7U0FDbEI7YUFBTTtZQUNMLE1BQU0sSUFBSSxHQUFHLHNCQUFzQixDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUVwRCxJQUFJLElBQUksRUFBRTtnQkFDUixPQUFPLElBQUksQ0FBQzthQUNiO1NBQ0Y7S0FDRjtBQUNILENBQUM7QUFoQkQsd0RBZ0JDOzs7OztBQ2hCRCxTQUFnQixhQUFhLENBQUMsT0FBZTtJQUMzQyxNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzNCLENBQUM7QUFGRCxzQ0FFQztBQUVELFNBQWdCLG1CQUFtQjtJQUNqQyxPQUFPLDRFQUE0RSxDQUFDO0FBQ3RGLENBQUM7QUFGRCxrREFFQzs7Ozs7QUNORCxJQUFZLFVBT1g7QUFQRCxXQUFZLFVBQVU7SUFDcEIsNkNBQUssQ0FBQTtJQUNMLG1EQUFRLENBQUE7SUFDUixpREFBTyxDQUFBO0lBQ1AsNkNBQUssQ0FBQTtJQUNMLHFEQUFTLENBQUE7SUFDVCwrQ0FBTSxDQUFBO0FBQ1IsQ0FBQyxFQVBXLFVBQVUsR0FBVixrQkFBVSxLQUFWLGtCQUFVLFFBT3JCOzs7OztBQ1BELFNBQWdCLE9BQU8sQ0FBQyxLQUFZO0lBQ2xDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDdkIsQ0FBQztBQUZELDBCQUVDOzs7OztBQ0ZELFNBQWdCLGtCQUFrQjtJQUNoQyxPQUFPLGVBQWUsQ0FBQztBQUN6QixDQUFDO0FBRkQsZ0RBRUM7QUFFRCxTQUFnQixjQUFjO0lBQzVCLE9BQU8sa0JBQWtCLENBQUM7QUFDNUIsQ0FBQztBQUZELHdDQUVDO0FBRUQsU0FBZ0IsZ0JBQWdCO0lBQzlCLE9BQU8sYUFBYSxDQUFDO0FBQ3ZCLENBQUM7QUFGRCw0Q0FFQzs7Ozs7Ozs7O0FDVkQsU0FBZ0IsU0FBUztJQUN2QixPQUFPLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDO0FBQzlDLENBQUM7QUFGRCw4QkFFQztBQUVELFNBQWdCLDZCQUE2QjtJQUMzQyxPQUFPLFVBQVUsQ0FBQztBQUNwQixDQUFDO0FBRkQsc0VBRUM7QUFFRCxTQUFnQixnQkFBZ0IsQ0FBQyxFQUFZO0lBQzNDLE9BQU8sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDO1NBQ3hCLE9BQU8sQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDO1NBQzFCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO1NBQ25CLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxFQUFFLENBQUM7U0FDbEMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDakIsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUM7U0FDeEIsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUM7U0FDdEIsS0FBSyxDQUFDLEdBQUcsQ0FBQztTQUNWLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNyQixDQUFDO0FBVkQsNENBVUM7QUFFRCxTQUFnQixvQkFBb0IsQ0FBSSxTQUFpQixFQUFFLEdBQU07SUFDL0QsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBUyxHQUFXO1FBQzNDLFNBQVMsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxRQUFRLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDcEQsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksUUFBUSxDQUFDLFVBQVUsU0FBUyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztBQUN6RCxDQUFDO0FBTkQsb0RBTUM7Ozs7Ozs7O0FDMUJELDRCQUF1QjtBQUN2Qiw4QkFBeUI7QUFDekIsOEJBQXlCO0FBQ3pCLCtCQUEwQjtBQUMxQiw4QkFBeUI7QUFDekIsOEJBQXlCO0FBQ3pCLDhCQUF5Qjs7Ozs7QUNOekIsMkNBQThDO0FBQzlDLDZDQUFnRDtBQUNoRCxtQ0FBZ0M7QUFFaEMsVUFBVSxDQUFDLGVBQWUsR0FBRywyQkFBZSxDQUFDO0FBQzdDLFVBQVUsQ0FBQyxnQkFBZ0IsR0FBRyw2QkFBZ0IsQ0FBQztBQUMvQyxVQUFVLENBQUMsS0FBSyxHQUFHLGFBQUssQ0FBQztBQUV6QixNQUFNLENBQUMsR0FBRyxhQUFLLENBQUMsWUFBWSxDQUFDO0tBQzFCLFdBQVcsQ0FBQyxNQUFNLENBQUM7S0FDbkIsTUFBTSxFQUFFLENBQUM7QUFFWixVQUFVLENBQUMsR0FBRyxFQUFFO0lBQ2QsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUN6QyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7Ozs7Ozs7Ozs7OztBQ2RULDJCQUFzQjtBQUN0Qiw4QkFBeUI7Ozs7O0FDQ3pCLHlDQU9zQjtBQUN0Qix5Q0FBcUQ7QUFFckQsaURBQXNFO0FBQ3RFLDZDQUEwQztBQUUxQyxTQUFnQixVQUFVLENBQUksV0FBZ0MsRUFBRSxhQUErQjtJQUM3RixJQUFJLGFBQWEsSUFBSSxvQkFBVyxDQUFDLGFBQWEsQ0FBQyxFQUFFO1FBQy9DLHNCQUFhLENBQUMsNEJBQW1CLEVBQUUsQ0FBQyxDQUFDO0tBQ3RDO0lBRUQsTUFBTSxVQUFVLG1DQUNYLFdBQVcsS0FDZCxpQkFBaUIsRUFBRSxFQUFFLEVBQ3JCLFVBQVUsRUFBRSxJQUFJLEtBQUssRUFBYSxFQUNsQyxrQ0FBa0MsRUFBRSxDQUFDLEVBQ3JDLG9CQUFvQixFQUFFLEVBQUUsRUFDeEIsWUFBWSxFQUFFLEtBQUssRUFDbkIsWUFBWSxFQUFFLEVBQUUsRUFDaEIsc0JBQXNCLEVBQUUsSUFBSSxHQUM3QixDQUFDO0lBRUYsU0FBUyxvQkFBb0IsQ0FBQyxjQUFtQztRQUMvRCxPQUFPLGNBQWMsQ0FBQyxHQUFHLENBQUMsVUFBUyxZQUFvQjtZQUNyRCxNQUFNLFVBQVUsR0FBRyxVQUFVLENBQUMsb0JBQW9CLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFakUsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDZixzQkFBYSxDQUFDLElBQUksWUFBWSwyQ0FBMkMsVUFBVSxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUM7YUFDbkc7WUFFRCxNQUFNLFlBQVksR0FBRyxJQUFJLEtBQUssRUFBYyxDQUFDO1lBRTdDLElBQUksVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDLE1BQU0sRUFBRTtnQkFDdEMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDekU7WUFFRCxPQUFPLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxDQUFDO1FBQ3BELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFNBQVMsZUFBZSxDQUFJLGFBQThCO1FBQ3hELElBQUksYUFBYSxFQUFFO1lBQ2pCLE1BQU0sY0FBYyxHQUF3Qix5QkFBZ0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUU1RSxNQUFNLFlBQVksR0FBUSxhQUFhLENBQUMsR0FBRyxvQkFBb0IsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBRWpGLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ2pCLE9BQU8sc0JBQWEsQ0FBQyxpREFBaUQsQ0FBQyxDQUFDO2FBQ3pFO1lBRUQsT0FBTyxZQUFZLENBQUM7U0FDckI7YUFBTTtZQUNMLE9BQU8sRUFBRSxDQUFDO1NBQ1g7SUFDSCxDQUFDO0lBRUQsSUFBSSxJQUFPLENBQUM7SUFFWixNQUFNLElBQUksR0FBWTtRQUNwQix1Q0FBdUM7WUFDckMsVUFBVSxDQUFDLGtDQUFrQyxFQUFFLENBQUM7UUFDbEQsQ0FBQztRQUVELE1BQU07WUFDSixJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNULElBQUksR0FBRyxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLEVBQUU7b0JBQy9DLEdBQUcsQ0FBQyxNQUFTLEVBQUUsUUFBZ0IsRUFBRSxLQUFVO3dCQUN6QyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSyxDQUFDO3dCQUN6Qix1QkFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNqQixPQUFPLElBQUksQ0FBQztvQkFDZCxDQUFDO2lCQUNGLENBQUMsQ0FBQzthQUNKO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBRUQsaUNBQWlDLENBQUMsT0FBZSxFQUFFLEdBQVc7WUFDNUQsVUFBVSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUM7UUFDMUQsQ0FBQztRQUVELFVBQVUsQ0FBQyxHQUFvQjtZQUM3QixNQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDOUIsSUFBSSxHQUFHLEtBQUssWUFBWSxFQUFFO2dCQUN4QixPQUFPLEtBQUssQ0FBQzthQUNkO2lCQUFNLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO2dCQUNwQyxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLG1CQUFNLEtBQUssQ0FBRSxDQUFDO2FBQ3pEO2lCQUFNO2dCQUNMLE9BQU8sS0FBSyxDQUFDO2FBQ2Q7UUFDSCxDQUFDO1FBRUQsaUJBQWlCO1lBQ2YsVUFBVSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDakMsQ0FBQztRQUVELDJCQUEyQixDQUFDLEtBQUssR0FBRyxJQUFJO1lBQ3RDLFVBQVUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQVMsU0FBb0I7Z0JBQ3pELFNBQVMsQ0FBQywyQkFBMkIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvQyxDQUFDLENBQUMsQ0FBQztZQUNILFVBQVUsQ0FBQyxzQkFBc0IsR0FBRyxLQUFLLENBQUM7UUFDNUMsQ0FBQztRQUVELGlCQUFpQixDQUFDLFNBQW9CO1lBQ3BDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFFOUQsbURBQW9DLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFM0MsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBRUQsa0JBQWtCLENBQUMsVUFBc0I7WUFDdkMsTUFBTSxLQUFLLEdBQXlCLEVBQUUsQ0FBQztZQUV2QyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDO1lBRXBDLFVBQVUsQ0FBQyxvQkFBb0IsbUNBQVEsVUFBVSxDQUFDLG9CQUFvQixHQUFLLEtBQUssQ0FBRSxDQUFDO1lBRW5GLG1EQUFvQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRTNDLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUVELE1BQU07WUFDSix1QkFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pCLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUVELFdBQVcsQ0FBQyxRQUFnQjtZQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLHNCQUFzQixFQUFFO2dCQUN0QyxzQkFBYSxDQUFDLGdFQUFnRSxDQUFDLENBQUM7YUFDakY7WUFFRCxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNiLHNCQUFhLENBQUMsbUNBQW1DLENBQUMsQ0FBQzthQUNwRDtZQUVELE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsMkJBQWtCLEVBQUUsQ0FBQyxDQUFDO1lBRTNELElBQUksYUFBYSxFQUFFO2dCQUNqQixhQUFhLENBQUMsT0FBTyxDQUFDLFVBQVMsWUFBb0I7b0JBQ2pELE1BQU0sbUJBQW1CLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBRWxFLE1BQU0sR0FBRyxHQUFHLGlCQUFRLEVBQUUsQ0FBQztvQkFFdkIsVUFBVSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxtQkFBbUIsQ0FBQztvQkFFbkQsVUFBVSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUV2RSxVQUFVLENBQUMsa0NBQWtDLEVBQUUsQ0FBQztvQkFFaEQsUUFBUSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLE9BQU8sR0FBRyxLQUFLLENBQUMsQ0FBQztnQkFDN0QsQ0FBQyxDQUFDLENBQUM7YUFDSjtZQUVELFVBQVUsQ0FBQyxnQkFBZ0IsR0FBRyxRQUFRLENBQUM7WUFFdkMsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO0tBQ0YsQ0FBQztJQUVGLE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQTNKRCxnQ0EySkM7Ozs7O0FDdEtELFNBQWdCLG9DQUFvQyxDQUFDLElBQVU7SUFDNUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQXNCLENBQUMsT0FBTyxDQUFDLFVBQVMsU0FBb0I7UUFDdkYsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLHNCQUFzQixDQUF5QixDQUFDLENBQUMsT0FBTyxDQUFDLFVBQ3JGLFVBQXNCO1lBRXRCLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQVJELG9GQVFDO0FBRUQsK0ZBQStGOzs7OztBQ2IvRix5Q0FPc0I7QUFHdEIsU0FBZ0IsVUFBVSxDQUFJLEtBQWM7SUFDMUMsTUFBTSxJQUFJLHFCQUFRLEtBQUssQ0FBRSxDQUFDO0lBRTFCLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFZLENBQUM7SUFFOUQsSUFBSSxDQUFDLGNBQWMsRUFBRTtRQUNuQixjQUFjLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxzQ0FBNkIsRUFBRSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2xIO0lBRUQsSUFBSSxDQUFDLGNBQWMsRUFBRTtRQUNuQixzQkFBYSxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQztLQUNsRjtJQUVELE1BQU0sUUFBUSxHQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUVsQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsRUFBRTtRQUNwQyxjQUFjLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQVcsQ0FBQztRQUV4RSxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBc0IsQ0FBQyxPQUFPLENBQUMsVUFBUyxTQUFvQjtZQUN2RixjQUFjLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxTQUFTLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBUyxPQUFnQjtnQkFDbkcsb0RBQW9EO2dCQUNwRCw4Q0FBOEM7Z0JBQzlDLElBQUk7Z0JBRUosT0FBTyxDQUFDLFNBQVMsR0FBRyxRQUFRLHNDQUE2QixFQUFFLEtBQUssU0FBUyxDQUFDLFVBQVUsQ0FDbEYsS0FBSyxDQUNOLEtBQUssU0FBUyxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUM7Z0JBRXZELFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN4QixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVMsU0FBaUI7WUFDeEQsTUFBTSxjQUFjLEdBQUcsUUFBUSxTQUFTLEVBQUUsQ0FBQztZQUUzQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxjQUFjLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFTLE9BQWdCO2dCQUN0RixNQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBRTdFLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsVUFBUyxLQUFZO29CQUN2RCxJQUFJLGNBQWMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUU7d0JBQ3RDLElBQUksWUFBWSxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO3dCQUU3RCxJQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLElBQUksT0FBTyxRQUFRLENBQUMsWUFBWSxDQUFDLEtBQUssVUFBVSxFQUFFOzRCQUN6RixNQUFNLGNBQWMsR0FBRyxjQUFjO2lDQUNsQyxPQUFPLENBQUMsd0JBQXdCLEVBQUUsRUFBRSxDQUFDO2lDQUNyQyxLQUFLLENBQUMsR0FBRyxDQUFDO2lDQUNWLEdBQUcsQ0FBQyxVQUFTLEtBQWE7Z0NBQ3pCLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7NEJBQ2xDLENBQUMsQ0FBQyxDQUFDOzRCQUVMLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQzs0QkFFbEIsY0FBYyxDQUFDLE9BQU8sQ0FBQyxVQUFTLFFBQWdCO2dDQUM5QyxJQUFJLFFBQVEsS0FBSyxRQUFRLEVBQUU7b0NBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7aUNBQ3BCO3FDQUFNO29DQUNMLElBQUksUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsRUFBRTt3Q0FDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztxQ0FDakM7eUNBQU07d0NBQ0wsc0JBQWEsQ0FBQyxJQUFJLFFBQVEscUNBQXFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO3FDQUM1RjtpQ0FDRjs0QkFDSCxDQUFDLENBQUMsQ0FBQzs0QkFFSCxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQzt5QkFDbkM7NkJBQU07NEJBQ0wsc0JBQWEsQ0FBQyxJQUFJLFlBQVksMENBQTBDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO3lCQUNyRztxQkFDRjt5QkFBTTt3QkFDTCw2QkFBb0IsQ0FBQyxjQUFjLEVBQUUsUUFBUSxDQUFDLENBQUM7cUJBQ2hEO2dCQUNILENBQUMsQ0FBQyxDQUFDO2dCQUVILE9BQU8sQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3JELENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUV6QixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsb0NBQW9DLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDN0QsTUFBTSxrQkFBa0IsR0FBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFZLENBQUMsS0FBSyxDQUFDLHVCQUFjLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUV6RyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsVUFBUyxpQkFBeUI7Z0JBQzNELE1BQU0sR0FBRyxHQUFHLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBRTFELE1BQU0sT0FBTyxHQUFHLCtCQUFzQixDQUFDLEdBQUcsRUFBRSxjQUFjLENBQUMsQ0FBQztnQkFFNUQsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztnQkFFekMsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBRS9FLElBQUksQ0FBQyx1Q0FBdUMsRUFBRSxDQUFDO1lBQ2pELENBQUMsQ0FBQyxDQUFDO1NBQ0o7S0FDRjtJQUVELG1FQUFtRTtJQUNuRSx3Q0FBd0M7SUFFeEMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBUyxHQUFXO1FBQzVFLElBQUksQ0FBQyxpQ0FBaUMsQ0FDcEMsNkJBQW9CLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxRQUFRLENBQVcsRUFDOUUsR0FBRyxDQUNKLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUF6R0QsZ0NBeUdDOzs7Ozs7OztBQ3BIRCxnQ0FBMkI7QUFDM0Isb0NBQStCO0FBQy9CLGtDQUE2Qjs7Ozs7QUNGN0IscUNBQW9HO0FBRXBHLFNBQWdCLFdBQVcsQ0FBQyxFQUFZO0lBQ3RDLE9BQU8sT0FBTyxFQUFFLEtBQUssVUFBVSxJQUFJLHlCQUFnQixFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0FBQzVFLENBQUM7QUFGRCxrQ0FFQztBQUVELFNBQWdCLG1CQUFtQixDQUFJLEVBQVc7SUFDaEQsSUFBSTtRQUNGLElBQUksV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ25CLHNCQUFhLENBQUMsNEJBQW1CLEVBQUUsQ0FBQyxDQUFDO1NBQ3RDO1FBQ0QsT0FBTyxFQUFFLEVBQUUsQ0FBQztLQUNiO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixnQkFBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2Q7QUFDSCxDQUFDO0FBVEQsa0RBU0M7QUFFRCxTQUFnQixRQUFRO0lBQ3RCLE9BQU8sR0FBRyxrQkFBUyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQztBQUM5RCxDQUFDO0FBRkQsNEJBRUM7Ozs7Ozs7O0FDbkJELDJCQUFzQjtBQUN0Qiw2QkFBd0I7Ozs7O0FDRHhCLHNDQUF3RDtBQUN4RCxrQ0FBcUM7QUFDckMsc0NBQWdEO0FBR2hELFNBQWdCLEtBQUssQ0FBSSxTQUFpQixFQUFFLEtBQXVCO0lBQ2pFLE9BQU8sNEJBQW1CLENBQUM7UUFDekIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUU7WUFDdEIsc0JBQWEsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1NBQzlDO1FBRUQsTUFBTSxVQUFVLEdBQVksTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFckUsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNmLHNCQUFhLENBQUMsSUFBSSxTQUFTLGlDQUFpQyxDQUFDLENBQUM7U0FDL0Q7UUFFRCxNQUFNLEtBQUssbUNBQ04saUJBQVUsQ0FDWDtZQUNFLFVBQVU7WUFDVixHQUFHLEVBQUUsU0FBUztZQUNkLGdCQUFnQixFQUFFO3dEQUM0QjtTQUMvQyxFQUNELEtBQUssQ0FDTixLQUVELHVCQUF1QixDQUFDLEtBQUssR0FBRyxJQUFJO2dCQUNsQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRXhDLE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQyxHQUNGLENBQUM7UUFFRixPQUFPLEtBQUssQ0FBQztJQUNmLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQWhDRCxzQkFnQ0MiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgJy4vc3JjL21haW4nO1xuIiwiZXhwb3J0ICogZnJvbSAnLi9saWInO1xuZXhwb3J0ICogZnJvbSAnLi9fdHlwZXMnO1xuIiwiaW1wb3J0IHsgRGF0YUFjY2Vzc29yIH0gZnJvbSAnLi4vLi4va2VybmVsJztcbmltcG9ydCB7IGNyZWF0ZU5vZGUgfSBmcm9tICcuLi8uLi9ub2RlJztcbmltcG9ydCB7IHRyeUFuZENhdGNoT3JSZXR1cm4gfSBmcm9tICcuLi8uLi9zaGFyZWQnO1xuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi4vX3R5cGVzJztcbmltcG9ydCB7IHVzZU5vZGVBc1dlYkNvbXBvbmVudCB9IGZyb20gJy4vX3dlYi1jb21wb25lbnQnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50PEM+KHRhZzogc3RyaW5nLCBkYXRhQWNjZXNzb3I/OiBEYXRhQWNjZXNzb3I8Qz4pOiBDb21wb25lbnQ8Qz4ge1xuICByZXR1cm4gdHJ5QW5kQ2F0Y2hPclJldHVybihmdW5jdGlvbigpIHtcbiAgICBjb25zdCBub2RlID0gY3JlYXRlTm9kZShcbiAgICAgIHtcbiAgICAgICAgZG9tRWxlbWVudDogdW5kZWZpbmVkLFxuICAgICAgICB0YWcsXG4gICAgICAgIHNjcmlwdGVkVGVtcGxhdGU6ICcnXG4gICAgICB9LFxuICAgICAgZGF0YUFjY2Vzc29yXG4gICAgKTtcblxuICAgIGNvbnN0IGNvbXBvbmVudDogQ29tcG9uZW50PEM+ID0ge1xuICAgICAgLi4ubm9kZSxcblxuICAgICAgdXNlQXNXZWJDb21wb25lbnQoKTogdm9pZCB7XG4gICAgICAgIHVzZU5vZGVBc1dlYkNvbXBvbmVudCh0aGlzKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgfSk7XG59XG4iLCJpbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi4vLi4vbm9kZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VOb2RlQXNXZWJDb21wb25lbnQobm9kZTogTm9kZSk6IHZvaWQge1xuICB3aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFxuICAgIGBzLSR7bm9kZS5fX3Byb3BlcnR5KCd0YWcnKX1gLFxuICAgIGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuaW5uZXJIVE1MID0gJ0ZlYXR1cmUgaW4gcHJvZ3Jlc3MuJztcbiAgICAgIH1cbiAgICB9XG4gICk7XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL19mYWN0b3J5JztcbmV4cG9ydCAqIGZyb20gJy4vX3dlYi1jb21wb25lbnQnO1xuIiwiaW1wb3J0IHsgYXJyb3dGbkVycm9yTWVzc2FnZSwgRGF0YUFjY2Vzc29yLCBmbkFyZ3VtZW50c05hbWVzLCB0aHJvd05ld0Vycm9yIH0gZnJvbSAnLi4va2VybmVsJztcbmltcG9ydCB7IGlzQW5BcnJvd0ZuLCB0cnlBbmRDYXRjaE9yUmV0dXJuIH0gZnJvbSAnLi4vc2hhcmVkJztcbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdGFibGVJZCB9IGZyb20gJy4vX3R5cGVzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUluamVjdGFibGU8ST4oaWQ6IEluamVjdGFibGVJZCwgZGF0YUFjY2Vzc29yOiBEYXRhQWNjZXNzb3I8ST4pOiBJbmplY3RhYmxlPEk+IHtcbiAgcmV0dXJuIHRyeUFuZENhdGNoT3JSZXR1cm4oZnVuY3Rpb24oKSB7XG4gICAgaWYgKGRhdGFBY2Nlc3NvciAmJiBpc0FuQXJyb3dGbihkYXRhQWNjZXNzb3IpKSB7XG4gICAgICB0aHJvd05ld0Vycm9yKGFycm93Rm5FcnJvck1lc3NhZ2UoKSk7XG4gICAgfVxuXG4gICAgY29uc3QgaW5qZWN0YWJsZXNJZHMgPSBuZXcgQXJyYXk8SW5qZWN0YWJsZUlkPigpO1xuXG4gICAgaWYgKGRhdGFBY2Nlc3Nvcikge1xuICAgICAgaW5qZWN0YWJsZXNJZHMucHVzaCguLi5mbkFyZ3VtZW50c05hbWVzKGRhdGFBY2Nlc3NvcikpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBpZCgpOiBJbmplY3RhYmxlSWQge1xuICAgICAgICByZXR1cm4gaWQ7XG4gICAgICB9LFxuICAgICAgZGF0YUFjY2Vzc29yKCk6IERhdGFBY2Nlc3NvcjxJPiB7XG4gICAgICAgIHJldHVybiBkYXRhQWNjZXNzb3I7XG4gICAgICB9LFxuICAgICAgaW5qZWN0YWJsZXNJZHMoKTogQXJyYXk8SW5qZWN0YWJsZUlkPiB7XG4gICAgICAgIHJldHVybiBbLi4uaW5qZWN0YWJsZXNJZHNdO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9fbGliJztcbmV4cG9ydCAqIGZyb20gJy4vX3R5cGVzJztcbiIsImV4cG9ydCBmdW5jdGlvbiBmaW5kQ29tbWVudE1hcmtlZEJ5VWlkKHVpZDogc3RyaW5nLCBlbGVtZW50OiBDaGlsZE5vZGUpOiBDaGlsZE5vZGUge1xuICBjb25zdCBjaGlsZE5vZGVzTGVuZ3RoID0gZWxlbWVudC5jaGlsZE5vZGVzLmxlbmd0aDtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkTm9kZXNMZW5ndGg7ICsraSkge1xuICAgIGNvbnN0IGNoaWxkTm9kZSA9IGVsZW1lbnQuY2hpbGROb2Rlc1tpXTtcblxuICAgIGlmIChjaGlsZE5vZGUubm9kZVR5cGUgPT09IDggJiYgY2hpbGROb2RlLm5vZGVWYWx1ZSA9PT0gdWlkKSB7XG4gICAgICByZXR1cm4gY2hpbGROb2RlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBub2RlID0gZmluZENvbW1lbnRNYXJrZWRCeVVpZCh1aWQsIGNoaWxkTm9kZSk7XG5cbiAgICAgIGlmIChub2RlKSB7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIHRocm93TmV3RXJyb3IobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XG4gIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFycm93Rm5FcnJvck1lc3NhZ2UoKTogc3RyaW5nIHtcbiAgcmV0dXJuICdGdW5jdGlvbiBpbiBwYXJhbXMgbXVzdCBiZSBhIGNsb3NlZCBzY29wZSBmdW5jdGlvbiwgbm90IGFuIGFycm93IGZ1bmN0aW9uLic7XG59XG4iLCJleHBvcnQgZW51bSBFdmVudFR5cGVzIHtcbiAgY2xpY2ssXG4gIGtleXByZXNzLFxuICBrZXlkb3duLFxuICBrZXl1cCxcbiAgbW91c2VvdmVyLFxuICBzdWJtaXRcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiB3YXJuaW5nKGVycm9yOiBFcnJvcik6IHZvaWQge1xuICBjb25zb2xlLmVycm9yKGVycm9yKTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiB0ZW1wbGF0ZUJpbmRpbmdSZ3goKTogUmVnRXhwIHtcbiAgcmV0dXJuIC8oXFx7ey4qP1xcfX0pL2dtO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYmluZGluZ01hcmtSZ3goKTogUmVnRXhwIHtcbiAgcmV0dXJuIC8oXFw8IS0tLio/XFwtLT4pL2dtO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXJyb3dGdW5jdGlvblJneCgpOiBSZWdFeHAge1xuICByZXR1cm4gL15bXntdKz89Pi9nbTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiB0aW1lc3RhbXAoKTogc3RyaW5nIHtcbiAgcmV0dXJuIGAke25ldyBEYXRlKCkuZ2V0VGltZSgpLnRvU3RyaW5nKCl9YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNuYWtlQ29tcG9uZW50Q29tbW9uQXR0cmlidXRlKCk6IHN0cmluZyB7XG4gIHJldHVybiAnc25ha2UtaWQnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm5Bcmd1bWVudHNOYW1lcyhmbjogRnVuY3Rpb24pOiBBcnJheTxzdHJpbmc+IHtcbiAgcmV0dXJuIChmbi50b1N0cmluZygpICsgJycpXG4gICAgLnJlcGxhY2UoL1svXVsvXS4qJC9nbSwgJycpXG4gICAgLnJlcGxhY2UoL1xccysvZywgJycpXG4gICAgLnJlcGxhY2UoL1svXVsqXVteLypdKlsqXVsvXS9nLCAnJylcbiAgICAuc3BsaXQoJyl7JywgMSlbMF1cbiAgICAucmVwbGFjZSgvXlteKF0qWyhdLywgJycpXG4gICAgLnJlcGxhY2UoLz1bXixdKy9nLCAnJylcbiAgICAuc3BsaXQoJywnKVxuICAgIC5maWx0ZXIoQm9vbGVhbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBydW5Db2RlQmluZGluZ09iamVjdDxPPihjb2RlVG9SdW46IHN0cmluZywgb2JqOiBPKTogdW5rbm93biB7XG4gIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChmdW5jdGlvbihrZXk6IHN0cmluZykge1xuICAgIGNvZGVUb1J1biA9IGNvZGVUb1J1bi5yZXBsYWNlKGtleSwgYHRoaXMuJHtrZXl9YCk7XG4gIH0pO1xuXG4gIHJldHVybiBuZXcgRnVuY3Rpb24oYHJldHVybiAke2NvZGVUb1J1bn1gKS5iaW5kKG9iaikoKTtcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vX2RvbSc7XG5leHBvcnQgKiBmcm9tICcuL19lcnJvcic7XG5leHBvcnQgKiBmcm9tICcuL19ldmVudCc7XG5leHBvcnQgKiBmcm9tICcuL19sb2dnZXInO1xuZXhwb3J0ICogZnJvbSAnLi9fcmVnZXgnO1xuZXhwb3J0ICogZnJvbSAnLi9fdHlwZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9fdXRpbHMnO1xuIiwiaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnQnO1xuaW1wb3J0IHsgY3JlYXRlSW5qZWN0YWJsZSB9IGZyb20gJy4vaW5qZWN0YWJsZSc7XG5pbXBvcnQgeyBzbmFrZSB9IGZyb20gJy4vc25ha2UnO1xuXG5nbG9iYWxUaGlzLmNyZWF0ZUNvbXBvbmVudCA9IGNyZWF0ZUNvbXBvbmVudDtcbmdsb2JhbFRoaXMuY3JlYXRlSW5qZWN0YWJsZSA9IGNyZWF0ZUluamVjdGFibGU7XG5nbG9iYWxUaGlzLnNuYWtlID0gc25ha2U7XG5cbmNvbnN0IGEgPSBzbmFrZSgnI3NuYWtlLWFwcCcpXG4gIC5zZXRUZW1wbGF0ZSgnZmNzZicpXG4gIC5yZW5kZXIoKTtcblxuc2V0VGltZW91dCgoKSA9PiB7XG4gIGEuc2V0VGVtcGxhdGUoJ3JmZ2VyZmdydGdydCcpLnJlbmRlcigpO1xufSwgMjAwMCk7XG4iLCJleHBvcnQgKiBmcm9tICcuL2xpYic7XG5leHBvcnQgKiBmcm9tICcuL190eXBlcyc7XG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb21wb25lbnQnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0YWJsZURpY3Rpb25uYXksIEluamVjdGFibGVJZCB9IGZyb20gJy4uLy4uL2luamVjdGFibGUnO1xuaW1wb3J0IHtcbiAgYXJyb3dGbkVycm9yTWVzc2FnZSxcbiAgRGF0YUFjY2Vzc29yLFxuICBEZXBlbmRlbmN5LFxuICBmbkFyZ3VtZW50c05hbWVzLFxuICB0ZW1wbGF0ZUJpbmRpbmdSZ3gsXG4gIHRocm93TmV3RXJyb3Jcbn0gZnJvbSAnLi4vLi4va2VybmVsJztcbmltcG9ydCB7IGlzQW5BcnJvd0ZuLCB1bmlxdWVJZCB9IGZyb20gJy4uLy4uL3NoYXJlZCc7XG5pbXBvcnQgeyBOb2RlLCBOb2RlUHJvcGVydGllc0lucHV0LCBOb2RlUHJvcGVydHlLZXksIE5vZGVQcm9wZXJ0eVZhbHVlIH0gZnJvbSAnLi4vX3R5cGVzJztcbmltcG9ydCB7IHRyYW5zZmVySW5qZWN0YWJsZXNUb0NoaWxkQ29tcG9uZW50cyB9IGZyb20gJy4vX2h5ZHJhdGF0aW9uJztcbmltcG9ydCB7IHJlbmRlck5vZGUgfSBmcm9tICcuL19yZW5kZXJpbmcnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTm9kZTxOPihfcHJvcGVydGllczogTm9kZVByb3BlcnRpZXNJbnB1dCwgX2RhdGFBY2Nlc3Nvcj86IERhdGFBY2Nlc3NvcjxOPik6IE5vZGU8Tj4ge1xuICBpZiAoX2RhdGFBY2Nlc3NvciAmJiBpc0FuQXJyb3dGbihfZGF0YUFjY2Vzc29yKSkge1xuICAgIHRocm93TmV3RXJyb3IoYXJyb3dGbkVycm9yTWVzc2FnZSgpKTtcbiAgfVxuXG4gIGNvbnN0IHByb3BlcnRpZXMgPSB7XG4gICAgLi4uX3Byb3BlcnRpZXMsXG4gICAgYmluZGVkRG9tRWxlbWVudHM6IHt9LFxuICAgIGNvbXBvbmVudHM6IG5ldyBBcnJheTxDb21wb25lbnQ+KCksXG4gICAgZG9tRWxlbWVudHNJbmplY3Rpb25PcGVyYXRpb25UcmVhZDogMCxcbiAgICBpbmplY3RhYmxlRGljdGlvbm5heToge30sXG4gICAgaXNWaWV3TG9hZGVkOiBmYWxzZSxcbiAgICBzY3JpcHRlZERhdGE6IHt9LFxuICAgIHRlbXBsYXRlSW5qZWN0aW9uVXNpbmc6IHRydWVcbiAgfTtcblxuICBmdW5jdGlvbiB0cmFuc2xhdGVJbmplY3RhYmxlcyhpbmplY3RhYmxlc0lkczogQXJyYXk8SW5qZWN0YWJsZUlkPik6IERlcGVuZGVuY3lbXSB7XG4gICAgcmV0dXJuIGluamVjdGFibGVzSWRzLm1hcChmdW5jdGlvbihpbmplY3RhYmxlSWQ6IHN0cmluZykge1xuICAgICAgY29uc3QgaW5qZWN0YWJsZSA9IHByb3BlcnRpZXMuaW5qZWN0YWJsZURpY3Rpb25uYXlbaW5qZWN0YWJsZUlkXTtcblxuICAgICAgaWYgKCFpbmplY3RhYmxlKSB7XG4gICAgICAgIHRocm93TmV3RXJyb3IoYFwiJHtpbmplY3RhYmxlSWR9XCIgaXMgbm90IGRlY2xhcmVkIGFzIGluamVjdGFibGUgaW4gdGhlIFwiJHtwcm9wZXJ0aWVzLnRhZ31cIiBub2RlLmApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkZXBlbmRlbmNpZXMgPSBuZXcgQXJyYXk8RGVwZW5kZW5jeT4oKTtcblxuICAgICAgaWYgKGluamVjdGFibGUuaW5qZWN0YWJsZXNJZHMoKS5sZW5ndGgpIHtcbiAgICAgICAgZGVwZW5kZW5jaWVzLnB1c2goLi4udHJhbnNsYXRlSW5qZWN0YWJsZXMoaW5qZWN0YWJsZS5pbmplY3RhYmxlc0lkcygpKSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBpbmplY3RhYmxlLmRhdGFBY2Nlc3NvcigpKC4uLmRlcGVuZGVuY2llcyk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBydW5EYXRhQWNjZXNzb3I8RD4oX2RhdGFBY2Nlc3NvcjogRGF0YUFjY2Vzc29yPEQ+KTogYW55IHtcbiAgICBpZiAoX2RhdGFBY2Nlc3Nvcikge1xuICAgICAgY29uc3QgaW5qZWN0YWJsZXNJZHM6IEFycmF5PEluamVjdGFibGVJZD4gPSBmbkFyZ3VtZW50c05hbWVzKF9kYXRhQWNjZXNzb3IpO1xuXG4gICAgICBjb25zdCBjb21wdXRlZERhdGE6IGFueSA9IF9kYXRhQWNjZXNzb3IoLi4udHJhbnNsYXRlSW5qZWN0YWJsZXMoaW5qZWN0YWJsZXNJZHMpKTtcblxuICAgICAgaWYgKCFjb21wdXRlZERhdGEpIHtcbiAgICAgICAgcmV0dXJuIHRocm93TmV3RXJyb3IoJ05vZGUgZGF0YSBzZXR0aW5nIG11c3QgYWx3YXlzIHJldHVybiBhbiBvYmplY3QuJyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb21wdXRlZERhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gIH1cblxuICBsZXQgZGF0YTogTjtcblxuICBjb25zdCBub2RlOiBOb2RlPE4+ID0ge1xuICAgIF9fY2xvc2VPbmVEb21FbGVtZW50c0luamVjdGlvbk9wZXJhdGlvbigpOiB2b2lkIHtcbiAgICAgIHByb3BlcnRpZXMuZG9tRWxlbWVudHNJbmplY3Rpb25PcGVyYXRpb25UcmVhZC0tO1xuICAgIH0sXG5cbiAgICBfX2RhdGEoKTogTiB7XG4gICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgZGF0YSA9IG5ldyBQcm94eShydW5EYXRhQWNjZXNzb3IoX2RhdGFBY2Nlc3NvciksIHtcbiAgICAgICAgICBzZXQodGFyZ2V0OiBOLCBwcm9wZXJ0eTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgICAgICAgICB0YXJnZXRbcHJvcGVydHldID0gdmFsdWU7XG4gICAgICAgICAgICByZW5kZXJOb2RlKHRoaXMpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0sXG5cbiAgICBfX2luamVjdENvbnRlbnRUb0JpbmRlZERvbUVsZW1lbnQoY29udGVudDogc3RyaW5nLCB1aWQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgcHJvcGVydGllcy5iaW5kZWREb21FbGVtZW50c1t1aWRdLnRleHRDb250ZW50ID0gY29udGVudDtcbiAgICB9LFxuXG4gICAgX19wcm9wZXJ0eShrZXk6IE5vZGVQcm9wZXJ0eUtleSk6IE5vZGVQcm9wZXJ0eVZhbHVlIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcHJvcGVydGllc1trZXldO1xuICAgICAgaWYgKGtleSA9PT0gJ2RvbUVsZW1lbnQnKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyBbLi4udmFsdWVdIDogeyAuLi52YWx1ZSB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBfX3NldFZpZXdBc0xvYWRlZCgpOiB2b2lkIHtcbiAgICAgIHByb3BlcnRpZXMuaXNWaWV3TG9hZGVkID0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgX19zZXRUZW1wbGF0ZUluamVjdGlvblVzaW5nKHZhbHVlID0gdHJ1ZSk6IHZvaWQge1xuICAgICAgcHJvcGVydGllcy5jb21wb25lbnRzLmZvckVhY2goZnVuY3Rpb24oY29tcG9uZW50OiBDb21wb25lbnQpOiB2b2lkIHtcbiAgICAgICAgY29tcG9uZW50Ll9fc2V0VGVtcGxhdGVJbmplY3Rpb25Vc2luZyh2YWx1ZSk7XG4gICAgICB9KTtcbiAgICAgIHByb3BlcnRpZXMudGVtcGxhdGVJbmplY3Rpb25Vc2luZyA9IHZhbHVlO1xuICAgIH0sXG5cbiAgICByZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQ6IENvbXBvbmVudCk6IE5vZGU8Tj4ge1xuICAgICAgcHJvcGVydGllcy5jb21wb25lbnRzID0gWy4uLnByb3BlcnRpZXMuY29tcG9uZW50cywgY29tcG9uZW50XTtcblxuICAgICAgdHJhbnNmZXJJbmplY3RhYmxlc1RvQ2hpbGRDb21wb25lbnRzKHRoaXMpO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgcmVnaXN0ZXJJbmplY3RhYmxlKGluamVjdGFibGU6IEluamVjdGFibGUpIHtcbiAgICAgIGNvbnN0IHBhdGNoOiBJbmplY3RhYmxlRGljdGlvbm5heSA9IHt9O1xuXG4gICAgICBwYXRjaFtpbmplY3RhYmxlLmlkKCldID0gaW5qZWN0YWJsZTtcblxuICAgICAgcHJvcGVydGllcy5pbmplY3RhYmxlRGljdGlvbm5heSA9IHsgLi4ucHJvcGVydGllcy5pbmplY3RhYmxlRGljdGlvbm5heSwgLi4ucGF0Y2ggfTtcblxuICAgICAgdHJhbnNmZXJJbmplY3RhYmxlc1RvQ2hpbGRDb21wb25lbnRzKHRoaXMpO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgcmVuZGVyKCk6IE5vZGU8Tj4ge1xuICAgICAgcmVuZGVyTm9kZSh0aGlzKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBzZXRUZW1wbGF0ZSh0ZW1wbGF0ZTogc3RyaW5nKTogTm9kZTxOPiB7XG4gICAgICBpZiAoIXByb3BlcnRpZXMudGVtcGxhdGVJbmplY3Rpb25Vc2luZykge1xuICAgICAgICB0aHJvd05ld0Vycm9yKCdZb3UgaGF2ZSB0byBlbmFibGUgdGVtcGxhdGUgaW5qZWN0aW9uIHRvIHVzZSB0ZW1wbGF0ZSBzZXR0aW5nLicpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXRlbXBsYXRlKSB7XG4gICAgICAgIHRocm93TmV3RXJyb3IoJ1BsZWFzZSBkZWZpbmUgYSBjb3JyZWN0IHRlbXBsYXRlLicpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzY3JpcHRlZFRlcm1zID0gdGVtcGxhdGUubWF0Y2godGVtcGxhdGVCaW5kaW5nUmd4KCkpO1xuXG4gICAgICBpZiAoc2NyaXB0ZWRUZXJtcykge1xuICAgICAgICBzY3JpcHRlZFRlcm1zLmZvckVhY2goZnVuY3Rpb24oc2NyaXB0ZWRUZXJtOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgICBjb25zdCB0ZXJtQmVmb3JlQ29tcHV0aW5nID0gc2NyaXB0ZWRUZXJtLnJlcGxhY2UoLyh7e3x9fSkvZ20sICcnKTtcblxuICAgICAgICAgIGNvbnN0IHVpZCA9IHVuaXF1ZUlkKCk7XG5cbiAgICAgICAgICBwcm9wZXJ0aWVzLnNjcmlwdGVkRGF0YVt1aWRdID0gdGVybUJlZm9yZUNvbXB1dGluZztcblxuICAgICAgICAgIHByb3BlcnRpZXMuYmluZGVkRG9tRWxlbWVudHNbdWlkXSA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG5cbiAgICAgICAgICBwcm9wZXJ0aWVzLmRvbUVsZW1lbnRzSW5qZWN0aW9uT3BlcmF0aW9uVHJlYWQrKztcblxuICAgICAgICAgIHRlbXBsYXRlID0gdGVtcGxhdGUucmVwbGFjZShzY3JpcHRlZFRlcm0sIGA8IS0tJHt1aWR9LS0+YCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBwcm9wZXJ0aWVzLnNjcmlwdGVkVGVtcGxhdGUgPSB0ZW1wbGF0ZTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBub2RlO1xufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY29tcG9uZW50JztcbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdGFibGVEaWN0aW9ubmF5IH0gZnJvbSAnLi4vLi4vaW5qZWN0YWJsZSc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi4vX3R5cGVzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zZmVySW5qZWN0YWJsZXNUb0NoaWxkQ29tcG9uZW50cyhub2RlOiBOb2RlKTogdm9pZCB7XG4gIChub2RlLl9fcHJvcGVydHkoJ2NvbXBvbmVudHMnKSBhcyBBcnJheTxDb21wb25lbnQ+KS5mb3JFYWNoKGZ1bmN0aW9uKGNvbXBvbmVudDogQ29tcG9uZW50KTogdm9pZCB7XG4gICAgT2JqZWN0LnZhbHVlcyhub2RlLl9fcHJvcGVydHkoJ2luamVjdGFibGVEaWN0aW9ubmF5JykgYXMgSW5qZWN0YWJsZURpY3Rpb25uYXkpLmZvckVhY2goZnVuY3Rpb24oXG4gICAgICBpbmplY3RhYmxlOiBJbmplY3RhYmxlXG4gICAgKSB7XG4gICAgICBjb21wb25lbnQucmVnaXN0ZXJJbmplY3RhYmxlKGluamVjdGFibGUpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuLy8gY29tcG9uZW50Ll9fc2V0VGVtcGxhdGVJbmplY3Rpb25Vc2luZyhub2RlLl9fcHJvcGVydHkoJ3RlbXBsYXRlSW5qZWN0aW9uVXNpbmcnKSBhcyBib29sZWFuKTtcbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudCc7XG5pbXBvcnQge1xuICBiaW5kaW5nTWFya1JneCxcbiAgRXZlbnRUeXBlcyxcbiAgZmluZENvbW1lbnRNYXJrZWRCeVVpZCxcbiAgcnVuQ29kZUJpbmRpbmdPYmplY3QsXG4gIHNuYWtlQ29tcG9uZW50Q29tbW9uQXR0cmlidXRlLFxuICB0aHJvd05ld0Vycm9yXG59IGZyb20gJy4uLy4uL2tlcm5lbCc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi4vX3R5cGVzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlck5vZGU8VD4oX25vZGU6IE5vZGU8VD4pOiB2b2lkIHtcbiAgY29uc3Qgbm9kZSA9IHsgLi4uX25vZGUgfTtcblxuICBsZXQgbm9kZURvbUVsZW1lbnQgPSBub2RlLl9fcHJvcGVydHkoJ2RvbUVsZW1lbnQnKSBhcyBFbGVtZW50O1xuXG4gIGlmICghbm9kZURvbUVsZW1lbnQpIHtcbiAgICBub2RlRG9tRWxlbWVudCA9IHdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbJHtzbmFrZUNvbXBvbmVudENvbW1vbkF0dHJpYnV0ZSgpfT0ke25vZGUuX19wcm9wZXJ0eSgndGFnJyl9XWApO1xuICB9XG5cbiAgaWYgKCFub2RlRG9tRWxlbWVudCkge1xuICAgIHRocm93TmV3RXJyb3IoYCcke25vZGUuX19wcm9wZXJ0eSgndGFnJyl9JyBjb21wb25lbnQgaXMgdW5rbm93bmVkIGZvciB0aGUgRE9NLmApO1xuICB9XG5cbiAgY29uc3Qgbm9kZURhdGE6IFQgPSBub2RlLl9fZGF0YSgpO1xuXG4gIGlmICghbm9kZS5fX3Byb3BlcnR5KCdpc1ZpZXdMb2FkZWQnKSkge1xuICAgIG5vZGVEb21FbGVtZW50LmlubmVySFRNTCA9IG5vZGUuX19wcm9wZXJ0eSgnc2NyaXB0ZWRUZW1wbGF0ZScpIGFzIHN0cmluZztcblxuICAgIChub2RlLl9fcHJvcGVydHkoJ2NvbXBvbmVudHMnKSBhcyBBcnJheTxDb21wb25lbnQ+KS5mb3JFYWNoKGZ1bmN0aW9uKGNvbXBvbmVudDogQ29tcG9uZW50KTogdm9pZCB7XG4gICAgICBub2RlRG9tRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKGBzLSR7Y29tcG9uZW50Ll9fcHJvcGVydHkoJ3RhZycpfWApLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudDogRWxlbWVudCk6IHZvaWQge1xuICAgICAgICAvLyBpZiAoIW5vZGUuX19wcm9wZXJ0eSgndGVtcGxhdGVJbmplY3Rpb25Vc2luZycpKSB7XG4gICAgICAgIC8vICAgY29tcG9uZW50LnNldFRlbXBsYXRlKGVsZW1lbnQuaW5uZXJIVE1MKTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIGVsZW1lbnQub3V0ZXJIVE1MID0gYDxkaXYgJHtzbmFrZUNvbXBvbmVudENvbW1vbkF0dHJpYnV0ZSgpfT1cIiR7Y29tcG9uZW50Ll9fcHJvcGVydHkoXG4gICAgICAgICAgJ3RhZydcbiAgICAgICAgKX1cIj4ke2NvbXBvbmVudC5fX3Byb3BlcnR5KCdzY3JpcHRlZFRlbXBsYXRlJyl9PC9kaXY+YDtcblxuICAgICAgICByZW5kZXJOb2RlKGNvbXBvbmVudCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIE9iamVjdC5rZXlzKEV2ZW50VHlwZXMpLmZvckVhY2goZnVuY3Rpb24oZXZlbnRUeXBlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgIGNvbnN0IGV2ZW50QXR0cmlidXRlID0gYHMtb24tJHtldmVudFR5cGV9YDtcblxuICAgICAgbm9kZURvbUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChgWyR7ZXZlbnRBdHRyaWJ1dGV9XWApLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudDogRWxlbWVudCk6IHZvaWQge1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVWYWx1ZSA9IGVsZW1lbnQuYXR0cmlidXRlcy5nZXROYW1lZEl0ZW0oZXZlbnRBdHRyaWJ1dGUpLnZhbHVlO1xuXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGZ1bmN0aW9uKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICAgIGlmIChhdHRyaWJ1dGVWYWx1ZS5tYXRjaCgvKFxcKC4qXFwpKS9nbSkpIHtcbiAgICAgICAgICAgIGxldCBwcm9wZXJ0eU5hbWUgPSBhdHRyaWJ1dGVWYWx1ZS5yZXBsYWNlKC8oXFwoLio/XFwpKS9nbSwgJycpO1xuXG4gICAgICAgICAgICBpZiAobm9kZURhdGEuaGFzT3duUHJvcGVydHkocHJvcGVydHlOYW1lKSAmJiB0eXBlb2Ygbm9kZURhdGFbcHJvcGVydHlOYW1lXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICBjb25zdCBwcm9wZXJ0eVBhcmFtcyA9IGF0dHJpYnV0ZVZhbHVlXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL14oW2Etel18W0EtWl0pKlxcKHxcXCkvZ20sICcnKVxuICAgICAgICAgICAgICAgIC5zcGxpdCgnLCcpXG4gICAgICAgICAgICAgICAgLm1hcChmdW5jdGlvbihwYXJhbTogc3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gcGFyYW0ucmVwbGFjZSgvXFxzL2csICcnKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICBjb25zdCBwYXJhbXMgPSBbXTtcblxuICAgICAgICAgICAgICBwcm9wZXJ0eVBhcmFtcy5mb3JFYWNoKGZ1bmN0aW9uKHByb3BlcnR5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgICAgICAgICBpZiAocHJvcGVydHkgPT09ICckZXZlbnQnKSB7XG4gICAgICAgICAgICAgICAgICBwYXJhbXMucHVzaChldmVudCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGlmIChub2RlRGF0YS5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zLnB1c2gobm9kZURhdGFbcHJvcGVydHldKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93TmV3RXJyb3IoYFwiJHtwcm9wZXJ0eX1cIiBpcyBub3QgYSBwcm9wZXJ0eSBvZiBjb21wb25lbnQgXCIke25vZGUuX19wcm9wZXJ0eSgndGFnJyl9XCIuYCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICBub2RlRGF0YVtwcm9wZXJ0eU5hbWVdKC4uLnBhcmFtcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aHJvd05ld0Vycm9yKGBcIiR7cHJvcGVydHlOYW1lfVwiIG1ldGhvZCBpcyBub3QgY2FsbGFibGUgb24gY29tcG9uZW50IFwiJHtub2RlLl9fcHJvcGVydHkoJ3RhZycpfVwiLmApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBydW5Db2RlQmluZGluZ09iamVjdChhdHRyaWJ1dGVWYWx1ZSwgbm9kZURhdGEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZWxlbWVudC5hdHRyaWJ1dGVzLnJlbW92ZU5hbWVkSXRlbShldmVudEF0dHJpYnV0ZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIG5vZGUuX19zZXRWaWV3QXNMb2FkZWQoKTtcblxuICAgIGlmIChub2RlLl9fcHJvcGVydHkoJ2RvbUVsZW1lbnRzSW5qZWN0aW9uT3BlcmF0aW9uVHJlYWQnKSA+IDApIHtcbiAgICAgIGNvbnN0IG1hcmtlZEJpbmRlZFBvaW50cyA9IChub2RlLl9fcHJvcGVydHkoJ3NjcmlwdGVkVGVtcGxhdGUnKSBhcyBzdHJpbmcpLm1hdGNoKGJpbmRpbmdNYXJrUmd4KCkpIHx8IFtdO1xuXG4gICAgICBtYXJrZWRCaW5kZWRQb2ludHMuZm9yRWFjaChmdW5jdGlvbihtYXJrZWRCaW5kZWRQb2ludDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHVpZCA9IG1hcmtlZEJpbmRlZFBvaW50LnJlcGxhY2UoLyg8IS0tfC0tPikvZ20sICcnKTtcblxuICAgICAgICBjb25zdCBjb21tZW50ID0gZmluZENvbW1lbnRNYXJrZWRCeVVpZCh1aWQsIG5vZGVEb21FbGVtZW50KTtcblxuICAgICAgICBjb25zdCBjb21tZW50UGFyZW50ID0gY29tbWVudC5wYXJlbnROb2RlO1xuXG4gICAgICAgIGNvbW1lbnRQYXJlbnQucmVwbGFjZUNoaWxkKG5vZGUuX19wcm9wZXJ0eSgnYmluZGVkRG9tRWxlbWVudHMnKVt1aWRdLCBjb21tZW50KTtcblxuICAgICAgICBub2RlLl9fY2xvc2VPbmVEb21FbGVtZW50c0luamVjdGlvbk9wZXJhdGlvbigpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gY29uc29sZS5sb2coJ3NjcmlwdGVkRGF0YSA6ICcsIG5vZGUuX19wcm9wZXJ0eSgnc2NyaXB0ZWREYXRhJykpO1xuICAvLyBjb25zb2xlLmxvZygnbm9kZURhdGEgOiAnLCBub2RlRGF0YSk7XG5cbiAgT2JqZWN0LmtleXMobm9kZS5fX3Byb3BlcnR5KCdiaW5kZWREb21FbGVtZW50cycpKS5mb3JFYWNoKGZ1bmN0aW9uKHVpZDogc3RyaW5nKSB7XG4gICAgbm9kZS5fX2luamVjdENvbnRlbnRUb0JpbmRlZERvbUVsZW1lbnQoXG4gICAgICBydW5Db2RlQmluZGluZ09iamVjdChub2RlLl9fcHJvcGVydHkoJ3NjcmlwdGVkRGF0YScpW3VpZF0sIG5vZGVEYXRhKSBhcyBzdHJpbmcsXG4gICAgICB1aWRcbiAgICApO1xuICB9KTtcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vX2ZhY3RvcnknO1xuZXhwb3J0ICogZnJvbSAnLi9faHlkcmF0YXRpb24nO1xuZXhwb3J0ICogZnJvbSAnLi9fcmVuZGVyaW5nJztcbiIsImltcG9ydCB7IGFycm93Rm5FcnJvck1lc3NhZ2UsIGFycm93RnVuY3Rpb25SZ3gsIHRocm93TmV3RXJyb3IsIHRpbWVzdGFtcCwgd2FybmluZyB9IGZyb20gJy4va2VybmVsJztcblxuZXhwb3J0IGZ1bmN0aW9uIGlzQW5BcnJvd0ZuKGZuOiBGdW5jdGlvbik6IGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZW9mIGZuID09PSAnZnVuY3Rpb24nICYmIGFycm93RnVuY3Rpb25SZ3goKS50ZXN0KGZuLnRvU3RyaW5nKCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdHJ5QW5kQ2F0Y2hPclJldHVybjxUPihmbjogKCkgPT4gVCk6IFQge1xuICB0cnkge1xuICAgIGlmIChpc0FuQXJyb3dGbihmbikpIHtcbiAgICAgIHRocm93TmV3RXJyb3IoYXJyb3dGbkVycm9yTWVzc2FnZSgpKTtcbiAgICB9XG4gICAgcmV0dXJuIGZuKCk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHdhcm5pbmcoZXJyKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5pcXVlSWQoKTogc3RyaW5nIHtcbiAgcmV0dXJuIGAke3RpbWVzdGFtcCgpfSR7TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDApfWA7XG59XG4iLCJleHBvcnQgKiBmcm9tICcuL2xpYic7XG5leHBvcnQgKiBmcm9tICcuL3R5cGVzJztcbiIsImltcG9ydCB7IERhdGFBY2Nlc3NvciwgdGhyb3dOZXdFcnJvciB9IGZyb20gJy4uL2tlcm5lbCc7XG5pbXBvcnQgeyBjcmVhdGVOb2RlIH0gZnJvbSAnLi4vbm9kZSc7XG5pbXBvcnQgeyB0cnlBbmRDYXRjaE9yUmV0dXJuIH0gZnJvbSAnLi4vc2hhcmVkJztcbmltcG9ydCB7IFNuYWtlIH0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzbmFrZTxTPihfc2VsZWN0b3I6IHN0cmluZywgX2RhdGE/OiBEYXRhQWNjZXNzb3I8Uz4pOiBTbmFrZTxTPiB7XG4gIHJldHVybiB0cnlBbmRDYXRjaE9yUmV0dXJuKGZ1bmN0aW9uKCkge1xuICAgIGlmICghZ2xvYmFsVGhpcy53aW5kb3cpIHtcbiAgICAgIHRocm93TmV3RXJyb3IoYFdpbmRvdyBvYmplY3QgaXMgdW5rbm93bmVkLmApO1xuICAgIH1cblxuICAgIGNvbnN0IGRvbUVsZW1lbnQ6IEVsZW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihfc2VsZWN0b3IpO1xuXG4gICAgaWYgKCFkb21FbGVtZW50KSB7XG4gICAgICB0aHJvd05ld0Vycm9yKGBcIiR7X3NlbGVjdG9yfVwiIGVsZW1lbnQgZG9lc24ndCBleGlzdCBpbiBET00uYCk7XG4gICAgfVxuXG4gICAgY29uc3Qgc25ha2U6IFNuYWtlPFM+ID0ge1xuICAgICAgLi4uY3JlYXRlTm9kZTxTPihcbiAgICAgICAge1xuICAgICAgICAgIGRvbUVsZW1lbnQsXG4gICAgICAgICAgdGFnOiBfc2VsZWN0b3IsXG4gICAgICAgICAgc2NyaXB0ZWRUZW1wbGF0ZTogYDxoMT5Db25ncmF0dWxhdGlvbnMgITwvaDE+XG4gICAgICAgICAgPHA+WW91IGp1c3QgY3JlYXRlZCBhIFNuYWtlLmpzIGFwcCBoZXJlLjwvaDE+YFxuICAgICAgICB9LFxuICAgICAgICBfZGF0YVxuICAgICAgKSxcblxuICAgICAgZW5hYmxlVGVtcGxhdGVJbmplY3Rpb24odmFsdWUgPSB0cnVlKTogU25ha2U8Uz4ge1xuICAgICAgICB0aGlzLl9fc2V0VGVtcGxhdGVJbmplY3Rpb25Vc2luZyh2YWx1ZSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBzbmFrZTtcbiAgfSk7XG59XG4iXX0=
