// utils 
import { html } from "@circular-tools/utils";
import "@circular-tools/translator/wc";
import { Translator } from "@circular-tools/translator";

// atoms 
import "@circular/button/wc";
import "@circular/form/wc";
import "@circular/dropdown/wc";

// local 
import { style } from "./style";

export class LoginForm extends Translator {
    static style = style;

    render() {
        return html`
            <o-form name="password">
                <o-email></o-email>
                <o-password></o-password>

                <o-dropdown>
                    <o-option>Hello</o-option>
                    <o-option>World</o-option>
                    <o-option>Match</o-option>
                </o-dropdown>

                <o-button color="primary" size="large" mode="fill" type="submit">${this.translateKey("Login in")}</o-button>
            </o-form>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-login-form": LoginForm;
    }
}