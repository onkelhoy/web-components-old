# TranslatorTool

Atomic Type: tools

Version: 1.0.0

## Development

Development servers can be started and should all exist inside `"views"` folder

## Scripts

PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and register code provided to you - could you create a rather simple introduction text with maybe a code example how to use in html - keep it very simple. Do not give example how to run the register code it's already included (this is for you so you can see the element-tag)! The introduction should be read by developers so it needs not to be simple enough for beginners!

## SOURCE-CODE

// utils
import { ExtractSlotValue, html } from "@pap-it/system-utils";

// templates
import { BaseSystem } from "@pap-it/system-base";

// local
import { style } from "./style";
import { InitTranslations } from "./translator";

export class Translator extends BaseSystem {
    static style = style;

    private spanElement!: HTMLSpanElement;
    private text!: string;
    get Text() {
        return this.text;
    }
    private key!: string;
    get Key() {
        return this.key;
    }
    set Key(value: string | null) {
        if (typeof value === 'string') 
        {
            this.key = value;
            // this.key = value.replace(/<!--\?lit.*?>(.*)/, '$1');
        } 
        else 
        {
            this.key = '';
        }
    
        this.updateText();
    }
    private dynamicAttributes:Set<string> = new Set<string>();
    private noupdate = false;

    // class functions 
    connectedCallback(): void {
        super.connectedCallback();
        InitTranslations();
        window.papTranslation?.subscribe(this.updateText);
    }
  
    disconnectedCallback() {
        super.disconnectedCallback();
        // this.attributeObserver.disconnect();
        window.papTranslation?.unsubscribe(this.updateText);
    }

    attributeChangedCallback(name:string, oldValue:string|null, newValue:string|null) {
        if (this.dynamicAttributes.has(name))
        {
            this.updateText();
        }
    }

    firstUpdate(): void {
        if (this.shadowRoot)
        {
            const span = this.shadowRoot.querySelector<HTMLSpanElement>('span.pap-translation-span');
            if (span)
            {
                this.spanElement = span;
            }
        }
    }

    // event handlers 
    private handletranslateslotchange = (e:Event) => {
        if (e.target instanceof HTMLSlotElement)
        {
            const nodetext = ExtractSlotValue(e.target).join(' ');
            this.Key = nodetext;
        }
    }

    // public functions 
    public translateKey(key:string) {
        if (this.key !== key)
        {
            this.noupdate = true;
            this.Key = key;
        }

        return this.text;
    }

    // private functions 
    private updateText = () => {
        let text = window.papTranslation?.current?.translations?.[this.key] || this.key;
        if (text === undefined && this.key === undefined) return;

        const regex = /{([^{}]+)}/g;
        const matches = text.match(regex);

        if (matches) 
        {
            matches.forEach(variable => {
                const sliced = variable.slice(1, -1);
                const value = this.getAttribute(sliced);
                if (value) 
                {
                    text = text.replace(variable, value);

                    if (!this.dynamicAttributes.has(sliced))
                    {
                        this.dynamicAttributes.add(sliced);
                    }
                }
            });
        }

        this.text = text;
        if (this.spanElement)
        {
            this.spanElement.innerText = text;
        }
        else if (!this.noupdate)
        {
            this.debouncedRequestUpdate();
        }
        
        this.noupdate = false;
    };

