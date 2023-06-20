PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE:
// utils 
import { html, property } from "@circular-tools/utils";

// templates
import { FieldTemplate } from "@circular-templates/field";

// local 
import { style } from "./style";

export class Checkbox extends FieldTemplate {
    static style = style;

    @property({ rerender: false, onUpdate: "checkboxColorUpdate" }) color: string = "blue";

    // update functions
    private checkboxColorUpdate () {
        if (this.inputElement)
        {
            this.inputElement.style.accentColor = this.color;
        }
    }

    render() {
        return super.render(html`
            <input type="checkbox" ${this.checked ? 'checked="true"' : ""} />
        `)
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-checkbox": Checkbox;
    }
}
## STYLE-CODE:
:host {
    display: inline-grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: 1fr auto;
    grid-template-areas: 
        "label input"
        "message message";

    &::part(label) {
        grid-area: label;
    }
    &::part(wrapper) {
        padding-inline: 0;
        display: block;
        border: none;
        height: auto;

        grid-area: input;
    }

    &::part(message) {
        grid-area: message;
    }
}

$size-map: (
  small: (
    size: 15px,
  ),
  medium: (
    size: 20px,
  ),
  large: (
    size: 28px,
  ),
);

@each $name, $value in $size-map {
    :host([size="#{$name}"]) {
        input[type="checkbox"] {
            height: var(--checkbox-size-#{$name}, var(--size-#{$name}, #{map-get($value, size)}));
            width: var(--checkbox-size-#{$name}, var(--size-#{$name}, #{map-get($value, size)}));
        }
    }
} 


:host(:focus),
:host([hasfocus="true"]) {
    &::part(wrapper) {
        outline: none;
    }

    input[type="checkbox"]:focus-visible {
        outline-offset: 2px;
        outline: 1px solid blue !important;
    }
}