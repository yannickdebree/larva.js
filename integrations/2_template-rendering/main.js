const counter = createComponent('counter', () => ({
  count: 0,
  more($event, count) {
    console.log($event);
    console.log(count);
    this.count++;
  }
}));

const form = createComponent('form', () => ({
  term: '',
  onKeyUp($event) {
    this.term = $event.target.value;
  }
}));

snake('#snake-app')
  .enableTemplateInjection(false)
  .registerComponents(counter, form)
  .render();
