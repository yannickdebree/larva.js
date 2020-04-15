import { createComponent } from '@snake.js/core';
import { FifthInjectable, myFifthInjectable } from '../injectables';

export const c = createComponent('c', (myFifthInjectable: FifthInjectable) => {
  myFifthInjectable.showMessage();
  return { message: 'fef' };
})
  .registerInjectable(myFifthInjectable)
  .setTemplate('<h2>Composant 3 {{message}}</h2>');
