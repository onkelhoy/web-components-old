// system
import { html, property } from "@pap-it/system-utils";
import { Base } from "@pap-it/system-base";

import { style } from "./style";
import { Reveal, Placement } from './types';

export class PopoverProperties extends Base {
  @property() revealby: Reveal = 'hover';
  @property() placement: Placement = 'bottom-center';
  @property({ type: Boolean }) hideonoutsideclick: boolean = true;
  @property({ type: Boolean }) open: boolean = false;
}

export class Popover extends PopoverProperties {
  static styles = [style];
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

    if (this.revealby === "hover") {
      this.show();
    }
  }
  private handlemouseleave = () => {
    this.outside = true;

    if (this.revealby === "hover") {
      this.hide();
    }
  }
  private handlemousedown = () => {
    if (this.revealby === "click") {
      this.show();
    }
  }
  private handlewindowclick = (e: Event) => {
    if (this.hideonoutsideclick && this.outside && this.revealby === "click") {
      this.hide();
    }
  }

  // public functions
  public show() {
    if (!this.open) {
      this.dispatchEvent(new Event('show'));
      this.open = true;
    }
  }
  public hide() {
    if (this.open) {
      this.dispatchEvent(new Event('hide'));
      this.open = false;
    }
  }

  render() {
    return html`
      <div 
        part="target"
        @mousedown="${this.handlemousedown}"
      >
        <slot name="target"></slot>
      </div>
      <div part="wrapper">
        <slot></slot>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-popover-template": Popover;
  }
}