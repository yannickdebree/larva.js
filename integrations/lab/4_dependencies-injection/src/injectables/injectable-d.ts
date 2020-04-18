import { createInjectable } from '@larva.js/core';
import { InjectableB } from './injectable-b';
import { InjectableC } from './injectable-c';

export interface InjectableD {
  message: string;
  status: string;
}

export const injectableD = createInjectable<InjectableD>(
  'injectableD',
  (injectableB: InjectableB, injectableC: InjectableC) => ({
    message: injectableB.message,
    status: injectableC.status
  })
);
