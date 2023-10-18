// utils 
import { html, property } from "@pap-it/system-utils";

// templates
import { TextinputTemplate } from '@pap-it/templates-textinput';

// local 
import { style } from "./style";
import { Resize } from './types';

export class Textarea extends TextinputTemplate<HTMLTextAreaElement> {
  static style = style;

  @property({ type: Number }) rows: number = 4;
  @property({ rerender: false }) resize: Resize = "auto";

  // event functions
  private handleinput = (e: Event) => {
    if (this.resize === "auto" && e.target instanceof HTMLTextAreaElement) {
      // dont know why fully this works but it does 
      e.target.style.height = "auto";
      if (e.target.scrollHeight) // because it was 0 on intial case 
      {
        // the -4 is also weird but it works - maybe border ? im not sure 
        e.target.style.height = `calc(${e.target.scrollHeight}px - 4px)`;
      }
      else {
        e.target.style.height = 'auto'; // so we make sure we are auto initially
      }
    }
  }

  render() {
    return super.render(html`
            <textarea 
                @click="${this.handlekeyup}" 
                @keyup="${this.handlekeyup}" 
                @input="${this.handleinput}" 
                placeholder="${this.placeholder || ""}" 
                value="${this.value || ""}"
                rows="${this.rows}"
            ></textarea>
        `, 'textarea')
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-textarea": Textarea;
  }
}