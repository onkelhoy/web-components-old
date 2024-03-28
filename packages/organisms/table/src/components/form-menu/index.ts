// system 
import { html, property, query } from "@pap-it/system-utils";

// atoms
import "@pap-it/button/wc";
// import "@pap-it/form/wc"

// tools
import "@pap-it/tools-translator/wc";

// local
import { style } from "./style";
import { Menu } from "../menu";

export class FormMenu extends Menu {
  static style = style;

  private handlesubmit = (e: Event) => {
    // e.preventDefault();
    console.log(e);
  }

  render() {
    return super.render(html`
        <main>
          <slot></slot>
        </main>

        <footer part="footer">
          <pap-button mode="fill" color="secondary" type="submit">
            <pap-translator>Save changes</pap-translator>
          </pap-button>
        </footer>
    `);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-table-form-menu": FormMenu;
  }
}