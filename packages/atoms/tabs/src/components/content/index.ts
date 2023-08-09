// utils 
import { html } from "@henry2/tools-utils";

// templates
import { BaseTemplate } from "@henry2/templates-base";

// local 
import { style } from "./style";

import { SelectEvent } from "../../types";

export class TabContent extends BaseTemplate {
  static style = style;

  constructor() {
    super();

    this.setAttribute('slot', 'content');
  }

  public init(parent: HTMLElement) {
    parent.addEventListener('tab-select', (e:Event) => {
      if (e instanceof CustomEvent<SelectEvent>)
      {
        if (this.getAttribute('data-tab-id') === e.detail.id)
        {
          this.classList.add('selected');

          // if (e.detail.scrolling)
          // {
          //   this.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          // }
        }
        else 
        {
          this.classList.remove('selected');
        }
      }
    })
  }

  render() {
    return html`
      <slot></slot>  
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "o-tab-content": TabContent;
  }
}