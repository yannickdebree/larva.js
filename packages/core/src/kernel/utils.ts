export function timestamp(): string {
  return `${new Date().getTime().toString()}`;
}

export function larvaComponentCommonAttribute(): string {
  return 'larva-id';
}

export function runCodeBindingObject<O>(codeToRun: string, obj: O): unknown {
  Object.keys(obj).forEach(function(key: string) {
    codeToRun = codeToRun.replace(key, `this.${key}`);
  });

  return new Function(`return ${codeToRun}`).bind(obj)();
}
