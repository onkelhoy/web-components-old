// utils 
import { html, property } from "@circular-tools/utils";

// atoms
import '@circular/button/wc';

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

    @property({ type: Array }) emojis:Emoji[] = emojidata;

    // event handlers
    private handleclick(emoji:Emojicon) {
      return () => {
        console.log('clicked', emoji);
        this.dispatchEvent(new CustomEvent<EmojiEvent>("select", { detail: { emoji } }))
      }
    }

    render() {
      // const icons = this.emojis.map(emoji => `<o-button title="${emoji.}" color="blue" variant="outlined">${icon.value}</o-button>`).join('')

      return html`
        <o-tabs indicator="true">
          ${this.emojis.map(info => html`
            <o-tooltip>
              <o-tab slot="target">
                <o-icon name="${info.slug}"></o-icon>
              </o-tab>
              <o-typography>
                <o-translator>${info.name}</o-translator>
              </o-typography>
            </o-tooltip>
            <o-tab-content>
              <o-typography variant="subtitle">
                <o-translator>${info.name}</o-translator>
              </o-typography>
              <div>
                ${info.emojis.map(emoji => html`
                  <o-tooltip variant="suttle">
                    <o-button slot="target" @click="${this.handleclick(emoji)}">${emoji.emoji}</o-button>
                    <o-typography>
                      <o-translator>${emoji.name}</o-translator>
                    </o-typography>
                  </o-tooltip>
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