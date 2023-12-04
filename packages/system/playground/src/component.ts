// system
import { html, property } from "@pap-it/system-utils";
import { BaseSystem } from "@pap-it/system-base";

// local 
import { style } from "./style";
import { Foo, ClickEvent } from "./types";

export class PlaygroundSyste extends BaseSystem {
  static style = style;

  @property({ type: Array, attribute: false }) list: string[] = [];


  add = () => {
    this.list.push(`BTN ${this.list.length + 1}`);
    this.debouncedRequestUpdate();
  }
  swap = () => {
    const a = this.querySelector('div.a');
    const b = this.querySelector('div.b');

    if (a && b) {
      const aclone = a.cloneNode(true);
      const bclone = b.cloneNode(true);

      let order = "b";
      if (a.nextElementSibling === b) {
        order = "a";
      }

      const parent = a.parentElement;

      if (parent) {
        parent.removeChild(a);
        parent.removeChild(b);

        if (order === "a") {
          parent.appendChild(bclone);
          parent.appendChild(aclone);
        }
        else {
          parent.appendChild(aclone);
          parent.appendChild(bclone);
        }
      }
    }
  }
  clickSwap = (classname: string) => {
    return () => {
      console.log(classname, "clicked");
    }
  }
  clickbtn = (value: string) => {
    return () => {
      console.log(value, 'clicked');
    }
  }

  render() {
    console.log(this.list)

    return html`
      <fieldset>
        <legend>Array Case</legend>
        
        ${this.list.map(value => html`<button key="${value}" @click="${this.clickbtn(value)}">${value}</button>`)}
        <button key="add" @click="${this.add}">ADD</button>
      </fieldset>

      <fieldset>
        <legend>Swap Case</legend>

        <div class="swap">
          <div class="a">
            <button @click="${this.clickSwap("a")}">A</button>
          </div>
          <div class="b">
            <button @click="${this.clickSwap("b")}">B</button>
          </div>
        </div>
        
        <button @click="${this.swap}">swap</button>
      </fieldset>
    `
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-playground-syste": PlaygroundSyste;
  }
}