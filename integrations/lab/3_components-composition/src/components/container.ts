import { createComponent } from '@snake.js/core';
import { button } from './button';

export const container = createComponent('container')
  .registerComponent(button)
  .setTemplate('<main>This is the main content<s-button></s-button></main>');
