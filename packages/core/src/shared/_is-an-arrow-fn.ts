import { arrowFunctionRgx } from '../kernel';

export function isAnArrowFn(fn: Function): boolean {
  return typeof fn === 'function' && arrowFunctionRgx().test(fn.toString());
}
