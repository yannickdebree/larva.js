#!/usr/bin/env node

import { build, buildRgx, create, createRgx, help, helpRgx, serve, serveRgx, version, versionRgx } from './commands';
import { info, warn } from './kernel';

async function main(): Promise<void> {
  try {
    const command = process.argv[2];

    if (buildRgx().test(command)) {
      await build();
    } else if (createRgx().test(command)) {
      await create();
    } else if (helpRgx().test(command)) {
      await help();
    } else if (serveRgx().test(command)) {
      await serve();
    } else if (versionRgx().test(command)) {
      await version();
    } else {
      if (command) {
        info(`Unknow command : ${command}`);
      }
      await help();
    }
  } catch (err) {
    warn(err);
  }
}

main();
