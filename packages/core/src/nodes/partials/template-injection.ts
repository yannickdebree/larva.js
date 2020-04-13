import { Component } from '../../components';
import { Node } from '..';

export function transferTemplateInjectionUsingValueToChildComponents(node: Node): void {
  (node.__property('components') as Array<Component>).forEach(function(component: Component): void {
    component.__setTemplateInjectionUsing(node.__property('templateInjectionUsing') as boolean);
  });
}
