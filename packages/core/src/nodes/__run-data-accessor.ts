import { InjectableId } from '../injectables';
import { DataAccessor, throwNewError } from '../kernel';
import { Node } from '../nodes';
import { fnArgumentsNames } from '../shared';
import { translateInjectables } from './__injectables';

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
