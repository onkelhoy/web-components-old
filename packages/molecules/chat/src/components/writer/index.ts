// utils 
import { html, property, query } from "@circular-tools/utils";

// atoms
import { Textarea } from "@circular/textarea";
import '@circular/textarea/wc';
import '@circular/button/wc';
import '@circular/icon/wc';

// templates 
import { BoxTemplate } from '@circular-templates/box';

// local 
import { style } from "./style";
import { EmojiEvent } from "../smileys";

// types & interfaces 
export type SendEvent = { text: string };

// TODO move this class into its own component .. its a godamn edit at this point
export class Writer extends BoxTemplate  {
    static style = style;

    // properties
    // TODO have them in a nicer format like setting
    // @property({ type: Boolean }) smileys = true;
    // @property({ type: Boolean }) file = true;
    // @property({ type: Boolean }) editor = true;
    @property({ type: Boolean, rerender: false }) smileyopen = false;

    // queries
    @query('o-textarea') textareaElement!: Textarea;
    @query('#file-manager') fileElement!: HTMLInputElement;

    // event handlers
    private handlesmileyclick = () => {
      this.smileyopen = true;
    }
    private handlecloseclick = () => {
      this.smileyopen = false;
    }
    private handlesmileyselect = (e:CustomEvent<EmojiEvent>) => {
      this.textareaElement.insert(e.detail.emoji.emoji);
    }
    private handleformatclick = () => {
      console.log('format mode')
    }
    private handlefileclick = () => {
      this.smileyopen = false;
      if (this.fileElement)
      {
        this.fileElement.click();
      }
    }
    private handlefileselect = (e:Event) => {
      console.log(this.fileElement.files)
    }
    private handlesendclick = () => {
      this.smileyopen = false;
      this.dispatchEvent(new CustomEvent<SendEvent>('send', { detail: { text: this.textareaElement.value || "" } }));
    }

    render() {
      return html`
        <input hidden type="file" multiple id="file-manager" @change="${this.handlefileselect}" />
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

          <o-button radius="none" @click="${this.handleformatclick}" variant="clear">
            <o-icon customSize="20" name="format">format</o-icon>
          </o-button>
          
          <o-textarea rows="1" size="medium"></o-textarea>
  
          <o-button variant="clear" @click="${this.handlesendclick}" radius="none">
            <o-icon customSize="24" name="send">send</o-icon>
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