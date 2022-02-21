export type DeepPartial<T> = T extends Function
  ? T
  : T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

export interface Options {
    whitelistedPatterns: (string | RegExp)[];
    messages: {
      wrongFormat: string;
      notWhitelisted: string;
      imageFetchError: string;
    };
    fallbackUrl: string;
  }
  