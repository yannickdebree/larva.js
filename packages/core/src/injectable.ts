import { getArrowFunctionErrorMessage, throwNewError } from './errors';
import { NodeData } from './node';
import { getArgumentsNamesOfFunction, isAnArrowFunction } from './utils';

export type Dependency = {
  [key: string]: any;
};

export type InjectableId = string;

export interface Injectable {
  getId(): string;
  getData(): NodeData;
  getInjectablesIds(): Array<InjectableId>;
}

export interface InjectorDictionnay {
  [key: string]: Injectable;
}

export function createInjectable(id: InjectableId, data: NodeData): Injectable {
  if (data && isAnArrowFunction(data)) {
    throwNewError(getArrowFunctionErrorMessage());
  }

  const injectablesIds = new Array<InjectableId>();

  if (data) {
    injectablesIds.push(...getArgumentsNamesOfFunction(data));
  }

  return {
    getId(): string {
      return id;
    },
    getData(): NodeData {
      return data;
    },
    getInjectablesIds(): Array<InjectableId> {
      return injectablesIds;
    }
  };
}
