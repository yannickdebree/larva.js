import { Node } from '../node';

export interface Snake<S> extends Node<S> {
  disableTemplateInjection(): Snake<S>;
}
