// system 
import { html, property, query, CustomElement } from "@pap-it/system-utils";

// local
import { style } from "./style";

export class Route extends CustomElement {
  static style = style;

  @property({
    context: true,
    set: function (this: Route, value: string) {
      if (!value) return "/";
      if (value[0] !== "/") value = "/" + value;

      console.log('setting my stuff', this.corrected_path);
      return value;
    }
  }) path?: string;

  private corrected_path?: string;

  // on updates
  private onpathupdate = (path: string) => {
  }

  render() {
    console.log('render', this.path, this.corrected_path)
    return html`
      <slot></slot>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-route": Route;
  }
}