import { ThemeConfig } from '@pap-it/system-utils';
import { THEMECHANGE_NAME, THEMEADD_NAME } from './types';

export function change(name: string) {
  if (!window.papTheme.map.has(name)) {
    throw new Error(`Theme: ${name} not found`);
  }

  if (window.papTheme.current === name) return;

  const config = window.papTheme.map.get(name);
  if (!config) {
    throw new Error(`Theme: ${name} config not found`)
  }

  const previoustheme = document.querySelector(`link[theme]`);
  //  && previoustheme.name !== base (dont remove base theme..)
  if (previoustheme) {
    previoustheme.parentElement?.removeChild(previoustheme);
  }

  if (name === "base") {
    window.papTheme.current = "base";
    window.dispatchEvent(new Event(THEMECHANGE_NAME))
    return;
  }

  const link = document.createElement("link");
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('theme', 'true');
  link.setAttribute('href', `/themes/${config.name}`);

  document.head.appendChild(link);

  window.papTheme.current = config.name;
  window.dispatchEvent(new Event(THEMECHANGE_NAME))
}

export function add(config: ThemeConfig) {
  window.papTheme.map.set(config.name, config);
  window.dispatchEvent(new Event(THEMEADD_NAME));
}

export function init() {
  if (!window.papTheme) {
    window.papTheme = {
      change,
      add,
      current: 'base',
      map: new Map()
    }
  }
}
init();