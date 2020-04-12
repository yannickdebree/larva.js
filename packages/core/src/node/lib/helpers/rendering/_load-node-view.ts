import { Component } from '../../../../component';
import { snakeComponentCommonAttribute } from '../../../../kernel';
import { Node } from '../../../_types';
import { runDomElementInjection } from './_dom-elements';
import { runOutputsWatching } from './_outputs';
import { renderNode } from './_render-node';

export function loadNodeView(node: Node, nodeDomElement: Element) {
  if (!node.__property('templateInjectionUsing')) {
    (node.__property('components') as Array<Component>).forEach(function(component: Component): void {
      nodeDomElement
        .querySelectorAll(`[${snakeComponentCommonAttribute()}="${component.__property('tag')}"]`)
        .forEach(function(element: Element): void {
          component.setTemplate(element.innerHTML);

          nodeDomElement.replaceChild(window.document.createElement(`s-${component.__property('tag')}`), element);
        });
    });

    node.setTemplate(nodeDomElement.innerHTML);
  }

  nodeDomElement.innerHTML = node.__property('scriptedTemplate') as string;

  (node.__property('components') as Array<Component>).forEach(function(component: Component): void {
    nodeDomElement.querySelectorAll(`s-${component.__property('tag')}`).forEach(function(element: Element): void {
      element.outerHTML = `<div ${snakeComponentCommonAttribute()}="${component.__property(
        'tag'
      )}">${component.__property('scriptedTemplate')}</div>`;

      renderNode(component);
    });
  });

  runOutputsWatching(node, nodeDomElement);

  if (node.__property('domElementsInjectionOperationTread') > 0) {
    runDomElementInjection(node, nodeDomElement);
  }

  node.__setViewAsLoaded();
}
