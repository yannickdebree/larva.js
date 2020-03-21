import { Component } from './component';
import { throwNewError } from './errors';
import { EventTypes } from './event';
import { Data } from './shared';

export interface NodePropertiesInput {
  domElement: Element;
  id: string;
  template: string;
}

export interface NodeProperties extends NodePropertiesInput {
  childComponents: Array<Component>;
}

export interface Node {
  getData(): Data;
  getTemplate(): string;
  registerChildComponents(...components: Array<Component>): Node;
  render(): Node;
  setTemplate(value: string): Node;
}

export function createNode(_properties: NodePropertiesInput, _data?: () => any): Node {
  const properties: NodeProperties = {
    ..._properties,
    childComponents: new Array<Component>()
  };

  if (_data) {
    if (typeof _data === 'function' && /^[^{]+?=>/.test(_data.toString())) {
      return throwNewError("Properties definition musn't be an arrow functions.");
    }
    if (!_data()) {
      return throwNewError('Properties definition must return an object.');
    }
  }

  const data: any = _data
    ? new Proxy(_data(), {
        set(target: any, property: string, value: any) {
          target[property] = value;
          node.render();
          return true;
        }
      })
    : {};

  const node: Node = {
    getData(): any {
      return data;
    },

    getTemplate(): string {
      return properties.template;
    },

    registerChildComponents(...components: Array<Component>): Node {
      properties.childComponents = [...properties.childComponents, ...components];
      return this;
    },

    render(): Node {
      if (!properties.domElement) {
        properties.domElement = window.document.getElementById(properties.id);
      }
      if (!properties.domElement) {
        return throwNewError(`'${properties.id}' component is unknowned for the DOM.`);
      }
      let template = properties.template;
      for (const propertyName in this.getData()) {
        template = template.replace(`{{${propertyName}}}`, this.getData()[propertyName]);
      }
      properties.domElement.innerHTML = template;

      Object.keys(EventTypes).forEach((eventType: EventTypes) => {
        const attribute = `s-on-${eventType}`;
        properties.domElement.querySelectorAll(`[${attribute}]`).forEach((element: Element) => {
          const attributeValue = element.attributes.getNamedItem(attribute).value;
          element.addEventListener(eventType, (event: Event) => {
            if (this.getData().hasOwnProperty(attributeValue) && typeof this.getData()[attributeValue] === 'function') {
              this.getData()[attributeValue](event);
            }
          });
          element.attributes.removeNamedItem(attribute);
        });
      });

      properties.childComponents.forEach(function(component: Component): void {
        properties.domElement.querySelectorAll(`s-${component.getId()}`).forEach((element: Element) => {
          element.outerHTML = `<div id="${component.getId()}">${component.getTemplate()}</div>`;
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
