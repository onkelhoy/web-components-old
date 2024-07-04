# Icon

Atomic Type: atoms

Version: 1.0.0

## Development

Development takes place within the `src` folder. To add a new subcomponent, use the command `npm run component:add`. This command updates the `.env` file, creates a view folder, and adds a subfolder in the `components` folder (creating it if it doesn't exist) inside `src` with all the necessary files.

Styling is managed in the `style.scss` file, which automatically generates a `style.ts` file for use in the component.

## Viewing

To view the component, run `npm start`. This command is equivalent to `npm run start demo` and launches the development server for the demo folder located within the `views` folder. This allows you to preview your component during development.

## Assets

All assets required by the component, such as icons and images for translations, should be placed in the `assets` folder. This folder will already include an `icons` and `translations` folder with an `en.json` file for English translations. Use this structure to organize translations and make them easily accessible for other projects.

For assets used solely for display or demo purposes, create a `public` folder under the relevant directory inside the `views` folder. These assets are not included in the component package.

## Commands

- **build**: Builds the component in development mode. Use the `--prod` flag (`npm run build -- --prod`) for a production build, which includes minification.
- **watch**: Watches for changes to the component files and rebuilds them automatically without starting the development server.
- **start**: Starts the development server for a specific demo. The target folder within the `views` directory must contain an `index.html` file. Usage example: `npm run start --name=<folder>`.
- **analyse**: Generates a comprehensive analysis file, mainly useful for React scripts and potentially for generating pages. The analysis file is only generated if it does not exist, unless the `--force` flag is used. Optional flags include `--verbose` and `--force`.
- **react**: Generates the necessary React code based on the web component code, including any subcomponents. The generated code will not overwrite existing files, allowing for manual customization. Flags: `--verbose` & `--force`.

PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and register code provided to you - could you create a rather simple introduction text with maybe a code example how to use in html - keep it very simple. Do not give example how to run the register code it's already included (this is for you so you can see the element-tag)! The introduction should be read by developers so it needs not to be simple enough for beginners!

## SOURCE-CODE

import { property, html, Size } from '@pap-it/system-utils';
import { Asset } from '@pap-it/templates-asset';

import { style } from './style.js';
import { ContainerTypes } from './types.js';

export class Icon extends Asset {
  static style = style;

  private content: string = "";
  private svgElement!: SVGSVGElement;

  @property({ rerender: false }) container?: ContainerTypes;
  @property({ onUpdate: "updateName", rerender: false }) name?: string;
  @property({ onUpdate: "updateColor", rerender: false }) color?: string;
  @property({ onUpdate: "updateSize", rerender: false }) size: Size = "medium";
  @property({ onUpdate: "updateCustomSize", rerender: false, type: Number }) customSize?: number;

  // class functions
  constructor() {
    super();

    this.render_mode = "greedy";
    this.assetBase = "/icons";
  }
  public firstUpdate() {
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

## REGISTER-CODE

import { Icon } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-icon')) {
  cElements.define('pap-icon', Icon);
}
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables.

1. properties (columns: name, default-value, type, description)
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc)
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE

 import { property, html, Size } from '@pap-it/system-utils';
import { Asset } from '@pap-it/templates-asset';

import { style } from './style.js';
import { ContainerTypes } from './types.js';

export class Icon extends Asset {
  static style = style;

  private content: string = "";
  private svgElement!: SVGSVGElement;

  @property({ rerender: false }) container?: ContainerTypes;
  @property({ onUpdate: "updateName", rerender: false }) name?: string;
  @property({ onUpdate: "updateColor", rerender: false }) color?: string;
  @property({ onUpdate: "updateSize", rerender: false }) size: Size = "medium";
  @property({ onUpdate: "updateCustomSize", rerender: false, type: Number }) customSize?: number;

  // class functions
  constructor() {
    super();

    this.render_mode = "greedy";
    this.assetBase = "/icons";
  }
  public firstUpdate() {
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

## TYPE-CODE: export type ContainerTypes = "small" | "medium" | "large";PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is

 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE

import { property, html, Size } from '@pap-it/system-utils';
import { Asset } from '@pap-it/templates-asset';

import { style } from './style.js';
import { ContainerTypes } from './types.js';

export class Icon extends Asset {
  static style = style;

  private content: string = "";
  private svgElement!: SVGSVGElement;

  @property({ rerender: false }) container?: ContainerTypes;
  @property({ onUpdate: "updateName", rerender: false }) name?: string;
  @property({ onUpdate: "updateColor", rerender: false }) color?: string;
  @property({ onUpdate: "updateSize", rerender: false }) size: Size = "medium";
  @property({ onUpdate: "updateCustomSize", rerender: false, type: Number }) customSize?: number;

  // class functions
  constructor() {
    super();

    this.render_mode = "greedy";
    this.assetBase = "/icons";
  }
  public firstUpdate() {
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

## STYLE-CODE

:host {
    display: inline-flex;
    justify-content: center;
    align-items: center;

    width: var(--icon-custom-size);
    height: var(--icon-custom-size);
}

:host([size="small"]) {
    --icon-custom-size: var(--icon-size-small, 16px);
}
:host([size="medium"]) {
    --icon-custom-size: var(--icon-size-medium, 20px);
}
:host([size="large"]) {
    --icon-custom-size: var(--icon-size-large, 40px);
}
:host(:not([container])) {
    svg {
        width: inherit;
        height: inherit;
    }
}
:host([container]) {
    display: flex;

    svg {
        width: var(--icon-custom-size);
        height: var(--icon-custom-size);
    }
}
:host([container="small"]) {
    width: var(--field-size-small, 32px);
    height: var(--field-size-small, 32px);
}
:host([container="medium"]) {
    width: var(--field-size-medium, 40px);
    height: var(--field-size-medium, 40px);
}
:host([container="large"]) {
    width: var(--field-size-large, 56px);
    height: var(--field-size-large, 56px);
}
svg {
    fill: currentColor;
}

:host([data-hide-slot="true"]) {
    &::part(fallback) {
        display: none;
    }
}
:host([data-hide-slot="false"]) {
    svg {
        display: none;
    }
    width: fit-content;
}
