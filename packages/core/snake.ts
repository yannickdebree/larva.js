import { Component } from "./component";

export interface SnakeInstance extends Component {}

export function snake(tag: string): SnakeInstance {
  if (!window) {
    console.error(new Error(`Window object is unknowned.`));
    return null;
  }
  if (!window.customElements) {
    console.error(new Error(`Web components are not available.`));
    return null;
  }

  let data = {
    domElement: window.document.querySelector(tag),
    childComponents: new Array<Component>(),
    template: `<h1>Congratulations !</h1>
    <p>You just created a Snake.js app here.</h1>`
  };

  const snakeInstance: SnakeInstance = {
    getDomElement(): Element {
      return data.domElement;
    },

    getTemplate(): string {
      return data.template;
    },

    properties: {},

    registerChildComponents(...components: Array<Component>): SnakeInstance {
      const childComponents = [...data.childComponents, ...components];
      data = { ...data, childComponents };
      return snakeInstance;
    },

    render(): SnakeInstance {
      const domElement = snakeInstance.getDomElement();
      if (!domElement) {
        console.error(new Error(`'${tag}' element is unknowned for the DOM.`));
        return null;
      }
      domElement.innerHTML = data.template;
      data.childComponents.forEach((component: Component) => {
        domElement
          .querySelectorAll(`s-${component.getId()}`)
          .forEach((element: Element) => {
            element.outerHTML = `<div id="${component.getId()}">${component.getTemplate()}</div>`;
            component.render();
          });
      });
      return snakeInstance;
    },

    setTemplate(value: string) {
      data.template = value;
      return snakeInstance;
    }
  };

  return snakeInstance;
}
