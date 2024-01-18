PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables.

1. properties (columns: name, default-value, type, description)
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc)
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE

 // system
import { html, property } from "@pap-it/system-utils";
import { Translator } from "@pap-it/tools-translator";
import "@pap-it/tools-translator/wc";

// atoms
import "@pap-it/typography/wc";
import "@pap-it/button/wc";

// templates
import "@pap-it/templates-auth/wc";

// local
import { style } from "./style";
import { Project } from "./types";

export class LoginPage extends Translator {
  static style = style;

  @property() project: Project = "PMP";

  // event handlers
  private handlesubmit = (e: Event) => {
    if (e instanceof CustomEvent) {
      console.log(e.detail.data);
    }
  }

  render() {
    let form = null;
    switch (this.project) {
      case "pfandportal":
        form = html`
                    <pap-form @pap-submit="${this.handlesubmit}" name="password">
                        <pap-username></pap-username>
                        <pap-password></pap-password>

                        <pap-button color="primary" size="medium" mode="fill" type="submit">${this.translateKey("Log in")}</pap-button>
                    </pap-form>
                `;
        break;
      default:
        form = html`
                    <pap-form @pap-submit="${this.handlesubmit}" name="password">
                        <pap-email></pap-email>
                        <pap-password></pap-password>

                        <pap-button color="primary" size="medium" mode="fill" type="submit">${this.translateKey("Log in")}</pap-button>
                    </pap-form>
                `;
        break;
    }

    switch (this.project) {
      case "KTV":
        return html`
                    <pap-auth-template>
                        <pap-typography align="center" slot="welcome" variant="t2"><pap-translator>Register your quantities with us conveniently and quickly.</pap-translator></pap-typography>
                        <pap-typography slot="note" align="center"><pap-translator>Don't have an account?</pap-translator></pap-typography>
                        <pap-button slot="note" link="" variant="underlined"><pap-translator>contact us</pap-translator></pap-button>
                        ${form}
                    </pap-auth-template>
                `
      case "pfandportal":
        return html`
                    <pap-auth-template>
                        <span slot="note"></span>
                        ${form}
                    </pap-auth-template>
                `
      default: // case "PMP":
        {
          return html`
                    <pap-auth-template>
                        ${form}
                    </pap-auth-template>
                `
        }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-login-page": LoginPage;
  }
}

## TYPE-CODE: export type Project = "KTV" | "PMP" | "pfandportal"
