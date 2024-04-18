# Select

Atomic Type: atoms

Version: 0.0.12

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

// system
import { debounce, html, ifDefined, property, query } from "@pap-it/system-utils";

// templates
import { Placement, Reveal } from "@pap-it/templates-popover";
import { Field, RenderArgument, PrefixSuffixRender } from "@pap-it/templates-field";
import { Menu, Selected } from "@pap-it/templates-menu";
import "@pap-it/templates-menu";

// local
import { style } from "./style";
import { SearchType, OptionType, SearchEvent } from "./types";

export class Select extends Field {
  static style = style;

  @query<HTMLInputElement>({
    selector: 'input',
    load: function (this: Select, element) {
      this.connectElement(element);
    }
  }) override element!: HTMLInputElement;
  @query<Menu>('pap-menu-template') menuelement!: Menu;

  @property({ type: Boolean }) multiple: boolean = false;
  @property({ attribute: 'menu-height' }) menuheight: string = "15rem";
  @property() revealby: Reveal = 'click';
  @property() placement: Placement = 'bottom-left';
  @property({ type: Boolean }) hideonoutsideclick: boolean = true;
  @property({ type: Boolean }) open: boolean = false;
  @property({ attribute: 'dynamic-width', type: Boolean }) dynamicwidth: boolean = false;
  @property({ attribute: false }) text: string = "";
  @property({ type: Number, attribute: "input-size" }) inputsize?: number;

  @property({
    after: function (this: Select, value: string) {
      this.updateform(value);
      this.debouncedchange();
      if (this.menuelement) {
        this.menuelement.select(value);
      }
    }
  }) value?: string;
  @property({ type: Number }) maxlength?: number;
  @property({ type: Number }) minlength?: number;
  @property({ type: Number }) max?: number;
  @property({ type: Number }) min?: number;
  @property() search?: SearchType;
  @property() pattern?: string;
  @property({
    type: Array,
    attribute: false,
    set: function (this: Select, list: Array<OptionType | string | number>): Array<OptionType> {
      if (list.length > 0 && (typeof list[0] === "string" || typeof list[0] === "number")) {
        return list.map(l => {
          if (typeof l === "string" || typeof l === "number") return { value: String(l), text: String(l) };
          return l;
        });
      }
      return list as Array<OptionType>;
    },
    after: function (this: Select) {
      // NOTE should we update the selected ?
    }
  }) options?: Array<OptionType> = [];

  public searchvalue: string | undefined;

  constructor() {
    super();

    this.dosearch = debounce(this.dosearch, 150);
  }

  // event handlers
  private handleinput = (e: Event) => {
    if (e.target instanceof HTMLInputElement) {
      this.searchvalue = e.target.value;

      // TODO additive should open the option for user to click on a button to "add" the searched value
      // if (this.search === "additive") {
      //   this.value = this.searchvalue;
      // }

      this.dosearch();
    }
  }
  private handleshow = () => {
    this.dispatchEvent(new Event('show'));
    this.open = true;
  }
  private handlehide = () => {
    this.dispatchEvent(new Event('hide'));
    this.open = false;
  }
  private handleselect = (e: CustomEvent<Selected>) => {
    if (e.detail) {
      this.value = e.detail.value;
      this.text = e.detail.text;
      // this.dispatchEvent(new Event('change'));
    }
    // else {
    //   text select ?
    //   console.log('oi what event are you?', e)
    // }
  }

  // helper function
  private dosearch = () => {
    this.dispatchEvent(new CustomEvent<SearchEvent>('search', {
      detail: {
        value: this.searchvalue,
        regexp: new RegExp(this.searchvalue || "", "i"),
      }
    }));
  }

  // overrides
  protected override renderMain(main: PrefixSuffixRender): DocumentFragment {
    return html`
      <pap-menu-template
        @show="${this.handleshow}"
        @hide="${this.handlehide}"
        @select="${this.handleselect}"
        revealby="${this.revealby}"
        placement="${this.placement}"
        open="${this.open}"
        part="popover"
        hideonoutsideclick="${this.hideonoutsideclick}"
        multiple="${this.multiple}"
        menuheight="${this.menuheight}"
        dynamic-width="${this.dynamicwidth}"
      >
        <span slot="button">
          ${super.renderMain(main)}
        </span>
        ${this.options?.map(option => html`<pap-option key="${option.value}" value="${option.value}">${option.text}</pap-option>`)}
        <slot></slot>
      </pap-menu-template>
    `
  }

