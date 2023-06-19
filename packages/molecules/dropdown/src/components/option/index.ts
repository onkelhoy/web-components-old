// utils 
import { html, property, query, ExtractSlotValue } from "@circular-tools/utils";

// atoms 
import { Checkbox } from "@circular/checkbox";
import "@circular/checkbox/wc";

// templates
import { BaseTemplate } from "@circular-templates/base";

import { style } from "./style";
import { Dropdown } from "../../component";
import { IOption } from "../../types";

export type OptionClick = Partial<IOption>;

export class Option extends BaseTemplate {
  static style = style;

  @property() value?: string;
  @query('o-checkbox') private checkboxElement!: Checkbox;

  private text?: string;

  constructor() {
    super();

    this.addEventListener('click', this.handleclick, true);
  }

  // public functions
  public Connect(dropdown: Dropdown) {
    dropdown.addEventListener("change", this.handledropdownchange);
  }
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
        this.checkboxElement.Value = true;
      }
      else 
      {
        this.checkboxElement.Value = false;
      }
    }
  }

  render() {
    return html`
      <o-checkbox size="small"></o-checkbox>
      <slot @slotchange="${this.handleslotchange}">${this.value}</slot>
    `
  }
}