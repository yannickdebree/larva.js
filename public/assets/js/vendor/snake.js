function snake(rootElementSelector, developerOptions) {
  const defaultOptions = {
    templateInjectionMode: true
  };

  const options = { ...defaultOptions, ...developerOptions };

  let rootElement = window.document.querySelector(rootElementSelector);

  if (!rootElement) {
    console.error(
      new Error(`'${rootElementSelector}' element is unknow in the DOM.`)
    );
    return null;
  }

  let defaultTemplate = `
  <h1>Congratulations !</h1>
  <p>You just created a Snake.js app here.</h1>
  `;

  const templateEvents = [
    {
      name: "click",
      subscribers: new Array()
    }
  ];

  if (options.templateInjectionMode) {
    rootElement.innerHTML = defaultTemplate;
  }

  let snake = {
    getRootElement: function(cb) {
      cb(rootElement);
      return this;
    },
    getOptions: function(cb) {
      cb(options);
      return this;
    },
    setTemplateUrl: async function(url, cb) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", e => {
          if (e.target.readyState == 4) {
            if (e.target.status == 200) {
              this.setTemplate(e.target.responseText);
              resolve(this);
            } else {
              const errorMessage = `The HTML template at '${url}' cannot be loaded.`;
              this.setTemplate(errorMessage);
              reject(errorMessage);
            }
          }
        });
        xhr.open("GET", url, true);
        xhr.send();
      })
        .then(o => {
          cb(o);
          return o;
        })
        .catch(err => {
          console.error(new Error(err));
          return null;
        });
    },
    setTemplate: function(...templateLines) {
      if (!options.templateInjectionMode) {
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
    on: function(name, cb) {
      templateEvents.forEach(templateEvent => {
        templateEvent.subscribers.forEach(subscriber => {
          if (subscriber.name === name) {
            subscriber.callbacks.push(cb);
          }
        });
      });
      return this;
    }
  };

  return snake;
}
