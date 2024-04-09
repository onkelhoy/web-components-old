// system
import { html, ifDefined, property, query } from "@pap-it/system-utils";

// templates
import { Field, RenderArgument } from "@pap-it/templates-field";
import "@pap-it/templates-field/wc";

// local 
import { style } from "./style";
import { Type } from './types';

export class Input extends Field {
  static style = style;

  @query<HTMLInputElement>({
    selector: 'input',
    load: function (this: Input, element) {
      this.connectElement(element);
    }
  }) override element!: HTMLInputElement;
  @property({ type: Boolean }) counter?: boolean;

  // input validations
  @property() type: Type = "text";
  @property({ type: Number }) maxlength?: number;
  @property({ type: Number }) minlength?: number;
  @property({ type: Number }) max?: number;
  @property({ type: Number }) min?: number;
  @property({ type: Boolean }) clearable?: boolean = false;
  @property() pattern?: string;

  // event handlers
  private handleinput = (e: Event) => {
    if (e.target instanceof HTMLInputElement) {
      if (this.value !== e.target.value) {
        this.value = e.target.value;
      }
    }

    this.dispatchEvent(new Event('input'));
  }

  private handleclear = () => {
    this.element.value = "";
    this.element.dispatchEvent(new Event('input'));
  }

  render() {
    const render: RenderArgument = {
      main: {
        content: html`
          <input 
            @input="${this.handleinput}" 
            placeholder="${ifDefined(this.placeholder)}"
            type="${this.type}"
            name="${this.name}"
            value="${ifDefined(this.value)}"
            maxlength="${ifDefined(this.maxlength)}"
            minlength="${ifDefined(this.minlength)}"
            min="${ifDefined(this.min)}"
            max="${ifDefined(this.max)}"
            pattern="${ifDefined(this.pattern)}"
            required="${ifDefined(this.required)}"
            readonly="${ifDefined(this.readonly)}"
            disabled="${ifDefined(this.disabled)}"
          />
        `
      }
    }

    if (this.clearable && this.value && this.value.length > 0) {
      console.log('clearable added')
      render.main.suffix = html`<pap-icon key="clearable" container="small" @click="${this.handleclear}" size="small" name="clear-filled" cache="true" slot="suffix"></pap-icon>`
    }
    if (this.counter && this.maxlength) {
      render.header = {
        suffix: html`<pap-typography slot="suffix">${this.value?.length || 0}/${this.maxlength}</pap-typography>`
      }
    }

    if (this.label) {
      if (!render.header) render.header = {};
      render.header.content = `<pap-typography key="label" part="label">${this.label}</pap-typography>`
    }

    return super.render(render);
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-input": Input;
  }
}