// system
import { Radius, RenderType, html, property } from "@pap-it/system-utils";

// atoms 
import "@pap-it/accordion";

// templates
import { Box } from "@pap-it/templates-box";
import "@pap-it/templates-box";

// local 
import { style } from "./style";
import { Placement, Mode } from "./types";

export class Aside extends Box {
  static styles = [style];

  @property({ rerender: false, type: Boolean }) backdrop: boolean = true;
  @property({ rerender: false, type: Boolean }) hideonoutsideclick: boolean = true;
  @property({
    type: Boolean,
    after: function (this: Aside) {
      this.opened = performance.now();
    }
  }) open: boolean = false;
  @property({ rerender: false }) placement: Placement = "right";
  @property({ rerender: false }) radius: Radius = "medium";
  @property({ rerender: false }) mode: Mode = "normal";
  @property({
    rerender: false,
    after: function (this: Aside) {
      if (this.hasrendered) {
        if (this.width) {
          let value = this.width;
          // check for number -> then we treat as pixel
          if (!Number.isNaN(Number(value))) {
            value += "px";
          }
          this.style.setProperty('--aside-width', value);
        }
        else {
          this.style.removeProperty('--aside-width');
        }
      }
    }
  }) width?: string;

  private opened = 0;
  private inside = false;

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("click", this.handlewindowclick);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("click", this.handlewindowclick);
  }

  // event handlers
  private handlewindowclick = () => {
    const now = performance.now();

    if (!this.inside && this.hideonoutsideclick && now - this.opened > 200) {
      this.hide();
    }

    // always reset inside
    this.inside = false;
  }
  private handlewrapperclick = () => {
    // so window click wont close (if hideonoutsideclick)
    this.inside = true;
  }

  // public functions 
  public hide() {
    this.open = false;
    this.dispatchEvent(new Event('hide'));
  }
  public show() {
    this.open = true;
    this.dispatchEvent(new Event('show'));
  }

  render(content?: RenderType) {
    return html`
      <pap-box-template 
        radius="${this.radius}" 
        elevation="${this.elevation}"
        elevationdirection="${this.elevationdirection}"
        part="wrapper" 
        @click="${this.handlewrapperclick}"
      >
        <pap-accordion 
          part="accordion"
          open="${this.open}"
          mode="${['left', 'right'].includes(this.placement) ? "horizontal" : "vertical"}"
        >
          <div part="content">
            ${content}
            <slot></slot>
          </div>
        </pap-accordion>
      </pap-box-template>
    `
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-aside": Aside;
  }
}