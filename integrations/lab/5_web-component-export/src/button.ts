import { createComponent } from '@larva.js/core';

interface Button {
  message: string;
}

export const button = createComponent<Button>('button', function(): Button {
  return {
    message: 'Hello world'
  };
});
