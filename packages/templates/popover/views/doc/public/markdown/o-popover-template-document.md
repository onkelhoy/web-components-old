# PopoverTemplate

Atomic Type: templates

Version: 1.0.0

## Development 
Development servers can be started and should all exist inside `"views"` folder

## Scripts 
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and register code provided to you - could you create a rather simple introduction text with maybe a code example how to use in html - keep it very simple. Do not give example how to run the register code it's already included (this is for you so you can see the element-tag)! The introduction should be read by developers so it needs not to be simple enough for beginners!

## SOURCE-CODE:
// utils 
import { html, property } from "@circular-tools/utils";

// templates
import { BaseTemplate } from "@circular-templates/base";

import { style } from "./style";
import { Reveal, Placement } from './types';

export class PopoverTemplate extends BaseTemplate {
  static style = style;

  @property() revealby: Reveal = 'hover';
  @property() placement: Placement = 'bottom-center';
  @property({ type: Boolean }) hideonoutsideclick: boolean = false;
  @property({ type: Boolean }) open: boolean = false;

  private outside = false;

  // class functions
  constructor() {
    super();

    this.addEventListener('mouseenter', this.handlemouseenter);
    this.addEventListener('mouseleave', this.handlemouseleave);
  }

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener("click", this.handlewindowclick);
  }
  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener("click", this.handlewindowclick);
  }

  // event handlers
  private handlemouseenter = () => {
    this.outside = false;

    if (this.revealby === "hover")
    {
      this.show();
    }
  }
  private handlemouseleave = () => {
    this.outside = true;
    
    if (this.revealby === "hover")
    {
      this.hide();
    }
  }
  private handlemousedown = () => {
    if (this.revealby === "click")
    {
      this.show();
    }
  }
  private handlewindowclick = (e:Event) => {
    if (this.hideonoutsideclick && this.outside && this.revealby === "click")
    {
      this.hide();
    }
  }

  // public functions
  public show() {
    this.open = true;
  }
  public hide() {
    this.open = false;
  }

  render() {
    return html`
      <div 
        class="target" 
        @mousedown="${this.handlemousedown}"
      >
        <slot name="target"></slot>
      </div>
      <div class="wrapper">
        <slot></slot>
      </div>
    `
  }
}
## REGISTER-CODE:
import { PopoverTemplate } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('o-popover-template')) {
  cElements.define('o-popover-template', PopoverTemplate);
}
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables. 
1. properties (columns: name, default-value, type, description) 
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc) 
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE:
 // utils 
import { html, property } from "@circular-tools/utils";

// templates
import { BaseTemplate } from "@circular-templates/base";

import { style } from "./style";
import { Reveal, Placement } from './types';

export class PopoverTemplate extends BaseTemplate {
  static style = style;

  @property() revealby: Reveal = 'hover';
  @property() placement: Placement = 'bottom-center';
  @property({ type: Boolean }) hideonoutsideclick: boolean = false;
  @property({ type: Boolean }) open: boolean = false;

  private outside = false;

  // class functions
  constructor() {
    super();

    this.addEventListener('mouseenter', this.handlemouseenter);
    this.addEventListener('mouseleave', this.handlemouseleave);
  }

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener("click", this.handlewindowclick);
  }
  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener("click", this.handlewindowclick);
  }

  // event handlers
  private handlemouseenter = () => {
    this.outside = false;

    if (this.revealby === "hover")
    {
      this.show();
    }
  }
  private handlemouseleave = () => {
    this.outside = true;
    
    if (this.revealby === "hover")
    {
      this.hide();
    }
  }
  private handlemousedown = () => {
    if (this.revealby === "click")
    {
      this.show();
    }
  }
  private handlewindowclick = (e:Event) => {
    if (this.hideonoutsideclick && this.outside && this.revealby === "click")
    {
      this.hide();
    }
  }

  // public functions
  public show() {
    this.open = true;
  }
  public hide() {
    this.open = false;
  }

  render() {
    return html`
      <div 
        class="target" 
        @mousedown="${this.handlemousedown}"
      >
        <slot name="target"></slot>
      </div>
      <div class="wrapper">
        <slot></slot>
      </div>
    `
  }
}

