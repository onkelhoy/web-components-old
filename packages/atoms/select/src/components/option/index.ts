// system 
import { NextParent, html } from "@pap-it/system-utils";

import { MenuTemplate, ItemTemplate } from '@pap-it/templates-menu';

// local
import { style } from "./style";
import { Select } from "../../component";

export class Option extends ItemTemplate {
  static style = style;

  private menu!: MenuTemplate;

  override init(menu: MenuTemplate) {
    super.init(menu);
    this.menu = menu;
    const select = NextParent<Select>(menu);
    if (select) {
      select.addEventListener('search', this.handlesearch);
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.menu) {
      const select = NextParent<Select>(this.menu);
      if (select) {
        select.removeEventListener('search', this.handlesearch);
      }
    }
  }

  // event handlers 
  private handlesearch = (e: Event) => {
    if (e instanceof CustomEvent) {

      if (e.detail.regexp.test(this.getText())) {
        // im ok
        this.removeAttribute('hide');
      }
      else {
        this.setAttribute('hide', 'true');
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-option": Option;
  }
}