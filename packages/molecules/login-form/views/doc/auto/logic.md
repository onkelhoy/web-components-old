PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables. 
1. properties (columns: name, default-value, type, description) 
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc) 
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

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

## TYPE-CODE: import { OptionType } from '@circular/dropdown'

export type FieldConfig = {
  type: "input"|"dropdown"|"checkbox"|"textarea",
  properties: Record<string, any>;
  options?: OptionType[];
}
export type RegisterModel = Record<string, FieldConfig>;