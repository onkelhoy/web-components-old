// utils
import { html, property } from "@pap-it/system-utils";

// templates
import { FieldTemplate } from "@pap-it/templates-field";

// local
import { style } from "./style";

export class Checkbox extends FieldTemplate {
  static style = style;

  @property({ rerender: false, onUpdate: "checkboxColorUpdate" }) color: string = "blue";

  constructor() {
    super();

    this.addEventListener("click", this.handleclick, true);
  }

  // update functions
  private checkboxColorUpdate = () => {
    if (this.inputElement) {
      this.inputElement.style.accentColor = this.color;
    }
  }
  private handleclick = (e: Event) => {
    e.stopPropagation();
    this.checked = !this.checked;
  }

  render() {
    return super.render(html`<input readonly type="checkbox" />`)
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-checkbox": Checkbox;
  }
}