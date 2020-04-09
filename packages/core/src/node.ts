import { Component } from './component';
import { getArrowFunctionErrorMessage, throwNewError } from './errors';
import { EventTypes } from './event';
import { Dependency, Injectable, InjectableId, InjectorDictionnay } from './injectable';
import {
  generateUid,
  getArgumentsNamesOfFunction,
  getBindingMarkRegex,
  getSnakeComponentAttribut,
  getTemplateBindingRegex,
  isAnArrowFunction,
  runCodeBindingObject
} from './utils';

export type NodeData = (...dependencies: Array<Dependency>) => any;

export interface NodePropertiesInput {
  domElement: Element;
  tag: string;
  scriptedTemplate: string;
}

export interface NodeProperties extends NodePropertiesInput {
  childComponents: Array<Component>;
  injectables: InjectorDictionnay;
  isViewLoaded: boolean;
}

export interface Node {
  getData(): any;
  getTemplate(): string;
  registerInjectables(...injectables: Array<Injectable>): void;
  registerChildComponents(...components: Array<Component>): Node;
  render(): Node;
  setTemplate(value: string): Node;
}

export function createNode(_properties: NodePropertiesInput, _data?: NodeData): Node {
  const properties: NodeProperties = {
    ..._properties,
    childComponents: new Array<Component>(),
    injectables: {},
    isViewLoaded: false
  };

  if (_data && isAnArrowFunction(_data)) {
    throwNewError(getArrowFunctionErrorMessage());
  }

  function hydrateChildComponents(): void {
    properties.childComponents.forEach(function(component: Component): void {
      component.registerInjectables(
        ...Object.keys(properties.injectables).map(function(injectableId: InjectableId): Injectable {
          return properties.injectables[injectableId];
        })
      );
    });
  }

  function translateInjectables(injectablesIds: Array<InjectableId>): Dependency[] {
    return injectablesIds.map(function(injectableId: string) {
      const injectable = properties.injectables[injectableId];

      if (!injectable) {
        throwNewError(`"${injectableId}" is not declared as injectable in the "${properties.tag}" node.`);
      }

      const dependencies = new Array<Dependency>();

      if (injectable.getInjectablesIds().length) {
        dependencies.push(...translateInjectables(injectable.getInjectablesIds()));
      }

      return injectable.getData()(...dependencies);
    });
  }

  function computeData(): any {
    if (_data) {
      const injectablesIds: Array<InjectableId> = getArgumentsNamesOfFunction(_data);

      const computedData: any = _data(...translateInjectables(injectablesIds));

      if (!computedData) {
        return throwNewError('Node data setting must always return an object.');
      }

      return computedData;
    } else {
      return {};
    }
  }

  let data: any;
  let bindedPointsData: { [key: string]: string } = {};
  let bindedPointsNodesInjectionTread = 0;
  const bindedPointsNodes: { [key: string]: ChildNode } = {};

  const node: Node = {
    getData(): any {
      if (!data) {
        data = new Proxy(computeData(), {
          set(target: any, property: string, value: any) {
            target[property] = value;
            node.render();
            return true;
          }
        });
      }
      return data;
    },

    getTemplate(): string {
      return properties.scriptedTemplate;
    },

    registerChildComponents(...components: Array<Component>): Node {
      properties.childComponents = [...properties.childComponents, ...components];

      hydrateChildComponents();

      return this;
    },

    registerInjectables(...injectables: Array<Injectable>) {
      const newInjectables: InjectorDictionnay = {};

      injectables.forEach(function(injectable: Injectable): void {
        newInjectables[injectable.getId()] = injectable;
      });

      properties.injectables = { ...properties.injectables, ...newInjectables };

      hydrateChildComponents();

      return this;
    },

    render(): Node {
      if (!properties.domElement) {
        properties.domElement = window.document.querySelector(`[${getSnakeComponentAttribut()}=${properties.tag}]`);
      }

      if (!properties.domElement) {
        throwNewError(`'${properties.tag}' component is unknowned for the DOM.`);
      }

      if (!properties.isViewLoaded) {
        properties.domElement.innerHTML = properties.scriptedTemplate;

        properties.childComponents.forEach(function(component: Component): void {
          properties.domElement.querySelectorAll(`s-${component.getTag()}`).forEach(function(element: Element): void {
            element.outerHTML = `<div ${getSnakeComponentAttribut()}="${component.getTag()}">${component.getTemplate()}</div>`;

            component.render();
          });
        });

        Object.keys(EventTypes).forEach(function(eventType: EventTypes): void {
          const attribute = `s-on-${eventType}`;

          properties.domElement.querySelectorAll(`[${attribute}]`).forEach(function(element: Element): void {
            const attributeValue = element.attributes.getNamedItem(attribute).value;

            element.addEventListener(eventType, function(event: Event): void {
              if (attributeValue.match(/(\(.*\))/gm)) {
                let propertyName = attributeValue.replace(/(\(.*?\))/gm, '');

                if (nodeData.hasOwnProperty(propertyName) && typeof nodeData[propertyName] === 'function') {
                  const propertyParams = attributeValue
                    .replace(/^([a-z]|[A-Z])*\(|\)/gm, '')
                    .split(',')
                    .map(function(param: string) {
                      return param.replace(/\s/g, '');
                    });

                  const params = [];

                  propertyParams.forEach(function(property: string): void {
                    if (property === '$event') {
                      params.push(event);
                    } else {
                      if (nodeData.hasOwnProperty(property)) {
                        params.push(nodeData[property]);
                      } else {
                        throwNewError(`"${property}" is not a property of component "${properties.tag}".`);
                      }
                    }
                  });

                  nodeData[propertyName](...params);
                } else {
                  throwNewError(`"${propertyName}" method is not callable on component "${properties.tag}".`);
                }
              } else {
                runCodeBindingObject(attributeValue, nodeData);
              }
            });

            element.attributes.removeNamedItem(attribute);
          });
        });

        properties.isViewLoaded = true;
      }

      const nodeData = this.getData();

      if (bindedPointsNodesInjectionTread > 0) {
        const markedBindedPoints = properties.scriptedTemplate.match(getBindingMarkRegex()) || [];

        function findNodeChildByUid(uid: string, element: ChildNode): ChildNode {
          const childNodesLength = element.childNodes.length;

          for (let i = 0; i < childNodesLength; ++i) {
            const childNode = element.childNodes[i];

            if (childNode.nodeType === 8 && childNode.nodeValue === uid) {
              return childNode;
            } else {
              const node = findNodeChildByUid(uid, childNode);

              if (node) {
                return node;
              }
            }
          }
        }

        markedBindedPoints.forEach(function(markedBindedPoint: string) {
          const uid = markedBindedPoint.replace(/(<!--|-->)/gm, '');

          const comment = findNodeChildByUid(uid, properties.domElement);

          const parent = comment.parentNode;

          parent.replaceChild(bindedPointsNodes[uid], comment);

          bindedPointsNodesInjectionTread--;
        });
      }

      Object.keys(bindedPointsNodes).forEach(function(uid: string) {
        bindedPointsNodes[uid].textContent = runCodeBindingObject(bindedPointsData[uid], nodeData);
      });

      return this;
    },

    setTemplate(template: string): Node {
      if (!template) {
        template = '';
      }

      const scriptedTerms = template.match(getTemplateBindingRegex());

      if (scriptedTerms) {
        scriptedTerms.forEach(function(scriptedTerm: string): void {
          const termBeforeComputing = scriptedTerm.replace(/({{|}})/gm, '');

          const uid = generateUid();

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
