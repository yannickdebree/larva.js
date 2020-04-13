import { getPackageFile, info } from '../kernel';

export function versionRgx() {
  return /^(version|-v|--version)$/gm;
}

export async function version(): Promise<void> {
  const packageFile = await getPackageFile();

  info(`Snake.js CLI version : ${packageFile['version']}`);
}
