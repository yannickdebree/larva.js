import { createComponent } from './component';
import { snake } from './snake';
import { createInjectable } from './injectable';

globalThis.createComponent = createComponent;
globalThis.createInjectable = createInjectable;
globalThis.snake = snake;
