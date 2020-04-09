export function throwNewError(message: string): void {
  throw new Error(message);
}

export function getArrowFunctionErrorMessage(): string {
  return 'Node data setting must be a closed scope function, not an arrow function.';
}
