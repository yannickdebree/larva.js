import { DataAccessor } from '../../../kernel';
import { createNode } from '../../../node';
import { tryAndCatchOrReturn } from '../../../shared';
import { Component } from '../../_types';
import { useNodeAsWebComponent } from '../helpers';

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
