// utils 
import { debounce, html, property, query } from "@pap-it/system-utils";

// templates
import { BaseSystem } from "@pap-it/system-base";

// local 
import { style } from "./style";
import { Message, Variant as MessageType } from "./components/message";

export class Form extends BaseSystem {
  static style = style;

  @property({ rerender: false, onUpdate: "onerrorupdate" }) error?: string;
  @property({ rerender: false, onUpdate: "onwarningupdate" }) warning?: string;
  @property({ rerender: false, onUpdate: "onsuccessupdate" }) success?: string;

  @query('pap-message') messageElement!: Message;
  @query('form') formElement!: HTMLFormElement;

  private findfieldscalls = 0;

  constructor() {
    super();

    this.handleslotchange_debounced = debounce(this.handleslotchange_debounced, 100);
  }

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
      this.dispatchEvent(new CustomEvent("pap-submit", {
        detail: {
          element: this.formElement,
          data,
        }
      }))
    }

    return false;
  }
  private handleslotchange = (e: Event) => {
    this.handleslotchange_debounced(e.target as Element);
  }

  // helper functions
  private findFields = (element: Element) => {
    if ('AssignForm' in element) {
      (element as any).AssignForm(this.formElement);
      return;
    }
    if (["form", "pap-form"].includes(element.nodeName.toLowerCase())) return

    if (element instanceof HTMLSlotElement) {
      setTimeout(() => {
        const elements = element.assignedElements();
        for (let slotelement of elements) {
          this.findFields(slotelement);
        }
      }, 1);

      return;
    }

    if (element.shadowRoot) {
      this.findFieldsInShadow(element);
    }
    else {
      for (let i = 0; i < element.children.length; i++) {
        this.findFields(element.children[i]);
      }
    }
  }
  private findFieldsInShadow = (element: Element) => {
    if (!element.shadowRoot) return;

    const searchElement = () => {
      const elements = element.shadowRoot?.querySelectorAll('*:not(style):not(form):not(pap-form)');
      if (!elements) return;
      for (let i = 0; i < elements.length; i++) {
        this.findFields(elements[i]);
      }

      element.removeEventListener('connected', searchElement);
    }


    if ('connected' in element) {
      if (element.connected) {
        searchElement();
      }
      else {
        element.addEventListener('connected', searchElement);
      }
    }
  }
  private handleslotchange_debounced = (slotelement: Element) => {
    this.findFields(slotelement);
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
        <slot @slotchange="${this.handleslotchange}"></slot>
      </form>
    `
  }
}