import { BasicLanguageData, LanguageData, EventCallback, EnhancedLanguageData, debounce } from '@pap-it/system-utils';
export const TRANSLATION_CHANGE_EVENTNAME = 'pap-translation-change';
export const TRANSLATION_ADDED = 'pap-translation-added';

export function load(set: BasicLanguageData) {
  // add first 
  add(set);
  // then change 
  change(set.id);
}
function setTranslation(set: BasicLanguageData) {
  if (set.translations?.meta) {
    set.meta = set.translations.meta;
  }
  else if (!set.meta) {
    set.meta = {
      language: set.id,
      region: set.id
    }
  }

  // NOTE this would override any existing set
  window.papTranslation.map.set(set.id, set as EnhancedLanguageData);
}
export function add(set: BasicLanguageData) {
  setTranslation(set);
  window.dispatchEvent(new Event(TRANSLATION_ADDED));
}
export function addAll(array: BasicLanguageData[]) {
  array.forEach(setTranslation);
  window.dispatchEvent(new Event(TRANSLATION_ADDED));
}

export async function change(id: string) {
  let set = window.papTranslation.map.get(id);
  if (!set) {

    // check for region + language also
    for (const langset of window.papTranslation.map.values()) {
      if (langset.meta && (langset.meta.language === id || langset.meta.region === id)) {
        set = langset;
        break;
      }
    }
    if (!set) {
      console.warn(`[ERROR] could not find the provided translation ${id}`);
      window.localStorage.removeItem('pap-translation');
      return false;
    }
  }

  if (set.id === window.papTranslation.current.id) {
    return true;
  }

  if (!set.translations && set.url) {
    try {
      const res = await fetch(set.url);
      const json = await res.json();
      set.translations = json;

      setTranslation(set);
    }
    catch (e) {
      window.papTranslation.map.delete(set.id);
      window.localStorage.removeItem('pap-translation');
      console.error('[error] could not fetch translation', e)
      return false;
    }
  }

  // store old-language for ease of checking 
  let oldlanguage: undefined | string = window.papTranslation.current?.meta?.language;

  // set set to current
  window.papTranslation.current = set as LanguageData;
  window.localStorage.setItem('pap-translation', set.id);

  const newlanguage = window.papTranslation.current.meta.language;

  // use current to set head 
  document.head.setAttribute("lang", newlanguage);
  // also perform seemless update on URL (no update)

  const pathparts = window.location.pathname.split('/').filter(part => part.length > 0);

  const oldfirstpath = pathparts[0];
  if (oldfirstpath === newlanguage) {
    window.dispatchEvent(new Event(TRANSLATION_CHANGE_EVENTNAME));
    return true;
  }
  if (pathparts.length > 0) {
    if (oldlanguage === pathparts[0]) {
      pathparts[0] = newlanguage;
    }
    else if (window.papTranslation.intl) {
      const intlret = window.papTranslation.intl.of(pathparts[0]);
      if (intlret || intlret !== pathparts[0]) {
        // not 100% but pretty sure its a valid language as output for de -> German e.g.
        pathparts[0] = newlanguage;
      }
    }
  }

  // no change has occured on pathpath[0] so we can assume its ADD 
  if (oldfirstpath === pathparts[0]) {
    console.log('iunshift case', newlanguage, oldlanguage, oldfirstpath, pathparts[0])
    pathparts.unshift(newlanguage);
  }

  let newpath = '/' + pathparts.join('/');

  // FIXME hack solution as server cannot deal with non-ending / urls
  if (newpath === '/' + newlanguage) {
    newpath += '/';
  }
  history.pushState(null, '', newpath);

  window.dispatchEvent(new Event(TRANSLATION_CHANGE_EVENTNAME));
  return true;
}
export function subscribe(callback: EventCallback) {
  window.addEventListener(TRANSLATION_CHANGE_EVENTNAME, callback);
}
export function unsubscribe(callback: EventCallback) {
  window.removeEventListener(TRANSLATION_CHANGE_EVENTNAME, callback);
}
export function detect() {
  if (window.papTranslation?.current?.meta) {
    return window.papTranslation.current.meta.language;
  }

  const langmatch = window.location.pathname.match(/\/([^/]+)/);
  if (langmatch) {
    if (window.papTranslation.intl) {
      const intlret = window.papTranslation.intl.of(langmatch[1]);
      if (intlret || intlret !== langmatch[1]) {
        // not 100% but pretty sure its a valid language as output for de -> German e.g.
        return langmatch[1];
      }
    }
    else {
      return langmatch[1];
    }
  }

  const localsession = window.localStorage.getItem('pap-translation');
  if (localsession) {
    return localsession;
  }

  const head_lang = document.head.getAttribute("lang");
  if (head_lang) {
    return head_lang;
  }

  const navigator_lang = navigator.language;
  if (navigator_lang) {
    return navigator_lang;
  }
}
export function InitTranslations() {
  if (!window.papTranslation) {
    window.papTranslation = {
      load,
      change,
      add,
      addAll,
      subscribe,
      unsubscribe,
      detect: detect,
      current: {} as LanguageData,
      map: new Map(),
    };

    if ('DisplayNames' in Intl) {
      window.papTranslation.intl = window.papTranslation.intl || new Intl.DisplayNames(['en'], { type: 'language' });
    } else {
      console.warn('Intl.DisplayNames is NOT supported in this browser.');
    }

    window.addEventListener(TRANSLATION_ADDED, debounce(async () => {
      // initial check to see if its even worth to init language
      if (window.papTranslation.map.size > 0 && window.papTranslation.current?.id === undefined) {
        // get current language
        const current = window.papTranslation.detect();

        if (current) {
          let changed = await window.papTranslation.change(current);

          if (!changed) {
            for (const key of window.papTranslation.map.keys()) {
              changed = await window.papTranslation.change(key)
              if (changed) break;
            }

            if (!changed) {
              console.error('[ERROR]: could not change to any available languages');
            }
          }
        }
        else {
          console.warn('[WARN]: could not detect any target language');
        }
      }
    }, 1000));
  }
}