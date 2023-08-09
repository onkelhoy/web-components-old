// utils 
import { html, property, query } from "@henry2/tools-utils";

// templates
import { BaseTemplate } from "@henry2/templates-base";

// local 
import { style } from "./style";
import { OSubmitEvent } from './types'
import { Message, Variant as MessageType } from "./components/message";

export class Form extends BaseTemplate {
    static style = style;

    @property({ rerender: false, onUpdate: "onerrorupdate" }) error?:string;
    @property({ rerender: false, onUpdate: "onwarningupdate" }) warning?:string;
    @property({ rerender: false, onUpdate: "onsuccessupdate" }) success?:string;

    @query('o-message') messageElement!: Message;

    // update handlers
    private onerrorupdate = () => {
        if (!this.messageElement) return 10;
        if (this.error) this.showMessage(this.error, "error");
    }   
    private onwarningupdate = () => {
        if (!this.messageElement) return 10;
        if (this.warning) this.showMessage(this.warning, "warning");
    }
    private onsuccessupdate = () => {
        if (!this.messageElement) return 10;
        if (this.success) this.showMessage(this.success, "success");
    }

    // event handlers
    private handlesubmit = (e:Event) => {
        e.preventDefault();
        // e.stopPropagation();
        
        if (e.target instanceof HTMLFormElement)
        {
            let data:any = new FormData(e.target);
            if (data) data = Array.from(data as any);

            this.dispatchEvent(new CustomEvent<OSubmitEvent>("o-submit", {
                detail: {
                    data,
                    element: e.target
                }
            }));
        }

        return false;
    }

    // public functions 
    public showMessage(message: string, type: MessageType) {
        this.messageElement.innerHTML = message;
        this.messageElement.variant = type;
        this.messageElement.open = true;
    }
    public hideMessage() {
        this.messageElement.open = false;
    }

    render() {
        return html`
            <form @submit="${this.handlesubmit}">
                <div>
                    <o-message></o-message>
                </div>
                <slot></slot>
            </form>
        `
    }
}