import { info, getPackageFile } from '../kernel';

export function helpRgx() {
  return /^(help|-h|--help)$/gm;
}

export async function help(): Promise<void> {
  const packageFile = await getPackageFile();

  info(`Snake.js CLI version ${packageFile['version']} guide :

build :                         Build a Snake.js application.
create, c :                     Generate :
  - application, app              - a new Snake.js application.
  - component, c                  - a new component for an existing Snake.js application.
  - injectable, i                 - a new injectable for an existing Snake.js application.
help, -h, --help                Show Snake.js CLI guide.
serve                           Run a Snake.js application in development mode.
version, -v, --version          Display @snake.js/cli package version.
`);
}
