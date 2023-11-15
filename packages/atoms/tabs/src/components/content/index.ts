// utils 
import { html } from "@papit/tools-utils";

// templates
import { BaseTemplate } from "@papit/templates-base";

// local 
import { style } from "./style";

export class TabContent extends BaseTemplate {
  static style = style;

  constructor() {
    super();

    this.setAttribute('slot', 'content');
  }

  public init(parent: HTMLElement) {
    parent.addEventListener('tab-select', (e:Event) => {
      if (e instanceof CustomEvent)
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
    "pap-tab-content": TabContent;
  }
}