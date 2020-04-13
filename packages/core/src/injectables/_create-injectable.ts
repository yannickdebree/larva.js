import { DataAccessor } from '../kernel';
import { fnArgumentsNames, tryAndCatchOrReturn } from '../shared';
import { Injectable, InjectableId } from '../injectables';

export function createInjectable<I>(id: InjectableId, dataAccessor: DataAccessor<I>): Injectable<I> {
  return tryAndCatchOrReturn(function() {
    const injectablesIds = new Array<InjectableId>();

    if (dataAccessor) {
      injectablesIds.push(...fnArgumentsNames(dataAccessor));
    }

    return {
      id(): InjectableId {
        return id;
      },
      dataAccessor(): DataAccessor<I> {
        return dataAccessor;
      },
      injectablesIds(): Array<InjectableId> {
        return [...injectablesIds];
      }
    };
  });
}
