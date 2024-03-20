// system 
import { html, property, query, CustomElement } from "@pap-it/system-utils";

// local
import { style } from "./style";

export class COMPONENT_CLASSNAME extends CustomElement {
  static style = style;

  @property() foo: string = "bar";

  @query<HTMLDivElement>('div') divElement!: HTMLDivElement;

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