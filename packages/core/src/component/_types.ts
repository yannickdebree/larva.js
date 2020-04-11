import { Node } from '../node';

export interface Component<C = any> extends Node<C> {
  useAsWebComponent(): void;
}
