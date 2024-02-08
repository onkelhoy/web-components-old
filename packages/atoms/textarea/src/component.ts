// system
import { html, property, query, ifDefined } from "@pap-it/system-utils";

// templates
import { Field, RenderArgument } from '@pap-it/templates-field';

// local 
import { style } from "./style";
import { Resize } from './types';

export class Textarea extends Field {
  static style = style;

  @query<HTMLTextAreaElement>({
    selector: 'textarea',
    load: function (this: Textarea, element) {
      this.connectElement(element);
    }
  }) override element!: HTMLInputElement;
  @property({ type: Boolean }) counter?: boolean;

  // validations
  @property({ type: Number }) maxlength?: number;
  @property({ type: Number }) minlength?: number;
  @property({ type: Number }) max?: number;
  @property({ type: Number }) min?: number;
  @property() pattern?: string;

  @property({ type: Number }) rows: number = 2;
  @property({ rerender: false }) resize: Resize = "auto";

  // event functions
  private handleinput = (e: Event) => {
    if (this.resize === "auto" && e.target instanceof HTMLTextAreaElement) {
      // dont know why fully this works but it does 
      e.target.style.height = "auto";
      if (e.target.scrollHeight) // because it was 0 on intial case 
      {
        // the -4 is also weird but it works - maybe border ? im not sure 
        e.target.style.height = `${e.target.scrollHeight}px`;
      }
      else {
        e.target.style.height = 'auto'; // so we make sure we are auto initially
      }
    }
  }

  render() {
    const render: RenderArgument = {
      main: {
        content: html`
          <textarea 
            @input="${this.handleinput}" 
            placeholder="${ifDefined(this.placeholder)}"
            name="${this.name}"
            maxlength="${ifDefined(this.maxlength)}"
            minlength="${ifDefined(this.minlength)}"
            min="${ifDefined(this.min)}"
            max="${ifDefined(this.max)}"
            pattern="${ifDefined(this.pattern)}"
            rows="${this.rows}"
            required="${ifDefined(this.required)}"
            readonly="${ifDefined(this.readonly)}"
            disabled="${ifDefined(this.disabled)}"
          >${this.value}</textarea>
        `
      }
    }
    if (this.counter && this.maxlength) {
      render.header = {
        suffix: html`<pap-typography slot="suffix">${this.value?.length || 0}/${this.maxlength}</pap-typography>`
      }
    }

    return super.render(render);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-textarea": Textarea;
  }
}