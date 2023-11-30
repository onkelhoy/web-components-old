PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

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
## STYLE-CODE:
:host {
    container-type: inline-size;
    display: grid;
    grid-template-rows: auto minmax(80px, auto) 55px 1fr 89px;
    grid-template-columns: 2fr 4fr 50% 4fr 2fr;
    grid-template-areas: 
        "t t logo t2 t2"
        "z welcome welcome welcome z2"
        "k k note k2 k2"
        "k k form k2 k2"
        "k3 footer footer footer k4";

    justify-content: center;
    
    background-color: var(--pap-color-neutral-50);
    position: relative;
    height: 100vh;

    div.logo {
        grid-area: logo;
    }
    div.welcome {
        grid-area: welcome;
    }
    div.note {
        grid-area: note;
        display: flex;
        align-items: center;
    }
    div.form {
        grid-area: form;
    }
    div.footer {
        grid-area: footer;
    }

    div.flex {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: var(--gap-small, 8px);
    }

    ::slotted(pap-button),
    pap-button {
        gap: 0;
        padding: 0;
    }
}

// TODO I want to make the login form more responsive by manipulating grid on container
@container (max-width: 40em) {
    :host {
        grid-template-columns: 2fr 4fr 50% 4fr 2fr;
    }
}
@media (prefers-color-scheme: dark) {}