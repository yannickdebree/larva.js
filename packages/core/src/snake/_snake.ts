import { DataAccessor, throwNewError } from '@_kernel';
import { createNode } from '@_nodes';
import { tryAndCatchOrReturn } from '@_shared';
import { Snake } from '@_snake';

export function snake<S>(_selector: string, _data?: DataAccessor<S>): Snake<S> {
  return tryAndCatchOrReturn(function() {
    if (!globalThis.window) {
      throwNewError(`Window object is unknowned.`);
    }

    const domElement = window.document.querySelector(_selector) as Element;

    if (!domElement) {
      throwNewError(`"${_selector}" element doesn't exist in DOM.`);
    }

    const snake: Snake<S> = {
      ...createNode<S>(
        {
          domElement,
          tag: _selector,
          scriptedTemplate: `<h1>Congratulations !</h1>
          <p>You just created a Snake.js app here.</h1>`
        },
        _data
      ),

      enableTemplateInjection(value = true): Snake<S> {
        this.__setTemplateInjectionUsing(value);

        return this;
      }
    };

    return snake;
  });
}
