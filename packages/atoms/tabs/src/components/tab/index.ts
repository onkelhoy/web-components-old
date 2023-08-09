// utils 
import { html, property } from "@henry2/tools-utils";

// templates
import { BaseTemplate } from "@henry2/templates-base";

// local 
import { style } from "./style";
import { SelectEvent } from "../../types";

export type ClickEvent = { sectionHeight: number }; 

export class Tab extends BaseTemplate {
  static style = style;

  @property() heading: string = "Tab";

  public init(parent: HTMLElement) {
    parent.addEventListener('tab-select', (e:Event) => {
      if (e instanceof CustomEvent<SelectEvent>)
      {
        if (this.getAttribute('data-tab-id') === e.detail.id)
        {
          this.classList.add('selected');
          // this.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'center' });
        }
        else 
        {
          this.classList.remove('selected');
        }
      }
    })
  }

  // class functions
  constructor() {
    super();
    this.setAttribute('slot', 'tab');
  }
  firstUpdate(): void {
    if (this.classList.contains('selected'))
    {
      setTimeout(() => {
        this.dispatchEvent(new Event('click'));
      }, 1)
    }
  }

  render() {
    return html`
      <slot>${this.heading}</slot>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "o-tab": Tab;
  }
}