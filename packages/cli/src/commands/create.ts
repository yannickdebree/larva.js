import { info } from '../kernel';

export function createRgx() {
  return /^(create|c)$/gm;
}

export function create(): void {
  info('create');
}
