PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE:
// utils 
import { property } from "@pap-it/system-utils";

// templates
import { FieldTemplate } from '@pap-it/templates-field';

// local
import { style } from "./style";

export class TextinputTemplate<T extends HTMLElement = HTMLInputElement> extends FieldTemplate<T> {
  static styles = [FieldTemplate.styles[0], style];

  @property() placeholder?: string;

  private lastselection_position = 0;

  public set selectionStart(value: number) {
    if (this.inputElement instanceof HTMLInputElement || this.inputElement instanceof HTMLTextAreaElement) {
      this.inputElement.selectionStart = value;
    }
  }
  public set selectionEnd(value: number) {
    if (this.inputElement instanceof HTMLInputElement || this.inputElement instanceof HTMLTextAreaElement) {
      this.inputElement.selectionEnd = value;
    }
  }

  protected handlekeyup = () => {
    const ss = (this.inputElement as any).selectionStart;
    if (typeof ss === "number") {
      this.lastselection_position = ss;
    }
    else this.lastselection_position = (this.inputElement as any).value.length;
  }

  // public functions
  public insert(text: string) {
    let newvalue = '';
    if (this.lastselection_position < (this.inputElement as any).value.length) {
      const v = (this.inputElement as any).value;
      newvalue = [v.slice(0, this.lastselection_position), text, v.slice(this.lastselection_position, v.length)].join('');
    }
    else {
      newvalue = (this.inputElement as any).value + text;
    }

    this.value = newvalue;
    (this.inputElement as any).value = newvalue;
    this.lastselection_position += text.length;
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-textinput-template": TextinputTemplate;
  }
}

## STYLE-CODE:
:host {
  --background: var(--pap-textinput-background-light, var(--pap-color-neutral-50));

  pap-box-template.wrapper {
    background-color: var(--background);
  }
}

@media (prefers-color-scheme: dark) {
  :host {
    --background: var(--pap-textinput-background-dark, var(--pap-color-neutral-50));
  }
}