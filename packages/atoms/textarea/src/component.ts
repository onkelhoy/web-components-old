// utils 
import { html, property } from "@circular-tools/utils";

// templates
import { FieldTemplate } from '@circular-templates/field';

// local 
import { style } from "./style";
import { Resize } from './types';

export class Textarea extends FieldTemplate {
    static style = style;

    @property({ type: Number }) rows:number = 4;
    @property({ rerender: false }) resize:Resize = "none";

    // event functions
    private handleinput = (e:Event) => {
        if (this.resize === "auto" && e.target instanceof HTMLTextAreaElement)
        {
            e.target.style.height = "auto";
            e.target.style.height = `calc(${e.target.scrollHeight}px - 1rem)`;
        }
    }

    render() {
        return super.render(html`
            <textarea @input="${this.handleinput}" rows="${this.rows}"></textarea>
        `, 'textarea')
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "o-textarea": Textarea;
    }
}