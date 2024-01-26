import { LanguageSet, EventCallback } from '@pap-it/system-utils';
export const TRANSLATION_CHANGE_EVENTNAME = 'pap-translation-change';
export const TRANSLATION_ADDED = 'pap-translation-added';

export function load(set: LanguageSet) {
  // add first 
  add(set);
  // then change 
  change(set.id);
}
export function add(set: LanguageSet) {
  // NOTE this would override any existing set
  window.papTranslation.map.set(set.id, set);
  window.dispatchEvent(new Event(TRANSLATION_ADDED));
}
export async function change(lang: string) {
  let set = window.papTranslation.map.get(lang);

  // maybe its by its name 
  if (!set) {
    const keys = window.papTranslation.map.keys();
    for (let id of keys) {
      const tset = window.papTranslation.map.get(id);
      if (tset && tset.name === lang) {
        set = tset;
        break;
      }
    }

    if (!set) {
      throw new Error(`[error] could not find the provided translation ${lang}`);
    }
  }

  try {
    if (!set.translations && set.url) {
      const res = await fetch(set.url);
      const json = await res.json();

      set.translations = json;
      window.papTranslation.map.set(set.id, set);
    }

    window.papTranslation.current = set;
    window.dispatchEvent(new Event(TRANSLATION_CHANGE_EVENTNAME));
  }
  catch (e) {
    window.papTranslation.map.delete(set.id);
    throw new Error('[error] could not fetch translation');
  }
}
export function addAll(array: LanguageSet[]) {
  array.forEach(add);
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
  window.papTranslation.add = window.papTranslation.add || add;
  window.papTranslation.addAll = window.papTranslation.addAll || addAll;
  window.papTranslation.subscribe = window.papTranslation.subscribe || subscribe;
  window.papTranslation.unsubscribe = window.papTranslation.unsubscribe || unsubscribe;
  window.papTranslation.current = window.papTranslation.current || {};
  window.papTranslation.map = window.papTranslation.map || new Map();
}