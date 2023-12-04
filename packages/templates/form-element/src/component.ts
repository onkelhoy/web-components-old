// utils 
import { property } from "@pap-it/system-utils";

// templates
import { BaseSystem } from "@pap-it/system-base";

export class FormElementTemplate extends BaseSystem {

  @property({ type: Boolean, rerender: false }) disabled?: boolean;
  @property({ type: Boolean, rerender: false }) required?: boolean;
  @property({ rerender: false }) name?: string;

  protected formElement!: HTMLFormElement;

  protected findForm() {
    if (this.formElement) return;
    
    setTimeout(() => {
      const closestOFORM = this.shadow_closest("pap-form");
      if (closestOFORM) {
        const form = closestOFORM.querySelector<HTMLFormElement>('form');
        if (form) this.assignForm(form);
      }
      else {
        const form = this.shadow_closest<HTMLFormElement>("form");
        if (form) this.assignForm(form);
      }
    }, 100);
  }

  private assignForm(form: HTMLFormElement) {
    this.formElement = form;
    this.dispatchEvent(new Event("form-element-loaded"));
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.findForm();
  }

  firstUpdate(): void {
    super.firstUpdate();
    if (!this.formElement) this.findForm();
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-form-element-template": FormElementTemplate;
  }
}