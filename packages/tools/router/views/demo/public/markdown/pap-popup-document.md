# Popup

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

// utils
import { html, property, query } from "@pap-it/system-utils";

// templates
import { Base } from "@pap-it/system-base";

// local
import { style } from "./style";
import { State, Variant } from "./types";

export class Popup extends Base {
  static style = style;

  @query('iz-card') private cardElement!: HTMLDivElement;

  @property({ type: String }) headerTitle = 'Popup Title';

  @property({ type: Boolean }) hideonoutsideclick: boolean = false;

  @property() variant: Variant = 'global';

  @property() state: State = 'hide';

  // @property() minWidth?: string;

  private showDelay = false;

  private documentElementOverflow: string | null = null;

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('variant'))
      this.setAttribute('variant', this.variant);

    if (this.hideonoutsideclick) {
      window.addEventListener('click', this.handleOutsideClick);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.hideonoutsideclick) {
      window.removeEventListener('click', this.handleOutsideClick);
    }
  }

  attributeChangedCallback(
    name: string,
    _old: string | null,
    value: string | null
  ): void {
    super.attributeChangedCallback(name,_old, value);

    if (name === 'state') {
      if (value === 'show') {
        this.show();
      } else {
        this.hide();
      }
    }

    if (name === 'minwidth' && value !== null) {
      // TODO should this be implemented ?
      // console.log("minWidth",value)
      // this.style["--card-width"] = value;
    }
  }

  // public functions
  public show() {
    this.state = 'show';
    this.showDelay = true;

    if (this.variant === 'global') {
      if (!this.documentElementOverflow) {
        const computedStyle = window.getComputedStyle(document.documentElement);
        this.documentElementOverflow =
          computedStyle.getPropertyValue('overflow');
      }
      document.documentElement.style.overflow = 'hidden';
    }

    setTimeout(() => {
      this.showDelay = false;
      this.dispatchEvent(new Event('popup-show'));
    }, 2);
  }

  public hide = () => {
    if (this.variant === 'global') {
      document.documentElement.style.overflow =
        this.documentElementOverflow || 'auto';
    }
    this.state = 'hide';
    this.dispatchEvent(new Event('popup-hide'));
  };

  // private functions
  private handleOutsideClick = (event: MouseEvent) => {
    if (!this.hideonoutsideclick) return;
    if (this.state === 'hide') return;
    if (this.showDelay) return;

    const cardBox = this.cardElement?.getBoundingClientRect();
    const { clientX: x, clientY: y } = event;

    if (cardBox instanceof DOMRect) {
      if (Popup.mouseWithin(x, y, cardBox)) return;
    }

    this.hide();
  };

  static mouseWithin(x: number, y: number, rec: DOMRect) {
    return rec.left <= x && rec.right >= x && rec.top <= y && rec.bottom >= y;
  }

  render() {
    return html`
      <div class=${['wrapper', this.state, this.variant].join(' ')}>
        <pap-card .headerTitle=${this.headerTitle} header footer>
          <pap-button
            @click=${this.hide}
            slot="header"
            variant="square"
            size="small"
          >
            <pap-icon-close size="small"></pap-icon-close>
          </pap-button>
          <slot></slot>
          <slot name="footer" slot="footer"></slot>
        </pap-card>
      </div>
    `;
  }
}

declare global {
    interface HTMLElementTagNameMap {
        "pap-popup": Popup;
    }
}

## REGISTER-CODE

import { Popup } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-popup')) {
  cElements.define('pap-popup', Popup);
}
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables.

1. properties (columns: name, default-value, type, description)
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc)
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE

 // utils
import { html, property, query } from "@pap-it/system-utils";

// templates
import { Base } from "@pap-it/system-base";

// local
import { style } from "./style";
import { State, Variant } from "./types";

export class Popup extends Base {
  static style = style;

  @query('iz-card') private cardElement!: HTMLDivElement;

  @property({ type: String }) headerTitle = 'Popup Title';

  @property({ type: Boolean }) hideonoutsideclick: boolean = false;

  @property() variant: Variant = 'global';

  @property() state: State = 'hide';

  // @property() minWidth?: string;

  private showDelay = false;

  private documentElementOverflow: string | null = null;

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('variant'))
      this.setAttribute('variant', this.variant);

    if (this.hideonoutsideclick) {
      window.addEventListener('click', this.handleOutsideClick);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.hideonoutsideclick) {
      window.removeEventListener('click', this.handleOutsideClick);
    }
  }

  attributeChangedCallback(
    name: string,
    _old: string | null,
    value: string | null
  ): void {
    super.attributeChangedCallback(name,_old, value);

    if (name === 'state') {
      if (value === 'show') {
        this.show();
      } else {
        this.hide();
      }
    }

    if (name === 'minwidth' && value !== null) {
      // TODO should this be implemented ?
      // console.log("minWidth",value)
      // this.style["--card-width"] = value;
    }
  }

  // public functions
  public show() {
    this.state = 'show';
    this.showDelay = true;

    if (this.variant === 'global') {
      if (!this.documentElementOverflow) {
        const computedStyle = window.getComputedStyle(document.documentElement);
        this.documentElementOverflow =
          computedStyle.getPropertyValue('overflow');
      }
      document.documentElement.style.overflow = 'hidden';
    }

    setTimeout(() => {
      this.showDelay = false;
      this.dispatchEvent(new Event('popup-show'));
    }, 2);
  }

  public hide = () => {
    if (this.variant === 'global') {
      document.documentElement.style.overflow =
        this.documentElementOverflow || 'auto';
    }
    this.state = 'hide';
    this.dispatchEvent(new Event('popup-hide'));
  };

  // private functions
  private handleOutsideClick = (event: MouseEvent) => {
    if (!this.hideonoutsideclick) return;
    if (this.state === 'hide') return;
    if (this.showDelay) return;

    const cardBox = this.cardElement?.getBoundingClientRect();
    const { clientX: x, clientY: y } = event;

    if (cardBox instanceof DOMRect) {
      if (Popup.mouseWithin(x, y, cardBox)) return;
    }

    this.hide();
  };

  static mouseWithin(x: number, y: number, rec: DOMRect) {
    return rec.left <= x && rec.right >= x && rec.top <= y && rec.bottom >= y;
  }

  render() {
    return html`
      <div class=${['wrapper', this.state, this.variant].join(' ')}>
        <pap-card .headerTitle=${this.headerTitle} header footer>
          <pap-button
            @click=${this.hide}
            slot="header"
            variant="square"
            size="small"
          >
            <pap-icon-close size="small"></pap-icon-close>
          </pap-button>
          <slot></slot>
          <slot name="footer" slot="footer"></slot>
        </pap-card>
      </div>
    `;
  }
}

