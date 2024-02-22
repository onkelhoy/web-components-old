// system 
import { NextParent, html } from "@pap-it/system-utils";
import { Base } from "@pap-it/system-base";

import { Menu, Item } from '@pap-it/templates-menu';

// local
import { style } from "./style";
import { Select } from "../../component";

export class Option extends Item {
  static style = style;

  override init(menu: Menu) {
    super.init(menu);
    const select = NextParent<Select>(menu);
    if (select) {
      select.addEventListener('search', this.handlesearch);
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