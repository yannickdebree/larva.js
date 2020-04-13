import { InjectableId } from '../injectables';
import { Dependency } from '../kernel';
import { Node } from '../nodes';
export declare function transferInjectablesToChildComponents(node: Node): void;
export declare function translateInjectables(node: Node, injectablesIds: Array<InjectableId>): Dependency[];
