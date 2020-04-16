import { createComponent } from '@snake.js/core';

interface Counter {
  count: number;
  more: ($event: Event, count: number) => void;
}

export const counter = createComponent<Counter>('counter', () => ({
  count: 0,
  more($event, count) {
    console.log($event);
    console.log(count);
    this.count++;
  }
}));
