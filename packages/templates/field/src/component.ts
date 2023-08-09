// utils 
import { html, query, property, suspense, Radius, Size } from "@onkelhoy/tools-utils";

// atoms
import "@onkelhoy/typography/wc";

// templates
import { FormElementTemplate } from "@onkelhoy/templates-form-element";
import "@onkelhoy/templates-box/wc";

// local 
import { style } from "./style";
import { Message } from "./types";

export class FieldTemplate<T extends HTMLElement = HTMLInputElement> extends FormElementTemplate {
    static styles = [style];

    @property({ type: Number }) public counter: number = 0;

    @query('.counter') public counterElement?: HTMLSpanElement;

    @property({ type: Object }) message?: Message;
    @property() label?: string;
    @property({ rerender: false }) size: Size = "medium";
    @property({ rerender: false }) radius: Radius = "small";
    @property({ rerender: false, type: Boolean, onUpdate: "oncheckedupdate" }) checked?: boolean;
    @property({ rerender: false, type: Number }) tabIndex = 1;
    @property({ type: Boolean }) readonly: boolean = false;
    @property({ rerender: false, onUpdate: "onvalueupdate" }) value: string = "";

    // common regulations
    @property({ rerender: false, type: Number }) max?: number;
    @property({ rerender: false, type: Number }) min?: number;

    @property({ type: Object, attribute: false }) protected _suffix?: DocumentFragment|string = "<span> </span>";
    @property({ type: Object, attribute: false }) protected _prefix?: DocumentFragment|string = "<span> </span>";

    public inputElement!: T;
    private hiddenElement?: HTMLInputElement;
    private attributequeue: [string, string|null][] = [];
 
    // on update functions
    private onvalueupdate = (value:string) => {
        if (!this.inputElement) return;

        const type = this.inputElement.getAttribute('type')
        if ('checked' in this.inputElement && (type === "radio" || type === "checkbox"))
        {

            
            this.checked = value === "true";
            this.inputElement.checked = this.checked;
            if (this.hiddenElement) this.hiddenElement.checked = this.checked;
            
            // this.value = value;
            if (this.hiddenElement) this.hiddenElement.value = this.value;

            if (!this.checked)
            {
                this.inputElement.removeAttribute("checked");
                if (this.hiddenElement) this.hiddenElement.removeAttribute("checked");
            }
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
    protected oncheckedupdate = (value:boolean) => {
        this.onvalueupdate(value.toString());
    }

    // event handlers 
    private handleinvalid_field = (e:Event) => {
        console.log('invalid')
    }
    private handlevalid_field = (e:Event) => {
        console.log('valid');
    }
    protected handleinput_field = (e:Event) => {
        this.handlechange_field(e, false);
        
        this.dispatchEvent(new Event('input'));
        this.debouncedInput();

        if (this.counter && this.counterElement)
        {
            this.counterElement.innerHTML = this.value.length.toString();
        }
    }
    protected handlechange_field = (e:Event, dispatch = true) => {
        if (e.target instanceof HTMLElement)
        {
            if (this.name)
            {
                // check validity ?
            }

            const type = e.target.getAttribute('type')
            if ('checked' in e.target && (type === "radio" || type === "checkbox"))
            {
                // do something ?
                this.value = (e.target.checked || false).toString();
                if (this.hiddenElement) this.hiddenElement.value = this.value;
            }
            else if ('value' in e.target)
            {
                this.value = e.target.value as string;
                if (this.hiddenElement) this.hiddenElement.value = this.value;
            }

            if (dispatch) 
            {
                this.dispatchEvent(new Event('change'))
            }
        }
    }
    private handlehiddeninvalid = (e:Event) => {
        console.log('invalid', e);
    }
    private handleformelementload = () => {
        this.assignHiddenElement();
    }

    // private functions ¨
    protected debouncedInput = () => {
        this.dispatchEvent(new Event('suspended-input'));
    }
    private assignHiddenElement() {
        if (!this.formElement) this.findForm();
        if (!this.hiddenElement && this.getAttribute("name"))
        {
            // form in case of initial and not dynamic (most cases) needs to load ?
            this.hiddenElement = document.createElement("input");
            this.hiddenElement.value = this.value;
            this.hiddenElement.setAttribute('name', this.getAttribute("name") as string);
            
            this.hiddenElement.style.overflow = "hidden";
            this.hiddenElement.style.position = "absolute";
            this.hiddenElement.style.height = "0";
            this.hiddenElement.style.width = "0";
            this.hiddenElement.style.visibility = "hidden";
            this.hiddenElement.style.padding = "0";
            this.hiddenElement.style.margin = "0";
            this.hiddenElement.style.float = "right";

            this.hiddenElement.addEventListener("invalid", this.handlehiddeninvalid);
            this.hiddenElement.style.display = "none";

            while (this.attributequeue.length > 0)
            {
                const next = this.attributequeue.pop();
                if (next) {
                    if (next[1] !== null) this.hiddenElement.setAttribute(next[0], next[1]);
                    else this.hiddenElement.removeAttribute(next[0]);
                }
            }

            this.formElement.appendChild(this.hiddenElement);
        }
    }

    // public functions
    public handlefocus = () => {
        // this.hasFocus = true;
        if (this.inputElement)
        {
            this.inputElement.focus();
        }
    }

    // class functions
    constructor(delay = 100) {
        super();

        this.debouncedInput = suspense(this.debouncedInput, delay);
        super.addEventListener("form-element-loaded", this.handleformelementload);
    }
    connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener('focus', this.handlefocus);
    }
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
        if (!["readonly", "value", "checked", "hasfocus", "size", "label"].includes(name))
        {
            if (this.hiddenElement)
            {  
                if (newValue) this.hiddenElement.setAttribute(name, newValue);
                else this.hiddenElement.removeAttribute(name);
            }
            else 
            {
                this.attributequeue.push([name, newValue]);
            }
            if (this.inputElement)
            {  
                if (newValue) this.inputElement.setAttribute(name, newValue);
                else this.inputElement.removeAttribute(name);
            }
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
                input.addEventListener('input', this.handleinput_field);
                input.addEventListener('change', this.handlechange_field);
                
                const type = input.getAttribute('type')
                if (type === "radio" || type === "checkbox")
                {
                    if (this.checked)
                    {
                        input.setAttribute('checked', this.checked.toString());
                    }
                    else 
                    {
                        input.removeAttribute("checked");
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

                this.onvalueupdate(this.value);
            }
        }
        return html`
            <header part="header">
                <slot name="header"><o-typography>${this.label || ""}</o-typography></slot>
                ${this.counter > 0 ? html`<o-typography><span class="counter"></span>/${this.counter}</o-typography>` : ''}
            </header>
            <o-box-template radius="${this.radius}" class="wrapper" part="wrapper">
                <slot name="prefix">${this._prefix}</slot>
                ${element ? element : '<slot></slot>'}
                <slot name="suffix">${this._suffix}</slot>
            </o-box-template>
            <footer part="footer">
                <slot name="footer"><o-typography class="${this.message?.type || "hidden"}">${this.message?.message || ""}</o-typography></slot>
            </footer>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "o-field-template": FieldTemplate;
    }
}