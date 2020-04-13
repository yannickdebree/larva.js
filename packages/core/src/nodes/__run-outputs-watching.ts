import { EventTypes, runCodeBindingObject, throwNewError } from '../kernel';
import { Node } from '../nodes';

export function runOutputsWatching(node: Node, nodeDomElement: Element): void {
  Object.keys(EventTypes).forEach(function(eventType: string): void {
    const eventAttribute = `s-on-${eventType}`;

    nodeDomElement.querySelectorAll(`[${eventAttribute}]`).forEach(function(element: Element): void {
      const attributeValue = element.attributes.getNamedItem(eventAttribute).value;

      element.addEventListener(eventType, function(event: Event): void {
        if (attributeValue.match(/(\(.*\))/gm)) {
          let propertyName = attributeValue.replace(/(\(.*?\))/gm, '');

          if (node.__data().hasOwnProperty(propertyName) && typeof node.__data()[propertyName] === 'function') {
            const propertyParams = attributeValue
              .replace(/^([a-z]|[A-Z])*\(|\)/gm, '')
              .split(',')
              .map(function(param: string) {
                return param.replace(/\s/g, '');
              });

            const params = [];

            propertyParams.forEach(function(property: string): void {
              if (property === '$event') {
                params.push(event);
              } else {
                if (node.__data().hasOwnProperty(property)) {
                  params.push(node.__data()[property]);
                } else {
                  throwNewError(`"${property}" is not a property of component "${node.__property('tag')}".`);
                }
              }
            });

            node.__data()[propertyName](...params);
          } else {
            throwNewError(`"${propertyName}" method is not callable on component "${node.__property('tag')}".`);
          }
        } else {
          runCodeBindingObject(attributeValue, node.__data());
        }
      });
      element.attributes.removeNamedItem(eventAttribute);
    });
  });
}
