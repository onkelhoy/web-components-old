// utils 
import { html, property, query } from "@pap-it/system-utils";

// templates
import { BaseSystem } from "@pap-it/system-base";

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