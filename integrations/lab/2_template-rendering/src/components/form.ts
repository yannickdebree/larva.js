import { createComponent } from '@larva.js/core';

interface Form {
  term: string;
  onKeyUp: ($event) => void;
}

export const form = createComponent<Form>('form', () => ({
  term: '',
  onKeyUp($event) {
    this.term = $event.target.value;
  }
}));
