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
import { hydrateChildComponents } from './_hydratation';
import { renderNode } from './_rendering';

export function createNode<N>(_properties: NodePropertiesInput, _dataAccessor?: DataAccessor<N>): Node<N> {
  if (_dataAccessor && isAnArrowFn(_dataAccessor)) {
    throwNewError(arrowFnErrorMessage());
  }

  const propertiesManager = {
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
      const injectable = propertiesManager.injectableDictionnay[injectableId];

      if (!injectable) {
        throwNewError(`"${injectableId}" is not declared as injectable in the "${propertiesManager.tag}" node.`);
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
    __closeOneDomElementsInjectionOperation(): Node<N> {
      return node;
    },

    __data(): N {
      if (!data) {
        data = new Proxy(runDataAccessor(_dataAccessor), {
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
      propertiesManager.bindedDomElements[uid].textContent = content;
    },

    __property(key: NodePropertyKey): NodePropertyValue {
      const value = propertiesManager[key];
      if (key === 'domElement') {
        return value;
      } else if (typeof value === 'object') {
        return Array.isArray(value) ? [...value] : { ...value };
      } else {
        return value;
      }
    },

    registerComponent(component: Component): Node<N> {
      propertiesManager.components = [...propertiesManager.components, component];

      hydrateChildComponents(node);

      return node;
    },

    registerInjectable(injectable: Injectable) {
      const patch: InjectableDictionnay = {};

      patch[injectable.id()] = injectable;

      propertiesManager.injectableDictionnay = { ...propertiesManager.injectableDictionnay, ...patch };

      hydrateChildComponents(node);

      return node;
    },

    __setViewAsLoaded(): void {
      propertiesManager.isViewLoaded = true;
    },

    render(): Node<N> {
      renderNode(node);
      return node;
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
