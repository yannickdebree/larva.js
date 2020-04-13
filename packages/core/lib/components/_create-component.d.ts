import { DataAccessor } from '../kernel';
import { Component } from './_types';
export declare function createComponent<C>(tag: string, dataAccessor?: DataAccessor<C>): Component<C>;
