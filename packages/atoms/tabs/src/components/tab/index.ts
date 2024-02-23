// system
import { html, property } from "@pap-it/system-utils";
import { Base } from "@pap-it/system-base";

// local 
import { style } from "./style";

export type ClickEvent = { sectionHeight: number };

export class Tab extends Base {
  static style = style;

  @property() text: string = "Tab";

  public init(parent: HTMLElement) {
    parent.addEventListener('tab-select', (e: Event) => {
      if (e instanceof CustomEvent) {
        if (this.getAttribute('data-tab-id') === e.detail.id) {
          this.classList.add('selected');
          // this.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'center' });
        }
        else {
          this.classList.remove('selected');
        }
      }
    })
  }

  // class functions
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('slot', 'tab');
  }
  firstUpdate(): void {
    super.firstUpdate();
    if (this.classList.contains('selected')) {
      setTimeout(() => {
        this.dispatchEvent(new Event('click', {
          composed: false,
          cancelable: false
        }));
      }, 130)
      // TODO - tab self select
      /** NOTE I dont know why 130 works 
       * 
       * problem source -> sidebar showcase overlay example the self click didnt work streight away 
       * - perhaps a more complex solution awaits that would be able to set a timeout after element 
       *   has been rendered to screen, seems to be hard because shadowRoot exists.. 
       * 
       *   triggering click within shadowRoot and 
       *   
      /*/
    }
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