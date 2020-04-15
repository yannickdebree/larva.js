import { createInjectable } from '@snake.js/core';
import { FirstInjectable } from './my-first-injectable';

export interface SecondInjectable {
  message: string;
}

export const mySecondInjectable = createInjectable<SecondInjectable>(
  'mySecondInjectable',
  (myFirstInjectable: FirstInjectable) => ({
    message: myFirstInjectable.message
  })
);
