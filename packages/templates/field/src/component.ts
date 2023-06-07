// utils 
import { html, property } from "@circular-tools/utils";

// templates
import { BaseTemplate } from "@circular-templates/base";

// local 
import { style } from "./style";
import { Message } from "./types";

export class FieldTemplate extends BaseTemplate {
    static styles = [style];

    @property() name?: string;
    @property({ type: Object }) message?: Message;
    @property() label?: string;
    @property({ rerender: false }) value?: string;
    @property({ rerender: false, type: Boolean }) checked?: boolean;
    @property({ rerender: false, type: Boolean }) private isfocus?: boolean;

    private inputElement!: HTMLElement;

    private updateHidden(value:string) {

    }

    // event handlers 
    private handleinvalid = (e:Event) => {
        console.log('invalid')
    }
    private handlevalid = (e:Event) => {
        console.log('valid');
    }
    private handleblur = () => {
        this.isfocus = false;
    }
    private handlefocus = () => {
        this.isfocus = true;
    }
    private handlechange = (e:Event) => {
        if (e.target instanceof HTMLElement)
        {
            if (this.name)
            {
                // check validity ?
            }

            const type = e.target.getAttribute('type')
            if ('checked' in e.target && (type === "radio" || type === "checkbox"))
            {
                this.setAttribute('checked', e.target.checked as string);
            }
            else if ('value' in e.target)
            {
                this.value = e.target.value as string;
            }
        }
    }

    render(element:DocumentFragment, selector = "input") {
        const input = element.querySelector(selector);
        if (input && !input.hasAttribute('data-field-init'))
        {
            input.addEventListener('invalid', this.handleinvalid);
            input.addEventListener('valid', this.handlevalid);
            input.addEventListener('input', this.handlechange);
            input.addEventListener('change', this.handlechange);
            input.addEventListener('blur', this.handleblur);
            input.addEventListener('focus', this.handlefocus);
            
            const type = input.getAttribute('type')
            if (type === "radio" || type === "checkbox")
            {
                if (this.checked !== undefined)
                {
                    input.setAttribute('checked', this.checked.toString());
                }
            }
            else 
            {
                if (this.value !== undefined)
                {
                    input.setAttribute('value', this.value);
                }
            }

            
            input.setAttribute('data-field-init', 'true');
            this.inputElement = input as HTMLElement;
        }
        return html`
            <slot part="label" name="label">${this.label || ""}</slot>
            <div class="input">
                <slot name="prefix"><span></span></slot>
                ${element}
                <slot name="suffix"><span></span></slot>
            </div>
            <div class="">
                <p class="${this.message?.type || "hidden"}">${this.message?.message || ""}</p>
                <p></p>
            </div>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "o-field-template": FieldTemplate;
    }
}