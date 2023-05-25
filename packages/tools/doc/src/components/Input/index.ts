// utils 
import { html, property, suspense } from "@circular-tools/utils";

// templates
import { BaseTemplate } from "@circular-templates/base";

import { style } from "./style";

// types & interfaces
export type InputVariant = "input"|"textarea"|"select"|"number";
export type Option = { text: string; value: string; }
export type ChangeEvent = { value: string };

export class Input extends BaseTemplate {
  static style = style;

  private inputElement!: HTMLInputElement;
  private calls = 0;

  constructor() {
    super();

    this.debouncedInput = suspense(this.debouncedInput, 250);
  }
  
  @property() label: string = "Label";
  @property() placeholder: string = "";
  @property({ onUpdate: "updatevalue" }) value: string = "";
  @property() name: string = "";
  @property() variant: InputVariant = 'input';
  @property({ type: Array }) options: (string|Option)[] = [];

  // updates
  private updatevalue() {
    if (this.inputElement)
    {
      this.inputElement.value = this.value;
      if (this.variant === "select") this.inputElement.dispatchEvent(new Event("change"));
      else this.inputElement.dispatchEvent(new Event("input"));
    }
  }

  // event handlers 
  private handleselect = (e:Event) => {
    if (e.target instanceof HTMLSelectElement)
    {
      this.dispatchEvent(new CustomEvent<ChangeEvent>("change", { detail: { value: e.target.value } }))
    }
  }
  private handleinput = (e:Event) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)
    {
      this.debouncedInput(e.target.value);
    }
  }

  // private functions
  private debouncedInput(value:string) {
    this.dispatchEvent(new CustomEvent<ChangeEvent>("change", { detail: { value } }))
  }

  firstUpdate(): void {
    const element = this.shadowRoot?.querySelector<HTMLInputElement>('#input');
    if (element)
    {
      this.inputElement = element;
      this.updatevalue();
    }
  }

  render() {
    let content = null;
    if (this.variant === "select" || this.options.length > 0)
    {
      content = html`
      <span part="span-wrapper">
      <select @change="${this.handleselect}" part="select" id="input">
        ${this.options.map(value => typeof value === "string" ? `<option value="${value}">${value}</option>` : `<option value="${value.value}">${value.text}</option>`)}
      </select>
      </span>`
    }
    else if (this.variant === "textarea")
    {
      content = html`<span part="span-wrapper"><textarea value="${this.value}" part="textarea" @input="${this.handleinput}" id="input" placeholder="${this.placeholder}" col="10"></textarea></span>`
    }
    else 
    {
      content = html`<span part="span-wrapper"><input type="${this.variant === "number" ? "number" : "text"}" value="${this.value}" part="input" @input="${this.handleinput}" id="input" placeholder="${this.placeholder}"/></span>`
    }

    return html`
      <label part="label" for="input">${this.label}</label>
      ${content}
    `
  }
}