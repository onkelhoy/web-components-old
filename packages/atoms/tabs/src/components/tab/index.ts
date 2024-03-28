// system
import { html, property, CustomElement } from "@pap-it/system-utils";

// local 
import { style } from "./style";

export type ClickEvent = { sectionHeight: number };

export class Tab extends CustomElement {
  static style = style;

  @property() text: string = "Tab";

  public init(parent: HTMLElement) {
    parent.addEventListener("pre-change", this.handleprechange);
  }

  // event handlers
  private handleprechange = (e: Event) => {
    if (e.target && 'selected' in e.target) {
      const id = this.getAttribute('id') || this.getAttribute('data-tab-id');

      if (id === e.target.selected) {
        this.classList.add("selected");
        this.dispatchEvent(new Event('click'));
      }
      else {
        this.classList.remove("selected");
      }
    }
  }

  // class functions
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('slot', 'tab');
  }

  render() {
    return html`
      <slot>${this.text}</slot>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-tab": Tab;
  }
}