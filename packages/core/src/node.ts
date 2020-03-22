import { Component } from './component';
import { throwNewError } from './errors';
import { EventTypes } from './event';
import { getArgumentsNamesOfFunction } from './helpers';
import { Dependency, Injectable, InjectableId, InjectorDictionnay } from './injectable';

export type NodeData = (...dependencies: Array<Dependency>) => any;

export interface NodePropertiesInput {
  domElement: Element;
  tag: string;
  template: string;
}

export interface NodeProperties extends NodePropertiesInput {
  childComponents: Array<Component>;
  injectables: InjectorDictionnay;
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
    injectables: {}
  };

  if (_data) {
    if (typeof _data === 'function' && /^[^{]+?=>/.test(_data.toString())) {
      throwNewError('Node data setting must be a basic function, not an arrow function.');
    }
  }

  function hydrateChildComponents(): void {
    properties.childComponents.forEach(function(component: Component): void {
      component.registerInjectables(
        ...Object.keys(properties.injectables).map((injectableId: InjectableId) => properties.injectables[injectableId])
      );
    });
  }

  function translateInjectables(injectablesIds: Array<InjectableId>): Dependency[] {
    return injectablesIds.map(function(injectableId: string) {
      const injectable = properties.injectables[injectableId];

      if (!injectable) {
        // return {};
        throwNewError(`"${injectableId}" is not declared as injectable in the "${properties.tag}" node.`);
      }

      const dependencies = new Array<Dependency>();

      if (injectable.getInjectablesIds().length) {
        dependencies.push(...translateInjectables(injectable.getInjectablesIds()));
      }

      return injectable.getData()(...dependencies);
    });
  }

  const computeData = function() {
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
  };

  let data: any;

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
      return properties.template;
    },

    registerChildComponents(...components: Array<Component>): Node {
      properties.childComponents = [...properties.childComponents, ...components];

      hydrateChildComponents();

      return this;
    },

    registerInjectables(...injectables: Array<Injectable>) {
      const newInjectables: InjectorDictionnay = {};

      injectables.forEach((injectable: Injectable) => {
        newInjectables[injectable.getId()] = injectable;
      });

      properties.injectables = { ...properties.injectables, ...newInjectables };

      hydrateChildComponents();

      return this;
    },

    render(): Node {
      if (!properties.domElement) {
        properties.domElement = window.document.querySelector(`[s-tag=${properties.tag}]`);
      }

      if (!properties.domElement) {
        throwNewError(`'${properties.tag}' component is unknowned for the DOM.`);
      }

      const nodeData = this.getData();

      let bufferTemplate = properties.template;

      for (const propertyName in nodeData) {
        bufferTemplate = bufferTemplate.replace(`{{${propertyName}}}`, nodeData[propertyName]);
      }

      properties.domElement.innerHTML = bufferTemplate;

      Object.keys(EventTypes).forEach((eventType: EventTypes) => {
        const attribute = `s-on-${eventType}`;

        properties.domElement.querySelectorAll(`[${attribute}]`).forEach((element: Element) => {
          element.removeEventListener(eventType, () => {});

          const attributeValue = element.attributes.getNamedItem(attribute).value;

          element.addEventListener(eventType, (event: Event) => {
            if (nodeData.hasOwnProperty(attributeValue) && typeof nodeData[attributeValue] === 'function') {
              nodeData[attributeValue](event);
            }
          });

          element.attributes.removeNamedItem(attribute);
        });
      });

      properties.childComponents.forEach(function(component: Component): void {
        properties.domElement.querySelectorAll(`s-${component.getTag()}`).forEach((element: Element) => {
          element.outerHTML = `<div s-tag="${component.getTag()}">${component.getTemplate()}</div>`;

          component.render();
        });
      });

      return this;
    },

    setTemplate(value: string): Node {
      properties.template = value || '';

      return this;
    }
  };
  return node;
}
