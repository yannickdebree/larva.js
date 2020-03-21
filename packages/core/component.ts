export interface ComponentProperties {
  [key: string]: any;
}

export interface Component {
  properties: {
    [key: string]: any;
  };
  getDomElement(): Element;
  getId?(): string;
  getTemplate(): string;
  registerChildComponents(...components: Array<Component>): Component;
  render(): Component;
  setTemplate(template: string): Component;
}

export function createComponent(
  id: string,
  props?: (...dependencies: Array<any>) => ComponentProperties
): Component {
  let data = {
    domElement: undefined,
    childComponents: new Array<Component>(),
    id,
    template: ""
  };

  const componentInstance = {
    getDomElement(): Element {
      return data.domElement;
    },

    getId() {
      return data.id;
    },

    getTemplate(): string {
      return data.template;
    },

    properties: props
      ? new Proxy(props(), {
          set(target: ComponentProperties, property: string, value: any) {
            target[property] = value;
            componentInstance.render();
            return true;
          }
        })
      : {},

    registerChildComponents(...components: Array<Component>): Component {
      const childComponents = [...data.childComponents, ...components];
      data = { ...data, childComponents };
      return componentInstance;
    },

    render(): Component {
      data = {
        ...data,
        domElement: document.getElementById(data.id)
      };
      const domElement = componentInstance.getDomElement();
      if (!domElement) {
        console.error(new Error(`'${id}' element is unknowned for the DOM.`));
        return null;
      }
      let template = data.template;
      for (const property in componentInstance.properties) {
        template = template.replace(
          `{{${property}}}`,
          componentInstance.properties[property]
        );
      }
      domElement.innerHTML = template;

      enum EventType {
        click = "click"
      }

      Object.keys(EventType).forEach((eventType: EventType) => {
        const attribute = `s-on-${eventType}`;
        domElement
          .querySelectorAll(`[${attribute}]`)
          .forEach((element: Element) => {
            const attributeValue = element.attributes.getNamedItem(attribute)
              .value;
            element.addEventListener(eventType, (event: Event) => {
              if (
                componentInstance.properties.hasOwnProperty(attributeValue) &&
                typeof componentInstance.properties[attributeValue] ===
                  "function"
              ) {
                componentInstance.properties[attributeValue](event);
              }
            });
            element.attributes.removeNamedItem(attribute);
          });
      });

      data.childComponents.forEach((component: Component) => {
        domElement
          .querySelectorAll(`s-${component.getId()}`)
          .forEach((element: Element) => {
            element.outerHTML = `<div id="${component.getId()}">${component.getTemplate()}</div>`;
            component.render();
          });
      });
      return componentInstance;
    },

    setTemplate(value: string): Component {
      data.template = value;
      return componentInstance;
    }
  };

  return componentInstance;
}
