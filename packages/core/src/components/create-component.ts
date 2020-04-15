import { DataAccessor } from '../kernel';
import { createNode } from '../nodes';
import { tryAndCatchOrReturn } from '../shared';
import { useNodeAsWebComponent } from './partials';
import { Component } from './types';

export function createComponent<D = any>(tag: string, dataAccessor?: DataAccessor<D>): Component<D> {
  return tryAndCatchOrReturn(function() {
    const node = createNode<Component<D>, D>(
      {
        domElement: undefined,
        tag,
        scriptedTemplate: ''
      },
      dataAccessor
    );

    const component: Component<D> = {
      ...node,

      useAsWebComponent(): void {
        useNodeAsWebComponent(this);
      }
    };

    return component;
  });
}
