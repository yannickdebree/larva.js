export function firstLetterUppercased(term: string): string {
  return term[0].toUpperCase() + term.slice(1);
}
export function firstLetterLowercased(term: string): string {
  return term[0].toLowerCase() + term.slice(1);
}

export function kamelCase(term: string): string {
  return term
    .split('-')
    .map((s: string) => firstLetterUppercased(s))
    .join('');
}

export function pascalCase(term: string): string {
  return firstLetterLowercased(kamelCase(term));
}