  render() {
    const render: RenderArgument = {
      main: {
        content: html`
          <input
            @input="${this.handleinput}"
            placeholder="${ifDefined(this.placeholder)}"
            name="${this.name}"
            value="${ifDefined(this.text)}"
            maxlength="${ifDefined(this.maxlength)}"
            minlength="${ifDefined(this.minlength)}"
            size="${this.inputsize === undefined ? this.value?.length || 1 : this.inputsize}"
            min="${ifDefined(this.min)}"
            max="${ifDefined(this.max)}"
            pattern="${ifDefined(this.pattern)}"
            required="${ifDefined(this.required)}"
            disabled="${ifDefined(this.disabled)}"
            ${(this.readonly || !this.search) ? "readonly" : ""}
          />
        `,
        suffix: '<pap-icon slot="suffix" size="small" container="small" part="caret" cache="true" name="caret"></pap-icon>'
      }
    }

    if (this.label) {
      if (!render.header) render.header = {};
      render.header.content = `<pap-typography key="label" part="label">${this.label}</pap-typography>`
    }

    return super.render(render);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-select": Select;
  }
}

## REGISTER-CODE

import { Option } from './components/option/index.js';
import { Select } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-select')) {
  cElements.define('pap-select', Select);
}
if (!cElements.get('pap-option')) {
  cElements.define('pap-option', Option);
}
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables.

1. properties (columns: name, default-value, type, description)
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc)
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE

 // system
import { debounce, html, ifDefined, property, query } from "@pap-it/system-utils";

// templates
import { Placement, Reveal } from "@pap-it/templates-popover";
import { Field, RenderArgument, PrefixSuffixRender } from "@pap-it/templates-field";
import { Menu, Selected } from "@pap-it/templates-menu";
import "@pap-it/templates-menu";

// local
import { style } from "./style";
import { SearchType, OptionType, SearchEvent } from "./types";

export class Select extends Field {
  static style = style;

  @query<HTMLInputElement>({
    selector: 'input',
    load: function (this: Select, element) {
      this.connectElement(element);
    }
  }) override element!: HTMLInputElement;
  @query<Menu>('pap-menu-template') menuelement!: Menu;

  @property({ type: Boolean }) multiple: boolean = false;
  @property({ attribute: 'menu-height' }) menuheight: string = "15rem";
  @property() revealby: Reveal = 'click';
  @property() placement: Placement = 'bottom-left';
  @property({ type: Boolean }) hideonoutsideclick: boolean = true;
  @property({ type: Boolean }) open: boolean = false;
  @property({ attribute: 'dynamic-width', type: Boolean }) dynamicwidth: boolean = false;
  @property({ attribute: false }) text: string = "";
  @property({ type: Number, attribute: "input-size" }) inputsize?: number;

  @property({
    after: function (this: Select, value: string) {
      this.updateform(value);
      this.debouncedchange();
      if (this.menuelement) {
        this.menuelement.select(value);
      }
    }
  }) value?: string;
  @property({ type: Number }) maxlength?: number;
  @property({ type: Number }) minlength?: number;
  @property({ type: Number }) max?: number;
  @property({ type: Number }) min?: number;
  @property() search?: SearchType;
  @property() pattern?: string;
  @property({
    type: Array,
    attribute: false,
    set: function (this: Select, list: Array<OptionType | string | number>): Array<OptionType> {
      if (list.length > 0 && (typeof list[0] === "string" || typeof list[0] === "number")) {
        return list.map(l => {
          if (typeof l === "string" || typeof l === "number") return { value: String(l), text: String(l) };
          return l;
        });
      }
      return list as Array<OptionType>;
    },
    after: function (this: Select) {
      // NOTE should we update the selected ?
    }
  }) options?: Array<OptionType> = [];

  public searchvalue: string | undefined;

  constructor() {
    super();

    this.dosearch = debounce(this.dosearch, 150);
  }

