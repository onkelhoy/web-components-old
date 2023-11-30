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
