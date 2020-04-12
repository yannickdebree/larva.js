import { DataAccessor } from '@_kernel';
import { createNode } from '@_nodes';
import { tryAndCatchOrReturn } from '@_shared';
import { Component } from './_types';
import { useNodeAsWebComponent } from './__use-node-as-web-component';

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
