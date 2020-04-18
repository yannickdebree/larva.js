import { DataAccessor, throwNewError } from '../kernel';
import { createNode } from '../nodes';
import { tryAndCatchOrReturn } from '../shared';
import { Larva } from './types';

export function larva<D = any>(_selector: string, _data?: DataAccessor<D>): Larva<D> {
  return tryAndCatchOrReturn(function() {
    if (!window) {
      throwNewError(`Window object is unknowned.`);
    }

    const domElement = window.document.querySelector(_selector) as Element;

    if (!domElement) {
      throwNewError(`"${_selector}" element doesn't exist in DOM.`);
    }

    const node = createNode<Larva<D>, D>(
      {
        domElement,
        tag: _selector,
        scriptedTemplate: `<h1>Congratulations !</h1>
        <p>You just created a Larva.js app here.</h1>`
      },
      _data
    );

    const larva: Larva<D> = {
      ...node,

      enableTemplateInjection(value = true): Larva<D> {
        this.__setTemplateInjectionUsing(value);

        return this;
      }
    };

    return larva;
  });
}
