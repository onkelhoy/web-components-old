// system 
import { html, property, query } from "@pap-it/system-utils";
import { BaseSystem } from "@pap-it/system-base";

// local
import { style } from "./style";

export class COMPONENT_CLASSNAME extends BaseSystem {
  static style = style;

  @query<HTMLDivElement>('div') divElement!: HTMLDivElement;
  @property() foo: string = "bar";

  render() {
    return html`
      <div>${this.foo}</div>
      <slot>Hello World</slot>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "COMPONENT_PREFIXNAME": COMPONENT_CLASSNAME;
  }
}