import { createInjectable } from '@snake.js/core';

export interface InjectableC {
  status: string;
}

export const injectableC = createInjectable<InjectableC>('injectableC', () => ({
  status: 'ok'
}));