  // event handlers
  private handleinput = (e: Event) => {
    if (e.target instanceof HTMLInputElement) {
      this.searchvalue = e.target.value;

      // TODO additive should open the option for user to click on a button to "add" the searched value
      // if (this.search === "additive") {
      //   this.value = this.searchvalue;
      // }

      this.dosearch();
    }
  }
  private handleshow = () => {
    this.dispatchEvent(new Event('show'));
    this.open = true;
  }
  private handlehide = () => {
    this.dispatchEvent(new Event('hide'));
    this.open = false;
  }
  private handleselect = (e: CustomEvent<Selected>) => {
    if (e.detail) {
      this.value = e.detail.value;
      this.text = e.detail.text;
      // this.dispatchEvent(new Event('change'));
    }
    // else {
    //   text select ?
    //   console.log('oi what event are you?', e)
    // }
  }

  // helper function
  private dosearch = () => {
    this.dispatchEvent(new CustomEvent<SearchEvent>('search', {
      detail: {
        value: this.searchvalue,
        regexp: new RegExp(this.searchvalue || "", "i"),
      }
    }));
  }

  // overrides
  protected override renderMain(main: PrefixSuffixRender): DocumentFragment {
    return html`
      <pap-menu-template
        @show="${this.handleshow}"
        @hide="${this.handlehide}"
        @select="${this.handleselect}"
        revealby="${this.revealby}"
        placement="${this.placement}"
        open="${this.open}"
        part="popover"
        hideonoutsideclick="${this.hideonoutsideclick}"
        multiple="${this.multiple}"
        menuheight="${this.menuheight}"
        dynamic-width="${this.dynamicwidth}"
      >
        <span slot="button">
          ${super.renderMain(main)}
        </span>
        ${this.options?.map(option => html`<pap-option key="${option.value}" value="${option.value}">${option.text}</pap-option>`)}
        <slot></slot>
      </pap-menu-template>
    `
  }

  render() {
    const render: RenderArgument = {
      main: {
        content: html`
          <input
            @input="${this.handleinput}"
            placeholder="${ifDefined(this.placeholder)}"
            name="${this.name}"
            value="${ifDefined(this.text)}"
            maxlength="${ifDefined(this.maxlength)}"
            minlength="${ifDefined(this.minlength)}"
            size="${this.inputsize === undefined ? this.value?.length || 1 : this.inputsize}"
            min="${ifDefined(this.min)}"
            max="${ifDefined(this.max)}"
            pattern="${ifDefined(this.pattern)}"
            required="${ifDefined(this.required)}"
            disabled="${ifDefined(this.disabled)}"
            ${(this.readonly || !this.search) ? "readonly" : ""}
          />
        `,
        suffix: '<pap-icon slot="suffix" size="small" container="small" part="caret" cache="true" name="caret"></pap-icon>'
      }
    }

    if (this.label) {
      if (!render.header) render.header = {};
      render.header.content = `<pap-typography key="label" part="label">${this.label}</pap-typography>`
    }

    return super.render(render);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-select": Select;
  }
}

## TYPE-CODE: export type SearchType = "additive" | "static"

export type SearchEvent = {
  regexp: RegExp;
  value: undefined | string;
}

export * from './components/option/types';PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE

// system
import { debounce, html, ifDefined, property, query } from "@pap-it/system-utils";

// templates
import { Placement, Reveal } from "@pap-it/templates-popover";
import { Field, RenderArgument, PrefixSuffixRender } from "@pap-it/templates-field";
import { Menu, Selected } from "@pap-it/templates-menu";
import "@pap-it/templates-menu";

// local
import { style } from "./style";
import { SearchType, OptionType, SearchEvent } from "./types";

export class Select extends Field {
  static style = style;

  @query<HTMLInputElement>({
    selector: 'input',
    load: function (this: Select, element) {
      this.connectElement(element);
    }
  }) override element!: HTMLInputElement;
  @query<Menu>('pap-menu-template') menuelement!: Menu;

  @property({ type: Boolean }) multiple: boolean = false;
  @property({ attribute: 'menu-height' }) menuheight: string = "15rem";
  @property() revealby: Reveal = 'click';
  @property() placement: Placement = 'bottom-left';
  @property({ type: Boolean }) hideonoutsideclick: boolean = true;
  @property({ type: Boolean }) open: boolean = false;
  @property({ attribute: 'dynamic-width', type: Boolean }) dynamicwidth: boolean = false;
  @property({ attribute: false }) text: string = "";
  @property({ type: Number, attribute: "input-size" }) inputsize?: number;

