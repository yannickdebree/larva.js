export function templateBindingRgx(): RegExp {
  return /(\{{.*?\}})/gm;
}

export function bindingMarkRgx(): RegExp {
  return /(\<!--.*?\-->)/gm;
}

export function arrowFunctionRgx(): RegExp {
  return /^[^{]+?=>/gm;
}
