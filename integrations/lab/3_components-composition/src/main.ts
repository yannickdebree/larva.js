import { snake } from '@snake.js/core';
import { container } from './components/container';
import { header } from './components/header';

snake('#snake-app')
  .registerComponents(header, container)
  .setTemplate(`<s-header></s-header><s-container></s-container>`)
  .render();
