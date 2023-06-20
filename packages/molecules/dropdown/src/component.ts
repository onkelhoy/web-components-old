// utils 
import { html, property, query } from "@circular-tools/utils";

// atoms
import '@circular/icon/wc';

// templates
import { TextinputTemplate } from '@circular-templates/textinput';
import { Placement, PopoverTemplate } from "@circular-templates/popover";
import '@circular-templates/popover/wc';
import '@circular-templates/box/wc';

// local 
import { style } from "./style";
import { IOption } from "./types";
import { Option, OptionClick } from "./components/option";

export class Dropdown extends TextinputTemplate<HTMLInputElement> {
    static style = style;

    @property({ rerender: false, type: Boolean }) multiple: boolean = false; 
    @property() placement: Placement = "bottom-left";
    @property({ type: Boolean }) search: boolean = false;
    @property({ type: Array, rerender: false, attribute: false }) values: string[] = [];
    @property({ rerender: false, type: Boolean }) popoveropen: boolean = false;
    @query('o-popover-template') popoverElement!: PopoverTemplate;

    // NOTE when we need values to be preselected... its gonna be a pain
    private options:IOption[] = [];

    constructor() {
        super();

        this._suffix = html`<o-icon customsize="13" name="caret">^</o-icon>`
    }

    
    // event handlers 
    override handlefocus = () => {
        this.hasFocus = true;
        if (!this.popoverElement.open) this.popoverElement.show();
    }
    private handleoptionslotchange = (e:Event) => {
        if (e.target instanceof HTMLSlotElement)
        {
            const elements = e.target.assignedElements();
            elements.forEach(element => {
                if (element instanceof Option) 
                {
                    if (!element.hasAttribute('data-dropdown-option'))
                    {
                        element.setAttribute('data-dropdown-option', 'true');
                        element.Connect(this);
                        element.addEventListener('click', this.handleoptionclick);
                        element.addEventListener('registered', this.handleoptionregister);
                    }
                }
            })
        }
    }
    private handleoptionregister = (e:Event) => {
        if (e.target instanceof Option)
        {
            this.options.push({ text: e.target.getText(), value: e.target.getValue() })
        }
    }
    private handleoptionclick = (e:Event) => {
        if (e instanceof CustomEvent<OptionClick>)
        {
            console.log(e.detail)
            const index = this.values.findIndex(v => v === e.detail.value);
            if (index >= 0)
            {
                this.values.splice(index, 1);   
            }
            else 
            {
                if (!this.multiple)
                {
                    // always clear it
                    this.values = [];
                }
                this.values.push(e.detail.value);
            }

            this.Value = this.values.join(', ');

            const texts = new Array<string>();
            this.values.forEach(v => {
                const option = this.options.find(o => o.value === v);
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
            <input data-tagname="select" ${!this.search ? "readonly='true'" : ""} @click="${this.handlekeyup}" @keyup="${this.handlekeyup}" placeholder="${this.placeholder || ""}" value="${this.value || ""}" />
        `)
        return html`
            <o-popover-template @show="${this.handleShow}" @hide="${this.handleHide}" revealby="click">
                <span slot="target">
                    ${superrender}
                </span>
                <o-box-template class="options" radius="small" elevation="small">
                    <slot @slotchange="${this.handleoptionslotchange}">${this.options ? "" : '<o-option>Missing Options</o-option>'}</slot>
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