# Checkbox

Atomic Type: atoms

Version: 1.0.0

## Development 
Development servers can be started and should all exist inside `"views"` folder

## Scripts 
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and register code provided to you - could you create a rather simple introduction text with maybe a code example how to use in html - keep it very simple. Do not give example how to run the register code it's already included (this is for you so you can see the element-tag)! The introduction should be read by developers so it needs not to be simple enough for beginners!

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
## REGISTER-CODE:
import { Checkbox } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('o-checkbox')) {
  cElements.define('o-checkbox', Checkbox);
}
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables. 
1. properties (columns: name, default-value, type, description) 
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc) 
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

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

## TYPE-CODE: export {}PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
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