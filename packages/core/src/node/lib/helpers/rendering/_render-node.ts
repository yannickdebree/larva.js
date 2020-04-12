import { snakeComponentCommonAttribute, throwNewError } from '../../../../kernel';
import { Node } from '../../../_types';
import { injectContentsToBindedDomElements } from './_dom-elements';
import { loadNodeView } from './_load-node-view';

export function renderNode<T>(_node: Node<T>): void {
  const node = { ..._node };

  let nodeDomElement = node.__property('domElement') as Element;

  if (!nodeDomElement) {
    nodeDomElement = window.document.querySelector(`[${snakeComponentCommonAttribute()}=${node.__property('tag')}]`);
  }

  if (!nodeDomElement) {
    throwNewError(`'${node.__property('tag')}' component is unknowned for the DOM.`);
  }

  if (!node.__property('isViewLoaded')) {
    loadNodeView(node, nodeDomElement);
  }

  injectContentsToBindedDomElements(node);
}