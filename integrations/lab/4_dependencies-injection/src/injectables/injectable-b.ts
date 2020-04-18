import { createInjectable } from '@larva.js/core';
import { InjectableA } from './injectable-a';

export interface InjectableB {
  message: string;
}

export const injectableB = createInjectable<InjectableB>('injectableB', (injectableA: InjectableA) => ({
  message: injectableA.message
}));
