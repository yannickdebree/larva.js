import { createComponent } from './components';
import { createInjectable } from './injectables';
import { snake } from '@_snake';

globalThis.createComponent = createComponent;
globalThis.createInjectable = createInjectable;
globalThis.snake = snake;
