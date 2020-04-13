import * as fs from 'fs';
import * as path from 'path';
import { warn } from './logger';

export function getPackageFile(): Promise<any> {
  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve(__dirname, '../../package.json'), 'utf8', (err: NodeJS.ErrnoException, file: string) => {
      if (err) {
        reject(err.message);
      }

      const packageFile = JSON.parse(file);

      if (packageFile) {
        resolve(packageFile);
      } else {
        reject("package.json file doesn't exists !");
      }
    });
  })
    .then(packageFile => packageFile)
    .catch(err => {
      warn(err);
    });
}
