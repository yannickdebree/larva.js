import { createInjectable } from '@snake.js/core';

export interface InjectableE {
  showMessage(): void;
}

export const injectableE = createInjectable<InjectableE>('injectableE', () => ({
  showMessage(): void {
    console.log('Hello world');
  }
}));
