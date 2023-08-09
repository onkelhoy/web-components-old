// utils 
import { html, property } from "@onkelhoy/tools-utils";
import { Translator } from "@onkelhoy/tools-translator";
import "@onkelhoy/tools-translator/wc";

// atoms 
import "@onkelhoy/typography/wc";
import "@onkelhoy/button/wc";

// templates
import "@onkelhoy/templates-auth/wc";

// local 
import { style } from "./style";
import { Project } from "./types";

export class LoginPage extends Translator {
    static style = style;

    @property() project: Project = "PMP";

    // event handlers 
    private handlesubmit = (e:Event) => {
        if (e instanceof CustomEvent) {
            console.log(e.detail.data);
        }
    }

    render() {
        let form = null;
        switch (this.project) {
            case "pfandportal":
                form = html`
                    <o-form @o-submit="${this.handlesubmit}" name="password">
                        <o-username></o-username>
                        <o-password></o-password>

                        <o-button color="primary" size="medium" mode="fill" type="submit">${this.translateKey("Log in")}</o-button>
                    </o-form>
                `;
                break;
            default:
                form = html`
                    <o-form @o-submit="${this.handlesubmit}" name="password">
                        <o-email></o-email>
                        <o-password></o-password>

                        <o-button color="primary" size="medium" mode="fill" type="submit">${this.translateKey("Log in")}</o-button>
                    </o-form>
                `;
                break;
        }

        switch (this.project) {
            case "KTV":
                return html`
                    <o-auth-template>
                        <o-typography align="center" slot="welcome" variant="t2"><o-translator>Register your quantities with us conveniently and quickly.</o-translator></o-typography>
                        <o-typography slot="note" align="center"><o-translator>Don't have an account?</o-translator></o-typography>
                        <o-button slot="note" link="" variant="underlined"><o-translator>contact us</o-translator></o-button>
                        ${form}
                    </o-auth-template>
                `
            case "pfandportal":
                return html`
                    <o-auth-template>
                        <span slot="note"></span>
                        ${form}
                    </o-auth-template>
                `
            default: // case "PMP":
            {
                return html`
                    <o-auth-template>
                        ${form}
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