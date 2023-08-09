// utils 
import { html } from "@onkelhoy/tools-utils";
import "@onkelhoy/tools-translator/wc";

// atoms 
import "@onkelhoy/button/wc";
import "@onkelhoy/typography/wc";
import "@onkelhoy/icon/wc";
import "@onkelhoy/input/wc";
import "@onkelhoy/form/wc";

// templates
import { BaseTemplate } from "@onkelhoy/templates-base";

// local 
import { style } from "./style";

export class AuthTemplate extends BaseTemplate {
    static style = style;

    render() {
        return html`
            <div class="logo flex">
                <slot name="logo"><o-icon customSize="200" name="interzero-logo"></o-icon></slot>
            </div>
            <div class="welcome flex">
                <slot name="welcome"><o-typography variant="t2"><o-translator>👋 Welcome to Interzero.</o-translator></o-typography></slot>
            </div>
            <div class="note flex">
                <slot name="note">
                    <o-typography nowrap><o-translator>Don't have an account?</o-translator></o-typography>
                    <o-button variant="underlined"><o-typography nowrap><o-translator>Register here</o-translator></o-typography></o-button>
                </slot>
            </div>
            <div class="form form-wrapper">
                <slot></slot>
            </div>
            <div class="footer flex">
                <slot name="footer">
                    <o-button link="https://www.interzero.de/" variant="underlined"><o-translator>Interzero</o-translator></o-button>
                    <o-button link="https://www.interzero.de/kontakt" variant="underlined"><o-translator>Contact</o-translator></o-button>
                    <o-typography><o-translator>© 2022 - Interzero Circular Solutions Germany Gmbh</o-translator></o-typography>
                </slot>
            </div>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-auth-template": AuthTemplate;
    }
}