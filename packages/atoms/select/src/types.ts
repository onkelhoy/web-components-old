export type SearchType = "additive" | "static";
export type SearchEvent = {
  regexp: RegExp;
  value: undefined | string;
}

export * from './components/option/types';