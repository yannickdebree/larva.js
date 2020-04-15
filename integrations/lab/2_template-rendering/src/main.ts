import { snake } from '@snake.js/core';
import { counter, form } from './components';

snake('#snake-app')
  .enableTemplateInjection(false)
  .registerComponents(counter, form)
  .render();
