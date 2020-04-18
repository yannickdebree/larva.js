import { createComponent } from '@larva.js/core';

interface Note {}

export const note = createComponent<Note>('note', function(): Note {
  return {};
});
