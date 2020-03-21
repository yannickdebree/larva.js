export function throwNewError(message: string): null {
  console.error(new Error(message));
  return null;
}
