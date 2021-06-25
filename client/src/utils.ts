export function unicodeFromString(string: string): number {
  let number = 0;
  for (const character of string) {
    number += character.codePointAt(0) ?? 0;
  }
  return number;
}
