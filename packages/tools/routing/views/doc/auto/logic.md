PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables.

1. properties (columns: name, default-value, type, description)
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc)
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE

 // system
import { html, property } from "@pap-it/system-utils";
import { BaseSystem } from "@pap-it/system-base";

// local
import { style } from "./style";
import { Foo, ClickEvent } from "./types";

export class RoutingTool extends BaseSystem {
  static style = style;

  @property() foo: Foo = "bar";
  @property({ type: Number }) bajs?: number;
  @property({ type: Boolean }) fooLaa: boolean = true;

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
            </footer>
        `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-routing-tool": RoutingTool;
  }
}

## TYPE-CODE: // NOTE these are just for example purposes

type FooType1 = "bar";
type FooType2 = "hello world";

export type Foo = FooType1 | FooType2;
export type ClickEvent = { foo: Foo };
