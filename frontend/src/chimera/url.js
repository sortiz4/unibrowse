/**
 * Joins the arguments without duplicate slashes.
 */
export function join(...args) {
    let duplicates = /\/{2,}/g;
    let protocol = /:\//;
    let result = args.join('/').trim();
    result = result.replace(duplicates, '/');
    result = result.replace(protocol, '://');
    return result + '/';
}
