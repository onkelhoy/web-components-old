# Dropdown

Atomic Type: atoms

Version: 1.0.0

## Development 
Development servers can be started and should all exist inside `"views"` folder

## Scripts 
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and register code provided to you - could you create a rather simple introduction text with maybe a code example how to use in html - keep it very simple. Do not give example how to run the register code it's already included (this is for you so you can see the element-tag)! The introduction should be read by developers so it needs not to be simple enough for beginners!

## SOURCE-CODE:
// utils 
import { html, property, query, suspense } from "@circular-tools/utils";

// atoms
import '@circular/icon/wc';

// templates
import { TextinputTemplate } from '@circular-templates/textinput';
import { Placement, PopoverTemplate } from "@circular-templates/popover";
import '@circular-templates/popover/wc';
import '@circular-templates/box/wc';

// local 
import { style } from "./style";
import { IOption, OptionType } from "./types";
import { Option, OptionClick } from "./components/option";

export class Dropdown extends TextinputTemplate<HTMLInputElement> {
    static style = style;

    @property({ rerender: false, type: Boolean }) multiple: boolean = false; 
    @property() placement: Placement = "bottom-left";
    @property({ type: Boolean }) search: boolean = false;
    @property({ type: Array, rerender: false, onUpdate: "onoptionupdate" }) options?: Array<OptionType>;
    // @property({ type: Array, rerender: false, attribute: false }) values: string[] = [];
    @property({ rerender: false, type: Boolean }) popoveropen: boolean = false;
    @query('o-popover-template') popoverElement!: PopoverTemplate;

    // NOTE when we need values to be preselected... its gonna be a pain
    private __options:IOption[] = [];

    public get values() { 
        return this.value.split(',').map(v => v.trim());
    };
    public set values(values:string[]) { 
        this.value = values.join(',');

        const texts = new Array<string>();
        values.forEach(v => {
            const option = this.__options.find(o => o.value === v);
            if (option)
            {
                texts.push(option.text);
            }
        })

        const text = texts.join(', ');

        if (text.length > 25 && texts.length > 1) 
        {
            this.inputElement.value = `${texts.length} items selected`;
        }
        else 
        {
            this.inputElement.value = text;
        }
    };

    constructor() {
        super();

        this.debouncedCheckValue = suspense(this.checkValue, 100);
        this._suffix = html`<o-icon customsize="13" name="caret">^</o-icon>`
    }
    // private functions
    private debouncedCheckValue () {}
    private checkValue = () => {
        if (this.value && this.values.length === 0) 
        {
            this.values = this.value.split(',').map(v => v.trim());
        } 

        let newvalues = [...this.values];
        for (let i=0; i<newvalues.length; i++) 
        {
            if (!this.__options.find(o => newvalues[i] === o.value))
            {
                newvalues.splice(i, 1);
                i--;
            }
        }

        this.values = newvalues;
    }

    // public functions
    public registerOption(element: Option) {
        if (!element.hasAttribute('data-dropdown-option'))
        {
            element.setAttribute('data-dropdown-option', 'true');
            element.addEventListener('click', this.handleoptionclick);
            element.addEventListener('registered', this.handleoptionregister);
            this.__options.push({ text: element.getText(), value: element.getValue() })
            this.debouncedCheckValue();
        }
    }

    // on updates
    private onoptionupdate = () => {
        if (this.options)
        {
            this.__options = this.options.map(value => {
                if (typeof value === "number") return { text: value.toString(), value: value.toString() }
                if (typeof value === "boolean") return { text: value.toString(), value: value.toString() }
                if (typeof value === "string") return { text: value, value }
                return value;
            });

            this.debouncedRequestUpdate();
        }
    }
    
    // event handlers 
    override handlefocus = () => {
        this.hasFocus = true;
        if (!this.popoverElement.open) this.popoverElement.show();
    }
    private handleoptionregister = (e:Event) => {
        if (e.target instanceof Option)
        {
            this.__options.push({ text: e.target.getText(), value: e.target.getValue() })
        }
    }
    private handleoptionclick = (e:Event) => {
        if (e instanceof CustomEvent)
        {
            let values = this.values;
            const index = values.findIndex(v => v === e.detail.value);
            if (index >= 0)
            {
                values.splice(index, 1);   
            }
            else 
            {
                if (!this.multiple)
                {
                    // always clear it
                    values = [];
                }
                values.push(e.detail.value);
            }

            this.values = values;
        }
    }
    private handleShow = () => {
        this.popoveropen = true;
    }
    private handleHide = () => {
        this.popoveropen = false;
    }

