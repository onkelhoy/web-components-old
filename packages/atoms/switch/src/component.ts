// utils 
import { Size, html, property, query } from "@pap-it/system-utils";

// foundations
import "@pap-it/typography/wc";

// templates
// import { FormElement } from "@pap-it/templates-form-element";
import { Field, RenderArgument } from "@pap-it/templates-field";
import "@pap-it/templates-box/wc";

// local 
import { style } from "./style";

export class Switch extends Field {
  static style = style;

  @property({ attribute: 'support-label' }) supportlabel?: string;
  @property({
    type: Boolean,
    rerender: false,
    after: function (this: Switch) {
      this.updateform(this.checked ? "true" : "false");
      this.dispatchEvent(new Event('change'));
    }
  }) checked: boolean = false;

  constructor() {
    super({ delegatesFocus: true, noblur: true, nofocus: true });
    this.mode = "hug";
    // this.mode = "fill"; // TODO fill case should put content on right side 
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("click", this.handleclick);
    this.addEventListener("keyup", this.handlekeyup);
  }

  protected override validateElement() {
    // diabled validation
    return;
  }

  // event handlers
  private handlekeyup = (e: KeyboardEvent) => {
    if ((e.key || e.code).toLowerCase() === "enter") {
      this.handleclick();
    }
  }
  private handleclick = () => {
    this.checked = !this.checked;
  }

  render() {
    const render: RenderArgument = {
      main: {
        content: html`
          <pap-box-template tabindex="0" part="switch">
            <span part="circle"></span>
          </pap-box-template>
        `
      }
    }

    if (this.label || this.supportlabel) {
      if (!render.main) render.main = {}; // NOTE to keep TS happy..
      render.main.prefix = html`
        <div slot="prefix" key="label">
          ${this.label ? `<pap-typography part="label">${this.label}</pap-typography>` : ''}
          ${this.supportlabel ? `<pap-typography variant="C4" part="supportlabel">${this.supportlabel}</pap-typography>` : ''}
        </div>
      `
    }

    return super.render(render);
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-switch": Switch;
  }
}