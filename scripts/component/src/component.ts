// system 
import { html, property, query, CustomElement } from "@pap-it/system-utils";

// local
import { style } from "./style";
import { COMPONENT_CLASSNAME_TYPE } from './types'

export class COMPONENT_CLASSNAME extends CustomElement {
  static style = style;

  @property() val: COMPONENT_CLASSNAME_TYPE = "bar";

  @query<HTMLDivElement>('div') divElement!: HTMLDivElement;

  render() {
    return html`
      <div>${this.val}</div>
      <slot>Hello World</slot>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "COMPONENT_PREFIXNAME": COMPONENT_CLASSNAME;
  }
}