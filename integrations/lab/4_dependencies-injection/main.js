/**
 * Services
 */

const service1 = createInjectable('myFirstService', () => ({
  message: 'Hello world'
}));

const service2 = createInjectable('mySecondService', myFirstService => ({
  message: myFirstService.message
}));

const service3 = createInjectable('myThirdService', () => ({
  status: 'ok'
}));

const service4 = createInjectable('myFourthService', (mySecondService, myThirdService) => ({
  message: mySecondService.message,
  status: myThirdService.status
}));

const service5 = createInjectable('myFiveService', () => ({
  showMessage() {
    console.log('Hello world');
  }
}));

/**
 * Components
 */
const comp1 = createComponent('comp1', mySecondService => ({
  message: mySecondService.message
})).setTemplate('<h2>Composant 1</h2><p>message : {{message}}</p>');

const comp2 = createComponent('comp2', myThirdService => ({
  status: myThirdService.status
})).setTemplate('<h2>Composant 2</h2><p>status : {{status}}</p>');

const comp3 = createComponent('comp3', myFiveService => {
  myFiveService.showMessage();
  return {};
}).registerInjectable(service5);

/**
 * App instance
 */
const app = snake('#snake-app', myFourthService => {
  return { ...myFourthService };
})
  .registerInjectables(service1, service2, service3, service4)
  .registerComponents(comp1, comp2, comp3)
  .setTemplate(
    `message : {{message}}, status : {{status}}
    <s-comp1></s-comp1><s-comp2></s-comp2><s-comp3></s-comp3>`
  )
  .render();