    render() {
        return html`
            <span class="pap-translation-span"></span>
            <slot style="display:none;" @slotchange="${this.handletranslateslotchange}"></slot>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pap-translator": Translator;
    }
}

## REGISTER-CODE

import { Translator } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-translator')) {
  cElements.define('pap-translator', Translator);
}
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables.

1. properties (columns: name, default-value, type, description)
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc)
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE

 // utils
import { ExtractSlotValue, html } from "@pap-it/system-utils";

// templates
import { BaseSystem } from "@pap-it/system-base";

// local
import { style } from "./style";
import { InitTranslations } from "./translator";

export class Translator extends BaseSystem {
    static style = style;

    private spanElement!: HTMLSpanElement;
    private text!: string;
    get Text() {
        return this.text;
    }
    private key!: string;
    get Key() {
        return this.key;
    }
    set Key(value: string | null) {
        if (typeof value === 'string') 
        {
            this.key = value;
            // this.key = value.replace(/<!--\?lit.*?>(.*)/, '$1');
        } 
        else 
        {
            this.key = '';
        }
    
        this.updateText();
    }
    private dynamicAttributes:Set<string> = new Set<string>();
    private noupdate = false;

    // class functions 
    connectedCallback(): void {
        super.connectedCallback();
        InitTranslations();
        window.papTranslation?.subscribe(this.updateText);
    }
  
    disconnectedCallback() {
        super.disconnectedCallback();
        // this.attributeObserver.disconnect();
        window.papTranslation?.unsubscribe(this.updateText);
    }

    attributeChangedCallback(name:string, oldValue:string|null, newValue:string|null) {
        if (this.dynamicAttributes.has(name))
        {
            this.updateText();
        }
    }

    firstUpdate(): void {
        if (this.shadowRoot)
        {
            const span = this.shadowRoot.querySelector<HTMLSpanElement>('span.pap-translation-span');
            if (span)
            {
                this.spanElement = span;
            }
        }
    }

    // event handlers 
    private handletranslateslotchange = (e:Event) => {
        if (e.target instanceof HTMLSlotElement)
        {
            const nodetext = ExtractSlotValue(e.target).join(' ');
            this.Key = nodetext;
        }
    }

    // public functions 
    public translateKey(key:string) {
        if (this.key !== key)
        {
            this.noupdate = true;
            this.Key = key;
        }

        return this.text;
    }

    // private functions 
    private updateText = () => {
        let text = window.papTranslation?.current?.translations?.[this.key] || this.key;
        if (text === undefined && this.key === undefined) return;

        const regex = /{([^{}]+)}/g;
        const matches = text.match(regex);

        if (matches) 
        {
            matches.forEach(variable => {
                const sliced = variable.slice(1, -1);
                const value = this.getAttribute(sliced);
                if (value) 
                {
                    text = text.replace(variable, value);

                    if (!this.dynamicAttributes.has(sliced))
                    {
                        this.dynamicAttributes.add(sliced);
                    }
                }
            });
        }

        this.text = text;
        if (this.spanElement)
        {
            this.spanElement.innerText = text;
        }
        else if (!this.noupdate)
        {
            this.debouncedRequestUpdate();
        }
        
        this.noupdate = false;
    };

    render() {
        return html`
            <span class="pap-translation-span"></span>
            <slot style="display:none;" @slotchange="${this.handletranslateslotchange}"></slot>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pap-translator": Translator;
    }
}

## TYPE-CODE: export {}

PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE

// utils
import { ExtractSlotValue, html } from "@pap-it/system-utils";

// templates
import { BaseSystem } from "@pap-it/system-base";

// local
import { style } from "./style";
import { InitTranslations } from "./translator";

export class Translator extends BaseSystem {
    static style = style;

    private spanElement!: HTMLSpanElement;
    private text!: string;
    get Text() {
        return this.text;
    }
    private key!: string;
    get Key() {
        return this.key;
    }
    set Key(value: string | null) {
        if (typeof value === 'string') 
        {
            this.key = value;
            // this.key = value.replace(/<!--\?lit.*?>(.*)/, '$1');
        } 
        else 
        {
            this.key = '';
        }
    
        this.updateText();
    }
    private dynamicAttributes:Set<string> = new Set<string>();
    private noupdate = false;

    // class functions 
    connectedCallback(): void {
        super.connectedCallback();
        InitTranslations();
        window.papTranslation?.subscribe(this.updateText);
    }
  
    disconnectedCallback() {
        super.disconnectedCallback();
        // this.attributeObserver.disconnect();
        window.papTranslation?.unsubscribe(this.updateText);
    }

    attributeChangedCallback(name:string, oldValue:string|null, newValue:string|null) {
        if (this.dynamicAttributes.has(name))
        {
            this.updateText();
        }
    }

    firstUpdate(): void {
        if (this.shadowRoot)
        {
            const span = this.shadowRoot.querySelector<HTMLSpanElement>('span.pap-translation-span');
            if (span)
            {
                this.spanElement = span;
            }
        }
    }

    // event handlers 
    private handletranslateslotchange = (e:Event) => {
        if (e.target instanceof HTMLSlotElement)
        {
            const nodetext = ExtractSlotValue(e.target).join(' ');
            this.Key = nodetext;
        }
    }

    // public functions 
    public translateKey(key:string) {
        if (this.key !== key)
        {
            this.noupdate = true;
            this.Key = key;
        }

        return this.text;
    }

    // private functions 
    private updateText = () => {
        let text = window.papTranslation?.current?.translations?.[this.key] || this.key;
        if (text === undefined && this.key === undefined) return;

        const regex = /{([^{}]+)}/g;
        const matches = text.match(regex);

        if (matches) 
        {
            matches.forEach(variable => {
                const sliced = variable.slice(1, -1);
                const value = this.getAttribute(sliced);
                if (value) 
                {
                    text = text.replace(variable, value);

                    if (!this.dynamicAttributes.has(sliced))
                    {
                        this.dynamicAttributes.add(sliced);
                    }
                }
            });
        }

        this.text = text;
        if (this.spanElement)
        {
            this.spanElement.innerText = text;
        }
        else if (!this.noupdate)
        {
            this.debouncedRequestUpdate();
        }
        
        this.noupdate = false;
    };

    render() {
        return html`
            <span class="pap-translation-span"></span>
            <slot style="display:none;" @slotchange="${this.handletranslateslotchange}"></slot>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "pap-translator": Translator;
    }
}

## STYLE-CODE

:host {
  padding: auto;
}
