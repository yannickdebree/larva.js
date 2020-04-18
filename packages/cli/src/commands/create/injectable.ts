import * as fs from 'fs';
import * as path from 'path';
import { info, kamelCase, pascalCase, userPath, warn } from '../../kernel';
import { checkLarvaFile } from '../../shared';
import { help } from '../help';

export function injectableRgx() {
  return /^(injectable|i)$/gm;
}

export async function createInjectable(): Promise<void> {
  await checkLarvaFile();
  const inputPath = `${process.argv[4]}.ts`;
  if (!inputPath) {
    info('No path/name for your injectable.');
    await help();
  }

  const buffer = inputPath.split('/');

  const name = buffer[buffer.length - 1].replace('.ts', '');

  const injectablePath = inputPath.replace(`${name}.ts`, '');

  const injectableInterface = `${kamelCase(name)}Injectable`;

  await new Promise((_, reject) => {
    fs.mkdir(path.resolve(userPath(), 'src', injectablePath), () => {
      fs.writeFile(
        path.resolve(userPath(), 'src', inputPath),
        `import { createInjectable } from '@larva.js/core';

interface ${injectableInterface} {}

export const ${pascalCase(
          name
        )} = createInjectable<${injectableInterface}>('${name}', function(): ${injectableInterface} {
  return {};
});
`,
        err => {
          if (err) {
            reject(err);
          } else {
            info(`New injectable created : src/${inputPath}.`);
          }
        }
      );
    });
  }).catch(err => {
    warn(err);
  });
}
