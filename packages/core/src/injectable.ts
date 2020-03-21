import { throwNewError } from './errors';

export type Properties = (...injectables: Array<Injectable>) => any;

export type Injectable = (properties?: Properties) => any;

export function createInjectable(tag: string, properties?: Properties): Injectable {
  if (typeof properties === 'function' && /^[^{]+?=>/.test(properties.toString())) {
    return throwNewError("Properties definition musn't be an arrow functions.");
  }

  return (properties: Properties) => ({
    ...(properties ? properties() : []),
    tag
  });
}
