// utils 
import { html, property, debounce, context, NextParent } from "@pap-it/system-utils";

// templates
import { Asset } from "@pap-it/templates-asset";

export class Routing extends Asset {

  @property({
    rerender: false,
    context: true,
    after: function (this: Routing) {
      this.debouncedFetch();
    }
  }) url: string = "";
  // @context({ name: "url" }) parenturl?: string;

  private outsidedom?: HTMLDivElement;

  // class functions
  constructor() {
    super({
      reactiveRendering: false,
      // noshadow: true,
    });
    this.debouncedFetch = debounce(this.fetchHTML, 100);
    this.loadwindow = debounce(this.loadwindow);
    this.assetBase = "/";
  }
  connectedCallback(): void {
    super.connectedCallback();
  }
  firstRender(): void {
    super.firstRender();
    const parent = NextParent(this);
    if (parent) {
      this.outsidedom = document.createElement("div");
      parent.appendChild(this.outsidedom);
      this.debouncedFetch();
    }
  }

  override updateAssetBase() {
    super.updateAssetBase();
    this.debouncedFetch();

    console.log('helo?')
  }

  // private functions
  private debouncedFetch = () => { }
  private appendlink = (link: HTMLLinkElement) => {
    const parent = link.parentNode;
    if (parent) {
      const clone = link.cloneNode() as HTMLLinkElement;
      clone.setAttribute("href", this.combine(link.getAttribute("href")));
      parent.insertBefore(clone, link);
    }
  }
  private appendScript = (oldScript: HTMLScriptElement) => {
    const parent = oldScript.parentNode;
    if (parent) {
      // Create a new script element
      const script = document.createElement('script');

      // Copy all attributes from the old script to the new script
      Array.from(oldScript.attributes).forEach(attr => {
        script.setAttribute(attr.name, attr.value);
      });

      // If the script has inline content, copy it over
      if (!oldScript.src) {
        script.textContent = oldScript.textContent;
      } else {
        // Update the src to ensure the script is loaded and executed
        script.setAttribute("src", this.combine(oldScript.getAttribute("src")));
      }

      // Remove the old script and add the new script
      parent.removeChild(oldScript);
      parent.appendChild(script);
    }
  }
  private combine(url: string | null) {
    if (!url) return "";
    if (url.startsWith("/themes") || url.startsWith("themes")) return url;

    let safe_base = this.assetBase;
    if (!safe_base.endsWith('/')) safe_base += "/";

    return safe_base + (url.startsWith('/') ? url.slice(1, url.length) : url);
  }
  private async fetchHTML() {
    if (this.outsidedom && this.url) {
      const response = await this.loadAsset(this.url);
      if (response instanceof Response) {

        const htmlstring = await response.text();
        this.outsidedom.innerHTML = htmlstring;

        const links = this.outsidedom.querySelectorAll<HTMLLinkElement>('link[href]');
        const scripts = this.outsidedom.querySelectorAll<HTMLScriptElement>('script[src]');
        links.forEach(this.appendlink);
        scripts.forEach(this.appendScript);

        this.loadwindow();

        const titleElement = this.outsidedom.querySelector('title');
        if (titleElement) {
          const globalTitle = document.querySelector('title');
          if (globalTitle) globalTitle.innerHTML = titleElement.innerHTML;
        }
      }
      return
    }

    // this.callAfterRender.push(this.debouncedFetch);
  }
  private loadwindow() {
    if (window.onload instanceof Function) {
      window.onload(new Event("load"));
    }
  }


  render() {
    return "";
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-routing": Routing;
  }
}