import { createInjectable } from '@larva.js/core';

export interface InjectableA {
  message: string;
}

export const injectableA = createInjectable<InjectableA>('injectableA', () => ({
  message: 'Hello world'
}));
