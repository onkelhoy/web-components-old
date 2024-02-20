// utils 
import { ExtractSlotValue, debounce, html, property } from "@pap-it/system-utils";

// templates
import { Base } from "@pap-it/system-base";

// local 
import { style } from "./style";
import { InitTranslations, TRANSLATION_ADDED } from "./translator";

export class Translator extends Base {
  static style = style;

  private spanElement!: HTMLSpanElement;
  private text!: string;
  get Text() {
    return this.text;
  }
  private key!: string;
  get Key() {
    return this.key;
  }
  set Key(value: string | null) {
    if (typeof value === 'string') {
      this.key = value;
      // this.key = value.replace(/<!--\?lit.*?>(.*)/, '$1');
    }
    else {
      this.key = '';
    }

    this.updateText();
  }
  private dynamicAttributes: Set<string> = new Set<string>();
  private noupdate = false;

  @property({
    rerender: false,
    onUpdate: 'onscopeupdate'
  }) scope?: string;

  // class functions 
  connectedCallback(): void {
    super.connectedCallback();
    InitTranslations();
    window.papLocalization?.subscribe(this.updateText);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // this.attributeObserver.disconnect();
    window.papLocalization?.unsubscribe(this.updateText);
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (this.dynamicAttributes.has(name)) {
      this.updateText();
    }
  }

  firstUpdate(): void {
    if (this.shadowRoot) {
      const span = this.shadowRoot.querySelector<HTMLSpanElement>('span.pap-translation-span');
      if (span) {
        this.spanElement = span;
      }
    }
  }

  // event handlers 
  private handletranslateslotchange = (e: Event) => {
    if (e.target instanceof HTMLSlotElement) {
      const nodetext = ExtractSlotValue(e.target).join(' ').trim();
      this.Key = nodetext;
    }
  }

  // on update
  private onscopeupdate = () => {
    this.updateText();
  }

  // public functions 
  public translateKey(key: string, variables?: Record<string, string>) {
    if (variables) {
      for (let name in variables) {
        this.setAttribute(name, variables[name]);
        this.dynamicAttributes.add(name);
      }
    }

    if (this.key !== key) {
      this.noupdate = true;
      this.Key = key;
    }

    return this.text;
  }

  // private functions 
  private updateText = () => {
    const finalkey = (this.scope ? this.scope + "." : "") + this.key;
    let text = window.papLocalization?.current?.translations?.[finalkey] || this.key;
    if (text === undefined && this.key === undefined) return;

    const regex = /{([^{}]+)}/g;
    const matches = text.match(regex);

    if (matches) {
      matches.forEach(variable => {
        const sliced = variable.slice(1, -1);
        const value = this.getAttribute(sliced);
        if (value) {
          text = text.replace(variable, value);

          if (!this.dynamicAttributes.has(sliced)) {
            this.dynamicAttributes.add(sliced);
          }
        }
      });
    }

    this.text = text;
    if (this.spanElement) {
      this.spanElement.innerText = text;
    }
    else if (!this.noupdate) {
      this.debouncedRequestUpdate();
    }

    this.noupdate = false;
  };

  render() {
    return html`
      <span class="pap-translation-span"></span>
      <slot style="display:none;" @slotchange="${this.handletranslateslotchange}"></slot>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-translator": Translator;
  }
}