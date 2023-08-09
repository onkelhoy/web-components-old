// utils 
import { html, property, query } from "@onkelhoy/tools-utils";
import '@onkelhoy/tools-translator/wc';

// atoms
import { Input } from "@onkelhoy/input";
import { Button } from "@onkelhoy/button";
import '@onkelhoy/button/wc';
import '@onkelhoy/typography/wc';
import '@onkelhoy/icon/wc';
import '@onkelhoy/tooltip/wc';

// templates 
import { BaseTemplate } from '@onkelhoy/templates-base';

// local 
import { style } from "./style";
import emojidata from './emoji.json';

export interface Emojicon {
  emoji: string;
  skin_tone_support: boolean;
  name: string;
  slug: string;
  unicode_version: string;
  emoji_version: string;
}
interface Emoji {
  name: string;
  slug: string;
  emojis: Emojicon[];
}

export type EmojiEvent = { emoji: Emojicon }

export class Smileys extends BaseTemplate  {
  static style = style;

  @property({ rerender: false }) private search: string = "";
  @query('o-input') inputElement!: Input;
  @query('div.search-results') searchResults!: HTMLDivElement;

  // event handlers
  private handleclick(emoji:Emojicon) {
    return () => {
      this.dispatchEvent(new CustomEvent<EmojiEvent>("select", { detail: { emoji } }))
    }
  }
  private handleinput = (e:Event) => {
    this.search = (e.target as HTMLInputElement).value;

    this.searchResults.innerHTML = ""

    if (this.search !== "")
    {
      emojidata.forEach(category => {
        category.emojis.forEach(emoji => {
          if (emoji.name.startsWith(this.search))
          {
            this.searchResults.appendChild(html`
              <o-button variant="clear" size="small" class="emoji" title="${emoji.name}" @click="${this.handleclick(emoji)}">${emoji.emoji}</o-button>
            `);
          }
        })
      })
    }
    
    
  }
  private handleclear = () => {
    if (this.inputElement)
    {
      this.inputElement.value = '';
    }
  }

  render() {
    return html`
      <o-tabs indicator="true" scrolling="true">
        <div class="search" slot="between">
          <o-input placeholder="Search Emoji" @suspended-input="${this.handleinput}">
            <o-icon size="small" name="search" slot="suffix">search</o-icon>
            <o-button @click="${this.handleclear}" class="clear" size="small" variant="clear" slot="suffix">
              <o-icon size="small" name="close">clear</o-icon>
            </o-button>
          </o-input>

          <div class="search-results"></div>
        </div>
        ${emojidata.map((info:Emoji, index) => html`
          <o-tab class="${index === 0 ? "selected" : ""}" title="${info.name}">
            <o-icon customSize="20" name="${info.slug}"></o-icon>
          </o-tab>
          
          <o-tab-content>
            <o-typography variant="C4">
              <o-translator>${info.name}</o-translator>
            </o-typography>
            <div>
              ${info.emojis.map((emoji:Emojicon) => html`
                  <o-button class="emoji" variant="clear" title="${emoji.name}" slot="target" @click="${this.handleclick(emoji)}">${emoji.emoji}</o-button>
              `)}
            </div>
          </o-tab-content>
        `)}
      </o-tabs>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "o-chat-smileys": Smileys;
  }
}