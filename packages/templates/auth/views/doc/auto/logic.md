PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables.

1. properties (columns: name, default-value, type, description)
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc)
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE

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
                <slot name="logo"><pap-icon custom-size="200" name="interzero-logo"></pap-icon></slot>
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

## TYPE-CODE: export {}
