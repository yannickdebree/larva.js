import { info } from '../kernel';

export function buildRgx() {
  return /^build$/gm;
}

export function build(): void {
  info('build');
}
