import { help } from '../help';
import { info } from '../../kernel';
import { applicationRgx, createApplication } from './application';
import { componentRgx, createComponent } from './component';
import { createInjectable, injectableRgx } from './injectable';

export function createRgx() {
  return /^(create|c)$/gm;
}

export async function create(): Promise<void> {
  const scope = process.argv[3];
  if (applicationRgx().test(scope)) {
    await createApplication();
  } else if (componentRgx().test(scope)) {
    await createComponent();
  } else if (injectableRgx().test(scope)) {
    await createInjectable();
  } else {
    info('Unknow scope.');
    await help();
  }
}
