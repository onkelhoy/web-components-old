// utils 
import { html, property, debounce, context } from "@pap-it/system-utils";

// templates
import { Asset } from "@pap-it/templates-asset";

export class Routing extends Asset {

  // @property({ onUpdate: "update_url", rerender: false, context: true }) url: string = "";
  // @context({ name: "url" }) parenturl?: string;

  private html_content: string = "";

  // class functions
  constructor() {
    super({
      reactiveRendering: false,
    });
    // this.debouncedFetch = debounce(this.fetchHTML, 100);
  }

  // private functions
  // private debouncedFetch = () => { }
  // private async update_url() {
  //   this.debouncedFetch();
  // }
  private combine(url: string | null) {
    if (!url) return "";
    if (url.startsWith("/themes") || url.startsWith("themes")) return url;

    let safe_base = this.assetBase;
    if (!safe_base.endsWith('/')) safe_base += "/";

    return safe_base + (url.startsWith('/') ? url.slice(1, url.length) : url);
  }
  private async fetchHTML() {
    if (this.shadowRoot && this.url) {
      const response = await this.loadAsset(this.url);
      if (response instanceof Response) {

        const htmlstring = await response.text();
        this.shadowRoot.innerHTML = htmlstring;

        if (this.assetBase !== "/") {
          const links = this.shadowRoot.querySelectorAll('link[href]');
          const scripts = this.shadowRoot.querySelectorAll('script[src]');

          links.forEach(link => link.setAttribute('href', this.combine(link.getAttribute("href"))));
          scripts.forEach(script => script.setAttribute('src', this.combine(script.getAttribute("src"))));
        }

        const titleElement = this.shadowRoot.querySelector('title');
        if (titleElement) {
          const globalTitle = document.querySelector('title');
          if (globalTitle) globalTitle.innerHTML = titleElement.innerHTML;
        }
      }
    }
    else {
      // this.callAfterRender.push(this.debouncedFetch);
    }
  }

  // override assetBaseUpdate(value: string, old: string) {
  //   super.assetBaseUpdate(value, old);
  //   if (value !== old) this.debouncedFetch();
  // }

  render() {
    return "";
  }

  // render() {
  //   if (this.shadowRoot) {

  //     this.shadowRoot.innerHTML = this.html_content;

  //     if (this.assetBase !== "/") {
  //       const links = content.querySelectorAll('link[href]');
  //       const scripts = content.querySelectorAll('script[src]');


  //       links.forEach(link => link.setAttribute('href', this.combine(link.getAttribute("href"))));
  //       scripts.forEach(script => script.setAttribute('src', this.combine(script.getAttribute("src"))));
  //     }  

  //     return 
  //   }

  // }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-routing-tool": Routing;
  }
}