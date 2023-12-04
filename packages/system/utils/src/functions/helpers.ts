import { Devices } from "../types";

export function debounce<T extends (...args: any[]) => any>(
  execute: T,
  delay: number = 300
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      execute.apply(this, args);
      timer = null;
    }, delay);
  };
}

export function NextParent<T = HTMLElement>(element: HTMLElement) {
  if (element.parentElement) return element.parentElement;
  const root = element.getRootNode();
  if (root) return (root as any).host as T;
  return null;
}

export function CumulativeOffset(element: HTMLElement) {
  let top = 0, left = 0;
  do {
    top += element.offsetTop || 0;
    left += element.offsetLeft || 0;
    element = element.offsetParent as HTMLElement;
  } while (element);

  return {
    top: top,
    left: left
  };
};

export function ExtractSlotValue(slot: HTMLSlotElement) {
  const nodes = slot.assignedNodes();

  const values: Array<string> = [];
  nodes.forEach(node => appendLeafValue(node, values))

  return values;
}

function appendLeafValue(node: Node, L: Array<string>) {
  if (node.hasChildNodes()) {
    node.childNodes.forEach(child => appendLeafValue(child, L));
  }
  else if (node.textContent) {
    if (node.textContent.trim() === "") return;
    L.push(node.textContent);
  }
}

export function FormatNumber(num: number) {
  if (Math.abs(num) < 1_000) {
    return num.toString();
  }
  else if (Math.abs(num) < 1_000_000) {
    return Math.round((num * 10) / 1_000) / 10 + 'k';
  }
  else if (Math.abs(num) < 1_000_000_000) {
    return Math.round((num * 10) / 1_000_000) / 10 + 'm';
  }
  else if (Math.abs(num) < 1_000_000_000_000) {
    return Math.round((num * 10) / 1_000_000_000) / 10 + 'bn';
  }
  else {
    return Math.round((num * 10) / 1_000_000_000_000) / 10 + 'tn';
  }
}

export function DetectLanguage() {
  if (window.oLocalisation) {
    if (window.oLocalisation.lang) {
      return window.oLocalisation.lang;
    }
    if (window.oLocalisation.settings?.url) {
      const langmatch = window.location.pathname.match(/\/([^\/]*)\//);
      if (langmatch) {
        return langmatch[1];
      }
    }
  }

  const head_lang = document.head.getAttribute("lang");
  if (head_lang) {
    return head_lang;
  }

  const meta_lang = document.head.querySelector('meta[http-equiv="Content-Language"]')?.getAttribute("content");
  if (meta_lang) {
    return meta_lang;
  }

  const navigator_lang = navigator.language;
  if (navigator_lang) {
    return navigator_lang;
  }
}

export function SetLanguage(language?: string) {
  if (language) {
    window.oLocalisation.lang = language;
  }

  const lang = DetectLanguage();
}

export function DetectDevice(component: HTMLElement): Devices {
  if (component.classList.contains("mobile")) return "mobile";

  // do fancy checks
  // console.log(window.navigator.userAgent, window.navigator.mediaCapabilities, window.navigator.languages)

  const computed = window.getComputedStyle(component);
  const desktop = Number(computed.getPropertyValue("--breakpoint-desktop")?.replace('px', '')) || 320;
  const laptop = Number(computed.getPropertyValue("--breakpoint-laptop")?.replace('px', '')) || 768;
  const pad = Number(computed.getPropertyValue("--breakpoint-pad")?.replace('px', '')) || 1024;
  // const mobile = Number(computed.getPropertyValue("--breakpoint-mobile")?.replace('px', '')) || 1440;

  // finally do basic checks
  if (window.innerWidth > desktop) {
    return "desktop";
  }
  else if (window.innerWidth > laptop) {
    return "laptop";
  }
  else if (window.innerWidth > pad) {
    return "pad";
  }
  else {
    return "mobile";
  }
}