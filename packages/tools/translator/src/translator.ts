import { LanguageSet, EventCallback } from '@pap-it/system-utils';
export const TRANSLATION_CHANGE_EVENTNAME = 'pap-translation-change';
export const TRANSLATION_ADDED = 'pap-translation-added';

export function load(set: LanguageSet) {
  if (!set.translations || typeof set.translations !== 'object')
    throw new Error(
      'you have to load a translation-data object<string,string>'
    );

  window.papTranslation.map.set(set.id, set); // would override
  window.papTranslation.change(set.id);
  window.dispatchEvent(new Event(TRANSLATION_ADDED));
}
export function change(lang: string) {
  const set = window.papTranslation.map.get(lang);
  if (!set)
    throw new Error(`[error] translator-load-all: Could not find language set based on lang provided - ${lang}`);

  window.papTranslation.current = set;
  window.dispatchEvent(new Event(TRANSLATION_CHANGE_EVENTNAME));
}
export function loadAll(array: LanguageSet[]) {
  try {
    array.forEach(set => window.papTranslation.map.set(set.id, set));
    window.dispatchEvent(new Event(TRANSLATION_ADDED));
  } catch (e) {
    console.error('[error] translator-load-all', e);
  }
}
export function subscribe(callback: EventCallback) {
  window.addEventListener(TRANSLATION_CHANGE_EVENTNAME, callback);
}
export function unsubscribe(callback: EventCallback) {
  window.removeEventListener(TRANSLATION_CHANGE_EVENTNAME, callback);
}
export function InitTranslations() {
  window.papTranslation = window.papTranslation || {};
  window.papTranslation.load = window.papTranslation.load || load;
  window.papTranslation.change = window.papTranslation.change || change;
  window.papTranslation.loadAll = window.papTranslation.loadAll || loadAll;
  window.papTranslation.subscribe = window.papTranslation.subscribe || subscribe;
  window.papTranslation.unsubscribe = window.papTranslation.unsubscribe || unsubscribe;
  window.papTranslation.current = window.papTranslation.current || {};
  window.papTranslation.map = window.papTranslation.map || new Map();
}