    render() {
        const superrender = super.render(html`
            <input 
                @click="${this.handlekeyup}" 
                @keyup="${this.handlekeyup}" 
                data-tagname="select" ${!this.search ? "readonly='true'" : ""} 
                placeholder="${this.placeholder || ""}" 
                value="${this.value || ""}"
            />
        `)
        return html`
            <o-popover-template @show="${this.handleShow}" @hide="${this.handleHide}" revealby="click">
                <span slot="target">
                    ${superrender}
                </span>
                <o-box-template class="options" radius="small" elevation="small">
                    <slot>${this.__options.length > 0 ? this.__options.map(v => html`<o-option value="${v.value}">${v.text}</o-option>`) : '<o-option>Missing Options</o-option>'}</slot>
                </o-box-template>
            </o-popover-template>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "o-dropdown": Dropdown;
    }
}
## REGISTER-CODE:
import { Dropdown } from './component.js';
import { Option } from './components/option';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('o-dropdown')) {
  cElements.define('o-dropdown', Dropdown);
}
if (!cElements.get('o-option')) {
  cElements.define('o-option', Option);
}
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables. 
1. properties (columns: name, default-value, type, description) 
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc) 
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE:
 // utils 
import { html, property, query, suspense } from "@circular-tools/utils";

// atoms
import '@circular/icon/wc';

// templates
import { TextinputTemplate } from '@circular-templates/textinput';
import { Placement, PopoverTemplate } from "@circular-templates/popover";
import '@circular-templates/popover/wc';
import '@circular-templates/box/wc';

// local 
import { style } from "./style";
import { IOption, OptionType } from "./types";
import { Option, OptionClick } from "./components/option";

export class Dropdown extends TextinputTemplate<HTMLInputElement> {
    static style = style;

    @property({ rerender: false, type: Boolean }) multiple: boolean = false; 
    @property() placement: Placement = "bottom-left";
    @property({ type: Boolean }) search: boolean = false;
    @property({ type: Array, rerender: false, onUpdate: "onoptionupdate" }) options?: Array<OptionType>;
    // @property({ type: Array, rerender: false, attribute: false }) values: string[] = [];
    @property({ rerender: false, type: Boolean }) popoveropen: boolean = false;
    @query('o-popover-template') popoverElement!: PopoverTemplate;

    // NOTE when we need values to be preselected... its gonna be a pain
    private __options:IOption[] = [];

    public get values() { 
        return this.value.split(',').map(v => v.trim());
    };
    public set values(values:string[]) { 
        this.value = values.join(',');

        const texts = new Array<string>();
        values.forEach(v => {
            const option = this.__options.find(o => o.value === v);
            if (option)
            {
                texts.push(option.text);
            }
        })

        const text = texts.join(', ');

        if (text.length > 25 && texts.length > 1) 
        {
            this.inputElement.value = `${texts.length} items selected`;
        }
        else 
        {
            this.inputElement.value = text;
        }
    };

    constructor() {
        super();

        this.debouncedCheckValue = suspense(this.checkValue, 100);
        this._suffix = html`<o-icon customsize="13" name="caret">^</o-icon>`
    }
    // private functions
    private debouncedCheckValue () {}
    private checkValue = () => {
        if (this.value && this.values.length === 0) 
        {
            this.values = this.value.split(',').map(v => v.trim());
        } 

        let newvalues = [...this.values];
        for (let i=0; i<newvalues.length; i++) 
        {
            if (!this.__options.find(o => newvalues[i] === o.value))
            {
                newvalues.splice(i, 1);
                i--;
            }
        }

        this.values = newvalues;
    }

    // public functions
    public registerOption(element: Option) {
        if (!element.hasAttribute('data-dropdown-option'))
        {
            element.setAttribute('data-dropdown-option', 'true');
            element.addEventListener('click', this.handleoptionclick);
            element.addEventListener('registered', this.handleoptionregister);
            this.__options.push({ text: element.getText(), value: element.getValue() })
            this.debouncedCheckValue();
        }
    }

    // on updates
    private onoptionupdate = () => {
        if (this.options)
        {
            this.__options = this.options.map(value => {
                if (typeof value === "number") return { text: value.toString(), value: value.toString() }
                if (typeof value === "boolean") return { text: value.toString(), value: value.toString() }
                if (typeof value === "string") return { text: value, value }
                return value;
            });

            this.debouncedRequestUpdate();
        }
    }
    
    // event handlers 
    override handlefocus = () => {
        this.hasFocus = true;
        if (!this.popoverElement.open) this.popoverElement.show();
    }
    private handleoptionregister = (e:Event) => {
        if (e.target instanceof Option)
        {
            this.__options.push({ text: e.target.getText(), value: e.target.getValue() })
        }
    }
    private handleoptionclick = (e:Event) => {
        if (e instanceof CustomEvent)
        {
            let values = this.values;
            const index = values.findIndex(v => v === e.detail.value);
            if (index >= 0)
            {
                values.splice(index, 1);   
            }
            else 
            {
                if (!this.multiple)
                {
                    // always clear it
                    values = [];
                }
                values.push(e.detail.value);
            }

            this.values = values;
        }
    }
    private handleShow = () => {
        this.popoveropen = true;
    }
    private handleHide = () => {
        this.popoveropen = false;
    }

    render() {
        const superrender = super.render(html`
            <input 
                @click="${this.handlekeyup}" 
                @keyup="${this.handlekeyup}" 
                data-tagname="select" ${!this.search ? "readonly='true'" : ""} 
                placeholder="${this.placeholder || ""}" 
                value="${this.value || ""}"
            />
        `)
        return html`
            <o-popover-template @show="${this.handleShow}" @hide="${this.handleHide}" revealby="click">
                <span slot="target">
                    ${superrender}
                </span>
                <o-box-template class="options" radius="small" elevation="small">
                    <slot>${this.__options.length > 0 ? this.__options.map(v => html`<o-option value="${v.value}">${v.text}</o-option>`) : '<o-option>Missing Options</o-option>'}</slot>
                </o-box-template>
            </o-popover-template>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "o-dropdown": Dropdown;
    }
}

