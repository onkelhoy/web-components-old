PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables. 
1. properties (columns: name, default-value, type, description) 
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc) 
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE:
 // utils 
import { html, property, FormatNumber } from "@pap-it/system-utils";

// atoms
import "@pap-it/typography/wc"

// templates
import { BaseSystem } from "@pap-it/system-base";
import "@pap-it/templates-box/wc"

// local 
import { style } from './style';

export class Badge extends BaseSystem {
  static style = style;

  @property({ type: Number }) count: number = 0;

  render() {
    return html`
            <pap-box-template part="box" radius="circular">
                <pap-typography variant="C4"><slot>${FormatNumber(this.count)}</slot></pap-typography>
            </pap-box-template>
        `
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-badge": Badge;
  }
}

## TYPE-CODE: // NOTE these are just for example purposes
type FooType1 = "bar";
type FooType2 = "hello world";

export type Foo = FooType1 | FooType2;
export type ClickEvent = { foo: Foo };