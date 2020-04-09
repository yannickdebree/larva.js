export function getArgumentsNamesOfFunction(fn: Function): Array<string> {
  return (fn.toString() + '')
    .replace(/[/][/].*$/gm, '')
    .replace(/\s+/g, '')
    .replace(/[/][*][^/*]*[*][/]/g, '')
    .split('){', 1)[0]
    .replace(/^[^(]*[(]/, '')
    .replace(/=[^,]+/g, '')
    .split(',')
    .filter(Boolean);
}

export function getTemplateBindingRegex(): RegExp {
  return /(\{{.*?\}})/gm;
}

export function getBindingMarkRegex(): RegExp {
  return /(\<!--.*?\-->)/gm;
}

export function isAnArrowFunction(fn: Function): boolean {
  return typeof fn === 'function' && /^[^{]+?=>/.test(fn.toString());
}

let fnCallLength = 0;
export function generateUid(): string {
  const uid = `${new Date().getTime().toString()}${fnCallLength}`;

  if (fnCallLength === 9) {
    fnCallLength = 0;
  } else {
    fnCallLength++;
  }

  return uid;
}

export function getSnakeComponentAttribut(): string {
  return 's-name';
}

export function runCodeBindingObject(codeToRun: string, obj: Object): any {
  Object.keys(obj).forEach(function(key: string) {
    codeToRun = codeToRun.replace(key, `this.${key}`);
  });

  const evalFn = new Function(`return ${codeToRun}`);

  return evalFn.bind(obj)();
}