  @property({
    after: function (this: Select, value: string) {
      this.updateform(value);
      this.debouncedchange();
      if (this.menuelement) {
        this.menuelement.select(value);
      }
    }
  }) value?: string;
  @property({ type: Number }) maxlength?: number;
  @property({ type: Number }) minlength?: number;
  @property({ type: Number }) max?: number;
  @property({ type: Number }) min?: number;
  @property() search?: SearchType;
  @property() pattern?: string;
  @property({
    type: Array,
    attribute: false,
    set: function (this: Select, list: Array<OptionType | string | number>): Array<OptionType> {
      if (list.length > 0 && (typeof list[0] === "string" || typeof list[0] === "number")) {
        return list.map(l => {
          if (typeof l === "string" || typeof l === "number") return { value: String(l), text: String(l) };
          return l;
        });
      }
      return list as Array<OptionType>;
    },
    after: function (this: Select) {
      // NOTE should we update the selected ?
    }
  }) options?: Array<OptionType> = [];

  public searchvalue: string | undefined;

  constructor() {
    super();

    this.dosearch = debounce(this.dosearch, 150);
  }

  // event handlers
  private handleinput = (e: Event) => {
    if (e.target instanceof HTMLInputElement) {
      this.searchvalue = e.target.value;

      // TODO additive should open the option for user to click on a button to "add" the searched value
      // if (this.search === "additive") {
      //   this.value = this.searchvalue;
      // }

      this.dosearch();
    }
  }
  private handleshow = () => {
    this.dispatchEvent(new Event('show'));
    this.open = true;
  }
  private handlehide = () => {
    this.dispatchEvent(new Event('hide'));
    this.open = false;
  }
  private handleselect = (e: CustomEvent<Selected>) => {
    if (e.detail) {
      this.value = e.detail.value;
      this.text = e.detail.text;
      // this.dispatchEvent(new Event('change'));
    }
    // else {
    //   text select ?
    //   console.log('oi what event are you?', e)
    // }
  }

  // helper function
  private dosearch = () => {
    this.dispatchEvent(new CustomEvent<SearchEvent>('search', {
      detail: {
        value: this.searchvalue,
        regexp: new RegExp(this.searchvalue || "", "i"),
      }
    }));
  }

  // overrides
  protected override renderMain(main: PrefixSuffixRender): DocumentFragment {
    return html`
      <pap-menu-template
        @show="${this.handleshow}"
        @hide="${this.handlehide}"
        @select="${this.handleselect}"
        revealby="${this.revealby}"
        placement="${this.placement}"
        open="${this.open}"
        part="popover"
        hideonoutsideclick="${this.hideonoutsideclick}"
        multiple="${this.multiple}"
        menuheight="${this.menuheight}"
        dynamic-width="${this.dynamicwidth}"
      >
        <span slot="button">
          ${super.renderMain(main)}
        </span>
        ${this.options?.map(option => html`<pap-option key="${option.value}" value="${option.value}">${option.text}</pap-option>`)}
        <slot></slot>
      </pap-menu-template>
    `
  }

  render() {
    const render: RenderArgument = {
      main: {
        content: html`
          <input
            @input="${this.handleinput}"
            placeholder="${ifDefined(this.placeholder)}"
            name="${this.name}"
            value="${ifDefined(this.text)}"
            maxlength="${ifDefined(this.maxlength)}"
            minlength="${ifDefined(this.minlength)}"
            size="${this.inputsize === undefined ? this.value?.length || 1 : this.inputsize}"
            min="${ifDefined(this.min)}"
            max="${ifDefined(this.max)}"
            pattern="${ifDefined(this.pattern)}"
            required="${ifDefined(this.required)}"
            disabled="${ifDefined(this.disabled)}"
            ${(this.readonly || !this.search) ? "readonly" : ""}
          />
        `,
        suffix: '<pap-icon slot="suffix" size="small" container="small" part="caret" cache="true" name="caret"></pap-icon>'
      }
    }

    if (this.label) {
      if (!render.header) render.header = {};
      render.header.content = `<pap-typography key="label" part="label">${this.label}</pap-typography>`
    }

    return super.render(render);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-select": Select;
  }
}

## STYLE-CODE

:host {

  pap-menu-template,
  pap-menu-template::part(popover) {
    width: 100%;
  }

  pap-icon[part="caret"] {
    rotate: 0;
  }
}

:host(:not([search])) {
  pap-box-template[part="main"] {
    cursor: pointer;
  }
}

:host([open="true"]) {

  pap-icon[part="caret"] {
    rotate: 180deg;
  }
}
