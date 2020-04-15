import { DataAccessor } from '../kernel';
import { fnArgumentsNames, tryAndCatchOrReturn } from '../shared';
import { Injectable, InjectableId } from './types';

export function createInjectable<D>(id: InjectableId, dataAccessor: DataAccessor<D>): Injectable<D> {
  return tryAndCatchOrReturn(function() {
    const injectablesIds = new Array<InjectableId>();

    if (dataAccessor) {
      injectablesIds.push(...fnArgumentsNames(dataAccessor));
    }

    return {
      id(): InjectableId {
        return id;
      },
      dataAccessor(): DataAccessor<D> {
        return dataAccessor;
      },
      injectablesIds(): Array<InjectableId> {
        return [...injectablesIds];
      }
    };
  });
}
