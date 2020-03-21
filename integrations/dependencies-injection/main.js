const service1 = createInjectable('myFirstService', function () {
    return {
        message: 'Hello world'
    }
});

// const service2 = createInjectable('mySecondService', function (myFirstService) {
//     return {
//         message: myFirstService.message
//     }
// });

// const comp1 = createComponent('comp1', function (mySecondService) {
//     return {
//         message: mySecondService.message
//     };
// }).setTemplate('<h2>Composant 1</h2><p>{{ message }}</p>');

// const comp2 = createComponent('comp2', function (mySecondService) {
//     return {
//         message: mySecondService.message
//     };
// }).setTemplate('<h2>Composant 2</h2><p>{{ message }}</p>');

const app = snake("#snake-app")
    .registerInjectables(service1)
    // .registerChildComponents(comp1, comp2)
    .setTemplate(`<s-comp1></s-comp1><s-comp2></s-comp2>`)
    .render();