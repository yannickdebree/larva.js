import * as fs from 'fs';
import * as path from 'path';
import { info, kamelCase, pascalCase, userPath, warn } from '../../kernel';
import { checkSnakeFile } from '../../shared';
import { help } from '../help';

export function componentRgx() {
  return /^(component|c)$/gm;
}

export async function createComponent(): Promise<void> {
  await checkSnakeFile();
  const inputPath = `${process.argv[4]}.ts`;
  if (!inputPath) {
    info('No path/name for your component.');
    await help();
  }

  const buffer = inputPath.split('/');

  const name = buffer[buffer.length - 1].replace('.ts', '');

  const componentPath = inputPath.replace(`${name}.ts`, '');

  await new Promise((_, reject) => {
    fs.mkdir(path.resolve(userPath(), 'src', componentPath), () => {
      fs.writeFile(
        path.resolve(userPath(), 'src', inputPath),
        `import { createComponent } from '@snake.js/core';

interface ${kamelCase(name)} {}

export const ${pascalCase(name)} = createComponent<${kamelCase(name)}>('${name}', function(): ${kamelCase(name)} {
  return {};
});
`,
        err => {
          if (err) {
            reject(err);
          } else {
            info(`New component created : src/${inputPath}.`);
          }
        }
      );
    });
  }).catch(err => {
    warn(err);
  });
}
