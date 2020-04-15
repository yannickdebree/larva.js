import { Node } from '../nodes';

export interface Component<D = any> extends Node<Component, D> {
  useAsWebComponent(): void;
}
