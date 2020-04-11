/**
 * Services
 */

const service1 = createInjectable('myFirstService', function() {
  const message = 'Hello';
  return {
    message1: message,
    message2: message + 'World'
  };
});

const service2 = createInjectable('mySecondService', function(myFirstService) {
  return {
    message: myFirstService.message2
  };
});

const service3 = createInjectable('myThirdService', function() {
  return {
    status: 'ok'
  };
});

const service4 = createInjectable('myFourthService', function(mySecondService, myThirdService) {
  return {
    message: mySecondService.message,
    status: myThirdService.status
  };
});

const service5 = createInjectable('myFiveService', function() {
  return {
    showMessage: function() {
      console.log('Hello world');
    }
  };
});

/**
 * Components
 */
const comp1 = createComponent('comp1', function(mySecondService) {
  return {
    message: mySecondService.message
  };
}).setTemplate('<h2>Composant 1</h2><p>message : {{message}}</p>');

const comp2 = createComponent('comp2', function(myThirdService) {
  return {
    status: myThirdService.status
  };
}).setTemplate('<h2>Composant 2</h2><p>status : {{status}}</p>');

const comp3 = createComponent('comp3', function(myFiveService) {
  myFiveService.showMessage();
  return {};
}).registerInjectables(service5);

/**
 * App instance
 */
const app = snake('#snake-app', function(myFourthService) {
  return { ...myFourthService };
})
  .registerInjectables(service1, service2, service3, service4)
  .registerChildComponents(comp1, comp2, comp3)
  .setTemplate(
    `message : {{message}}, status : {{status}}
    <s-comp1></s-comp1><s-comp2></s-comp2><s-comp3></s-comp3>`
  )
  .render();