## TYPE-CODE: export type IOption = {
  text: string;
  value: string;
}
export type Primarytype = string | number | boolean;
export type OptionType = Primarytype | IOption;PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE:
// utils 
import { html, property, query, suspense } from "@circular-tools/utils";

// atoms
import '@circular/icon/wc';

// templates
import { TextinputTemplate } from '@circular-templates/textinput';
import { Placement, PopoverTemplate } from "@circular-templates/popover";
import '@circular-templates/popover/wc';
import '@circular-templates/box/wc';

// local 
import { style } from "./style";
import { IOption, OptionType } from "./types";
import { Option, OptionClick } from "./components/option";

export class Dropdown extends TextinputTemplate<HTMLInputElement> {
    static style = style;

    @property({ rerender: false, type: Boolean }) multiple: boolean = false; 
    @property() placement: Placement = "bottom-left";
    @property({ type: Boolean }) search: boolean = false;
    @property({ type: Array, rerender: false, onUpdate: "onoptionupdate" }) options?: Array<OptionType>;
    // @property({ type: Array, rerender: false, attribute: false }) values: string[] = [];
    @property({ rerender: false, type: Boolean }) popoveropen: boolean = false;
    @query('o-popover-template') popoverElement!: PopoverTemplate;

    // NOTE when we need values to be preselected... its gonna be a pain
    private __options:IOption[] = [];

    public get values() { 
        return this.value.split(',').map(v => v.trim());
    };
    public set values(values:string[]) { 
        this.value = values.join(',');

        const texts = new Array<string>();
        values.forEach(v => {
            const option = this.__options.find(o => o.value === v);
            if (option)
            {
                texts.push(option.text);
            }
        })

        const text = texts.join(', ');

        if (text.length > 25 && texts.length > 1) 
        {
            this.inputElement.value = `${texts.length} items selected`;
        }
        else 
        {
            this.inputElement.value = text;
        }
    };

