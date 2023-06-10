// utils 
import { html, property, query } from "@circular-tools/utils";

// atoms
import { Input } from "@circular/input";
import '@circular/input/wc';
import '@circular/button/wc';
import '@circular/icon/wc';

// templates 
import { BoxTemplate } from '@circular-templates/box';

// local 
import { style } from "./style";
import { EmojiEvent } from "../smileys";

// types & interfaces 
export type SendEvent = { text: string };

export class Writer extends BoxTemplate  {
    static style = style;

    @property({ type: Boolean, rerender: false }) smileyopen = false;
    @query('o-input') inputElement!: Input;

    // event handlers
    private handlesmileyclick = () => {
      this.smileyopen = true;
    }
    private handlecloseclick = () => {
      this.smileyopen = false;
    }
    private handlesmileyselect = (e:CustomEvent<EmojiEvent>) => {
      this.inputElement.insert(e.detail.emoji.emoji);
    }
    private handlefileclick = () => {
      this.smileyopen = false;
      console.log('open file')
    }
    private handlesendclick = () => {
      this.smileyopen = false;
      this.dispatchEvent(new CustomEvent<SendEvent>('send', { detail: { text: this.inputElement.value || "" } }));
    }

    render() {
      return html`
        <div class="accordion">
          <o-chat-smileys @select="${this.handlesmileyselect}"></o-chat-smileys>
        </div>
        <div>
          <o-button class="smiley-close" radius="none" @click="${this.handlecloseclick}" variant="clear">
            <o-icon customSize="20" name="close">close</o-icon>
          </o-button>

          <o-button radius="none" @click="${this.handlesmileyclick}" variant="clear">
            <o-icon customSize="20" name="smileys_emotion">smiley</o-icon>
          </o-button>
  
          <o-button radius="none" @click="${this.handlefileclick}" variant="clear">
            <o-icon customSize="20" name="file">file</o-icon>
          </o-button>
          
          <o-input name="input" size="medium"></o-input>
  
          <o-button variant="clear" @click="${this.handlesendclick}" radius="none">
            <o-icon customSize="23" name="send">send</o-icon>
          </o-button>
        </div>
      `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-chat-writer": Writer;
    }
}