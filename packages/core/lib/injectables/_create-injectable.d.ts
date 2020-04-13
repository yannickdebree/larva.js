import { DataAccessor } from '../kernel';
import { Injectable, InjectableId } from '../injectables';
export declare function createInjectable<I>(id: InjectableId, dataAccessor: DataAccessor<I>): Injectable<I>;
