import { arrowFnErrorMessage, arrowFunctionRgx, throwNewError, timestamp, warning } from './kernel';

export function isAnArrowFn(fn: Function): boolean {
  return typeof fn === 'function' && arrowFunctionRgx().test(fn.toString());
}

export function tryAndCatchOrReturn<T>(fn: () => T): T {
  try {
    if (isAnArrowFn(fn)) {
      throwNewError(arrowFnErrorMessage());
    }
    return fn();
  } catch (err) {
    warning(err);
  }
}

export function uniqueId(): string {
  return `${timestamp()}${Math.floor(Math.random() * 10000)}`;
}
