import { throwNewError } from './errors';
import { Injectable } from './injectable';
import { createNode, Node, NodePropertiesInput } from './node';
import { Data } from './shared';

interface SnakeInstance extends Node {
  registerInjectables(...injectables: Array<Injectable>): void;
}

export function snake(tag: string, data?: (...dependencies: Array<any>) => Data): SnakeInstance {
  if (!window) {
    return throwNewError(`Window object is unknowned.`);
  }

  const domElement: Element = window.document.querySelector(tag);

  if (!domElement) {
    return throwNewError(`"${tag}" element does't exist.`);
  }

  const properties: NodePropertiesInput = {
    domElement,
    id: tag,
    template: `<h1>Congratulations !</h1>
  <p>You just created a Snake.js app here.</h1>`
  };

  return {
    ...createNode(properties, data),
    registerInjectables(...injectables: Array<Injectable>) {
      console.log(injectables);
      return this;
    }
  };
}
