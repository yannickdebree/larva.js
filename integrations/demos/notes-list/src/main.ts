import { snake } from '@snake.js/core';
import { addNote } from './components/add-note';

snake('#snake-app')
  .registerComponents(addNote)
  .setTemplate(
    `<h1>Add note</h1>
  <s-add-note></s-add-note>`
  )
  .render();
