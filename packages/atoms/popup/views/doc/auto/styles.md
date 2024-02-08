PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE

// utils
import { html, property, query } from "@pap-it/system-utils";

// templates
import { Base } from "@pap-it/system-base";

// local
import { style } from "./style";
import { State, Variant } from "./types";

export class Popup extends Base {
  static style = style;

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
    super.attributeChangedCallback(name,_old, value);

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
        <pap-card .headerTitle=${this.headerTitle} header footer>
          <pap-button
            @click=${this.hide}
            slot="header"
            variant="square"
            size="small"
          >
            <pap-icon-close size="small"></pap-icon-close>
          </pap-button>
          <slot></slot>
          <slot name="footer" slot="footer"></slot>
        </pap-card>
      </div>
    `;
  }
}

declare global {
    interface HTMLElementTagNameMap {
        "pap-popup": Popup;
    }
}

## STYLE-CODE

div.wrapper {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 700;
    isolation: isolate;
}
div.wrapper.global {
    position: fixed;
    width: 100vw;
    height: 100vh;
}
div.wrapper:before {
    position: absolute;
    top: 0;
    left: 0;

    background-color: var(--popup-backdrop-background, rgba(0, 0, 0, 0.1));
    backdrop-filter: var(--popup-backdrop-filter, blur(0px));
    content: '';
    width: inherit;
    height: inherit;
    display: block;
    z-index: 1;
}

iz-card {
    width: fit-content;
    height: fit-content;
    z-index: 2;

    position: absolute;
    top: 50%;
    left: 50%;
    overflow-y: auto;
    overflow-x: hidden;
    transform: translate(-50%, -50%);
    width: fit-content;
    height: fit-content;
    max-width: calc(100% - 9px);
    max-height: calc(100% - 9px);
    background-color: white;
}

div.wrapper.show {
    display: block;
}
