PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE:
// utils 
import { html, property } from "@onkelhoy/tools-utils";

// templates
import { BaseTemplate } from "@onkelhoy/templates-base";

// local 
import { style } from "./style";
import { Foo, ClickEvent } from "./types";

export class Editor extends BaseTemplate {
    static style = style;

    @property() foo:Foo = "bar";
    @property({ type: Number }) bajs?:number;
    @property({ type: Boolean }) fooLaa:boolean = true;

    // event handlers
    private handleMainClick() {
        this.dispatchEvent(new CustomEvent<ClickEvent>("main-click", { detail: { foo: this.foo } }));
    }

    render() {
        return html`
            <header part="header">
                <slot name="header">
                    <h1>llama drama trauma</h1>
                </slot>
            </header>
            <main onclick=${this.handleMainClick}>
                <slot>
                    <p>Why did the llama go to therapy? Because it had a lot of spitting issues!</p>
                </slot>
            </main>
            <footer part="footer">
                <slot name="footer">
                    <p>Why did the llama enter the door? To attend the llamazing party inside!</p>
                </slot>
            </footer
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-editor": Editor;
    }
}
## STYLE-CODE:
:host {
    display: block;
    padding: 1rem;
    --background: var(--editor-light-background-color, var(--colors-netural-white, white));
    --color: var(--editor-light-text-color, var(--colors-netural-black, black));

    background-color: var(--background);
    color: var(--color);
}

@media (prefers-color-scheme: dark) {
    :host {
        --background: var(--editor-dark-background-color, var(--colors-netural-black, black));
        --color: var(--editor-dark-text-color, var(--colors-netural-white, white));
    }
}