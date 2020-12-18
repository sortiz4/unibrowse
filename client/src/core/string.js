/**
 * A small collection of Unicode shortcuts.
 */
export class Unicode {
  static fromString(string) {
    let number = 0;
    for (const char of string) {
      number += char.codePointAt(0);
    }
    return number;
  }
}
