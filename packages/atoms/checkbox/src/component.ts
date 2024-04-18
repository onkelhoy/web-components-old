// utils
import { html, property } from "@pap-it/system-utils";

// templates
import { Field, RenderArgument } from "@pap-it/templates-field";
import "@pap-it/templates-box";

// local
import { style } from "./style";

export class Checkbox extends Field {
  static style = style;

  @property({ rerender: false, type: Boolean }) scale: boolean = true;
  @property({
    set: function (this: Checkbox, value: string) {
      if (value === "true") return true;
      if (value === "false") return false;

      return value;
    },
    after: function (this: Checkbox) {
      let value = "false";
      if (this.checked === "intermediate") {
        value = "intermediate";
      }
      else if (this.checked) {
        value = "true";
      }
      this.updateform(value);
      this.dispatchEvent(new Event('change'));
    }
  }) checked: boolean | "intermediate" = false;
  @property({ type: Boolean, rerender: false }) intermediate: boolean = false;

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
    if (this.checked === "intermediate" || !this.checked) this.checked = true;
    else this.checked = false;
  }

  render() {
    const render: RenderArgument = {
      main: {
        content: html`
          <pap-box-template radius="small" tabindex="0" part="checkbox">
            <pap-icon name="unchecked"></pap-icon>
            <pap-icon name="intermediate"></pap-icon>
            <pap-icon name="checked"></pap-icon>
          </pap-box-template>
        `
      }
    }

    if (this.label) {
      render.main.suffix = html`
        <div slot="suffix" key="label">
          ${this.label ? `<pap-typography part="label">${this.label}</pap-typography>` : ''}
        </div>
      `
    }

    return super.render(render);
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-checkbox": Checkbox;
  }
}