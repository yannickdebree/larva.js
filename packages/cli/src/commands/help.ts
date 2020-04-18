import { getPackageFile } from '../shared';
import { info } from '../kernel';

export function helpRgx() {
  return /^(help|-h|--help)$/gm;
}

export async function help(): Promise<void> {
  const packageFile = await getPackageFile();

  info(`Larva.js CLI version ${packageFile['version']} guide :

build :                             Build a Larva.js application.
create, c :                         Generate :
  - application, app [name]           - a new Larva.js application.
  - component, c [(path/)name]        - a new component for an existing Larva.js application.
  - injectable, i [(path/)name]       - a new injectable for an existing Larva.js application.
help, -h, --help                    Show Larva.js CLI guide.
serve                               Run a Larva.js application in development mode.
version, -v, --version              Display @larva.js/cli package version.
`);
}
