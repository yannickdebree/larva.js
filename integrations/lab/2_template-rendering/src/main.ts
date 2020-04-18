import { larva } from '@larva.js/core';
import { counter } from './components/counter';
import { form } from './components/form';

larva('#larva-app')
  .enableTemplateInjection(false)
  .registerComponents(counter, form)
  .render();
