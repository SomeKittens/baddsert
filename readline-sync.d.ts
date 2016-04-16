// Need this otherwise the build breaks, blah

declare namespace readlineSync {
  export function keyInYN(a: string): boolean;
}

declare module 'readline-sync' {
  export = readlineSync;
}
