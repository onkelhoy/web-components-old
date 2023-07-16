// utils 
import { html, property } from "@circular-tools/utils";
import "@circular-tools/translator/wc";

// atoms 
import "@circular/typography/wc";
import "@circular/button/wc";

// molecules
import "@circular/login-form/wc";

// templates
import { BaseTemplate } from "@circular-templates/base";
import "@circular-templates/auth/wc";

// local 
import { style } from "./style";
import { Project } from "./types";

export class LoginPage extends BaseTemplate {
    static style = style;

    @property() project: Project = "PMP";

    render() {
        switch (this.project) {
            case "KTV":
                return html`
                    <o-auth-template>
                        <o-typography align="center" slot="welcome" variant="t2"><o-translator>Register your quantities with us conveniently and quickly.</o-translator></o-typography>
                        <o-typography slot="note" align="center"><o-translator>Don't have an account?</o-translator></o-typography>
                        <o-button slot="note" link="" variant="underlined"><o-translator>contact us</o-translator></o-button>
                        <o-login-form></o-login-form>
                    </o-auth-template>
                `
            default: // case "PMP":
            {
                return html`
                    <o-auth-template>
                        <o-login-form></o-login-form>
                    </o-auth-template>
                `
            }
        }
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-login-page": LoginPage;
    }
}