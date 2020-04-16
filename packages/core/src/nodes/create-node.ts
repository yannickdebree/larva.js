import { Component } from '../components';
import { Injectable, InjectableDictionnay } from '../injectables';
import { DataAccessor, templateBindingRgx, throwNewError } from '../kernel';
import { NodeProperties, NodePropertiesInput, NodePropertyKey, NodePropertyValue } from '../nodes';
import { uniqueId } from '../shared';
import {
  renderNode,
  runDataAccessor,
  transferInjectablesToChildComponents,
  transferTemplateInjectionUsingValueToChildComponents
} from './partials';
import { Node } from './types';

export function createNode<T extends Node<any, D>, D = any>(
  _properties: NodePropertiesInput,
  _dataAccessor?: DataAccessor<D>
): Node<T, D> {
  const properties: NodeProperties = {
    ..._properties,
    bindedDomElements: {},
    components: new Array<Component>(),
    domElementsInjectionOperationTread: 0,
    injectableDictionnay: {},
    isViewLoaded: false,
    scriptedData: {},
    templateInjectionUsing: true
  };

  let data: D;

  const node: Node<T, D> = {
    __closeOneDomElementsInjectionOperation(): void {
      properties.domElementsInjectionOperationTread--;
    },

    __data(): D {
      if (!data) {
        data = new Proxy(runDataAccessor(this, _dataAccessor), {
          set(target: D, property: string, value: any) {
            target[property] = value;
            renderNode(node);
            return true;
          }
        });
      }
      return data;
    },

    __injectContentToBindedDomElement(content: string, uid: string): void {
      properties.bindedDomElements[uid].textContent = content;
    },

    __property(key: NodePropertyKey): NodePropertyValue {
      const value = properties[key];
      if (key === 'domElement') {
        return value;
      } else if (typeof value === 'object') {
        return Array.isArray(value) ? [...value] : { ...value };
      } else {
        return value;
      }
    },

    __setViewAsLoaded(): void {
      properties.isViewLoaded = true;
    },

    __setTemplateInjectionUsing(value = true): void {
      properties.templateInjectionUsing = value;

      transferTemplateInjectionUsingValueToChildComponents(this);
    },

    registerComponent(component: Component): T {
      properties.components = [...properties.components, component];

      transferInjectablesToChildComponents(this);

      transferTemplateInjectionUsingValueToChildComponents(this);

      return this;
    },

    registerComponents(...components: Array<Component>): T {
      components.forEach((component: Component) => {
        this.registerComponent(component);
      });
      return this;
    },

    registerInjectable(injectable: Injectable): T {
      const patch: InjectableDictionnay = {};

      patch[injectable.id()] = injectable;

      properties.injectableDictionnay = { ...properties.injectableDictionnay, ...patch };

      transferInjectablesToChildComponents(this);

      return this;
    },

    registerInjectables(...injectables: Array<Injectable>): T {
      injectables.forEach((injectable: Injectable) => {
        this.registerInjectable(injectable);
      });
      return this;
    },

    render(): T {
      renderNode(this);
      return this;
    },

    setTemplate(template: string): T {
      if (!template) {
        throwNewError('Please define a correct template.');
      }

      const scriptedTerms = template.match(templateBindingRgx());

      if (scriptedTerms) {
        scriptedTerms.forEach(function(scriptedTerm: string): void {
          const termBeforeComputing = scriptedTerm.replace(/({{|}})/gm, '');

          const uid = uniqueId();

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
