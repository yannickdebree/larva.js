import { equal, notEqual } from 'assert';
import { snake } from '../src/snake';
const Window = require('window');

context('@snake.js/core', function() {
  beforeEach(function() {
    globalThis.window = new Window();

    for (let i = 0; i < 3; ++i) {
      const appContainer = window.document.createElement('div');

      appContainer.id = `snake-app-${i}`;

      window.document.body.appendChild(appContainer);
    }
  });

  it('Each snake instance is unique', function() {
    const app1 = snake('#snake-app-1');

    const app1Reference = app1.setTemplate('<h1>Hello world</h1>');

    equal(app1, app1Reference);

    const app2 = snake('#snake-app-2');

    notEqual(app1, app2);
  });
});
