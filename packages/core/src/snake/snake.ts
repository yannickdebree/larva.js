import { DataAccessor, throwNewError } from '../kernel';
import { createNode } from '../nodes';
import { tryAndCatchOrReturn } from '../shared';
import { Snake } from './types';

export function snake<D = any>(_selector: string, _data?: DataAccessor<D>): Snake<D> {
  return tryAndCatchOrReturn(function() {
    if (!window) {
      throwNewError(`Window object is unknowned.`);
    }

    const domElement = window.document.querySelector(_selector) as Element;

    if (!domElement) {
      throwNewError(`"${_selector}" element doesn't exist in DOM.`);
    }

    const node = createNode<Snake<D>, D>(
      {
        domElement,
        tag: _selector,
        scriptedTemplate: `<h1>Congratulations !</h1>
        <p>You just created a Snake.js app here.</h1>`
      },
      _data
    );

    const snake: Snake<D> = {
      ...node,

      enableTemplateInjection(value = true): Snake<D> {
        this.__setTemplateInjectionUsing(value);

        return this;
      }
    };

    return snake;
  });
}
