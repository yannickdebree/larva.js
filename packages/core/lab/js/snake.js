/**
 * Snake.js
 * A(n other...) micro-framework to make very simple applications in Javascript.
 *
 * 'snake' is the first function called to develop a Snake.js application.
 * @constructor
 * @param {string} rootElementSelector - The query selector of the HTML element the rendering will be injected.
 * @param {string} developerOptions - The options you can define for the application core.
 */
function snake(rootElementSelector, developerOptions) {
  /**
   * Defaults applications options
   */
  const defaultOptions = {
    /**
     * The "Template Injection" mode able Snake
     * to empty the content of the root element
     * and to fill it dynamiquly.
     * If it's at false, Snake will used the root element content as template.
     */
    templateInjectionMode: true,
    /**
     * The component prefix define the prefix used to determinate web components.
     */
    componentPrefix: "app"
  };

  /**
   * "snakeOptions" are the global options of the app.
   * It must be accessible since all scope-children.
   */
  const snakeOptions = { ...defaultOptions, ...developerOptions };

  /**
   * "rootElement" is the HTML Element the application logic and view will be injected.
   * It must be ccessible since all scope-children.
   */
  const rootElement = window.document.querySelector(rootElementSelector);

  /**
   * If "rootElement" isn't defined, the application couldn't have a visual interface.
   */
  if (!rootElement) {
    console.error(
      new Error(`'${rootElementSelector}' element is unknow in the DOM.`)
    );
    return null;
  }

  /**
   * "defaultTemplate" is the default view injected in the root element,
   * if a template isn't defined.
   */
  const defaultTemplate = `
  <h1>Congratulations !</h1>
  <p>You just created a Snake.js app here.</h1>
  `;

  /**
   * "defaultTemplateOutputs" define the several events detectables since HTML, like "click", or "hover".
   * It will be used as HTML attributes, like "s-click", and will call a method of the component.
   * For example : <button s-hover="showMessage()">Hover it</button>
   */
  const defaultTemplateOutputs = [
    {
      name: "click"
    }
  ];
  defaultTemplateOutputs.forEach(templateOutput => {
    templateOutput["subscribers"] = new Array();
  });

  if (snakeOptions.templateInjectionMode) {
    rootElement.innerHTML = defaultTemplate;
  }

  /**
   * cszfscvdfvfd
   */

  function _component(componentName) {
    const componentTag = `${snakeOptions.componentPrefix}-${componentName}`;

    customElements.define(
      componentTag,
      class extends HTMLElement {
        constructor() {
          super();
        }
      }
    );
    const component = {
      // addMethod: function(name, cb) {
      //   templateEvents.forEach(templateEvent => {
      //     templateEvent.subscribers.forEach(subscriber => {
      //       if (subscriber.name === name) {
      //         subscriber.callbacks.push(cb);
      //       }
      //     });
      //   });
      //   return this;
      // }
      // setTemplate
    };
    return component;
  }

  const snake = {
    getRootElement: function(cb) {
      cb(rootElement);
      return this;
    },
    getOptions: function(cb) {
      cb(snakeOptions);
      return this;
    },
    setTemplate: function(...templateLines) {
      if (!snakeOptions.templateInjectionMode) {
        return this;
      }
      if (templateLines.length === 0) {
        templateLines.push(
          "You must write HTML string while declaring a templating vue."
        );
      }
      let definedTemplate;

      templateLines.forEach((tL, i) => {
        if (!i) {
          definedTemplate = tL;
        } else {
          definedTemplate += tL;
        }
      });

      rootElement.innerHTML = definedTemplate;

      templateEvents.forEach(templateEvent => {
        document
          .querySelectorAll(`[s-${templateEvent.name}]`)
          .forEach(element => {
            const attrValue = element.getAttribute(`s-${templateEvent.name}`);
            templateEvent.subscribers.push({
              name: attrValue,
              callbacks: new Array()
            });
            element.addEventListener(templateEvent.name, event => {
              templateEvent.subscribers.forEach(subscriber => {
                if (subscriber.name === attrValue) {
                  subscriber.callbacks.forEach(cb => {
                    cb(event);
                  });
                }
              });
            });
            element.removeAttribute(`s-${templateEvent.name}`);
          });
      });
      return this;
    },
    defineComponent: function(cb) {
      return cb(_component);
    }
  };

  return snake;
}

// snake()
//   .getRootElement()
//   .getOptions()
//   .setTemplate()
//   .setTemplateUrl()
//   .setState()
//   .defineComponent(component => {
//     component()
//       .setTemplate()
//       .setTemplateUrl()
//       .setState()
//       .addMethod(() => {});
//   })
//   .addMethod(() => {});
