import { Node } from '../nodes';

export interface Larva<D = any> extends Node<Larva<D>, D> {
  enableTemplateInjection(value: boolean): Larva<D>;
}
