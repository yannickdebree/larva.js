import { Input } from '../types';

export function input(): Input {
  return {
    get(key: string): any {
      console.log('key : ', key);
      return 'input';
    }
  };
}
