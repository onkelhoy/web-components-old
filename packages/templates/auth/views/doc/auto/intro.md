PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and register code provided to you - could you create a rather simple introduction text with maybe a code example how to use in html - keep it very simple. Do not give example how to run the register code it's already included (this is for you so you can see the element-tag)! The introduction should be read by developers so it needs not to be simple enough for beginners!

## SOURCE-CODE:
// utils 
import { html } from "@pap-it/system-utils";
import "@pap-it/tools-translator/wc";

// atoms 
import "@pap-it/button/wc";
import "@pap-it/typography/wc";
import "@pap-it/icon/wc";

// templates
import { BaseSystem } from "@pap-it/system-base";

// local 
import { style } from "./style";

export class AuthTemplate extends BaseSystem {
  static style = style;

  render() {
    return html`
            <div class="logo flex">
                <slot name="logo"><pap-icon customSize="200" name="interzero-logo"></pap-icon></slot>
            </div>
            <div class="welcome flex">
                <slot name="welcome"><pap-typography variant="t2"><pap-translator>👋 Welcome to Interzero.</pap-translator></pap-typography></slot>
            </div>
            <div class="note flex">
                <slot name="note">
                    <pap-typography nowrap><pap-translator>Don't have an account?</pap-translator></pap-typography>
                    <pap-button variant="underlined"><pap-typography nowrap><pap-translator>Register here</pap-translator></pap-typography></pap-button>
                </slot>
            </div>
            <div class="form form-wrapper">
                <slot></slot>
            </div>
            <div class="footer flex">
                <slot name="footer">
                    <pap-button link="https://www.interzero.de/" variant="underlined"><pap-translator>Interzero</pap-translator></pap-button>
                    <pap-button link="https://www.interzero.de/kontakt" variant="underlined"><pap-translator>Contact</pap-translator></pap-button>
                    <pap-typography><pap-translator>© 2022 - Interzero Circular Solutions Germany Gmbh</pap-translator></pap-typography>
                </slot>
            </div>
        `
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-auth-template": AuthTemplate;
  }
}
## REGISTER-CODE:
import { AuthTemplate } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-auth-template')) {
  cElements.define('pap-auth-template', AuthTemplate);
}
