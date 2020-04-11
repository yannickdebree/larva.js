import { Component } from '../../component';
import {
  bindingMarkRgx,
  EventTypes,
  findCommentMarkedByUid,
  runCodeBindingObject,
  snakeComponentCommonAttribute,
  throwNewError
} from '../../kernel';
import { Node } from '../_types';

export function renderNode<T>(_node: Node<T>): void {
  const node = { ..._node };

  let nodeDomElement = node.__property('domElement') as Element;

  if (!nodeDomElement) {
    nodeDomElement = window.document.querySelector(`[${snakeComponentCommonAttribute()}=${node.__property('tag')}]`);
  }

  if (!nodeDomElement) {
    throwNewError(`'${node.__property('tag')}' component is unknowned for the DOM.`);
  }

  const nodeData: T = node.__data();

  if (!node.__property('isViewLoaded')) {
    nodeDomElement.innerHTML = node.__property('scriptedTemplate') as string;

    (node.__property('components') as Array<Component>).forEach(function(component: Component): void {
      nodeDomElement.querySelectorAll(`s-${component.__property('tag')}`).forEach(function(element: Element): void {
        element.outerHTML = `<div ${snakeComponentCommonAttribute()}="${component.__property(
          'tag'
        )}">${component.__property('scriptedTemplate')}</div>`;

        renderNode(component);
      });
    });

    Object.keys(EventTypes).forEach(function(eventType: string): void {
      const eventAttribute = `s-on-${eventType}`;

      nodeDomElement.querySelectorAll(`[${eventAttribute}]`).forEach(function(element: Element): void {
        const attributeValue = element.attributes.getNamedItem(eventAttribute).value;

        element.addEventListener(eventType, function(event: Event): void {
          if (attributeValue.match(/(\(.*\))/gm)) {
            let propertyName = attributeValue.replace(/(\(.*?\))/gm, '');

            if (nodeData.hasOwnProperty(propertyName) && typeof nodeData[propertyName] === 'function') {
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
                  if (nodeData.hasOwnProperty(property)) {
                    params.push(nodeData[property]);
                  } else {
                    throwNewError(`"${property}" is not a property of component "${node.__property('tag')}".`);
                  }
                }
              });

              nodeData[propertyName](...params);
            } else {
              throwNewError(`"${propertyName}" method is not callable on component "${node.__property('tag')}".`);
            }
          } else {
            runCodeBindingObject(attributeValue, nodeData);
          }
        });

        element.attributes.removeNamedItem(eventAttribute);
      });
    });

    node.__setViewAsLoaded();

    if (node.__property('domElementsInjectionOperationTread') > 0) {
      const markedBindedPoints = (node.__property('scriptedTemplate') as string).match(bindingMarkRgx()) || [];

      markedBindedPoints.forEach(function(markedBindedPoint: string) {
        const uid = markedBindedPoint.replace(/(<!--|-->)/gm, '');

        const comment = findCommentMarkedByUid(uid, nodeDomElement);

        const commentParent = comment.parentNode;

        commentParent.replaceChild(node.__property('bindedDomElements')[uid], comment);

        node.__closeOneDomElementsInjectionOperation();
      });
    }
  }

  Object.keys(node.__property('bindedDomElements')).forEach(function(uid: string) {
    node.__injectContentToBindedDomElement(
      runCodeBindingObject(node.__property('scriptedData')[uid], nodeData) as string,
      uid
    );
  });
}
