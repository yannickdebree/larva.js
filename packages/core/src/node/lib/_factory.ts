import { Component } from '../../component';
import { Injectable, InjectableDictionnay, InjectableId } from '../../injectable';
import {
  arrowFnErrorMessage,
  DataAccessor,
  Dependency,
  fnArgumentsNames,
  templateBindingRgx,
  throwNewError
} from '../../kernel';
import { isAnArrowFn, uniqueId } from '../../shared';
import { Node, NodePropertiesInput, NodePropertyKey, NodePropertyValue } from '../_types';
import { transferInjectablesToChildComponents } from './_hydratation';
import { renderNode } from './_rendering';

export function createNode<N>(_properties: NodePropertiesInput, _dataAccessor?: DataAccessor<N>): Node<N> {
  if (_dataAccessor && isAnArrowFn(_dataAccessor)) {
    throwNewError(arrowFnErrorMessage());
  }

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

  function translateInjectables(injectablesIds: Array<InjectableId>): Dependency[] {
    return injectablesIds.map(function(injectableId: string) {
      const injectable = properties.injectableDictionnay[injectableId];

      if (!injectable) {
        throwNewError(`"${injectableId}" is not declared as injectable in the "${properties.tag}" node.`);
      }

      const dependencies = new Array<Dependency>();

      if (injectable.injectablesIds().length) {
        dependencies.push(...translateInjectables(injectable.injectablesIds()));
      }

      return injectable.dataAccessor()(...dependencies);
    });
  }

  function runDataAccessor<D>(_dataAccessor: DataAccessor<D>): any {
    if (_dataAccessor) {
      const injectablesIds: Array<InjectableId> = fnArgumentsNames(_dataAccessor);

      const computedData: any = _dataAccessor(...translateInjectables(injectablesIds));

      if (!computedData) {
        return throwNewError('Node data setting must always return an object.');
      }

      return computedData;
    } else {
      return {};
    }
  }

  let data: N;

  const node: Node<N> = {
    __closeOneDomElementsInjectionOperation(): void {
      properties.domElementsInjectionOperationTread--;
    },

    __data(): N {
      if (!data) {
        data = new Proxy(runDataAccessor(_dataAccessor), {
          set(target: N, property: string, value: any) {
            target[property] = value;
            renderNode(this);
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
      properties.components.forEach(function(component: Component): void {
        component.__setTemplateInjectionUsing(value);
      });
      properties.templateInjectionUsing = value;
    },

    registerComponent(component: Component): Node<N> {
      properties.components = [...properties.components, component];

      transferInjectablesToChildComponents(this);

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
      if (!properties.templateInjectionUsing) {
        throwNewError('You have to enable template injection to use template setting.');
      }

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
