import { snake } from 'core/src/snake';

describe('test', () => {
  const app1 = snake('#snake-app-1');

  const app1Reference = app1.render();

  console.log(app1 === app1Reference);

  const app2 = snake('#snake-app-2');

  console.log(app1 === app2);
});
