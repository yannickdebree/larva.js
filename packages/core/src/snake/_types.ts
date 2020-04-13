import { Node } from '../nodes';

export interface Snake<S> extends Node<S> {
  enableTemplateInjection(): Snake<S>;
}
