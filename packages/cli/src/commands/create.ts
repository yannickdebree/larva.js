import { info } from '../kernel';
import { checkSnakeFile } from '../shared';

export function createRgx() {
  return /^(create|c)$/gm;
}

export async function create(): Promise<void> {
  await checkSnakeFile();
  info('Command not implemented.');
}
