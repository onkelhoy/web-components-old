import { THEMECHANGE_NAME, THEMEADD_NAME, ThemeConfig } from './types';

export function change(name: string) {
  if (!window.oTheme.map.has(name)) {
    throw new Error(`Theme: ${name} not found`);
  }

  const config = window.oTheme.map.get(name);
  if (!config) {
    throw new Error(`Theme: ${name} config not found`)
  }

  const previoustheme = document.querySelector(`link[theme]`);
  //  && previoustheme.name !== base (dont remove base theme..)
  if (previoustheme) {
    previoustheme.parentElement?.removeChild(previoustheme);
  }

  console.log('changing theme')

  if (name === "base") {
    window.oTheme.current = "base";
    window.dispatchEvent(new Event(THEMECHANGE_NAME))
    return;
  }

  const link = document.createElement("link");
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('theme', 'true');
  link.setAttribute('href', `/themes/${config.name}`);

  document.head.appendChild(link);

  window.oTheme.current = config.name;
  window.dispatchEvent(new Event(THEMECHANGE_NAME))
}

export function add(config: ThemeConfig) {
  window.oTheme.map.set(config.name, config);
  window.dispatchEvent(new Event(THEMEADD_NAME));
}

export function init() {
  if (!window.oTheme) {
    window.oTheme = {
      change,
      add,
      current: 'base',
      map: new Map()
    }
    // window.oTheme.map.set("base", {
    //   name: "base",
    //   href: "base",
    //   representColor: "#444",
    // });
  }
}
init();