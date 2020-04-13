export function info(message: string): void {
  console.log(message);
}

export function warn(error: any): void {
  throw new Error(error);
}

export function clear(): void {
  process.stdout.write('\x1Bc');
}
