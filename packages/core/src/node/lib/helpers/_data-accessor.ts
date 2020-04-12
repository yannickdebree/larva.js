import { InjectableId } from '../../../injectable';
import { DataAccessor, fnArgumentsNames, throwNewError } from '../../../kernel';
import { Node } from '../../_types';
import { translateInjectables } from './_injectables';

export function runDataAccessor<D = any>(node: Node<D>, _dataAccessor?: DataAccessor<D>): D | any {
  if (_dataAccessor) {
    const injectablesIds: Array<InjectableId> = fnArgumentsNames(_dataAccessor);

    const computedData: D = _dataAccessor(...translateInjectables(node, injectablesIds));

    if (!computedData) {
      throwNewError('Node data setting must always return an object.');
    }

    return computedData;
  } else {
    return {};
  }
}
