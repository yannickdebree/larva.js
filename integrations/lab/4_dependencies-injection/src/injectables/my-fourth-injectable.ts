import { createInjectable } from '@snake.js/core';
import { SecondInjectable } from './my-second-injectable';
import { ThirdInjectable } from './my-third-injectable';

export interface FourthInjectable {
  message: string;
  status: 'ok';
}

export const myFourthInjectable = createInjectable<FourthInjectable>(
  'myFourthInjectable',
  (mySecondInjectable: SecondInjectable, myThirdInjectable: ThirdInjectable) => ({
    message: mySecondInjectable.message,
    status: myThirdInjectable.status
  })
);
