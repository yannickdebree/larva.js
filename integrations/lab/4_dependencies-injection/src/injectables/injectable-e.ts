import { createInjectable } from '@larva.js/core';

export interface InjectableE {
  showMessage(): void;
}

export const injectableE = createInjectable<InjectableE>('injectableE', () => ({
  showMessage(): void {
    console.log('Hello world');
  }
}));