## TYPE-CODE: // NOTE these are just for example purposes

type TB = 'top' | 'bottom';
type LR = 'left' | 'right';

export type Reveal = 'hover' | 'click';
export type Placement = `${TB}-${LR | 'center'}` | `${LR}-${TB | 'center'}`;PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE:
// utils 
import { html, property } from "@circular-tools/utils";

// templates
import { BaseTemplate } from "@circular-templates/base";

import { style } from "./style";
import { Reveal, Placement } from './types';

export class PopoverTemplate extends BaseTemplate {
  static style = style;

  @property() revealby: Reveal = 'hover';
  @property() placement: Placement = 'bottom-center';
  @property({ type: Boolean }) hideonoutsideclick: boolean = false;
  @property({ type: Boolean }) open: boolean = false;

  private outside = false;

  // class functions
  constructor() {
    super();

    this.addEventListener('mouseenter', this.handlemouseenter);
    this.addEventListener('mouseleave', this.handlemouseleave);
  }

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener("click", this.handlewindowclick);
  }
  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener("click", this.handlewindowclick);
  }

  // event handlers
  private handlemouseenter = () => {
    this.outside = false;

    if (this.revealby === "hover")
    {
      this.show();
    }
  }
  private handlemouseleave = () => {
    this.outside = true;
    
    if (this.revealby === "hover")
    {
      this.hide();
    }
  }
  private handlemousedown = () => {
    if (this.revealby === "click")
    {
      this.show();
    }
  }
  private handlewindowclick = (e:Event) => {
    if (this.hideonoutsideclick && this.outside && this.revealby === "click")
    {
      this.hide();
    }
  }

  // public functions
  public show() {
    this.open = true;
  }
  public hide() {
    this.open = false;
  }

  render() {
    return html`
      <div 
        class="target" 
        @mousedown="${this.handlemousedown}"
      >
        <slot name="target"></slot>
      </div>
      <div class="wrapper">
        <slot></slot>
      </div>
    `
  }
}
## STYLE-CODE:
:host {
  position: relative;
  display: block;
  height: fit-content;

  --gap: var(--popover-gap, 1rem);

  div.wrapper {
    position: absolute;
    top: 0;
    left: 0;
  }
}

:host([open="true"]) div.wrapper {
  display: block;
}
:host([open="false"]) div.wrapper {
  display: none;
}


// placement:: TOP
:host([placement="top-right"]) div.wrapper {
  padding-bottom: var(--gap);
  transform: translateY(-100%);
}
:host([placement="top-center"]) div.wrapper {
  padding-bottom: var(--gap);
  left: 50%;
  transform: translate(-50%, -100%);
}
:host([placement="top-left"]) div.wrapper {
  padding-bottom: var(--gap);
  left: 100%;
  transform: translateY(-100%);
}

// placement:: BOTTOM
:host([placement="bottom-right"]) div.wrapper {
  padding-top: var(--gap);
  top: 100%;
}
:host([placement="bottom-center"]) div.wrapper {
  padding-top: var(--gap);
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
}
:host([placement="bottom-left"]) div.wrapper {
  padding-top: var(--gap);
  top: 100%;
  left: 100%;
}

// placement:: LEFT
:host([placement="left-top"]) div.wrapper {
  padding-right: var(--gap);
  transform: translateX(-100%);
}
:host([placement="left-center"]) div.wrapper {
  padding-right: var(--gap);
  top: 50%;
  transform: translate(-100%, -50%);
}
:host([placement="left-bottom"]) div.wrapper {
  padding-right: var(--gap);
  top: 100%;
  transform: translateX(-100%);
}

// placement:: RIGHT
:host([placement="right-top"]) div.wrapper {
  padding-left: var(--gap);
  left: 100%;
}
:host([placement="right-center"]) div.wrapper {
  padding-left: var(--gap);
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
}
:host([placement="right-bottom"]) div.wrapper {
  padding-left: var(--gap);
  left: 100%;
  top: 100%;
  transform: translateX(-100%);
}