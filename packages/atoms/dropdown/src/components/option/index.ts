// utils 
import { html, property, query, ExtractSlotValue } from "@pap-it/system-utils";

// templates
import { BaseSystem } from "@pap-it/system-base";

import { style } from "./style";
import { Dropdown } from "../../component";
import { IOption } from "../../types";

export type OptionClick = Partial<IOption>;

export class Option extends BaseSystem {
  static style = style;

  @property({ rerender: false }) value?: string;
  @query({ selector: 'input[type="checkbox"]', onload: "oncheckboxload" }) private checkboxElement!: HTMLInputElement;

  private text?: string;

  // class functions
  constructor() {
    super();

    this.addEventListener('click', this.handleclick, true);
  }

  private oncheckboxload = () => {
    if (this.hasAttribute('data-dropdown-option')) return;

    this.checkboxElement.addEventListener('change', (e: Event) => {
      console.log('well?')
      e.preventDefault();
      e.stopPropagation();
      return false;
    }, true);

    setTimeout(() => {
      const dropdown = this.shadow_closest<Dropdown>('pap-dropdown');
      if (dropdown) {
        dropdown.registerOption(this);
        dropdown.addEventListener("change", this.handledropdownchange);
        dropdown.addEventListener("debounced-input", this.handledropdowninput);

        if (dropdown.values.includes(this.getValue())) {
          this.checkboxElement.checked = true;
        }
        else {
          this.checkboxElement.removeAttribute('checked');
        }
      }
      else {
        // TODO if this is shown then we need to implement the push to this.callAfterUpdate a init function 
        console.error('dropdown not found');
      }
    }, 100)
  }

  // public functions
  public getValue() {
    return this.value || this.text || "missing-value";
  }
  public getText() {
    return this.text || this.value || "missing-text";
  }

  // event handlers
  private handleslotchange = (e: Event) => {
    if (e.target instanceof HTMLSlotElement) {
      const values = ExtractSlotValue(e.target);
      this.text = values.join(' ');

      this.dispatchEvent(new Event('registered'));
    }
  }
  private handleclick = (e: Event) => {
    if (!(e instanceof CustomEvent)) {
      e.stopPropagation();
      this.dispatchEvent(new CustomEvent<OptionClick>("click", { detail: { value: this.getValue(), text: this.getText() } }))
    }
  }
  private handledropdownchange = (e: Event) => {
    if (e.target instanceof Dropdown) {
      if (e.target.values.includes(this.getValue())) {
        this.checkboxElement.checked = true;
      }
      else {
        this.checkboxElement.checked = false;
      }
    }
  }
  private handledropdowninput = (e: Event) => {
    if (e.target instanceof Dropdown) {
      console.log('input');
    }
  }

  render() {
    return html`
      <input part="checkbox" readonly type="checkbox" />
      <slot @slotchange="${this.handleslotchange}">${this.getText()}</slot>
    `
  }
}