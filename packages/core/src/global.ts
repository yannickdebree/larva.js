import { createComponent } from './components';
import { createInjectable } from './injectables';
import { larva } from './larva';

globalThis.createComponent = createComponent;
globalThis.createInjectable = createInjectable;
globalThis.larva = larva;
