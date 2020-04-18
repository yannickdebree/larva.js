import { Output } from '../types';

export function output(): Output {
  return {
    emit(key: string, value: any): void {
      console.log('output : ', key, value);
    }
  };
}
