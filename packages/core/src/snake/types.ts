import { Node } from '../nodes';

export interface Snake<D = any> extends Node<Snake<D>, D> {
  enableTemplateInjection(value: boolean): Snake<D>;
}
