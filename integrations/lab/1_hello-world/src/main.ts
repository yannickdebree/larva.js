import { larva } from '@larva.js/core';

larva('#larva-app', () => {
  return {
    message: 'Hello world'
  };
})
  .setTemplate('{{ message }}')
  .render();
