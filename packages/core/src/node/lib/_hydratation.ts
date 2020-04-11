import { Component } from '../../component';
import { Node } from '../_types';
import { Injectable } from '../../injectable';

export function hydrateChildComponents(node: Node): void {
  (node.__property('components') as Array<Component>).forEach(function(component: Component): void {
    Object.values(node.__property('injectableDictionnay')).forEach(function(injectable: Injectable) {
      component.registerInjectable(injectable);
    });
  });
}
