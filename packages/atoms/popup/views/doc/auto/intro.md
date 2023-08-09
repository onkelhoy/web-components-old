PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and register code provided to you - could you create a rather simple introduction text with maybe a code example how to use in html - keep it very simple. Do not give example how to run the register code it's already included (this is for you so you can see the element-tag)! The introduction should be read by developers so it needs not to be simple enough for beginners!

## SOURCE-CODE:
// utils 
import { html, property, query } from "@henry2/tools-utils";

// templates
import { BaseTemplate } from "@henry2/templates-base";

// local 
import { style } from "./style";
import { State, Variant } from "./types";

export class Popup extends BaseTemplate {
  static styles = style;

  @query('iz-card') private cardElement!: HTMLDivElement;

  @property({ type: String }) headerTitle = 'Popup Title';

  @property({ type: Boolean }) hideonoutsideclick: boolean = false;

  @property() variant: Variant = 'global';

  @property() state: State = 'hide';

  // @property() minWidth?: string;

  private showDelay = false;

  private documentElementOverflow: string | null = null;

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('variant'))
      this.setAttribute('variant', this.variant);

    if (this.hideonoutsideclick) {
      window.addEventListener('click', this.handleOutsideClick);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.hideonoutsideclick) {
      window.removeEventListener('click', this.handleOutsideClick);
    }
  }

  attributeChangedCallback(
    name: string,
    _old: string | null,
    value: string | null
  ): void {
    super.attributeChangedCallback(name, _old, value);

    if (name === 'state') {
      if (value === 'show') {
        this.show();
      } else {
        this.hide();
      }
    }

    if (name === 'minwidth' && value !== null) {
      // TODO should this be implemented ?
      // console.log("minWidth",value)
      // this.style["--card-width"] = value;
    }
  }

  // public functions
  public show() {
    this.state = 'show';
    this.showDelay = true;

    if (this.variant === 'global') {
      if (!this.documentElementOverflow) {
        const computedStyle = window.getComputedStyle(document.documentElement);
        this.documentElementOverflow =
          computedStyle.getPropertyValue('overflow');
      }
      document.documentElement.style.overflow = 'hidden';
    }

    setTimeout(() => {
      this.showDelay = false;
      this.dispatchEvent(new Event('popup-show'));
    }, 2);
  }

  public hide = () => {
    if (this.variant === 'global') {
      document.documentElement.style.overflow =
        this.documentElementOverflow || 'auto';
    }
    this.state = 'hide';
    this.dispatchEvent(new Event('popup-hide'));
  };

  // private functions
  private handleOutsideClick = (event: MouseEvent) => {
    if (!this.hideonoutsideclick) return;
    if (this.state === 'hide') return;
    if (this.showDelay) return;

    const cardBox = this.cardElement?.getBoundingClientRect();
    const { clientX: x, clientY: y } = event;

    if (cardBox instanceof DOMRect) {
      if (Popup.mouseWithin(x, y, cardBox)) return;
    }

    this.hide();
  };

  static mouseWithin(x: number, y: number, rec: DOMRect) {
    return rec.left <= x && rec.right >= x && rec.top <= y && rec.bottom >= y;
  }

  render() {
    return html`
      <div class=${['wrapper', this.state, this.variant].join(' ')}>
        <o-card .headerTitle=${this.headerTitle} header footer>
          <o-button
            @click=${this.hide}
            slot="header"
            variant="square"
            size="small"
          >
            <o-icon-close size="small"></o-icon-close>
          </o-button>
          <slot></slot>
          <slot name="footer" slot="footer"></slot>
        </o-card>
      </div>
    `;
  }
}

declare global {
    interface HTMLElementTagNameMap {
        "o-popup": Popup;
    }
}
## REGISTER-CODE:
import { Popup } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('o-popup')) {
  cElements.define('o-popup', Popup);
}
