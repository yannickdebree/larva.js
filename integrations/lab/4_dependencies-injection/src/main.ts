import { snake } from '@snake.js/core';
import { a, b, c } from './components';
import {
  FourthInjectable,
  myFirstInjectable,
  myFourthInjectable,
  mySecondInjectable,
  myThirdInjectable
} from './injectables';

interface App {
  message: string;
  status: 'ok';
}

snake<App>('#snake-app', (myFourthInjectable: FourthInjectable) => {
  return { ...myFourthInjectable };
})
  .registerInjectables(myFirstInjectable, mySecondInjectable, myThirdInjectable, myFourthInjectable)
  .registerComponents(a, b, c)
  .setTemplate(
    `message : {{message}}, status : {{status}}
      <s-a></s-a><s-b></s-b><s-c></s-c>`
  )
  .render();
