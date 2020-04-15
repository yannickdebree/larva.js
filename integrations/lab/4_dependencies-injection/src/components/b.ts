import { createComponent } from '@snake.js/core';
import { ThirdInjectable } from '../injectables';

interface B {
  status: 'ok';
}

export const b = createComponent<B>('b', (myThirdInjectable: ThirdInjectable) => ({
  status: myThirdInjectable.status
})).setTemplate('<h2>Composant B</h2><p>status : {{status}}</p>');
