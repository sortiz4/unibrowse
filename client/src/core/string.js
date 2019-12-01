/**
 * Joins the arguments and trims the surrounding whitespace.
 */
export function classNames(...args) {
    return args.filter(s => typeof s === 'string' && s.length > 0).join(' ');
}

/**
 * A small collection of Unicode shortcuts.
 */
export class Unicode {
    static fromString(string) {
        let number = 0;
        for(const char of string) {
            number += char.codePointAt(0);
        }
        return number;
    }
}
