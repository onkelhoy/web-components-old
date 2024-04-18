// system 
import { html, property, query, CustomElement } from "@pap-it/system-utils";

// atoms 
import "@pap-it/typography";
import "@pap-it/button";
import "@pap-it/radio";

// tools
import { Translator } from "@pap-it/tools-translator";

// local
import { style } from "./style";

type Value = "csv" | "excel";

export class Export extends Translator {
  static style = style;

  public value: Value = "csv";

  // event handlers 
  private handlesubmit = (e: Event) => {
    e.preventDefault();
    const formdata = new FormData(e.target as HTMLFormElement);

    this.value = formdata.get('export') as Value;
    this.dispatchEvent(new Event('change'));
  }

  render() {
    return html`
      <form @submit="${this.handlesubmit}">
        <main>
          <pap-typography variant="C2">${this.translateKey('File format')}</pap-typography>
          <div>
            <pap-radio name="export" checked="true" value="csv" label="${this.translateKey('CSV')}"></pap-radio>
            <pap-radio name="export" value="excel" label="${this.translateKey('Excel')}"></pap-radio>
          </div>
        </main>
        
        <footer>
          <pap-button type="submit" mode="fill" color="secondary">
            <pap-icon name="export"></pap-icon>
            ${this.translateKey("Export")}
          </pap-button>
        </footer>
      </form>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-table-export": Export;
  }
}