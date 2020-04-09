(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./src/main");

},{"./src/main":6}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("./node");
function createComponent(tag, data) {
    const properties = {
        domElement: undefined,
        tag,
        scriptedTemplate: ''
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

},{"./node":7}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function throwNewError(message) {
    throw new Error(message);
}
exports.throwNewError = throwNewError;
function getArrowFunctionErrorMessage() {
    return 'Node data setting must be a closed scope function, not an arrow function.';
}
exports.getArrowFunctionErrorMessage = getArrowFunctionErrorMessage;

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
const errors_1 = require("./errors");
const utils_1 = require("./utils");
function createInjectable(id, data) {
    if (data && utils_1.isAnArrowFunction(data)) {
        errors_1.throwNewError(errors_1.getArrowFunctionErrorMessage());
    }
    const injectablesIds = new Array();
    if (data) {
        injectablesIds.push(...utils_1.getArgumentsNamesOfFunction(data));
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

},{"./errors":3,"./utils":9}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("./component");
const injectable_1 = require("./injectable");
const snake_1 = require("./snake");
globalThis.createComponent = component_1.createComponent;
globalThis.createInjectable = injectable_1.createInjectable;
globalThis.snake = snake_1.snake;

},{"./component":2,"./injectable":5,"./snake":8}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("./errors");
const event_1 = require("./event");
const utils_1 = require("./utils");
function createNode(_properties, _data) {
    const properties = Object.assign(Object.assign({}, _properties), { childComponents: new Array(), injectables: {}, isViewLoaded: false });
    if (_data && utils_1.isAnArrowFunction(_data)) {
        errors_1.throwNewError(errors_1.getArrowFunctionErrorMessage());
    }
    function hydrateChildComponents() {
        properties.childComponents.forEach(function (component) {
            component.registerInjectables(...Object.keys(properties.injectables).map(function (injectableId) {
                return properties.injectables[injectableId];
            }));
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
            const injectablesIds = utils_1.getArgumentsNamesOfFunction(_data);
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
    let bindedPointsData = {};
    let bindedPointsNodesInjectionTread = 0;
    const bindedPointsNodes = {};
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
            return properties.scriptedTemplate;
        },
        registerChildComponents(...components) {
            properties.childComponents = [...properties.childComponents, ...components];
            hydrateChildComponents();
            return this;
        },
        registerInjectables(...injectables) {
            const newInjectables = {};
            injectables.forEach(function (injectable) {
                newInjectables[injectable.getId()] = injectable;
            });
            properties.injectables = Object.assign(Object.assign({}, properties.injectables), newInjectables);
            hydrateChildComponents();
            return this;
        },
        render() {
            if (!properties.domElement) {
                properties.domElement = window.document.querySelector(`[${utils_1.getSnakeComponentAttribut()}=${properties.tag}]`);
            }
            if (!properties.domElement) {
                errors_1.throwNewError(`'${properties.tag}' component is unknowned for the DOM.`);
            }
            if (!properties.isViewLoaded) {
                properties.domElement.innerHTML = properties.scriptedTemplate;
                properties.childComponents.forEach(function (component) {
                    properties.domElement.querySelectorAll(`s-${component.getTag()}`).forEach(function (element) {
                        element.outerHTML = `<div ${utils_1.getSnakeComponentAttribut()}="${component.getTag()}">${component.getTemplate()}</div>`;
                        component.render();
                    });
                });
                Object.keys(event_1.EventTypes).forEach(function (eventType) {
                    const attribute = `s-on-${eventType}`;
                    properties.domElement.querySelectorAll(`[${attribute}]`).forEach(function (element) {
                        const attributeValue = element.attributes.getNamedItem(attribute).value;
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
                                                errors_1.throwNewError(`"${property}" is not a property of component "${properties.tag}".`);
                                            }
                                        }
                                    });
                                    nodeData[propertyName](...params);
                                }
                                else {
                                    errors_1.throwNewError(`"${propertyName}" method is not callable on component "${properties.tag}".`);
                                }
                            }
                            else {
                                utils_1.runCodeBindingObject(attributeValue, nodeData);
                            }
                        });
                        element.attributes.removeNamedItem(attribute);
                    });
                });
                properties.isViewLoaded = true;
            }
            const nodeData = this.getData();
            if (bindedPointsNodesInjectionTread > 0) {
                const markedBindedPoints = properties.scriptedTemplate.match(utils_1.getBindingMarkRegex()) || [];
                function findNodeChildByUid(uid, element) {
                    const childNodesLength = element.childNodes.length;
                    for (let i = 0; i < childNodesLength; ++i) {
                        const childNode = element.childNodes[i];
                        if (childNode.nodeType === 8 && childNode.nodeValue === uid) {
                            return childNode;
                        }
                        else {
                            const node = findNodeChildByUid(uid, childNode);
                            if (node) {
                                return node;
                            }
                        }
                    }
                }
                markedBindedPoints.forEach(function (markedBindedPoint) {
                    const uid = markedBindedPoint.replace(/(<!--|-->)/gm, '');
                    const comment = findNodeChildByUid(uid, properties.domElement);
                    const parent = comment.parentNode;
                    parent.replaceChild(bindedPointsNodes[uid], comment);
                    bindedPointsNodesInjectionTread--;
                });
            }
            Object.keys(bindedPointsNodes).forEach(function (uid) {
                bindedPointsNodes[uid].textContent = utils_1.runCodeBindingObject(bindedPointsData[uid], nodeData);
            });
            return this;
        },
        setTemplate(template) {
            if (!template) {
                template = '';
            }
            const scriptedTerms = template.match(utils_1.getTemplateBindingRegex());
            if (scriptedTerms) {
                scriptedTerms.forEach(function (scriptedTerm) {
                    const termBeforeComputing = scriptedTerm.replace(/({{|}})/gm, '');
                    const uid = utils_1.generateUid();
                    bindedPointsData[uid] = termBeforeComputing;
                    bindedPointsNodes[uid] = window.document.createTextNode('');
                    bindedPointsNodesInjectionTread++;
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

},{"./errors":3,"./event":4,"./utils":9}],8:[function(require,module,exports){
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
        scriptedTemplate: `<h1>Congratulations !</h1>
  <p>You just created a Snake.js app here.</h1>`
    };
    return node_1.createNode(properties, data);
}
exports.snake = snake;

},{"./errors":3,"./node":7}],9:[function(require,module,exports){
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
function getTemplateBindingRegex() {
    return /(\{{.*?\}})/gm;
}
exports.getTemplateBindingRegex = getTemplateBindingRegex;
function getBindingMarkRegex() {
    return /(\<!--.*?\-->)/gm;
}
exports.getBindingMarkRegex = getBindingMarkRegex;
function isAnArrowFunction(fn) {
    return typeof fn === 'function' && /^[^{]+?=>/.test(fn.toString());
}
exports.isAnArrowFunction = isAnArrowFunction;
let fnCallLength = 0;
function generateUid() {
    const uid = `${new Date().getTime().toString()}${fnCallLength}`;
    if (fnCallLength === 9) {
        fnCallLength = 0;
    }
    else {
        fnCallLength++;
    }
    return uid;
}
exports.generateUid = generateUid;
function getSnakeComponentAttribut() {
    return 's-name';
}
exports.getSnakeComponentAttribut = getSnakeComponentAttribut;
function runCodeBindingObject(codeToRun, obj) {
    Object.keys(obj).forEach(function (key) {
        codeToRun = codeToRun.replace(key, `this.${key}`);
    });
    const evalFn = new Function(`return ${codeToRun}`);
    return evalFn.bind(obj)();
}
exports.runCodeBindingObject = runCodeBindingObject;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwYWNrYWdlcy9jb3JlL2luZGV4LnRzIiwicGFja2FnZXMvY29yZS9zcmMvY29tcG9uZW50LnRzIiwicGFja2FnZXMvY29yZS9zcmMvZXJyb3JzLnRzIiwicGFja2FnZXMvY29yZS9zcmMvZXZlbnQudHMiLCJwYWNrYWdlcy9jb3JlL3NyYy9pbmplY3RhYmxlLnRzIiwicGFja2FnZXMvY29yZS9zcmMvbWFpbi50cyIsInBhY2thZ2VzL2NvcmUvc3JjL25vZGUudHMiLCJwYWNrYWdlcy9jb3JlL3NyYy9zbmFrZS50cyIsInBhY2thZ2VzL2NvcmUvc3JjL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxzQkFBb0I7Ozs7O0FDQXBCLGlDQUF5RTtBQU96RSxTQUFnQixlQUFlLENBQUMsR0FBVyxFQUFFLElBQWU7SUFDMUQsTUFBTSxVQUFVLEdBQXdCO1FBQ3RDLFVBQVUsRUFBRSxTQUFTO1FBQ3JCLEdBQUc7UUFDSCxnQkFBZ0IsRUFBRSxFQUFFO0tBQ3JCLENBQUM7SUFFRix1Q0FDSyxpQkFBVSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FFL0IsTUFBTTtZQUNKLE9BQU8sVUFBVSxDQUFDLEdBQUcsQ0FBQztRQUN4QixDQUFDO1FBRUQsaUJBQWlCO1lBQ2YsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQzFCLEtBQUssVUFBVSxDQUFDLEdBQUcsRUFBRSxFQUNyQixLQUFNLFNBQVEsV0FBVztnQkFDdkI7b0JBQ0UsS0FBSyxFQUFFLENBQUM7b0JBQ1IsSUFBSSxDQUFDLFNBQVMsR0FBRyxzQkFBc0IsQ0FBQztnQkFDMUMsQ0FBQzthQUNGLENBQ0YsQ0FBQztRQUNKLENBQUMsSUFDRDtBQUNKLENBQUM7QUExQkQsMENBMEJDOzs7OztBQ2pDRCxTQUFnQixhQUFhLENBQUMsT0FBZTtJQUMzQyxNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxD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QUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7QUFDckUsQ0FBQztBQUZELDhDQUVDO0FBRUQsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO0FBQ3JCLFNBQWdCLFdBQVc7SUFDekIsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLFlBQVksRUFBRSxDQUFDO0lBRWhFLElBQUksWUFBWSxLQUFLLENBQUMsRUFBRTtRQUN0QixZQUFZLEdBQUcsQ0FBQyxDQUFDO0tBQ2xCO1NBQU07UUFDTCxZQUFZLEVBQUUsQ0FBQztLQUNoQjtJQUVELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQVZELGtDQVVDO0FBRUQsU0FBZ0IseUJBQXlCO0lBQ3ZDLE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUM7QUFGRCw4REFFQztBQUVELFNBQWdCLG9CQUFvQixDQUFDLFNBQWlCLEVBQUUsR0FBVztJQUNqRSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFTLEdBQVc7UUFDM0MsU0FBUyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLFFBQVEsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUNwRCxDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sTUFBTSxHQUFHLElBQUksUUFBUSxDQUFDLFVBQVUsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUVuRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztBQUM1QixDQUFDO0FBUkQsb0RBUUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgJy4vc3JjL21haW4nO1xuIiwiaW1wb3J0IHsgY3JlYXRlTm9kZSwgTm9kZSwgTm9kZURhdGEsIE5vZGVQcm9wZXJ0aWVzSW5wdXQgfSBmcm9tICcuL25vZGUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbXBvbmVudCBleHRlbmRzIE5vZGUge1xuICBnZXRUYWcoKTogc3RyaW5nO1xuICB1c2VBc1dlYkNvbXBvbmVudCgpOiB2b2lkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50KHRhZzogc3RyaW5nLCBkYXRhPzogTm9kZURhdGEpOiBDb21wb25lbnQge1xuICBjb25zdCBwcm9wZXJ0aWVzOiBOb2RlUHJvcGVydGllc0lucHV0ID0ge1xuICAgIGRvbUVsZW1lbnQ6IHVuZGVmaW5lZCxcbiAgICB0YWcsXG4gICAgc2NyaXB0ZWRUZW1wbGF0ZTogJydcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIC4uLmNyZWF0ZU5vZGUocHJvcGVydGllcywgZGF0YSksXG5cbiAgICBnZXRUYWcoKTogc3RyaW5nIHtcbiAgICAgIHJldHVybiBwcm9wZXJ0aWVzLnRhZztcbiAgICB9LFxuXG4gICAgdXNlQXNXZWJDb21wb25lbnQoKTogdm9pZCB7XG4gICAgICB3aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFxuICAgICAgICBgcy0ke3Byb3BlcnRpZXMudGFnfWAsXG4gICAgICAgIGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgIHRoaXMuaW5uZXJIVE1MID0gJ0ZlYXR1cmUgaW4gcHJvZ3Jlc3MuJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfVxuICB9O1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIHRocm93TmV3RXJyb3IobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XG4gIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEFycm93RnVuY3Rpb25FcnJvck1lc3NhZ2UoKTogc3RyaW5nIHtcbiAgcmV0dXJuICdOb2RlIGRhdGEgc2V0dGluZyBtdXN0IGJlIGEgY2xvc2VkIHNjb3BlIGZ1bmN0aW9uLCBub3QgYW4gYXJyb3cgZnVuY3Rpb24uJztcbn1cbiIsImV4cG9ydCBlbnVtIEV2ZW50VHlwZXMge1xuICBjbGljayA9ICdjbGljaycsXG4gIGtleWRvd24gPSAna2V5ZG93bicsXG4gIGtleXVwID0gJ2tleXVwJyxcbiAgbW91c2VvdmVyID0gJ21vdXNlb3ZlcicsXG4gIHN1Ym1pdCA9ICdzdWJtaXQnXG59XG4iLCJpbXBvcnQgeyBnZXRBcnJvd0Z1bmN0aW9uRXJyb3JNZXNzYWdlLCB0aHJvd05ld0Vycm9yIH0gZnJvbSAnLi9lcnJvcnMnO1xuaW1wb3J0IHsgTm9kZURhdGEgfSBmcm9tICcuL25vZGUnO1xuaW1wb3J0IHsgZ2V0QXJndW1lbnRzTmFtZXNPZkZ1bmN0aW9uLCBpc0FuQXJyb3dGdW5jdGlvbiB9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgdHlwZSBEZXBlbmRlbmN5ID0ge1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59O1xuXG5leHBvcnQgdHlwZSBJbmplY3RhYmxlSWQgPSBzdHJpbmc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW5qZWN0YWJsZSB7XG4gIGdldElkKCk6IHN0cmluZztcbiAgZ2V0RGF0YSgpOiBOb2RlRGF0YTtcbiAgZ2V0SW5qZWN0YWJsZXNJZHMoKTogQXJyYXk8SW5qZWN0YWJsZUlkPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJbmplY3RvckRpY3Rpb25uYXkge1xuICBba2V5OiBzdHJpbmddOiBJbmplY3RhYmxlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSW5qZWN0YWJsZShpZDogSW5qZWN0YWJsZUlkLCBkYXRhOiBOb2RlRGF0YSk6IEluamVjdGFibGUge1xuICBpZiAoZGF0YSAmJiBpc0FuQXJyb3dGdW5jdGlvbihkYXRhKSkge1xuICAgIHRocm93TmV3RXJyb3IoZ2V0QXJyb3dGdW5jdGlvbkVycm9yTWVzc2FnZSgpKTtcbiAgfVxuXG4gIGNvbnN0IGluamVjdGFibGVzSWRzID0gbmV3IEFycmF5PEluamVjdGFibGVJZD4oKTtcblxuICBpZiAoZGF0YSkge1xuICAgIGluamVjdGFibGVzSWRzLnB1c2goLi4uZ2V0QXJndW1lbnRzTmFtZXNPZkZ1bmN0aW9uKGRhdGEpKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZ2V0SWQoKTogc3RyaW5nIHtcbiAgICAgIHJldHVybiBpZDtcbiAgICB9LFxuICAgIGdldERhdGEoKTogTm9kZURhdGEge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfSxcbiAgICBnZXRJbmplY3RhYmxlc0lkcygpOiBBcnJheTxJbmplY3RhYmxlSWQ+IHtcbiAgICAgIHJldHVybiBpbmplY3RhYmxlc0lkcztcbiAgICB9XG4gIH07XG59XG4iLCJpbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudCc7XG5pbXBvcnQgeyBjcmVhdGVJbmplY3RhYmxlIH0gZnJvbSAnLi9pbmplY3RhYmxlJztcbmltcG9ydCB7IHNuYWtlIH0gZnJvbSAnLi9zbmFrZSc7XG5cbmdsb2JhbFRoaXMuY3JlYXRlQ29tcG9uZW50ID0gY3JlYXRlQ29tcG9uZW50O1xuZ2xvYmFsVGhpcy5jcmVhdGVJbmplY3RhYmxlID0gY3JlYXRlSW5qZWN0YWJsZTtcbmdsb2JhbFRoaXMuc25ha2UgPSBzbmFrZTtcbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50JztcbmltcG9ydCB7IGdldEFycm93RnVuY3Rpb25FcnJvck1lc3NhZ2UsIHRocm93TmV3RXJyb3IgfSBmcm9tICcuL2Vycm9ycyc7XG5pbXBvcnQgeyBFdmVudFR5cGVzIH0gZnJvbSAnLi9ldmVudCc7XG5pbXBvcnQgeyBEZXBlbmRlbmN5LCBJbmplY3RhYmxlLCBJbmplY3RhYmxlSWQsIEluamVjdG9yRGljdGlvbm5heSB9IGZyb20gJy4vaW5qZWN0YWJsZSc7XG5pbXBvcnQge1xuICBnZW5lcmF0ZVVpZCxcbiAgZ2V0QXJndW1lbnRzTmFtZXNPZkZ1bmN0aW9uLFxuICBnZXRCaW5kaW5nTWFya1JlZ2V4LFxuICBnZXRTbmFrZUNvbXBvbmVudEF0dHJpYnV0LFxuICBnZXRUZW1wbGF0ZUJpbmRpbmdSZWdleCxcbiAgaXNBbkFycm93RnVuY3Rpb24sXG4gIHJ1bkNvZGVCaW5kaW5nT2JqZWN0XG59IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgdHlwZSBOb2RlRGF0YSA9ICguLi5kZXBlbmRlbmNpZXM6IEFycmF5PERlcGVuZGVuY3k+KSA9PiBhbnk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTm9kZVByb3BlcnRpZXNJbnB1dCB7XG4gIGRvbUVsZW1lbnQ6IEVsZW1lbnQ7XG4gIHRhZzogc3RyaW5nO1xuICBzY3JpcHRlZFRlbXBsYXRlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTm9kZVByb3BlcnRpZXMgZXh0ZW5kcyBOb2RlUHJvcGVydGllc0lucHV0IHtcbiAgY2hpbGRDb21wb25lbnRzOiBBcnJheTxDb21wb25lbnQ+O1xuICBpbmplY3RhYmxlczogSW5qZWN0b3JEaWN0aW9ubmF5O1xuICBpc1ZpZXdMb2FkZWQ6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTm9kZSB7XG4gIGdldERhdGEoKTogYW55O1xuICBnZXRUZW1wbGF0ZSgpOiBzdHJpbmc7XG4gIHJlZ2lzdGVySW5qZWN0YWJsZXMoLi4uaW5qZWN0YWJsZXM6IEFycmF5PEluamVjdGFibGU+KTogdm9pZDtcbiAgcmVnaXN0ZXJDaGlsZENvbXBvbmVudHMoLi4uY29tcG9uZW50czogQXJyYXk8Q29tcG9uZW50Pik6IE5vZGU7XG4gIHJlbmRlcigpOiBOb2RlO1xuICBzZXRUZW1wbGF0ZSh2YWx1ZTogc3RyaW5nKTogTm9kZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU5vZGUoX3Byb3BlcnRpZXM6IE5vZGVQcm9wZXJ0aWVzSW5wdXQsIF9kYXRhPzogTm9kZURhdGEpOiBOb2RlIHtcbiAgY29uc3QgcHJvcGVydGllczogTm9kZVByb3BlcnRpZXMgPSB7XG4gICAgLi4uX3Byb3BlcnRpZXMsXG4gICAgY2hpbGRDb21wb25lbnRzOiBuZXcgQXJyYXk8Q29tcG9uZW50PigpLFxuICAgIGluamVjdGFibGVzOiB7fSxcbiAgICBpc1ZpZXdMb2FkZWQ6IGZhbHNlXG4gIH07XG5cbiAgaWYgKF9kYXRhICYmIGlzQW5BcnJvd0Z1bmN0aW9uKF9kYXRhKSkge1xuICAgIHRocm93TmV3RXJyb3IoZ2V0QXJyb3dGdW5jdGlvbkVycm9yTWVzc2FnZSgpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGh5ZHJhdGVDaGlsZENvbXBvbmVudHMoKTogdm9pZCB7XG4gICAgcHJvcGVydGllcy5jaGlsZENvbXBvbmVudHMuZm9yRWFjaChmdW5jdGlvbihjb21wb25lbnQ6IENvbXBvbmVudCk6IHZvaWQge1xuICAgICAgY29tcG9uZW50LnJlZ2lzdGVySW5qZWN0YWJsZXMoXG4gICAgICAgIC4uLk9iamVjdC5rZXlzKHByb3BlcnRpZXMuaW5qZWN0YWJsZXMpLm1hcChmdW5jdGlvbihpbmplY3RhYmxlSWQ6IEluamVjdGFibGVJZCk6IEluamVjdGFibGUge1xuICAgICAgICAgIHJldHVybiBwcm9wZXJ0aWVzLmluamVjdGFibGVzW2luamVjdGFibGVJZF07XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJhbnNsYXRlSW5qZWN0YWJsZXMoaW5qZWN0YWJsZXNJZHM6IEFycmF5PEluamVjdGFibGVJZD4pOiBEZXBlbmRlbmN5W10ge1xuICAgIHJldHVybiBpbmplY3RhYmxlc0lkcy5tYXAoZnVuY3Rpb24oaW5qZWN0YWJsZUlkOiBzdHJpbmcpIHtcbiAgICAgIGNvbnN0IGluamVjdGFibGUgPSBwcm9wZXJ0aWVzLmluamVjdGFibGVzW2luamVjdGFibGVJZF07XG5cbiAgICAgIGlmICghaW5qZWN0YWJsZSkge1xuICAgICAgICB0aHJvd05ld0Vycm9yKGBcIiR7aW5qZWN0YWJsZUlkfVwiIGlzIG5vdCBkZWNsYXJlZCBhcyBpbmplY3RhYmxlIGluIHRoZSBcIiR7cHJvcGVydGllcy50YWd9XCIgbm9kZS5gKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGVwZW5kZW5jaWVzID0gbmV3IEFycmF5PERlcGVuZGVuY3k+KCk7XG5cbiAgICAgIGlmIChpbmplY3RhYmxlLmdldEluamVjdGFibGVzSWRzKCkubGVuZ3RoKSB7XG4gICAgICAgIGRlcGVuZGVuY2llcy5wdXNoKC4uLnRyYW5zbGF0ZUluamVjdGFibGVzKGluamVjdGFibGUuZ2V0SW5qZWN0YWJsZXNJZHMoKSkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaW5qZWN0YWJsZS5nZXREYXRhKCkoLi4uZGVwZW5kZW5jaWVzKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbXB1dGVEYXRhKCk6IGFueSB7XG4gICAgaWYgKF9kYXRhKSB7XG4gICAgICBjb25zdCBpbmplY3RhYmxlc0lkczogQXJyYXk8SW5qZWN0YWJsZUlkPiA9IGdldEFyZ3VtZW50c05hbWVzT2ZGdW5jdGlvbihfZGF0YSk7XG5cbiAgICAgIGNvbnN0IGNvbXB1dGVkRGF0YTogYW55ID0gX2RhdGEoLi4udHJhbnNsYXRlSW5qZWN0YWJsZXMoaW5qZWN0YWJsZXNJZHMpKTtcblxuICAgICAgaWYgKCFjb21wdXRlZERhdGEpIHtcbiAgICAgICAgcmV0dXJuIHRocm93TmV3RXJyb3IoJ05vZGUgZGF0YSBzZXR0aW5nIG11c3QgYWx3YXlzIHJldHVybiBhbiBvYmplY3QuJyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb21wdXRlZERhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gIH1cblxuICBsZXQgZGF0YTogYW55O1xuICBsZXQgYmluZGVkUG9pbnRzRGF0YTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9O1xuICBsZXQgYmluZGVkUG9pbnRzTm9kZXNJbmplY3Rpb25UcmVhZCA9IDA7XG4gIGNvbnN0IGJpbmRlZFBvaW50c05vZGVzOiB7IFtrZXk6IHN0cmluZ106IENoaWxkTm9kZSB9ID0ge307XG5cbiAgY29uc3Qgbm9kZTogTm9kZSA9IHtcbiAgICBnZXREYXRhKCk6IGFueSB7XG4gICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgZGF0YSA9IG5ldyBQcm94eShjb21wdXRlRGF0YSgpLCB7XG4gICAgICAgICAgc2V0KHRhcmdldDogYW55LCBwcm9wZXJ0eTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gICAgICAgICAgICB0YXJnZXRbcHJvcGVydHldID0gdmFsdWU7XG4gICAgICAgICAgICBub2RlLnJlbmRlcigpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0sXG5cbiAgICBnZXRUZW1wbGF0ZSgpOiBzdHJpbmcge1xuICAgICAgcmV0dXJuIHByb3BlcnRpZXMuc2NyaXB0ZWRUZW1wbGF0ZTtcbiAgICB9LFxuXG4gICAgcmVnaXN0ZXJDaGlsZENvbXBvbmVudHMoLi4uY29tcG9uZW50czogQXJyYXk8Q29tcG9uZW50Pik6IE5vZGUge1xuICAgICAgcHJvcGVydGllcy5jaGlsZENvbXBvbmVudHMgPSBbLi4ucHJvcGVydGllcy5jaGlsZENvbXBvbmVudHMsIC4uLmNvbXBvbmVudHNdO1xuXG4gICAgICBoeWRyYXRlQ2hpbGRDb21wb25lbnRzKCk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICByZWdpc3RlckluamVjdGFibGVzKC4uLmluamVjdGFibGVzOiBBcnJheTxJbmplY3RhYmxlPikge1xuICAgICAgY29uc3QgbmV3SW5qZWN0YWJsZXM6IEluamVjdG9yRGljdGlvbm5heSA9IHt9O1xuXG4gICAgICBpbmplY3RhYmxlcy5mb3JFYWNoKGZ1bmN0aW9uKGluamVjdGFibGU6IEluamVjdGFibGUpOiB2b2lkIHtcbiAgICAgICAgbmV3SW5qZWN0YWJsZXNbaW5qZWN0YWJsZS5nZXRJZCgpXSA9IGluamVjdGFibGU7XG4gICAgICB9KTtcblxuICAgICAgcHJvcGVydGllcy5pbmplY3RhYmxlcyA9IHsgLi4ucHJvcGVydGllcy5pbmplY3RhYmxlcywgLi4ubmV3SW5qZWN0YWJsZXMgfTtcblxuICAgICAgaHlkcmF0ZUNoaWxkQ29tcG9uZW50cygpO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgcmVuZGVyKCk6IE5vZGUge1xuICAgICAgaWYgKCFwcm9wZXJ0aWVzLmRvbUVsZW1lbnQpIHtcbiAgICAgICAgcHJvcGVydGllcy5kb21FbGVtZW50ID0gd2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFske2dldFNuYWtlQ29tcG9uZW50QXR0cmlidXQoKX09JHtwcm9wZXJ0aWVzLnRhZ31dYCk7XG4gICAgICB9XG5cbiAgICAgIGlmICghcHJvcGVydGllcy5kb21FbGVtZW50KSB7XG4gICAgICAgIHRocm93TmV3RXJyb3IoYCcke3Byb3BlcnRpZXMudGFnfScgY29tcG9uZW50IGlzIHVua25vd25lZCBmb3IgdGhlIERPTS5gKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFwcm9wZXJ0aWVzLmlzVmlld0xvYWRlZCkge1xuICAgICAgICBwcm9wZXJ0aWVzLmRvbUVsZW1lbnQuaW5uZXJIVE1MID0gcHJvcGVydGllcy5zY3JpcHRlZFRlbXBsYXRlO1xuXG4gICAgICAgIHByb3BlcnRpZXMuY2hpbGRDb21wb25lbnRzLmZvckVhY2goZnVuY3Rpb24oY29tcG9uZW50OiBDb21wb25lbnQpOiB2b2lkIHtcbiAgICAgICAgICBwcm9wZXJ0aWVzLmRvbUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChgcy0ke2NvbXBvbmVudC5nZXRUYWcoKX1gKS5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQ6IEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgICAgIGVsZW1lbnQub3V0ZXJIVE1MID0gYDxkaXYgJHtnZXRTbmFrZUNvbXBvbmVudEF0dHJpYnV0KCl9PVwiJHtjb21wb25lbnQuZ2V0VGFnKCl9XCI+JHtjb21wb25lbnQuZ2V0VGVtcGxhdGUoKX08L2Rpdj5gO1xuXG4gICAgICAgICAgICBjb21wb25lbnQucmVuZGVyKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIE9iamVjdC5rZXlzKEV2ZW50VHlwZXMpLmZvckVhY2goZnVuY3Rpb24oZXZlbnRUeXBlOiBFdmVudFR5cGVzKTogdm9pZCB7XG4gICAgICAgICAgY29uc3QgYXR0cmlidXRlID0gYHMtb24tJHtldmVudFR5cGV9YDtcblxuICAgICAgICAgIHByb3BlcnRpZXMuZG9tRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbJHthdHRyaWJ1dGV9XWApLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudDogRWxlbWVudCk6IHZvaWQge1xuICAgICAgICAgICAgY29uc3QgYXR0cmlidXRlVmFsdWUgPSBlbGVtZW50LmF0dHJpYnV0ZXMuZ2V0TmFtZWRJdGVtKGF0dHJpYnV0ZSkudmFsdWU7XG5cbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGZ1bmN0aW9uKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICAgICAgICBpZiAoYXR0cmlidXRlVmFsdWUubWF0Y2goLyhcXCguKlxcKSkvZ20pKSB7XG4gICAgICAgICAgICAgICAgbGV0IHByb3BlcnR5TmFtZSA9IGF0dHJpYnV0ZVZhbHVlLnJlcGxhY2UoLyhcXCguKj9cXCkpL2dtLCAnJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAobm9kZURhdGEuaGFzT3duUHJvcGVydHkocHJvcGVydHlOYW1lKSAmJiB0eXBlb2Ygbm9kZURhdGFbcHJvcGVydHlOYW1lXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgY29uc3QgcHJvcGVydHlQYXJhbXMgPSBhdHRyaWJ1dGVWYWx1ZVxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXihbYS16XXxbQS1aXSkqXFwofFxcKS9nbSwgJycpXG4gICAgICAgICAgICAgICAgICAgIC5zcGxpdCgnLCcpXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24ocGFyYW06IHN0cmluZykge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJhbS5yZXBsYWNlKC9cXHMvZywgJycpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgY29uc3QgcGFyYW1zID0gW107XG5cbiAgICAgICAgICAgICAgICAgIHByb3BlcnR5UGFyYW1zLmZvckVhY2goZnVuY3Rpb24ocHJvcGVydHk6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcGVydHkgPT09ICckZXZlbnQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcGFyYW1zLnB1c2goZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChub2RlRGF0YS5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcy5wdXNoKG5vZGVEYXRhW3Byb3BlcnR5XSk7XG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93TmV3RXJyb3IoYFwiJHtwcm9wZXJ0eX1cIiBpcyBub3QgYSBwcm9wZXJ0eSBvZiBjb21wb25lbnQgXCIke3Byb3BlcnRpZXMudGFnfVwiLmApO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgIG5vZGVEYXRhW3Byb3BlcnR5TmFtZV0oLi4ucGFyYW1zKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgdGhyb3dOZXdFcnJvcihgXCIke3Byb3BlcnR5TmFtZX1cIiBtZXRob2QgaXMgbm90IGNhbGxhYmxlIG9uIGNvbXBvbmVudCBcIiR7cHJvcGVydGllcy50YWd9XCIuYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJ1bkNvZGVCaW5kaW5nT2JqZWN0KGF0dHJpYnV0ZVZhbHVlLCBub2RlRGF0YSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBlbGVtZW50LmF0dHJpYnV0ZXMucmVtb3ZlTmFtZWRJdGVtKGF0dHJpYnV0ZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHByb3BlcnRpZXMuaXNWaWV3TG9hZGVkID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgbm9kZURhdGEgPSB0aGlzLmdldERhdGEoKTtcblxuICAgICAgaWYgKGJpbmRlZFBvaW50c05vZGVzSW5qZWN0aW9uVHJlYWQgPiAwKSB7XG4gICAgICAgIGNvbnN0IG1hcmtlZEJpbmRlZFBvaW50cyA9IHByb3BlcnRpZXMuc2NyaXB0ZWRUZW1wbGF0ZS5tYXRjaChnZXRCaW5kaW5nTWFya1JlZ2V4KCkpIHx8IFtdO1xuXG4gICAgICAgIGZ1bmN0aW9uIGZpbmROb2RlQ2hpbGRCeVVpZCh1aWQ6IHN0cmluZywgZWxlbWVudDogQ2hpbGROb2RlKTogQ2hpbGROb2RlIHtcbiAgICAgICAgICBjb25zdCBjaGlsZE5vZGVzTGVuZ3RoID0gZWxlbWVudC5jaGlsZE5vZGVzLmxlbmd0aDtcblxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGROb2Rlc0xlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZE5vZGUgPSBlbGVtZW50LmNoaWxkTm9kZXNbaV07XG5cbiAgICAgICAgICAgIGlmIChjaGlsZE5vZGUubm9kZVR5cGUgPT09IDggJiYgY2hpbGROb2RlLm5vZGVWYWx1ZSA9PT0gdWlkKSB7XG4gICAgICAgICAgICAgIHJldHVybiBjaGlsZE5vZGU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zdCBub2RlID0gZmluZE5vZGVDaGlsZEJ5VWlkKHVpZCwgY2hpbGROb2RlKTtcblxuICAgICAgICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbWFya2VkQmluZGVkUG9pbnRzLmZvckVhY2goZnVuY3Rpb24obWFya2VkQmluZGVkUG9pbnQ6IHN0cmluZykge1xuICAgICAgICAgIGNvbnN0IHVpZCA9IG1hcmtlZEJpbmRlZFBvaW50LnJlcGxhY2UoLyg8IS0tfC0tPikvZ20sICcnKTtcblxuICAgICAgICAgIGNvbnN0IGNvbW1lbnQgPSBmaW5kTm9kZUNoaWxkQnlVaWQodWlkLCBwcm9wZXJ0aWVzLmRvbUVsZW1lbnQpO1xuXG4gICAgICAgICAgY29uc3QgcGFyZW50ID0gY29tbWVudC5wYXJlbnROb2RlO1xuXG4gICAgICAgICAgcGFyZW50LnJlcGxhY2VDaGlsZChiaW5kZWRQb2ludHNOb2Rlc1t1aWRdLCBjb21tZW50KTtcblxuICAgICAgICAgIGJpbmRlZFBvaW50c05vZGVzSW5qZWN0aW9uVHJlYWQtLTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIE9iamVjdC5rZXlzKGJpbmRlZFBvaW50c05vZGVzKS5mb3JFYWNoKGZ1bmN0aW9uKHVpZDogc3RyaW5nKSB7XG4gICAgICAgIGJpbmRlZFBvaW50c05vZGVzW3VpZF0udGV4dENvbnRlbnQgPSBydW5Db2RlQmluZGluZ09iamVjdChiaW5kZWRQb2ludHNEYXRhW3VpZF0sIG5vZGVEYXRhKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgc2V0VGVtcGxhdGUodGVtcGxhdGU6IHN0cmluZyk6IE5vZGUge1xuICAgICAgaWYgKCF0ZW1wbGF0ZSkge1xuICAgICAgICB0ZW1wbGF0ZSA9ICcnO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzY3JpcHRlZFRlcm1zID0gdGVtcGxhdGUubWF0Y2goZ2V0VGVtcGxhdGVCaW5kaW5nUmVnZXgoKSk7XG5cbiAgICAgIGlmIChzY3JpcHRlZFRlcm1zKSB7XG4gICAgICAgIHNjcmlwdGVkVGVybXMuZm9yRWFjaChmdW5jdGlvbihzY3JpcHRlZFRlcm06IHN0cmluZyk6IHZvaWQge1xuICAgICAgICAgIGNvbnN0IHRlcm1CZWZvcmVDb21wdXRpbmcgPSBzY3JpcHRlZFRlcm0ucmVwbGFjZSgvKHt7fH19KS9nbSwgJycpO1xuXG4gICAgICAgICAgY29uc3QgdWlkID0gZ2VuZXJhdGVVaWQoKTtcblxuICAgICAgICAgIGJpbmRlZFBvaW50c0RhdGFbdWlkXSA9IHRlcm1CZWZvcmVDb21wdXRpbmc7XG4gICAgICAgICAgYmluZGVkUG9pbnRzTm9kZXNbdWlkXSA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG4gICAgICAgICAgYmluZGVkUG9pbnRzTm9kZXNJbmplY3Rpb25UcmVhZCsrO1xuXG4gICAgICAgICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5yZXBsYWNlKHNjcmlwdGVkVGVybSwgYDwhLS0ke3VpZH0tLT5gKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHByb3BlcnRpZXMuc2NyaXB0ZWRUZW1wbGF0ZSA9IHRlbXBsYXRlO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIG5vZGU7XG59XG4iLCJpbXBvcnQgeyB0aHJvd05ld0Vycm9yIH0gZnJvbSAnLi9lcnJvcnMnO1xuaW1wb3J0IHsgY3JlYXRlTm9kZSwgTm9kZSwgTm9kZURhdGEsIE5vZGVQcm9wZXJ0aWVzSW5wdXQgfSBmcm9tICcuL25vZGUnO1xuXG5leHBvcnQgdHlwZSBTbmFrZU9wdGlvbnNJbnB1dCA9ICgpID0+IFNuYWtlT3B0aW9ucztcblxuZXhwb3J0IGludGVyZmFjZSBTbmFrZU9wdGlvbnMge1xuICBkaXNhYmxlZFdhcm5pbmc6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU25ha2VJbnN0YW5jZSBleHRlbmRzIE5vZGUge31cblxuZXhwb3J0IGZ1bmN0aW9uIHNuYWtlKHNlbGVjdG9yOiBzdHJpbmcsIGRhdGE/OiBOb2RlRGF0YSk6IFNuYWtlSW5zdGFuY2Uge1xuICBpZiAoIXdpbmRvdykge1xuICAgIHRocm93TmV3RXJyb3IoYFdpbmRvdyBvYmplY3QgaXMgdW5rbm93bmVkLmApO1xuICB9XG5cbiAgY29uc3QgZG9tRWxlbWVudDogRWxlbWVudCA9IHdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcblxuICBpZiAoIWRvbUVsZW1lbnQpIHtcbiAgICB0aHJvd05ld0Vycm9yKGBcIiR7c2VsZWN0b3J9XCIgZWxlbWVudCBkb2Vzbid0IGV4aXN0IGluIERPTS5gKTtcbiAgfVxuXG4gIGNvbnN0IHByb3BlcnRpZXM6IE5vZGVQcm9wZXJ0aWVzSW5wdXQgPSB7XG4gICAgZG9tRWxlbWVudCxcbiAgICB0YWc6IHNlbGVjdG9yLFxuICAgIHNjcmlwdGVkVGVtcGxhdGU6IGA8aDE+Q29uZ3JhdHVsYXRpb25zICE8L2gxPlxuICA8cD5Zb3UganVzdCBjcmVhdGVkIGEgU25ha2UuanMgYXBwIGhlcmUuPC9oMT5gXG4gIH07XG5cbiAgcmV0dXJuIGNyZWF0ZU5vZGUocHJvcGVydGllcywgZGF0YSk7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gZ2V0QXJndW1lbnRzTmFtZXNPZkZ1bmN0aW9uKGZuOiBGdW5jdGlvbik6IEFycmF5PHN0cmluZz4ge1xuICByZXR1cm4gKGZuLnRvU3RyaW5nKCkgKyAnJylcbiAgICAucmVwbGFjZSgvWy9dWy9dLiokL2dtLCAnJylcbiAgICAucmVwbGFjZSgvXFxzKy9nLCAnJylcbiAgICAucmVwbGFjZSgvWy9dWypdW14vKl0qWypdWy9dL2csICcnKVxuICAgIC5zcGxpdCgnKXsnLCAxKVswXVxuICAgIC5yZXBsYWNlKC9eW14oXSpbKF0vLCAnJylcbiAgICAucmVwbGFjZSgvPVteLF0rL2csICcnKVxuICAgIC5zcGxpdCgnLCcpXG4gICAgLmZpbHRlcihCb29sZWFuKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRlbXBsYXRlQmluZGluZ1JlZ2V4KCk6IFJlZ0V4cCB7XG4gIHJldHVybiAvKFxce3suKj9cXH19KS9nbTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEJpbmRpbmdNYXJrUmVnZXgoKTogUmVnRXhwIHtcbiAgcmV0dXJuIC8oXFw8IS0tLio/XFwtLT4pL2dtO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNBbkFycm93RnVuY3Rpb24oZm46IEZ1bmN0aW9uKTogYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicgJiYgL15bXntdKz89Pi8udGVzdChmbi50b1N0cmluZygpKTtcbn1cblxubGV0IGZuQ2FsbExlbmd0aCA9IDA7XG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVVaWQoKTogc3RyaW5nIHtcbiAgY29uc3QgdWlkID0gYCR7bmV3IERhdGUoKS5nZXRUaW1lKCkudG9TdHJpbmcoKX0ke2ZuQ2FsbExlbmd0aH1gO1xuXG4gIGlmIChmbkNhbGxMZW5ndGggPT09IDkpIHtcbiAgICBmbkNhbGxMZW5ndGggPSAwO1xuICB9IGVsc2Uge1xuICAgIGZuQ2FsbExlbmd0aCsrO1xuICB9XG5cbiAgcmV0dXJuIHVpZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNuYWtlQ29tcG9uZW50QXR0cmlidXQoKTogc3RyaW5nIHtcbiAgcmV0dXJuICdzLW5hbWUnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcnVuQ29kZUJpbmRpbmdPYmplY3QoY29kZVRvUnVuOiBzdHJpbmcsIG9iajogT2JqZWN0KTogYW55IHtcbiAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGZ1bmN0aW9uKGtleTogc3RyaW5nKSB7XG4gICAgY29kZVRvUnVuID0gY29kZVRvUnVuLnJlcGxhY2Uoa2V5LCBgdGhpcy4ke2tleX1gKTtcbiAgfSk7XG5cbiAgY29uc3QgZXZhbEZuID0gbmV3IEZ1bmN0aW9uKGByZXR1cm4gJHtjb2RlVG9SdW59YCk7XG5cbiAgcmV0dXJuIGV2YWxGbi5iaW5kKG9iaikoKTtcbn1cbiJdfQ==
