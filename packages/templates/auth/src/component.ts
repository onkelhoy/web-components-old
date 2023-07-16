// utils 
import { html } from "@circular-tools/utils";
import "@circular-tools/translator/wc";

// atoms 
import "@circular/button/wc";
import "@circular/typography/wc";
import "@circular/icon/wc";
import "@circular/input/wc";
import "@circular/form/wc";

// templates
import { BaseTemplate } from "@circular-templates/base";

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
                    <o-typography><o-translator>Don't have an account?</o-translator></o-typography>
                    <o-button variant="underlined"><o-translator>Register here</o-translator></o-button>
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