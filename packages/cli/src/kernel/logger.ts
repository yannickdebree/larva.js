export function info(message: string): void {
  console.log(message);
}

export function warn(message: string): void {
  throw new Error(message);
}

export function clear(): void {
  console.clear();
}
