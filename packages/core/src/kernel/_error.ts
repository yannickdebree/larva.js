export function throwNewError(message: string): void {
  throw new Error(message);
}

export function arrowFnErrorMessage(): string {
  return 'Function in params must be a closed scope function, not an arrow function.';
}