declare global {
    interface HTMLElementTagNameMap {
        "pap-popup": Popup;
    }
}

## TYPE-CODE: export type State = 'show' | 'hide'

export type Variant = 'global' | 'parent';
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE

// utils
import { html, property, query } from "@pap-it/system-utils";

// templates
import { Base } from "@pap-it/system-base";

// local
import { style } from "./style";
import { State, Variant } from "./types";

export class Popup extends Base {
  static style = style;

  @query('iz-card') private cardElement!: HTMLDivElement;

  @property({ type: String }) headerTitle = 'Popup Title';

  @property({ type: Boolean }) hideonoutsideclick: boolean = false;

  @property() variant: Variant = 'global';

  @property() state: State = 'hide';

  // @property() minWidth?: string;

  private showDelay = false;

  private documentElementOverflow: string | null = null;

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('variant'))
      this.setAttribute('variant', this.variant);

    if (this.hideonoutsideclick) {
      window.addEventListener('click', this.handleOutsideClick);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.hideonoutsideclick) {
      window.removeEventListener('click', this.handleOutsideClick);
    }
  }

  attributeChangedCallback(
    name: string,
    _old: string | null,
    value: string | null
  ): void {
    super.attributeChangedCallback(name,_old, value);

    if (name === 'state') {
      if (value === 'show') {
        this.show();
      } else {
        this.hide();
      }
    }

    if (name === 'minwidth' && value !== null) {
      // TODO should this be implemented ?
      // console.log("minWidth",value)
      // this.style["--card-width"] = value;
    }
  }

  // public functions
  public show() {
    this.state = 'show';
    this.showDelay = true;

    if (this.variant === 'global') {
      if (!this.documentElementOverflow) {
        const computedStyle = window.getComputedStyle(document.documentElement);
        this.documentElementOverflow =
          computedStyle.getPropertyValue('overflow');
      }
      document.documentElement.style.overflow = 'hidden';
    }

    setTimeout(() => {
      this.showDelay = false;
      this.dispatchEvent(new Event('popup-show'));
    }, 2);
  }

  public hide = () => {
    if (this.variant === 'global') {
      document.documentElement.style.overflow =
        this.documentElementOverflow || 'auto';
    }
    this.state = 'hide';
    this.dispatchEvent(new Event('popup-hide'));
  };

  // private functions
  private handleOutsideClick = (event: MouseEvent) => {
    if (!this.hideonoutsideclick) return;
    if (this.state === 'hide') return;
    if (this.showDelay) return;

    const cardBox = this.cardElement?.getBoundingClientRect();
    const { clientX: x, clientY: y } = event;

    if (cardBox instanceof DOMRect) {
      if (Popup.mouseWithin(x, y, cardBox)) return;
    }

    this.hide();
  };

  static mouseWithin(x: number, y: number, rec: DOMRect) {
    return rec.left <= x && rec.right >= x && rec.top <= y && rec.bottom >= y;
  }

  render() {
    return html`
      <div class=${['wrapper', this.state, this.variant].join(' ')}>
        <pap-card .headerTitle=${this.headerTitle} header footer>
          <pap-button
            @click=${this.hide}
            slot="header"
            variant="square"
            size="small"
          >
            <pap-icon-close size="small"></pap-icon-close>
          </pap-button>
          <slot></slot>
          <slot name="footer" slot="footer"></slot>
        </pap-card>
      </div>
    `;
  }
}

declare global {
    interface HTMLElementTagNameMap {
        "pap-popup": Popup;
    }
}

## STYLE-CODE

div.wrapper {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 700;
    isolation: isolate;
}
div.wrapper.global {
    position: fixed;
    width: 100vw;
    height: 100vh;
}
div.wrapper:before {
    position: absolute;
    top: 0;
    left: 0;

    background-color: var(--popup-backdrop-background, rgba(0, 0, 0, 0.1));
    backdrop-filter: var(--popup-backdrop-filter, blur(0px));
    content: '';
    width: inherit;
    height: inherit;
    display: block;
    z-index: 1;
}

iz-card {
    width: fit-content;
    height: fit-content;
    z-index: 2;

    position: absolute;
    top: 50%;
    left: 50%;
    overflow-y: auto;
    overflow-x: hidden;
    transform: translate(-50%, -50%);
    width: fit-content;
    height: fit-content;
    max-width: calc(100% - 9px);
    max-height: calc(100% - 9px);
    background-color: white;
}

div.wrapper.show {
    display: block;
}
