import { createComponent } from '@snake.js/core';

interface FormComponent {
  term: string;
  onKeyUp: ($event) => void;
}

export const form = createComponent<FormComponent>('form', () => ({
  term: '',
  onKeyUp($event) {
    this.term = $event.target.value;
  }
}));
