import { createComponent } from '@larva.js/core';
import { InjectableE, injectableE } from '../injectables/injectable-e';

interface ComponentC {
  message: string;
}

export const componentC = createComponent<ComponentC>('c', (injectableE: InjectableE) => {
  injectableE.showMessage();
  return { message: 'Hello world' };
})
  .registerInjectable(injectableE)
  .setTemplate('<h2>Composant C</h2><p>message : {{message}}</p>');
