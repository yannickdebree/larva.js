import { Component } from '../../../component';
import { Injectable, InjectableDictionnay } from '../../../injectable';
import { DataAccessor, templateBindingRgx, throwNewError } from '../../../kernel';
import { uniqueId } from '../../../shared';
import { Node, NodePropertiesInput, NodePropertyKey, NodePropertyValue } from '../../_types';
import {
  renderNode,
  runDataAccessor,
  transferInjectablesToChildComponents,
  transferTemplateInjectionUsingValueToChildComponents
} from '../helpers';

export function createNode<N>(_properties: NodePropertiesInput, _dataAccessor?: DataAccessor<N>): Node<N> {
  const properties = {
    ..._properties,
    bindedDomElements: {},
    components: new Array<Component>(),
    domElementsInjectionOperationTread: 0,
    injectableDictionnay: {},
    isViewLoaded: false,
    scriptedData: {},
    templateInjectionUsing: true
  };

  let data: N;

  const node: Node<N> = {
    __closeOneDomElementsInjectionOperation(): void {
      properties.domElementsInjectionOperationTread--;
    },

    __data(): N {
      if (!data) {
        data = new Proxy(runDataAccessor(this, _dataAccessor), {
          set(target: N, property: string, value: any) {
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

    registerComponent(component: Component): Node<N> {
      properties.components = [...properties.components, component];

      transferInjectablesToChildComponents(this);

      transferTemplateInjectionUsingValueToChildComponents(this);

      return this;
    },

    registerInjectable(injectable: Injectable) {
      const patch: InjectableDictionnay = {};

      patch[injectable.id()] = injectable;

      properties.injectableDictionnay = { ...properties.injectableDictionnay, ...patch };

      transferInjectablesToChildComponents(this);

      return this;
    },

    render(): Node<N> {
      renderNode(this);
      return this;
    },

    setTemplate(template: string): Node<N> {
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
