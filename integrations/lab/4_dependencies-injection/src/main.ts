import { larva } from '@larva.js/core';
import { componentA } from './components/component-a';
import { componentB } from './components/component-b';
import { componentC } from './components/component-c';
import { injectableA } from './injectables/injectable-a';
import { injectableB } from './injectables/injectable-b';
import { injectableC } from './injectables/injectable-c';
import { InjectableD, injectableD } from './injectables/injectable-d';

interface App {
  message: string;
  status: string;
}

larva<App>('#larva-app', (injectableD: InjectableD) => {
  return { ...injectableD };
})
  .registerInjectables(injectableA, injectableB, injectableC, injectableD)
  .registerComponents(componentA, componentB, componentC)
  .setTemplate(
    `message : {{message}}, status : {{status}}
      <s-a></s-a><s-b></s-b><s-c></s-c>`
  )
  .render();
