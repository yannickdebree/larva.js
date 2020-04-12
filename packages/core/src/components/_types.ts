import { Node } from '@_nodes';

export interface Component<C = any> extends Node<C> {
  useAsWebComponent(): void;
}
