// utils 
import { html } from "@pap-it/system-utils";

// templates
import { Base } from "@pap-it/system-base";

// local 
import { style } from "./style";

export class TabContent extends Base {
  static style = style;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('slot', 'content');
  }

  public init(parent: HTMLElement) {
    parent.addEventListener('tab-select', (e: Event) => {
      if (e instanceof CustomEvent) {
        if (this.getAttribute('data-tab-id') === e.detail.id) {
          this.classList.add('selected');

          // if (e.detail.scrolling)
          // {
          //   this.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          // }
        }
        else {
          this.classList.remove('selected');
        }
      }
    })
  }

  render() {
    return '<slot></slot>'
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-tab-content": TabContent;
  }
}