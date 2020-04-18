import { info } from '../kernel';
import { getPackageFile } from '../shared';

export function versionRgx() {
  return /^(version|-v|--version)$/gm;
}

export async function version(): Promise<void> {
  const packageFile = await getPackageFile();
  info(`Larva.js CLI version : ${packageFile['version']}`);
}
