// utils 
import { html, property } from "@circular-tools/utils";
import '@circular-tools/translator/wc';

// atoms
import '@circular/button/wc';
import '@circular/typography/wc';
import '@circular/icon/wc';
import '@circular/tooltip/wc';

// templates 
import { BoxTemplate } from '@circular-templates/box';

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

export class Smileys extends BoxTemplate  {
  static style = style;

  // event handlers
  private handleclick(emoji:Emojicon) {
    return () => {
      console.log('clicked', emoji);
      this.dispatchEvent(new CustomEvent<EmojiEvent>("select", { detail: { emoji } }))
    }
  }

  render() {



    return html`
      <o-tabs indicator="true">
        ${emojidata.map((info:Emoji) => html`
          <o-tab title="${info.name}">
            <o-icon size="small" name="${info.slug}"></o-icon>
          </o-tab>
          
          <o-tab-content>
            <o-typography variant="C4">
              <o-translator>${info.name}</o-translator>
            </o-typography>
            <div>
              ${info.emojis.map((emoji:Emojicon) => html`
                  <o-button variant="clear" title="${emoji.name}" slot="target" @click="${this.handleclick(emoji)}">${emoji.emoji}</o-button>
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