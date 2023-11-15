// utils 
import { html } from "@papit/tools-utils";
import "@papit/tools-translator/wc";

// atoms 
import "@papit/button/wc";
import "@papit/typography/wc";
import "@papit/icon/wc";

// templates
import { BaseTemplate } from "@papit/templates-base";

// local 
import { style } from "./style";

export class AuthTemplate extends BaseTemplate {
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