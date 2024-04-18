// utils
import { html, property } from "@pap-it/system-utils";

// templates
import { Field, RenderArgument } from "@pap-it/templates-field";
import "@pap-it/templates-box";

// local
import { style } from "./style";

export class Radio extends Field {
  static style = style;

  @property({ rerender: false, type: Boolean }) scale: boolean = true;
  @property({
    type: Boolean,
    set: function (this: Radio, value: string) {
      if (value === "true") return true;
      if (value === "false") return false;

      return value;
    },
    after: function (this: Radio) {
      this.dispatchEvent(new Event('change'));

      if (this.checked) {
        this.updateform(this.value);

        // TODO we should maybe not go directly on window but maybe nearest shadow-parent to limit within one parent.. 
        this.internalcheck = true;
        if (this._internals.form) {
          this._internals.form.dispatchEvent(new CustomEvent("pap-radio-check", {
            detail: {
              name: this.name,
            }
          }));
        }
        else {
          window.dispatchEvent(new CustomEvent("pap-radio-check", {
            detail: {
              name: this.name,
            }
          }));
        }
      }
    }
  }) checked: boolean = false;
  @property({ type: Boolean, rerender: false }) intermediate: boolean = false;

  private internalcheck = false;

  constructor() {
    super({ delegatesFocus: true, noblur: true, nofocus: true });
    this.mode = "hug";
    // this.mode = "fill"; // TODO fill case should put content on right side 
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("click", this.handleclick);
    this.addEventListener("keyup", this.handlekeyup);
    window.addEventListener("pap-radio-check", this.handleradiocheck);
    this.role = "input[type=radio]"
  }
  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener("pap-radio-check", this.handleradiocheck);
    if (this._internals.form) {
      this._internals.form.removeEventListener("pap-radio-check", this.handleradiocheck);
    }
  }

  override formAssociatedCallback(form: HTMLFormElement) {
    window.removeEventListener("pap-radio-check", this.handleradiocheck);
    form.addEventListener("pap-radio-check", this.handleradiocheck);
  }

  protected override validateElement() {
    // diabled validation
    return;
  }

  // event handlers
  private handleradiocheck = (e: Event) => {
    if (this.internalcheck) {
      this.internalcheck = false;
      return;
    }
    if (e instanceof CustomEvent) {
      const { name } = e.detail;
      if (name === this.name) {
        this.checked = false;
        this.updateform();
      }
    }
  }
  private handlekeyup = (e: KeyboardEvent) => {
    if ((e.key || e.code).toLowerCase() === "enter") {
      this.handleclick();
    }
  }
  private handleclick = () => {
    this.checked = true; // HTML radio can never be unchecked..
  }

  render() {
    const render: RenderArgument = {
      main: {
        content: html`
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke-width="1.5" stroke="currentColor" fill="none" />
            <circle id="inner" cx="12" cy="12" r="6" fill="currentColor" />
          </svg>
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
    "pap-radio": Radio;
  }
}