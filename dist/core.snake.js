(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./src/main");

},{"./src/main":15}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("../node");
const shared_1 = require("../shared");
function createComponent(tag, dataAccessor) {
    return shared_1.tryAndCatchOrReturn(function () {
        const component = Object.assign(Object.assign({}, node_1.createNode({
            domElement: undefined,
            tag,
            scriptedTemplate: ''
        }, dataAccessor)), { useAsWebComponent() {
                window.customElements.define(`s-${component.property('tag')}`, class extends HTMLElement {
                    constructor() {
                        super();
                        this.innerHTML = 'Feature in progress.';
                    }
                });
            } });
        return Object.assign({}, component);
    });
}
exports.createComponent = createComponent;

},{"../node":17,"../shared":23}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],4:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./_lib"));
__export(require("./_types"));

},{"./_lib":2,"./_types":3}],5:[function(require,module,exports){
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

},{"../kernel":14,"../shared":23}],6:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"dup":3}],7:[function(require,module,exports){
arguments[4][4][0].apply(exports,arguments)
},{"./_lib":5,"./_types":6,"dup":4}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function warning(error) {
    console.error(error);
}
exports.warning = warning;

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"dup":3}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./_error"));
__export(require("./_event"));
__export(require("./_logger"));
__export(require("./_regex"));
__export(require("./_types"));
__export(require("./_utils"));

},{"./_error":8,"./_event":9,"./_logger":10,"./_regex":11,"./_types":12,"./_utils":13}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("./component");
const injectable_1 = require("./injectable");
const snake_1 = require("./snake");
globalThis.createComponent = component_1.createComponent;
globalThis.createInjectable = injectable_1.createInjectable;
globalThis.snake = snake_1.snake;

},{"./component":4,"./injectable":7,"./snake":24}],16:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"dup":3}],17:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./lib"));
__export(require("./_types"));

},{"./_types":16,"./lib":22}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kernel_1 = require("../../kernel");
const shared_1 = require("../../shared");
const _hydratation_1 = require("./_hydratation");
const _properties_1 = require("./_properties");
function createNode(_properties, _dataAccessor) {
    if (_dataAccessor && shared_1.isAnArrowFn(_dataAccessor)) {
        kernel_1.throwNewError(kernel_1.arrowFnErrorMessage());
    }
    const properties = _properties_1.createNodePropertiesManager(Object.assign(Object.assign({}, _properties), { childComponents: new Array(), injectableDictionnay: {}, isViewLoaded: false, bindedPointsData: {}, bindedPointsElements: {}, bindedPointsNodesInjectionTread: 0 }));
    function translateInjectables(injectablesIds) {
        return injectablesIds.map(function (injectableId) {
            const injectable = properties.get('injectableDictionnay')[injectableId];
            if (!injectable) {
                kernel_1.throwNewError(`"${injectableId}" is not declared as injectable in the "${properties.get('tag')}" node.`);
            }
            const dependencies = new Array();
            if (injectable.injectablesIds().length) {
                dependencies.push(...translateInjectables(injectable.injectablesIds()));
            }
            return injectable.dataAccessor()(...dependencies);
        });
    }
    function computeData(_dataAccessor) {
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
        data() {
            if (!data) {
                data = new Proxy(computeData(_dataAccessor), {
                    set(target, property, value) {
                        target[property] = value;
                        // renderNode(node);
                        return true;
                    }
                });
            }
            return data;
        },
        property(key) {
            return properties.get(key);
        },
        registerChildComponent(component) {
            properties.set({ childComponents: [...properties.get('childComponents'), component] });
            return _hydratation_1.hydrateChildComponents(node);
        },
        registerInjectable(injectable) {
            const patch = {};
            patch[injectable.id()] = injectable;
            properties.set({
                injectableDictionnay: Object.assign(Object.assign({}, properties.get('injectableDictionnay')), patch)
            });
            return _hydratation_1.hydrateChildComponents(node);
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
                    //           properties.set({
                    // bindedPointsData: {...properties.get('bindedPointsData') as }
                    //           })
                    //           bindedPointsData[uid] = termBeforeComputing;
                    // bindedPointsElements[uid] = window.document.createTextNode('');
                    properties.set({
                        bindedPointsNodesInjectionTread: +properties.get('bindedPointsNodesInjectionTread') + 1
                    });
                    template = template.replace(scriptedTerm, `<!--${uid}-->`);
                });
            }
            properties.set({ scriptedTemplate: template });
            return Object.assign({}, node);
        }
    };
    return node;
}
exports.createNode = createNode;

},{"../../kernel":14,"../../shared":23,"./_hydratation":19,"./_properties":20}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function hydrateChildComponents(_node) {
    const node = Object.assign({}, _node);
    node.property('childComponents').forEach(function (component) {
        Object.values(node.property('injectableDictionnay')).forEach(function (injectable) {
            component.registerInjectable(injectable);
        });
    });
    return node;
}
exports.hydrateChildComponents = hydrateChildComponents;

},{}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createNodePropertiesManager(_properties) {
    let properties = Object.assign({}, _properties);
    return {
        get(key) {
            const value = properties[key];
            if (typeof value === 'object') {
                return Object.assign({}, value);
            }
            else {
                return value;
            }
        },
        set(patch) {
            properties = Object.assign(Object.assign({}, properties), patch);
        }
    };
}
exports.createNodePropertiesManager = createNodePropertiesManager;

},{}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function renderNode(node) {
    console.log(node);
    return Object.assign({}, node);
}
exports.renderNode = renderNode;
// render(): Node<N> {
//     if (!globalThis.window) {
//       throwNewError(`Window object is unknowned.`);
//     }
//     if (!properties.domElement) {
//       properties.domElement = window.document.querySelector(`[${snakeComponentCommonAttribute()}=${properties.tag}]`);
//     }
//     if (!properties.domElement) {
//       throwNewError(`'${properties.tag}' component is unknowned for the DOM.`);
//     }
//     if (!properties.isViewLoaded) {
//       properties.domElement.innerHTML = properties.scriptedTemplate;
//       properties.childComponents.forEach(function(component: Component<N>): void {
//         properties.domElement.querySelectorAll(`s-${component.getTag()}`).forEach(function(element: Element): void {
//           element.outerHTML = `<div ${snakeComponentCommonAttribute()}="${component.getTag()}">${component.getTemplate()}</div>`;
//           component.render();
//         });
//       });
//       Object.keys(EventTypes).forEach(function(eventType: string): void {
//         const eventAttribute = `s-on-${eventType}`;
//         properties.domElement.querySelectorAll(`[${eventAttribute}]`).forEach(function(element: Element): void {
//           const attributeValue = element.attributes.getNamedItem(eventAttribute).value;
//           element.addEventListener(eventType, function(event: Event): void {
//             if (attributeValue.match(/(\(.*\))/gm)) {
//               let propertyName = attributeValue.replace(/(\(.*?\))/gm, '');
//               if (nodeData.hasOwnProperty(propertyName) && typeof nodeData[propertyName] === 'function') {
//                 const propertyParams = attributeValue
//                   .replace(/^([a-z]|[A-Z])*\(|\)/gm, '')
//                   .split(',')
//                   .map(function(param: string) {
//                     return param.replace(/\s/g, '');
//                   });
//                 const params = [];
//                 propertyParams.forEach(function(property: string): void {
//                   if (property === '$event') {
//                     params.push(event);
//                   } else {
//                     if (nodeData.hasOwnProperty(property)) {
//                       params.push(nodeData[property]);
//                     } else {
//                       throwNewError(`"${property}" is not a property of component "${properties.tag}".`);
//                     }
//                   }
//                 });
//                 nodeData[propertyName](...params);
//               } else {
//                 throwNewError(`"${propertyName}" method is not callable on component "${properties.tag}".`);
//               }
//             } else {
//               runCodeBindingObject(attributeValue, nodeData);
//             }
//           });
//           element.attributes.removeNamedItem(eventAttribute);
//         });
//       });
//       properties.isViewLoaded = true;
//     }
//     const nodeData: N = this.getData();
//     if (bindedPointsNodesInjectionTread > 0) {
//       const markedBindedPoints = properties.scriptedTemplate.match(bindingMarkRgx()) || [];
//       function findNodeChildByUid(uid: string, element: ChildNode): ChildNode {
//         const childNodesLength = element.childNodes.length;
//         for (let i = 0; i < childNodesLength; ++i) {
//           const childNode = element.childNodes[i];
//           if (childNode.nodeType === 8 && childNode.nodeValue === uid) {
//             return childNode;
//           } else {
//             const node = findNodeChildByUid(uid, childNode);
//             if (node) {
//               return node;
//             }
//           }
//         }
//       }
//       markedBindedPoints.forEach(function(markedBindedPoint: string) {
//         const uid = markedBindedPoint.replace(/(<!--|-->)/gm, '');
//         const comment = findNodeChildByUid(uid, properties.domElement);
//         const parent = comment.parentNode;
//         parent.replaceChild(bindedPointsNodes[uid], comment);
//         bindedPointsNodesInjectionTread--;
//       });
//     }
//     Object.keys(bindedPointsNodes).forEach(function(uid: string) {
//       bindedPointsNodes[uid].textContent = runCodeBindingObject(bindedPointsData[uid], nodeData);
//     });
//     return this;
//   },

},{}],22:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./_factory"));
__export(require("./_hydratation"));
__export(require("./_properties"));
__export(require("./_rendering"));

},{"./_factory":18,"./_hydratation":19,"./_properties":20,"./_rendering":21}],23:[function(require,module,exports){
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

},{"./kernel":14}],24:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./lib"));
__export(require("./types"));

},{"./lib":25,"./types":26}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kernel_1 = require("../kernel");
const node_1 = require("../node");
const shared_1 = require("../shared");
function snake(selector, data) {
    return shared_1.tryAndCatchOrReturn(function () {
        const domElement = window.document.querySelector(selector);
        if (!domElement) {
            kernel_1.throwNewError(`"${selector}" element doesn't exist in DOM.`);
        }
        const snakeInstance = Object.assign(Object.assign({}, node_1.createNode({
            domElement,
            tag: selector,
            scriptedTemplate: `<h1>Congratulations !</h1>
          <p>You just created a Snake.js app here.</h1>`
        }, data)), { useTemplateInjection(templateInjectionUsing) {
                console.log(templateInjectionUsing);
                return Object.assign({}, snakeInstance);
            } });
        console.log(node_1.renderNode);
        return snakeInstance;
    });
}
exports.snake = snake;

},{"../kernel":14,"../node":17,"../shared":23}],26:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"dup":3}]},{},[1]);
