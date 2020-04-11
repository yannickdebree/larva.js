const counter = createComponent('counter', function() {
  return {
    count: 0,
    more($event, count) {
      console.log($event);
      console.log(count);
      this.count++;
    }
  };
}).setTemplate(`
  <h2>Counter</h2>
  <button s-on-click="more($event, count)">+</button>
    {{ (2 * count) + 1 }}
  <button s-on-click="count--">-</button>
`);

const form = createComponent('form', function() {
  return {
    term: '',
    onKeyUp($event) {
      this.term = $event.target.value;
    }
  };
}).setTemplate(`
  <h2>Dynamic form</h2>
  <input type="text" s-on-keyup="onKeyUp($event)" />
  <p>{{ term }}</p>
`);

snake('#snake-app')
  .disableTemplateInjection()
  .registerComponent(counter)
  .registerComponent(form)
  .setTemplate('<s-counter></s-counter><s-form></s-form>')
  .render();
