const counter = createComponent('counter', function() {
  return {
    count: 0,
    more($event, count) {
      console.log($event);
      console.log(count);
      this.count++;
    }
  };
});

const form = createComponent('form', function() {
  return {
    term: '',
    onKeyUp($event) {
      this.term = $event.target.value;
    }
  };
});

snake('#snake-app')
  .registerComponent(counter)
  .registerComponent(form)
  .enableTemplateInjection(false)
  .setTemplate('fefre')
  .render();
