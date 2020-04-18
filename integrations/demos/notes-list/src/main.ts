import { larva } from '@larva.js/core';
import { addNote } from './components/add-note';

larva('#larva-app')
  .registerComponents(addNote)
  .setTemplate(
    `<h1>Add note</h1>
  <s-add-note></s-add-note>`
  )
  .render();
