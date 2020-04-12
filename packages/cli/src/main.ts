import { echoHelp } from './help';
import { echoVersion } from './version';
import { Command } from './_types';

function main(): void {
  switch (process.argv[2]) {
    case Command.v:
    case Command.version:
      echoVersion();
      break;
    case Command.h:
    case Command.help:
    default:
      echoHelp();
      break;
  }
}

main();
