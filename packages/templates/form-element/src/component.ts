// utils 
import { property } from "@pap-it/system-utils";

// templates
import { BaseSystem } from "@pap-it/system-base";

export class FormElementTemplate extends BaseSystem {

  @property({ type: Boolean, rerender: false }) disabled?: boolean;
  @property({ type: Boolean, rerender: false }) required?: boolean;
  @property({ rerender: false }) name?: string;

  protected formElement!: HTMLFormElement;
  private findAttempts = 0;

  protected findForm() {
    const name = this.getAttribute('name');
    const type = this.getAttribute('type') || "";
    if (!(name || ['submit', 'reset'].includes(type))) {
      return;
    }
    if (this.formElement) return;

    setTimeout(() => {
      const closestPapForm = this.shadow_closest("pap-form");
      if (closestPapForm) {
        const form = closestPapForm.querySelector<HTMLFormElement>('form');
        if (form) this.AssignForm(form);
      }
      else {
        const form = this.shadow_closest<HTMLFormElement>("form");
        if (form) this.AssignForm(form);
      }

      if (!this.formElement && this.findAttempts < 10) {
        this.findAttempts++;
        this.findForm();
      }
    }, 100 + this.findAttempts * 100);
  }

  public AssignForm = (form: HTMLFormElement) => {
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