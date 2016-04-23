// Need these otherwise the build breaks, blah

declare namespace readlineSync {
  export function keyInYNStrict(a: string): boolean;
}

declare module 'readline-sync' {
  export = readlineSync;
}

declare namespace jsBeautify {
  export function js_beautify(a: string): string;
}

declare module 'js-beautify' {
  export = jsBeautify;
}


// TODO: Figure out why none of this works
declare namespace nodeString {
  export function stringify (a: any): string;
}

declare function stringify (a: any): string;

declare module 'node-stringify' {
  export default stringify;
}
