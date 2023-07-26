PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE:
// utils 
import { html, property } from "@circular-tools/utils";
import "@circular-tools/translator/wc";
import { Translator } from "@circular-tools/translator";

// atoms 
import "@circular/button/wc";
import "@circular/typography/wc";
import "@circular/icon/wc";
import "@circular/input/wc";
import "@circular/form/wc";

// local 
import { style } from "./style";
import { RegisterModel } from "./types";

export class LoginForm extends Translator {
    static style = style;

    @property({ type: Object }) register?: RegisterModel;

    render() {
        return html`
            <o-icon customSize="200" name="interzero-logo"></o-icon>
            <o-typography variant="t2"><o-translator>👋 Welcome to Interzero.</o-translator></o-typography>
            <div>
                <o-typography><o-translator>Don't have an account?</o-translator></o-typography>
                <o-button variant="underlined"><o-translator>Register here</o-translator></o-button>
            </div>

            <o-form name="password">
                <o-email></o-email>
                <o-password></o-password>

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
## STYLE-CODE:
:host {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: var(--o-color-white);
    
    o-typography[variant="t2"] {
        margin-bottom: var(--margin-medium);
    }

    & > div {
        display: flex;
        align-items: center;
        gap: var(--gap-small);
        margin-bottom: 3rem;

        o-button {
            gap: 0;
            padding: 0;
        }
    }

    o-form {
        max-width: 30rem;
        width: 100%;
        
        o-button {
            margin-top: var(--gap-large);
        }
    }

}

@media (prefers-color-scheme: dark) {}