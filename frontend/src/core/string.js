/**
 * Joins the arguments and trims the surrounding whitespace.
 */
export function classNames(...args) {
    return args.filter(s => typeof s === 'string' && s.length > 0).join(' ');
}
