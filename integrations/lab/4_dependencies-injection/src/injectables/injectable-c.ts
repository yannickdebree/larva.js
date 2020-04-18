import { createInjectable } from '@larva.js/core';

export interface InjectableC {
  status: string;
}

export const injectableC = createInjectable<InjectableC>('injectableC', () => ({
  status: 'ok'
}));
