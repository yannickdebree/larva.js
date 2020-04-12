import { bindingMarkRgx, findCommentMarkedByUid, runCodeBindingObject } from '../../../../kernel';
import { Node } from '../../../_types';

export function runDomElementInjection(node: Node, nodeDomElement: Element): void {
  const markedBindedPoints = (node.__property('scriptedTemplate') as string).match(bindingMarkRgx()) || [];

  markedBindedPoints.forEach(function(markedBindedPoint: string) {
    const uid = markedBindedPoint.replace(/(<!--|-->)/gm, '');

    const comment = findCommentMarkedByUid(uid, nodeDomElement);

    const commentParent = comment.parentNode;

    commentParent.replaceChild(node.__property('bindedDomElements')[uid], comment);

    node.__closeOneDomElementsInjectionOperation();
  });
}

export function injectContentsToBindedDomElements(node: Node): void {
  Object.keys(node.__property('bindedDomElements')).forEach(function(uid: string) {
    node.__injectContentToBindedDomElement(
      runCodeBindingObject(node.__property('scriptedData')[uid], node.__data()) as string,
      uid
    );
  });
}
