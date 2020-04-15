import { info } from '../../kernel';

export function applicationRgx() {
  return /^(application|app)$/gm;
}

export async function createApplication(): Promise<void> {
  info('Command to implement.');
}
