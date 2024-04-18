// utils 
import { html, property, query, CustomElement } from "@pap-it/system-utils";
import '@pap-it/tools-translator';

// atoms
import { Input } from "@pap-it/input";
import '@pap-it/button';
import '@pap-it/typography';
import '@pap-it/icon';
import '@pap-it/tooltip';

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

export class Smileys extends CustomElement {
  static style = style;

  @property({ rerender: false }) private search: string = "";
  @query('pap-input') inputElement!: Input;
  @query('div.search-results') searchResults!: HTMLDivElement;

  // event handlers
  private handleclick(emoji: Emojicon) {
    return () => {
      this.dispatchEvent(new CustomEvent<EmojiEvent>("select", { detail: { emoji } }))
    }
  }
  private handleinput = (e: Event) => {
    this.search = (e.target as HTMLInputElement).value;

    this.searchResults.innerHTML = ""

    if (this.search !== "") {
      emojidata.forEach(category => {
        category.emojis.forEach(emoji => {
          if (emoji.name.startsWith(this.search)) {
            this.searchResults.appendChild(html`
              <pap-button variant="clear" size="small" class="emoji" title="${emoji.name}" @click="${this.handleclick(emoji)}">${emoji.emoji}</pap-button>
            `);
          }
        })
      })
    }


  }
  private handleclear = () => {
    if (this.inputElement) {
      this.inputElement.value = '';
    }
  }

  render() {
    return html`
      <pap-tabs indicator="true" scrolling="true">
        <div class="search" slot="between">
          <pap-input placeholder="Search Emoji" @debounced-input="${this.handleinput}">
            <pap-icon size="small" name="search" slot="suffix">search</pap-icon>
            <pap-button @click="${this.handleclear}" class="clear" size="small" variant="clear" slot="suffix">
              <pap-icon size="small" name="close">clear</pap-icon>
            </pap-button>
          </pap-input>

          <div class="search-results"></div>
        </div>
        ${emojidata.map((info: Emoji, index) => html`
          <pap-tab class="${index === 0 ? "selected" : ""}" title="${info.name}">
            <pap-icon custom-size="20" name="${info.slug}"></pap-icon>
          </pap-tab>
          
          <pap-tab-content>
            <pap-typography variant="C4">
              <pap-translator>${info.name}</pap-translator>
            </pap-typography>
            <div>
              ${info.emojis.map((emoji: Emojicon) => html`
                  <pap-button class="emoji" variant="clear" title="${emoji.name}" slot="target" @click="${this.handleclick(emoji)}">${emoji.emoji}</pap-button>
              `)}
            </div>
          </pap-tab-content>
        `)}
      </pap-tabs>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-chat-smileys": Smileys;
  }
}