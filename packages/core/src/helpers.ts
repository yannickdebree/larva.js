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
