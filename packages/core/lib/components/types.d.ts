import { Node } from '../nodes';
export interface Component<C = any> extends Node<C> {
    useAsWebComponent(): void;
}
