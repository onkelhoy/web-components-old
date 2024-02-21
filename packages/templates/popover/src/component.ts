// system
import { debounce, html, property, query } from "@pap-it/system-utils";
import { Base } from "@pap-it/system-base";

import { style } from "./style";
import { Reveal, Placement, Box, TBLR, OPPOSITE } from './types';

export class PopoverProperties extends Base {
  @property() revealby: Reveal = 'hover';
  @property({
    after: function (this: PopoverProperties) {
      if (!this.internal) {
        this.originalplacement = this.placement;
      }
      this.internal = false;
    }
  }) placement: Placement = 'bottom-center';
  @property({ type: Boolean }) hideonoutsideclick: boolean = true;
  @property({ type: Boolean }) open: boolean = false;

  protected originalplacement!: Placement;
  protected internal: boolean = false;
}

export class Popover extends PopoverProperties {
  static styles = [style];
  private outside = false;

  @query('div[part="target"]') targetelement!: HTMLDivElement;
  @query('div[part="wrapper"]') wrapperelement!: HTMLDivElement;

  // class functions
  constructor() {
    super();

    this.reposition = debounce(this.reposition, 100);
    this.addEventListener('mouseenter', this.handlemouseenter);
    this.addEventListener('mouseleave', this.handlemouseleave);
  }

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener("click", this.handlewindowclick);
    window.addEventListener("scroll", this.handlewindowscroll);
    window.addEventListener("resize", this.handlewindowresize);
  }
  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener("click", this.handlewindowclick);
    window.removeEventListener("scroll", this.handlewindowscroll);
    window.removeEventListener("resize", this.handlewindowresize);
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
  private handlewindowscroll = () => {
    this.reposition();
  }
  private handlewindowresize = () => {
    this.reposition();
  }

  // private functions 
  private reposition() {
    if (!this.open) return;
    if (!this.wrapperelement) return;

    const before = this.originalplacement;

    const box = this.targetelement.getBoundingClientRect();
    const info: Box = {
      y: box.y,
      x: box.x,
      w: this.wrapperelement.clientWidth,
      h: this.wrapperelement.clientHeight,
    };

    if (this.checkpotential(info, this.originalplacement)) {
      this.internal = true;
      this.placement = this.originalplacement;
    }
    else {
      const split = this.placement.split('-')[0] as TBLR;
      const opposite = this.placement.replace(split, OPPOSITE[split]) as Placement;

      if (this.checkpotential(info, opposite)) {
        this.internal = true;
        this.placement = opposite;
      }
    }

    // if (this.placement.startsWith('top')) {
    //   if ((info.y - info.h) < 0) {
    //     this.placement = this.placement.replace('top', 'bottom') as Placement;
    //   }
    // }
    // else if (this.placement.startsWith('bottom')) {
    //   if ((info.y + info.h) > window.innerHeight) {
    //     this.placement = this.placement.replace('bottom', 'top') as Placement;
    //   }
    // }
    // else if (info.y > window.innerHeight)
    // {

    // }

    // we check original position first 
    // if (this.placement !== this.originalplacement && this.checkpotential(this.originalplacement)) {
    //   this.originalplacement = this.placement;
    // }
    // else {
    //   // first check opposite case
    //   console.log('opposite case')
    //   this.checkpotential(this.placement);

    //   // then we flip ? 
    //   console.log('flip case')
    // }

    if (before !== this.originalplacement) {
      console.log('reposition');
      this.requestUpdate();
    }
  }
  private checkpotential(box: Box, pos: Placement): boolean {
    if (pos.startsWith('top')) {
      if ((box.y - box.h) < 0) {
        return false;
      }
    }
    if (pos.startsWith('bottom')) {
      if ((box.y + box.h) > window.innerHeight) {
        return false;
      }
    }
    if (pos.startsWith('left')) {
      if ((box.x - box.w) < 0) {
        return false;
      }
    }
    if (pos.startsWith('right')) {
      if ((box.x + box.w) > window.innerWidth) {
        return false;
      }
    }

    return true;
  }

  // public functions
  public show() {
    if (!this.open) {
      this.dispatchEvent(new Event('show'));
      this.open = true;
      this.reposition();
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