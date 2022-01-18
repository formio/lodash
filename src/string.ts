// From https://youmightnotneed.com/lodash/#trim
export function trim(str: string, c: string = '\\s') {
    return str.replace(new RegExp(`^([${c}]*)(.*?)([${c}]*)$`), '$2')
}

// From https://youmightnotneed.com/lodash/#endsWith
export function endsWith(str: string, c: string) {
    return str.endsWith(c);
}