    constructor() {
        super();

        this.debouncedCheckValue = suspense(this.checkValue, 100);
        this._suffix = html`<o-icon customsize="13" name="caret">^</o-icon>`
    }
    // private functions
    private debouncedCheckValue () {}
    private checkValue = () => {
        if (this.value && this.values.length === 0) 
        {
            this.values = this.value.split(',').map(v => v.trim());
        } 

        let newvalues = [...this.values];
        for (let i=0; i<newvalues.length; i++) 
        {
            if (!this.__options.find(o => newvalues[i] === o.value))
            {
                newvalues.splice(i, 1);
                i--;
            }
        }

        this.values = newvalues;
    }

    // public functions
    public registerOption(element: Option) {
        if (!element.hasAttribute('data-dropdown-option'))
        {
            element.setAttribute('data-dropdown-option', 'true');
            element.addEventListener('click', this.handleoptionclick);
            element.addEventListener('registered', this.handleoptionregister);
            this.__options.push({ text: element.getText(), value: element.getValue() })
            this.debouncedCheckValue();
        }
    }

    // on updates
    private onoptionupdate = () => {
        if (this.options)
        {
            this.__options = this.options.map(value => {
                if (typeof value === "number") return { text: value.toString(), value: value.toString() }
                if (typeof value === "boolean") return { text: value.toString(), value: value.toString() }
                if (typeof value === "string") return { text: value, value }
                return value;
            });

            this.debouncedRequestUpdate();
        }
    }
    
    // event handlers 
    override handlefocus = () => {
        this.hasFocus = true;
        if (!this.popoverElement.open) this.popoverElement.show();
    }
    private handleoptionregister = (e:Event) => {
        if (e.target instanceof Option)
        {
            this.__options.push({ text: e.target.getText(), value: e.target.getValue() })
        }
    }
    private handleoptionclick = (e:Event) => {
        if (e instanceof CustomEvent)
        {
            let values = this.values;
            const index = values.findIndex(v => v === e.detail.value);
            if (index >= 0)
            {
                values.splice(index, 1);   
            }
            else 
            {
                if (!this.multiple)
                {
                    // always clear it
                    values = [];
                }
                values.push(e.detail.value);
            }

            this.values = values;
        }
    }
    private handleShow = () => {
        this.popoveropen = true;
    }
    private handleHide = () => {
        this.popoveropen = false;
    }

    render() {
        const superrender = super.render(html`
            <input 
                @click="${this.handlekeyup}" 
                @keyup="${this.handlekeyup}" 
                data-tagname="select" ${!this.search ? "readonly='true'" : ""} 
                placeholder="${this.placeholder || ""}" 
                value="${this.value || ""}"
            />
        `)
        return html`
            <o-popover-template @show="${this.handleShow}" @hide="${this.handleHide}" revealby="click">
                <span slot="target">
                    ${superrender}
                </span>
                <o-box-template class="options" radius="small" elevation="small">
                    <slot>${this.__options.length > 0 ? this.__options.map(v => html`<o-option value="${v.value}">${v.text}</o-option>`) : '<o-option>Missing Options</o-option>'}</slot>
                </o-box-template>
            </o-popover-template>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "o-dropdown": Dropdown;
    }
}
## STYLE-CODE:
:host {
    --background: var(--dropdown-background-light, var(--o-color-white));
}

@media (prefers-color-scheme: dark) {
    :host {
        --background: var(--dropdown-background-dark, var(--o-color-white)); // NOTE in dark this is black
    }
}
:host o-popover-template {
    --popover-gap: 0.5rem;
    
    flex-grow: 1;
    width: 100%;

    input {
        width: 100%;
    }

    &::part(wrapper) {
        width: 100%;
    }
    o-box-template.options {
        box-sizing: border-box;
        padding: 0.5rem;
        width: 100%;
        display: block;
        background-color: var(--background);
        border: 1px solid grey;

        max-height: 15rem;
        overflow-y: auto;
    }
}

:host([popoveropen="true"]) o-icon[name="caret"] {
    transform: rotate(180deg);
}