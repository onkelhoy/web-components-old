// utils 
import { html, property, query, suspense } from "@onkelhoy/tools-utils";

// atoms
import '@onkelhoy/icon/wc';

// templates
import { TextinputTemplate } from '@onkelhoy/templates-textinput';
import { Placement, PopoverTemplate } from "@onkelhoy/templates-popover";
import '@onkelhoy/templates-popover/wc';
import '@onkelhoy/templates-box/wc';

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