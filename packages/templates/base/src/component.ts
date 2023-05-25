import { suspense, html } from "@circular-tools/utils";

import { FunctionCallback } from "./types";

export class BaseTemplate extends HTMLElement {
    public static style?:string;
    public static styles?:string[];

    protected callAfterUpdate:(Function|FunctionCallback)[] = [];

    constructor() {
        super();

        this.debouncedRequestUpdate = suspense(this.requestUpdate, 100);
        this.attachShadow({mode:'open'});
        this.callAfterUpdate.push(this.firstUpdate);
    }

    connectedCallback() {
        this.debouncedRequestUpdate();
    }

    disconnectedCallback() {
        // implement something
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

    public render():DocumentFragment|string {
        return 'Hello From Base Class'
    }
}