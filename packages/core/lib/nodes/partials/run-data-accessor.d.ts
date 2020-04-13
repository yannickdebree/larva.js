import { DataAccessor } from '../../kernel';
import { Node } from '..';
export declare function runDataAccessor<D = any>(node: Node<D>, _dataAccessor?: DataAccessor<D>): D | any;
