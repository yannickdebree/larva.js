import { Component } from '../../components';
import { Injectable, InjectableDictionnay, InjectableId } from '../../injectables';
import { Dependency, throwNewError } from '../../kernel';
import { Node } from '..';

export function transferInjectablesToChildComponents(node: Node): void {
  (node.__property('components') as Array<Component>).forEach(function(component: Component): void {
    Object.values(node.__property('injectableDictionnay') as InjectableDictionnay).forEach(function(
      injectable: Injectable
    ) {
      component.registerInjectable(injectable);
    });
  });
}

export function translateInjectables(node: Node, injectablesIds: Array<InjectableId>): Dependency[] {
  return injectablesIds.map(function(injectableId: string) {
    const injectable: Injectable = node.__property('injectableDictionnay')[injectableId];

    if (!injectable) {
      throwNewError(`"${injectableId}" is not declared as injectable in the "${node.__property('tag')}" node.`);
    }

    const dependencies = new Array<Dependency>();

    if (injectable.injectablesIds().length) {
      dependencies.push(...translateInjectables(node, injectable.injectablesIds()));
    }

    return injectable.dataAccessor()(...dependencies);
  });
}
