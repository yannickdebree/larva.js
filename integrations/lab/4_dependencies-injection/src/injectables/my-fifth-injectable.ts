import { createInjectable } from '@snake.js/core';

export interface FifthInjectable {
  showMessage(): void;
}

export const myFifthInjectable = createInjectable<FifthInjectable>('myFifthInjectable', () => ({
  showMessage() {
    console.log('Hello world');
  }
}));
