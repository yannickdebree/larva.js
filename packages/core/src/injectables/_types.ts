import { DataAccessor } from '@_kernel';

export type InjectableId = string;

export interface Injectable<I = any> {
  id(): InjectableId;
  dataAccessor(): DataAccessor<I>;
  injectablesIds(): Array<InjectableId>;
}

export interface InjectableDictionnay {
  [injectableId: string]: Injectable;
}
