import { isAnArrowFn } from '../shared';

export function timestamp(): string {
  return `${new Date().getTime().toString()}`;
}

export function snakeComponentCommonAttribute(): string {
  return 'snake-id';
}

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
  if (params !== '') {
    return params.split(',');
  } else {
    return [];
  }
}

export function runCodeBindingObject<O>(codeToRun: string, obj: O): unknown {
  Object.keys(obj).forEach(function(key: string) {
    codeToRun = codeToRun.replace(key, `this.${key}`);
  });

  return new Function(`return ${codeToRun}`).bind(obj)();
}
