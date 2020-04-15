import { createComponent } from '@snake.js/core';

interface CounterComponent {
  count: number;
  more: ($event: Event, count: number) => void;
}

export const counter = createComponent<CounterComponent>('counter', () => ({
  count: 0,
  more($event, count) {
    console.log($event);
    console.log(count);
    this.count++;
  }
}));
