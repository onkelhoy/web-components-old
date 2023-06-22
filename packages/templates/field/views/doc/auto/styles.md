PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE:
// utils 
import { html, property, suspense, Radius, Size } from "@circular-tools/utils";

// atoms
import "@circular/typography/wc";

// templates
import { BaseTemplate } from "@circular-templates/base";
import "@circular-templates/box/wc";

// local 
import { style } from "./style";
import { Message } from "./types";

export class FieldTemplate<T extends HTMLElement = HTMLInputElement> extends BaseTemplate {
    static styles = [style];

    @property() name?: string;
    @property({ type: Object }) message?: Message;
    @property() label?: string;
    @property({ rerender: false }) size: Size = "medium";
    @property({ rerender: false }) radius: Radius = "small";
    @property({ rerender: false }) value?: string;
    @property({ rerender: false, type: Boolean }) checked?: boolean;
    @property({ rerender: false, type: Number }) tabIndex = 1;
    @property({ type: Boolean }) readonly: boolean = false;

    @property() protected _suffix?: DocumentFragment|string = "<span> </span>";
    @property() protected _prefix?: DocumentFragment|string = "<span> </span>";

    public inputElement!: T;

    private updateHidden(value:string) {

    }

    // event handlers 
    private handleinvalid_field = (e:Event) => {
        console.log('invalid')
    }
    private handlevalid_field = (e:Event) => {
        console.log('valid');
    }
    private handleinput_field = (e:Event) => {
        this.handlechange_field(e, false);
        
        this.dispatchEvent(new Event('input'));
        this.debouncedInput();
    }
    private handlechange_field = (e:Event, dispatch = true) => {
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

            if (dispatch) 
            {
                this.dispatchEvent(new Event('change'))
            }
        }
    }

    // private functions ¨
    private debouncedInput = () => {
        this.dispatchEvent(new Event('suspended-input'));
    }

    // public functions
    handlefocus = () => {
        // this.hasFocus = true;
        if (this.inputElement)
        {
            this.inputElement.focus();
        }
    }
    public set Value(value:string|boolean) {
        this.value = value.toString();

        const type = this.inputElement.getAttribute('type')
        if ('checked' in this.inputElement && (type === "radio" || type === "checkbox"))
        {
            this.inputElement.checked = value;
            this.setAttribute('checked', this.value);
        }
        else if ('value' in this.inputElement)
        {
            this.inputElement.value = this.value;
        }

        if (type === "radio" || type === "checkbox" || this.inputElement.getAttribute('data-tagname') === "select" || this.inputElement.tagName === "select")
        {
            this.inputElement.dispatchEvent(new Event('change'));
        }
        else 
        {
            this.inputElement.dispatchEvent(new Event('input'));
        }
    }

    // class functions
    constructor(delay = 100) {
        super();

        this.debouncedInput = suspense(this.debouncedInput, delay);
    }
    connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener('focus', this.handlefocus);
    }

    render(element:DocumentFragment, selector = "input") {
        if (element)
        {
            const input = element.querySelector<T>(selector);
            if (input && !input.hasAttribute('data-field-init'))
            {
                input.addEventListener('invalid', this.handleinvalid_field);
                input.addEventListener('valid', this.handlevalid_field);
                input.addEventListener('input', this.handleinput_field);
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

                if (this.readonly) input.setAttribute('readonly', 'true');
                
                input.setAttribute('data-field-init', 'true');
                this.inputElement = input;
            }
        }
        return html`
            <slot part="label" name="label"><o-typography>${this.label || ""}</o-typography></slot>
            <o-box-template radius="${this.radius}" class="wrapper" part="wrapper">
                <slot name="prefix">${this._prefix}</slot>
                ${element ? element : '<slot></slot>'}
                <slot name="suffix">${this._suffix}</slot>
            </o-box-template>
            <div part="message" class="message">
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
## STYLE-CODE:
$size-map: (
  small: (
    height: 20px,
    padding: 0.5rem,
  ),
  medium: (
    height: 32px,
    padding: 1rem,
  ),
  large: (
    height: 48px,
    padding: 1rem,
  ),
);

@each $name, $value in $size-map {
    :host([size="#{$name}"]) {
        o-box-template.wrapper {
            height: var(--field-height-#{$name}, var(--height-#{$name}, #{map-get($value, height)}));
            // padding: var(--field-padding-#{$name}, var(--padding-#{$name}, #{map-get($value, padding)}));
        }
    }
} 

:host {
    --border: var(--field-light-background-color, var(--colors-netural-black, rgb(0, 0, 0)));
    --outline: var(--field-light-background-color, rgb(90, 46, 250));
    --color: var(--field-light-text-color, var(--colors-netural-white, rgb(0, 0, 0)));
    --default-fontfamily: 'Poppins', sans-serif;

    display: block;
    color: var(--color);

    o-box-template.wrapper {
        box-sizing: border-box;
        position: relative;
        display: flex;
        align-items: center;
        gap: 0.2rem;
        padding-inline: 0.5rem;
        border: 1px solid var(--border);

        ::slotted(*:not([slot])),        
        input, select, textarea {
            color: inherit;

            font-family: var(--input-fontfamily, var(--typography-c3-fontfamily, var(--default-fontfamily)));
            font-size: var(--input-fontsize, var(--typography-c3-fontsize, 16px));
            font-weight: var(--input-fontweight, var(--typography-c3-fontweight, 400));
            line-height: var(--input-lineheight, var(--typography-c3-lineheight, 24px));
            letter-spacing: var(--input-letterspacing, var(--typography-c3-letterspacing, 0.01em));
            
            flex-grow: 1;
            display: block;
            // padding-block: 0.5rem;
            border: none;
            background-color: transparent;
            outline: none !important;
        }
    }

    &:focus {
        outline: none;
    }
}

:host([hasfocus="true"]),
:host(:focus) {
    outline: none;

    o-box-template.wrapper {
        outline: 1px solid var(--outline);
    }
}

@media (prefers-color-scheme: dark) {
    :host {
        --border: var(--field-dark-background-color, var(--colors-netural-white, rgb(255, 255, 255)));
        --outline: var(--field-dark-background-color, rgb(195, 211, 255));
        --color: var(--field-dark-text-color, var(--colors-netural-white, white));
    }
}