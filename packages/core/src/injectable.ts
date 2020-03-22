import { throwNewError } from './errors';
import { getArgumentsNamesOfFunction } from './helpers';
import { NodeData } from './node';

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
  if (typeof data === 'function' && /^[^{]+?=>/.test(data.toString())) {
    throwNewError('Node data setting must be a closed scope function, not an arrow function.');
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
