// Need this otherwise the build breaks, blah

declare namespace readlineSync {
  export function keyInYN(a: string): boolean;
}

declare module 'readline-sync' {
  export = readlineSync;
}


// TODO: Figure out why none of this works
declare namespace nodeString {
  export function stringify (a: any): string;
}

declare function stringify (a: any): string;

declare module 'node-stringify' {
  export default stringify;
}
