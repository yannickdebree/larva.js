import { warning } from '@_kernel';

export function tryAndCatchOrReturn<T>(fn: () => T): T {
  try {
    return fn();
  } catch (err) {
    warning(err);
  }
}
