import { Node } from '../nodes';

export interface Component<D = any> extends Node<Component<D>, D> {
  useAsWebComponent(): void;
}
