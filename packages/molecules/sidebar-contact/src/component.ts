// utils
import { html, property } from "@henry2/tools-utils";

// atoms
import "@henry2/accordion/wc";
import "@henry2/button/wc";
import "@henry2/icon/wc";
import "@henry2/typography/wc";
import "@henry2/divider/wc";

// templates
import { BaseTemplate } from "@henry2/templates-base";
import "@henry2/templates-box/wc";

// local
import { style } from "./style";
import { Contact } from "./types";

export class SidebarContact extends BaseTemplate {
    static style = style;

    @property({ type: Boolean }) open:boolean = false;
    @property({ type: Array }) contacts: Contact[] = [];

    private handleHeaderClick = () => {
        this.open = !this.open;
    }

    private getContact = (contact: Contact, index: number) => {
        const buttons = [];
        if (contact.email)
        {
            buttons.push(html`
                <o-button
                    variant="clear"
                    mode="fill"
                    color="secondary"
                    href="mailto:${contact.email}"
                >
                    <o-translator>Write an email</o-translator>
                </o-button>
            `);
        }
        if (contact.teams)
        {
            buttons.push(html`
                <o-button
                    variant="clear"
                    mode="fill"
                    color="secondary"
                    href="https://teams.microsoft.com/l/call/0/0?users=${contact.teams}"
                >
                    <o-translator>Call via Teams</o-translator>
                </o-button>
            `);
        }

        console.log('has phone?', contact.phone)

        return html`
            <div>
                <o-typography variant="C4">${contact.role}</o-typography>
                <o-typography variant="C2">${contact.name}</o-typography>
            </div>
            ${contact.phone ? html`
                <div>
                    <o-icon name="phone"></o-icon>
                    <o-typography><a href="tel:${contact.phone}">${contact.phone}</a></o-typography>
                </div>
            ` : ''}
            ${buttons.length > 0 ? html`<div>${buttons}</div>` : ''}
            ${index < this.contacts.length - 1 ? '<o-divider></o-divider>' : ''}
        `;
    }

    render() {

        const contacts = this.contacts.map(this.getContact);

        return html`
            <o-box-template part="collapsed"><o-icon name="phone"></o-icon></o-box-template>
            <o-box-template radius="medium" part="base">
                <header part="header" @click="${this.handleHeaderClick}">
                    <o-typography variant="C4"> <o-translator>Contact</o-translator> </o-typography>
                    <o-icon size="small" name="caret"></o-icon>
                </header>
                <o-accordion open="${this.open}">
                    <o-divider></o-divider>
                    ${contacts.length > 0 ? contacts : '<o-typography> <o-translator>No available contacts</o-translator> </o-typography>'}
                </o-accordion>
            </o-box-template>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-sidebar-contact": SidebarContact;
    }
}