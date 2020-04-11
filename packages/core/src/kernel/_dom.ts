export function findCommentMarkedByUid(uid: string, element: ChildNode): ChildNode {
  const childNodesLength = element.childNodes.length;

  for (let i = 0; i < childNodesLength; ++i) {
    const childNode = element.childNodes[i];

    if (childNode.nodeType === 8 && childNode.nodeValue === uid) {
      return childNode;
    } else {
      const node = findCommentMarkedByUid(uid, childNode);

      if (node) {
        return node;
      }
    }
  }
}
