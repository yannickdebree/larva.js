import { createInjectable } from '@snake.js/core';

export interface ThirdInjectable {
  status: 'ok';
}

export const myThirdInjectable = createInjectable<ThirdInjectable>('myThirdInjectable', () => ({
  status: 'ok'
}));
