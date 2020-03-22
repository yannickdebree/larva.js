import { throwNewError } from './errors';
import { createNode, Node, NodeData, NodePropertiesInput } from './node';

export type SnakeOptionsInput = () => SnakeOptions;

export interface SnakeOptions {
  disabledWarning: boolean;
}

export interface SnakeInstance extends Node {}

export function snake(selector: string, data?: NodeData): SnakeInstance {
  if (!window) {
    throwNewError(`Window object is unknowned.`);
  }

  const domElement: Element = window.document.querySelector(selector);

  if (!domElement) {
    throwNewError(`"${selector}" element doesn't exist in DOM.`);
  }

  const properties: NodePropertiesInput = {
    domElement,
    tag: selector,
    template: `<h1>Congratulations !</h1>
  <p>You just created a Snake.js app here.</h1>`
  };

  return createNode(properties, data);
}
