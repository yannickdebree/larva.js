import { createComponent } from '@larva.js/core';
import { InjectableC } from '../injectables/injectable-c';

interface ComponentB {
  status: string;
}

export const componentB = createComponent<ComponentB>('b', (injectableC: InjectableC) => ({
  status: injectableC.status
})).setTemplate('<h2>Composant B</h2><p>status : {{status}}</p>');
