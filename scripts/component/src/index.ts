// utils 
import { html, property, query } from "@henry2/tools-utils";

// templates
import { BaseTemplate } from "@henry2/templates-base";

import { style } from "./style";

export class COMPONENT_CLASSNAME extends BaseTemplate {
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