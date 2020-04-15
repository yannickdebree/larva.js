import { createInjectable } from '@snake.js/core';

export interface FirstInjectable {
  message: string;
}

export const myFirstInjectable = createInjectable<FirstInjectable>('myFirstInjectable', () => ({
  message: 'Hello world'
}));
