import { Node } from '@_nodes';

export interface Snake<S> extends Node<S> {
  enableTemplateInjection(): Snake<S>;
}
