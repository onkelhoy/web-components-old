// utils 
import { html, property, query } from "@pap-it/system-utils";

// templates
import { BaseSystem } from "@pap-it/system-base";

// local 
import { style } from "./style";
import { OSubmitEvent } from './types'
import { Message, Variant as MessageType } from "./components/message";

export class Form extends BaseSystem {
  static style = style;

  @property({ rerender: false, onUpdate: "onerrorupdate" }) error?: string;
  @property({ rerender: false, onUpdate: "onwarningupdate" }) warning?: string;
  @property({ rerender: false, onUpdate: "onsuccessupdate" }) success?: string;

  @query('pap-message') messageElement!: Message;
  @query('form') formElement!: HTMLFormElement;

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
  private handlesubmit = (e: Event) => {
    e.preventDefault();
    // e.stopPropagation();

    if (e.target instanceof HTMLFormElement) {
      let data: any = new FormData(e.target);
      if (data) data = Array.from(data as any);

      this.dispatchEvent(new SubmitEvent("submit"));
      this.dispatchEvent(new CustomEvent<OSubmitEvent>("pap-submit", {
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
  public checkValidity() {
    if (this.formElement) return this.formElement.checkValidity();
    return false;
  }
  public reportValidity() {
    if (this.formElement) return this.formElement.reportValidity();
    return false;
  }

  render() {
    return html`
            <form part="form" @submit="${this.handlesubmit}">
                <div part="message-wrapper">
                    <pap-message part="message"></pap-message>
                </div>
                <slot></slot>
            </form>
        `
  }
}