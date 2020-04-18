import { larva } from '@larva.js/core';
import { container } from './components/container';
import { header } from './components/header';

larva('#larva-app')
  .registerComponents(header, container)
  .setTemplate(`<s-header></s-header><s-container></s-container>`)
  .render();
