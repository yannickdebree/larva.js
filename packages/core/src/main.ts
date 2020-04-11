import { createComponent } from './component';
import { createInjectable } from './injectable';
import { snake } from './snake';

globalThis.createComponent = createComponent;
globalThis.createInjectable = createInjectable;
globalThis.snake = snake;

const a = snake('#snake-app')
  .setTemplate('fcsf')
  .render();

setTimeout(() => {
  a.setTemplate('rfgerfgrtgrt').render();
}, 2000);
