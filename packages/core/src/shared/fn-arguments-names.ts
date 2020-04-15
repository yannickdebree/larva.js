import { isAnArrowFn } from './is-an-arrow-fn';

export function fnArgumentsNames(fn: Function): Array<string> {
  let params: string;
  if (isAnArrowFn(fn)) {
    params = fn
      .toString()
      .replace(/\s*=>\s*\(*{.*/gs, '')
      .replace(/\(|\)/gm, '')
      .replace(/\s*/gm, '');
  } else {
    params = fn
      .toString()
      .replace(/[/][/].*$/gm, '')
      .replace(/\s+/g, '')
      .replace(/[/][*][^/*]*[*][/]/g, '')
      .split('){', 1)[0]
      .replace(/^[^(]*[(]/, '')
      .replace(/=[^,]+/g, '');
  }
  return params ? params.split(',') : [];
}
