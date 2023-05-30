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