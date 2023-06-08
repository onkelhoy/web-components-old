// utils 
import { html, property } from "@circular-tools/utils";

// atoms
import '@circular/input/wc';
import '@circular/button/wc';
import '@circular/icon/wc';

// templates 
import { BoxTemplate } from '@circular-templates/box';
import { PopoverTemplate } from '@circular-templates/popover';


// local 
import { style } from "./style";

export class Writer extends BoxTemplate  {
    static style = style;

    // event handlers

    override render() {
        return html`
          <o-input>
            <o-button slot="prefix">
              <o-icon name="plus">+</o-icon>
            </o-button>
            <o-popover-template revealby="click" placement="top-right" slot="suffix">
              <o-button slot="target">
                <o-icon name="smiley">smiley</o-icon>
              </o-button>

              hejsan svejsnan
            </o-popover-template>
          </o-input>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-chat-writer": Writer;
    }
}