import React from 'react';
import { init } from '../src/';

export type Settings = {
  scope?: string;
}

export function useTranslation(settings?: Settings) {
  const [lang, setLang] = React.useState(window.papLocalization?.current?.id || "en");
  const SCOPE = settings?.scope ? settings.scope + "." : "";

  React.useEffect(() => {
    if (!window.papLocalization) {
      init();
    }

    window.papLocalization.subscribe(handletranslationchange);

    return () => {
      window.papLocalization.unsubscribe(handletranslationchange);
    }
  }, []);

  function handletranslationchange() {
    setLang(window.papLocalization?.current?.id);
  }

  const t = (key: string, args?: Record<string, string>) => {
    let value = window.papLocalization?.current?.translations[SCOPE + key] || key;

    if (args) {
      for (let argname in args) {
        const rgx = new RegExp(argname, "g");
        value = value.replace(rgx, args[argname]);
      }
    }

    return value;
  }

  return {
    t,
    lang,
  }
}
