PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables.

1. properties (columns: name, default-value, type, description)
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc)
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE

 // utils
import { html, property } from "@pap-it/system-utils";

// atoms
import "@pap-it/accordion/wc";
import "@pap-it/button/wc";
import "@pap-it/icon/wc";
import "@pap-it/typography/wc";
import "@pap-it/divider/wc";

// templates
import { Base } from "@pap-it/system-base";
import "@pap-it/templates-box/wc";

// local
import { style } from "./style";
import { Contact } from "./types";

export class SidebarContact extends Base {
  static style = style;

  @property({ type: Boolean }) open: boolean = false;
  @property({ type: Array }) contacts: Contact[] = [];

  private handleHeaderClick = () => {
    this.open = !this.open;
  }

  private getContact = (contact: Contact, index: number) => {
    const buttons = [];
    if (contact.email) {
      buttons.push(html`
                <pap-button
                    variant="clear"
                    mode="fill"
                    color="secondary"
                    href="mailto:${contact.email}"
                >
                    <pap-translator>Write an email</pap-translator>
                </pap-button>
            `);
    }
    if (contact.teams) {
      buttons.push(html`
                <pap-button
                    variant="clear"
                    mode="fill"
                    color="secondary"
                    href="https://teams.microsoft.com/l/call/0/0?users=${contact.teams}"
                >
                    <pap-translator>Call via Teams</pap-translator>
                </pap-button>
            `);
    }

    console.log('has phone?', contact.phone)

    return html`
            <div>
                <pap-typography variant="C4">${contact.role}</pap-typography>
                <pap-typography variant="C2">${contact.name}</pap-typography>
            </div>
            ${contact.phone ? html`
                <div>
                    <pap-icon name="phone"></pap-icon>
                    <pap-typography><a href="tel:${contact.phone}">${contact.phone}</a></pap-typography>
                </div>
            ` : ''}
            ${buttons.length > 0 ? html`<div>${buttons}</div>` : ''}
            ${index < this.contacts.length - 1 ? '<pap-divider></pap-divider>' : ''}
        `;
  }

  render() {

    const contacts = this.contacts.map(this.getContact);

    return html`
            <pap-box-template part="collapsed"><pap-icon name="phone"></pap-icon></pap-box-template>
            <pap-box-template radius="medium" part="base">
                <header part="header" @click="${this.handleHeaderClick}">
                    <pap-typography variant="C4"> <pap-translator>Contact</pap-translator> </pap-typography>
                    <pap-icon size="small" name="caret"></pap-icon>
                </header>
                <pap-accordion open="${this.open}">
                    <pap-divider></pap-divider>
                    ${contacts.length > 0 ? contacts : '<pap-typography> <pap-translator>No available contacts</pap-translator> </pap-typography>'}
                </pap-accordion>
            </pap-box-template>
        `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-sidebar-contact": SidebarContact;
  }
}

## TYPE-CODE: export type Contact = {

  role: string;
  name: string;
  phone?: string;
  teams?: string;
  email?: string;
}
