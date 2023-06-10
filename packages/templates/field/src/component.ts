// utils 
import { html, property } from "@circular-tools/utils";

// atoms
import "@circular/typography/wc";

// templates
import { BaseTemplate } from "@circular-templates/base";

// local 
import { style } from "./style";
import { Message } from "./types";

export class FieldTemplate<T extends HTMLElement = HTMLInputElement> extends BaseTemplate {
    static styles = [style];

    @property() name?: string;
    @property({ type: Object }) message?: Message;
    @property() label?: string;
    @property({ rerender: false }) value?: string;
    @property({ rerender: false, type: Boolean }) checked?: boolean;
    @property({ rerender: false, type: Number }) tabIndex = 1;

    protected inputElement!: T;

    private updateHidden(value:string) {

    }

    // event handlers 
    private handleinvalid_field = (e:Event) => {
        console.log('invalid')
    }
    private handlevalid_field = (e:Event) => {
        console.log('valid');
    }
    private handlechange_field = (e:Event) => {
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

    connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener('focus', this.handlefocus);
    }
    handlefocus = () => {
        // this.hasFocus = true;
        if (this.inputElement)
        {
            this.inputElement.focus();
        }
    }

    render(element:DocumentFragment, selector = "input") {
        if (element)
        {
            const input = element.querySelector<T>(selector);
            if (input && !input.hasAttribute('data-field-init'))
            {
                input.addEventListener('invalid', this.handleinvalid_field);
                input.addEventListener('valid', this.handlevalid_field);
                input.addEventListener('input', this.handlechange_field);
                input.addEventListener('change', this.handlechange_field);
                
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
                this.inputElement = input;
            }
        }
        return html`
            <slot part="label" name="label"><o-typography>${this.label || ""}</o-typography></slot>
            <div class="input" part="wrapper">
                <slot name="prefix"><span></span></slot>
                ${element ? element : '<slot></slot>'}
                <slot name="suffix"><span></span></slot>
            </div>
            <div class="message">
                <o-typography class="${this.message?.type || "hidden"}">${this.message?.message || ""}</o-typography>
                <o-typography></o-typography>
            </div>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "o-field-template": FieldTemplate;
    }
}