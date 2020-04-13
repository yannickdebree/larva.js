import { DataAccessor } from '../kernel';
import { createNode } from '../nodes';
import { tryAndCatchOrReturn } from '../shared';
import { Component } from './types';
import { useNodeAsWebComponent } from './partials';

export function createComponent<C>(tag: string, dataAccessor?: DataAccessor<C>): Component<C> {
  return tryAndCatchOrReturn(function() {
    const node = createNode(
      {
        domElement: undefined,
        tag,
        scriptedTemplate: ''
      },
      dataAccessor
    );

    const component: Component<C> = {
      ...node,

      useAsWebComponent(): void {
        useNodeAsWebComponent(this);
      }
    };

    return component;
  });
}
