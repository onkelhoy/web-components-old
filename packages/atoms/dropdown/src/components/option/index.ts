// utils 
import { html, property, query, ExtractSlotValue } from "@onkelhoy/tools-utils";

// atoms 
import { Checkbox } from "@onkelhoy/checkbox";
import "@onkelhoy/checkbox/wc";

// templates
import { BaseTemplate } from "@onkelhoy/templates-base";

import { style } from "./style";
import { Dropdown } from "../../component";
import { IOption } from "../../types";

export type OptionClick = Partial<IOption>;

export class Option extends BaseTemplate {
  static style = style;

  @property() value?: string;
  @query({ selector: 'o-checkbox', onload: "oncheckboxload" }) private checkboxElement!: Checkbox;

  private text?: string;

  // class functions
  constructor() {
    super();

    this.addEventListener('click', this.handleclick, true);
  }

  private oncheckboxload = () => {
    if (this.hasAttribute('data-dropdown-option')) return;

    setTimeout(() => {
      const dropdown = this.shadow_closest('o-dropdown');
      if (dropdown instanceof Dropdown)
      {
        dropdown.registerOption(this);
        dropdown.addEventListener("change", this.handledropdownchange);
        dropdown.addEventListener("suspended-input", this.handledropdowninput);
  
        if (dropdown.values.includes(this.getValue())) 
        {
          this.checkboxElement.value = 'true';
        }
        else 
        {
          this.checkboxElement.value = 'false';
        }
      }
      else 
      {
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
  private handleslotchange = (e:Event) => {
    if (e.target instanceof HTMLSlotElement)
    {
      const values = ExtractSlotValue(e.target);
      this.text = values.join(' ');

      this.dispatchEvent(new Event('registered'));
    }
  }
  private handleclick = (e:Event) => {
    if (!(e instanceof CustomEvent))
    {
      e.stopPropagation();
      this.dispatchEvent(new CustomEvent<OptionClick>("click", { detail: { value: this.getValue(), text: this.getText() } }))
    }
  }
  private handledropdownchange = (e:Event) => {
    if (e.target instanceof Dropdown)
    {
      if (e.target.values.includes(this.getValue())) 
      {
        this.checkboxElement.value = 'true';
      }
      else 
      {
        this.checkboxElement.value = 'false';
      }
    }
  }
  private handledropdowninput = (e:Event) => {
    if (e.target instanceof Dropdown)
    {
      console.log('input');
    }
  }

  render() {
    return html`
      <o-checkbox size="small"></o-checkbox>
      <slot @slotchange="${this.handleslotchange}">${this.value}</slot>
    `
  }
}