import { snakeComponentCommonAttribute, throwNewError } from '../../kernel';
import { Node } from '../types';
import { injectContentsToBindedDomElements } from './dom-elements';
import { loadNodeView } from './load-node-view';

export function renderNode(_node: Node): void {
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
