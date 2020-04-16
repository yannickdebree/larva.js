import { snake } from '@snake.js/core';
import { counter } from './components/counter';
import { form } from './components/form';

snake('#snake-app')
  .enableTemplateInjection(false)
  .registerComponents(counter, form)
  .render();
