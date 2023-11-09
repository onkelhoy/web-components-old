export type TranslationObject = Record<string, string>;
export type EventCallback = (event: Event) => void;

export interface LanguageSet {
  id: string;
  name: string;
  translations: TranslationObject;
}
export interface Translation {
  subscribe(callback: EventCallback): void;
  unsubscribe(callback: EventCallback): void;
  load(set: LanguageSet): void;
  loadAll(array: LanguageSet[]): void;
  change(lang: string): void;

  map: Map<string, LanguageSet>;
  current: LanguageSet;
}

export interface Localisation {
  settings?: {
    url?: boolean; // determines if language is set in URL like: /:lang/hello-world
  },
  lang: string;
}

declare global {
  interface Window {
    oTranslation: Translation;
    oLocalisation: Localisation;
  }
}