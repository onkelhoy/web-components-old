// utils 
import { html, property, query } from "@circular-tools/utils";

// templates
import { BaseTemplate } from "@circular-templates/base";

import { style } from "./style";

export class Cell extends BaseTemplate {
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