import { createComponent } from '@snake.js/core';
import { SecondInjectable } from '../injectables';

interface A {
  message: string;
}

export const a = createComponent<A>('a', (mySecondInjectable: SecondInjectable) => ({
  message: mySecondInjectable.message
})).setTemplate('<h2>Composant A</h2><p>message : {{message}}</p>');
