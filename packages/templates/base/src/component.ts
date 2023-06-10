import { property, suspense } from "@circular-tools/utils";

import { FunctionCallback, RenderType } from "./types";

export class BaseTemplate extends HTMLElement {
    public static style?:string;
    public static styles?:string[];

    protected callAfterUpdate:(Function|FunctionCallback)[] = [];
    private attributeObserver!: MutationObserver;
    @property({ rerender: false, type: Boolean }) hasFocus: boolean = false;

    // class functions
    constructor() {
        super();

        this.addEventListener('blur', this.handleblur);
        this.addEventListener('focus', this.handlefocus);

        this.debouncedRequestUpdate = suspense(this.requestUpdate, 100);
        this.attachShadow({mode:'open'});
        this.callAfterUpdate.push(this.firstUpdate);
    }
    connectedCallback() {
        this.debouncedRequestUpdate();
        // Create an observer instance linked to a callback function
        this.attributeObserver = new MutationObserver((mutationsList, observer) => {
            // Look through all mutations that just occured
            for(let mutation of mutationsList) {
                // If the attribute modified is one we are tracking
                if (mutation.type === 'attributes' && mutation.attributeName) {
                    this.attributeChangedCallback(mutation.attributeName, mutation.oldValue, this.getAttribute(mutation.attributeName))
                }
            }
        });

        // Start observing the node with configured parameters
        // attributes: true indicates we want to observe attribute changes
        this.attributeObserver.observe(this, { attributes: true });
    }
    disconnectedCallback() {
        this.attributeObserver.disconnect();
    }
    attributeChangedCallback(name:string, oldValue:string|null, newValue:string|null) {
        // implement something
    }

    // event handlers
    protected handleblur = () => {
        this.hasFocus = false;
    }
    protected handlefocus = () => {
        this.hasFocus = true;
    }

    protected getStyle():string {
        // Get the constructor of the child class
        const childConstructor = this.constructor as typeof BaseTemplate & { style?:string; styles?:string[]; };
        
        // Access the static property on the child class
        const styles = [
            ...(childConstructor.styles ?? []),
            ...(typeof childConstructor.style === "string" ? [childConstructor.style] : []),
        ];

        return styles.join(' ');
    }

    public requestUpdate() {
        if (this.shadowRoot)
        {
            const content = this.render();

            this.shadowRoot.innerHTML = `
                <style>
                    ${this.getStyle()}
                </style>
                ${typeof content === "string" ? content : ""}
            `;
            if (content instanceof DocumentFragment) this.shadowRoot.appendChild(content);
            if (content instanceof Array)
            {
                content.forEach(item => {
                    if (item instanceof DocumentFragment && this.shadowRoot) this.shadowRoot.appendChild(item);
                })
            }

            let info;
            const reverse = this.callAfterUpdate.reverse();
            while (info = reverse.pop()) {
                if (typeof info === "object")
                {
                    info.callback.call(this, ...info.args);
                }
                if (info instanceof Function) {
                    info.call(this);
                }
            }
            this.callAfterUpdate = [];
        }
    }

    public debouncedRequestUpdate() {}
    public firstUpdate() {}

    public render(child?:RenderType):RenderType {
        return 'Hello From Base Class'
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-base-template": BaseTemplate;
    }
}