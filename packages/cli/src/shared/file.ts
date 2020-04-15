import * as fs from 'fs';
import * as path from 'path';
import { userPath, warn, info } from '../kernel';

export async function checkSnakeFile(): Promise<void> {
  if (!(await getSnakeFile())) {
    info('Error: "serve" command must be runned on a Snake.js project repository.');
    process.exit();
  }
}

export async function getSnakeFile(): Promise<string> {
  return await getFile(path.resolve(userPath(), './snake'));
}

export async function getPackageFile(): Promise<any> {
  const packageFile = await getFile(path.resolve(__dirname, '../../package.json'));
  if (packageFile) {
    return JSON.parse(packageFile);
  } else {
    warn("package.json file doesn't exists !");
  }
}

export async function getFile(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err: NodeJS.ErrnoException, file: string) => {
      if (err) {
        reject();
      }
      resolve(file);
    });
  })
    .then((packageFile: string) => packageFile)
    .catch(() => null);
}
