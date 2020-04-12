const header = createComponent('header').setTemplate('<header>This is this header</header>');

const button = createComponent('button').setTemplate('<button>This is a button</button>');

const main = createComponent('main')
  .registerComponent(button)
  .setTemplate('<main>This is the main content<s-button></s-button></main>');

const app = snake('#snake-app')
  .registerComponents(header, main)
  .setTemplate(`<s-header></s-header><s-main></s-main>`)
  .render();
