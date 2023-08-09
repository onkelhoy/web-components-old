PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and register code provided to you - could you create a rather simple introduction text with maybe a code example how to use in html - keep it very simple. Do not give example how to run the register code it's already included (this is for you so you can see the element-tag)! The introduction should be read by developers so it needs not to be simple enough for beginners!

## SOURCE-CODE:
// utils 
import { html, property } from "@henry2/tools-utils";

// templates
import { TextinputTemplate } from '@henry2/templates-textinput';

// local 
import { style } from "./style";
import { Resize } from './types';

export class Textarea extends TextinputTemplate<HTMLTextAreaElement> {
    static style = style;

    @property({ type: Number }) rows:number = 4;
    @property({ rerender: false }) resize:Resize = "none";

    // event functions
    private handleinput = (e:Event) => {
        if (this.resize === "auto" && e.target instanceof HTMLTextAreaElement)
        {
            // dont know why fully this works but it does 
            e.target.style.height = "auto";
            // the -4 is also weird but it works - maybe border ? im not sure 
            e.target.style.height = `calc(${e.target.scrollHeight}px - 4px)`;
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
        "o-textarea": Textarea;
    }
}
## REGISTER-CODE:
import { Textarea } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('o-textarea')) {
  cElements.define('o-textarea', Textarea);
}
