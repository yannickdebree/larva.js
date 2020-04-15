import { getPackageFile } from '../shared';
import { info } from '../kernel';

export function helpRgx() {
  return /^(help|-h|--help)$/gm;
}

export async function help(): Promise<void> {
  const packageFile = await getPackageFile();

  info(`Snake.js CLI version ${packageFile['version']} guide :

build :                             Build a Snake.js application.
create, c :                         Generate :
  - application, app [name]           - a new Snake.js application.
  - component, c [(path/)name]        - a new component for an existing Snake.js application.
  - injectable, i [(path/)name]       - a new injectable for an existing Snake.js application.
help, -h, --help                    Show Snake.js CLI guide.
serve                               Run a Snake.js application in development mode.
version, -v, --version              Display @snake.js/cli package version.
`);
}
