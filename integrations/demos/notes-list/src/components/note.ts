import { createComponent } from '@snake.js/core';

interface Note {}

export const note = createComponent<Note>('note', function(): Note {
  return {};
});
