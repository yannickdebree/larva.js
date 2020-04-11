import { Component } from '../../component';
import { Injectable, InjectableDictionnay } from '../../injectable';
import { Node } from '../_types';

export function transferInjectablesToChildComponents(node: Node): void {
  (node.__property('components') as Array<Component>).forEach(function(component: Component): void {
    Object.values(node.__property('injectableDictionnay') as InjectableDictionnay).forEach(function(
      injectable: Injectable
    ) {
      component.registerInjectable(injectable);
    });
  });
}

// component.__setTemplateInjectionUsing(node.__property('templateInjectionUsing') as boolean);
