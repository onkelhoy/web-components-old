// utils 
import { CustomElement } from "@pap-it/system-utils";

// local 
import { style } from "./style";

export class TabContent extends CustomElement {
  static style = style;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('slot', 'content');
  }

  public init(parent: HTMLElement) {
    parent.addEventListener('change', this.handlechange);
  }

  // event handlers
  private handlechange = (e: Event) => {
    if (e.target && 'selected_id' in e.target) {
      const id = this.getAttribute('id') || this.getAttribute('data-tab-id');

      if (id === e.target.selected_id) {
        this.classList.add("selected");
      }
      else {
        this.classList.remove("selected");
      }
    }
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