import { createComponent } from '@snake.js/core';
import { InjectableB } from '../injectables/injectable-b';

interface ComponentA {
  message: string;
}

export const componentA = createComponent<ComponentA>('a', (injectableB: InjectableB) => ({
  message: injectableB.message
})).setTemplate('<h2>Composant A</h2><p>message : {{message}}</p>');
