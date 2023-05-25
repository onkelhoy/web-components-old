# BoxTemplate

Atomic Type: templates

Version: 1.0.0

## Development 
Development servers can be started and should all exist inside `"views"` folder

## Scripts 
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and register code provided to you - could you create a rather simple introduction text with maybe a code example how to use in html - keep it very simple. Do not give example how to run the register code it's already included (this is for you so you can see the element-tag)! The introduction should be read by developers so it needs not to be simple enough for beginners!

## SOURCE-CODE:
// utils 
import { property } from "@circular-tools/utils";

// templates
import { ColorTemplate } from "@circular-templates/color";

// local 
import { style } from "./style";
import { Elevation, Radius } from "./types";

export class BoxTemplate extends ColorTemplate {
    static style = style;

    @property() radius: Radius = "circular";
    @property() elevation: Elevation = "none";

    render() {
        return `
            <slot></slot>
        `
    }
}
## REGISTER-CODE:
import { BoxTemplate } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('o-box-template')) {
  cElements.define('o-box-template', BoxTemplate);
}
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables. 
1. properties (columns: name, default-value, type, description) 
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc) 
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE:
 // utils 
import { property } from "@circular-tools/utils";

// templates
import { ColorTemplate } from "@circular-templates/color";

// local 
import { style } from "./style";
import { Elevation, Radius } from "./types";

export class BoxTemplate extends ColorTemplate {
    static style = style;

    @property() radius: Radius = "circular";
    @property() elevation: Elevation = "none";

    render() {
        return `
            <slot></slot>
        `
    }
}

## TYPE-CODE: // NOTE these are just for example purposes
export type Elevation = "none"|"small"|"medium"|"large";
export type Radius = 'none' | 'small' | 'medium' | 'large' | 'circular';
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE:
// utils 
import { property } from "@circular-tools/utils";

// templates
import { ColorTemplate } from "@circular-templates/color";

// local 
import { style } from "./style";
import { Elevation, Radius } from "./types";

export class BoxTemplate extends ColorTemplate {
    static style = style;

    @property() radius: Radius = "circular";
    @property() elevation: Elevation = "none";

    render() {
        return `
            <slot></slot>
        `
    }
}
## STYLE-CODE:
:host {
    --shadow-color: var(--box-shadow-light-color, rgba(0, 0, 0, 0.1));
}

@media (prefers-color-scheme: dark) {
    :host {
        --shadow-color: var(--box-shadow-dark-color, rgb(0, 0, 0));
    }
}

$radius-map: (
    none: 0px,
    small: 4px,
    medium: 8px,
    large: 16px,
    circular: 1000px,
);

$elevation-map: (
    none: none,
    small: 0 2px 4px var(--shadow-color),
    medium: 0 2px 8px 2px var(--shadow-color),
    large: 0 2px 15px 5px var(--shadow-color),
);

@each $name, $value in $radius-map {
    :host([radius="#{$name}"]) {
        border-radius: var(--box-radius-#{$name}, var(--radius-#{$name}, $value));
    }
}

@each $name, $value in $elevation-map {
    :host([elevation="#{$name}"]) {
        box-shadow: var(--box-shadow-#{$name}, var(--shadow-#{$name}, $value));
    }
} 