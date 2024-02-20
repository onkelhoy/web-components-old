import { property, html, Size } from '@pap-it/system-utils';
import { Asset } from '@pap-it/templates-asset';

import { style } from './style.js';
import { ContainerTypes } from './types.js';

const CountryEmojiSet: Record<string, string> = {
  A: "🇦", B: "🇧", C: "🇨",
  D: "🇩", E: "🇪", F: "🇫",
  G: "🇬", H: "🇭", I: "🇮",
  J: "🇯", K: "🇰", L: "🇱",
  M: "🇲", N: "🇳", O: "🇴",
  P: "🇵", Q: "🇶", R: "🇷",
  S: "🇸", T: "🇹", U: "🇺",
  V: "🇻", W: "🇼", X: "🇽",
  Y: "🇾", Z: "🇿",
}

export class Icon extends Asset {
  static style = style;

  private content: string = "";
  private svgElement!: SVGSVGElement;
  private flag?: string;

  @property({ rerender: false }) container?: ContainerTypes;
  @property({ onUpdate: "updateName", rerender: false }) name?: string;
  @property({ onUpdate: "updateColor", rerender: false }) color?: string;
  @property({ onUpdate: "updateSize", rerender: false }) size: Size = "medium";
  @property({ onUpdate: "updateCustomSize", rerender: false, type: Number, attribute: "custom-size" }) customSize?: number;
  @property({ onUpdate: "updateCountryFlag", rerender: false, attribute: 'country-flag' }) countryFlag?: string;

  // class functions
  constructor() {
    super();

    this.render_mode = "greedy";
    this.assetBase = "/icons";
  }
  public firstUpdate() {
    if (this.flag) return;
    if (this.shadowRoot) {
      const element = this.shadowRoot.querySelector<SVGSVGElement>("svg");
      if (element === null) throw new Error('Could not find svg element');
      this.svgElement = element;

      if (this.content) {
        this.setSVG();
      }
    }
  }

  // update functions
  private async updateName(): Promise<void> {
    if (this.flag) return;
    if (this.name === "") return;

    const file = `${this.name}.svg`;
    try {
      const response = await this.loadAsset(file);

      if (response) {
        let content, viewbox = "0 96 960 960"; // default google icon's
        if (typeof response === "string") {
          content = response;
        }
        else {
          content = await response.text();
          const [parsed_content, parsed_viewbox] = this.extractSvgContent(content);

          if (parsed_viewbox) {
            viewbox = parsed_viewbox;
          }
          if (parsed_content) {
            content = `SVG:${viewbox}##${parsed_content.trim()}`;
            this.cacheData(file, content);
          }
        }


        if (content.startsWith("SVG:")) {
          this.setAttribute('data-hide-slot', 'true');
          this.content = content;
          if (this.getAttribute("show")) console.log(content)
          this.setSVG();
        }
        else {
          this.setAttribute('data-hide-slot', 'false');
        }
      }
      else {
        this.setAttribute('data-hide-slot', 'false');
      }
    }
    catch {
      console.log('im hidden')
      this.setAttribute('data-hide-slot', 'false');
    }
  }
  private updateColor() {
    if (this.color) this.style.color = this.color;
  }
  private updateSize() {
    this.style.removeProperty("--icon-custom-size");
  }
  private updateCustomSize() {
    if (this.customSize !== undefined) this.style.setProperty("--icon-custom-size", this.customSize + "px");
  }
  private updateCountryFlag() {
    try {
      if (this.countryFlag) {
        let text = this.countryFlag;
        if (text.toLowerCase() === 'en') text = 'gb';

        this.flag = text
          .toUpperCase()
          .split('')
          .map(v => {
            if (CountryEmojiSet[v]) return CountryEmojiSet[v];
            throw new Error('please provide valid country-region code: ' + this.countryFlag);
          })
          .join('');
        this.debouncedRequestUpdate();
      }
    }
    catch (e: any) {
      console.error(e.message);
    }
  }

  // helper functions
  private extractSvgContent(svgString: string) {
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');
    const svgElement = svgDoc.querySelector('svg');
    if (svgElement) {
      return [svgElement.innerHTML, svgElement.getAttribute("viewBox")];
    }
    return ["", ""];
  }
  private setSVG() {
    if (this.svgElement) {

      const parsed = /SVG:(.*)##/.exec(this.content);
      if (parsed) {
        const content = this.content.split(parsed[1])[1];
        this.svgElement.setAttribute('viewBox', parsed[1]);
        if (this.getAttribute("show")) console.log(this.content, parsed, content)
        this.svgElement.innerHTML = content;
      }
    }
  }

  render() {
    if (this.flag) {
      return this.flag;
    }

    return html`
      <slot part="fallback"></slot>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 96 960 960"
        part="svg"
      >
        ${this.content}
      </svg>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-icon": Icon;
  }
}