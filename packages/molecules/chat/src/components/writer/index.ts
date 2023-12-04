// utils 
import { html, property, query } from "@pap-it/system-utils";

// atoms
import { Textarea } from "@pap-it/textarea";
import '@pap-it/textarea/wc';
import '@pap-it/button/wc';
import '@pap-it/icon/wc';

// templates 
import { BoxTemplate } from '@pap-it/templates-box';

// local 
import { style } from "./style";
import { EmojiEvent } from "../smileys";

// types & interfaces 
export type SendEvent = { text: string };

// TODO move this class into its own component .. its a godamn edit at this point
export class Writer extends BoxTemplate {
  static style = style;

  // properties
  // TODO have them in a nicer format like setting
  // @property({ type: Boolean }) smileys = true;
  // @property({ type: Boolean }) file = true;
  // @property({ type: Boolean }) editor = true;
  @property({ type: Boolean, rerender: false }) smileyopen = false;

  // queries
  @query('pap-textarea') textareaElement!: Textarea;
  @query('#file-manager') fileElement!: HTMLInputElement;

  // event handlers
  private handlesmileyclick = () => {
    this.smileyopen = true;
  }
  private handlecloseclick = () => {
    this.smileyopen = false;
  }
  private handlesmileyselect = (e: CustomEvent<EmojiEvent>) => {
    this.textareaElement.insert(e.detail.emoji.emoji);
  }
  private handleformatclick = () => {
    console.log('format mode')
  }
  private handlefileclick = () => {
    this.smileyopen = false;
    if (this.fileElement) {
      this.fileElement.click();
    }
  }
  private handlefileselect = (e: Event) => {
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
          <pap-chat-smileys @select="${this.handlesmileyselect}"></pap-chat-smileys>
        </div>
        <div>
          <pap-button class="smiley-close" radius="none" @click="${this.handlecloseclick}" variant="clear">
            <pap-icon custom-size="20" name="close">close</pap-icon>
          </pap-button>

          <pap-button radius="none" @click="${this.handlesmileyclick}" variant="clear">
            <pap-icon custom-size="20" name="smileys_emotion">smiley</pap-icon>
          </pap-button>

            <pap-button radius="none" @click="${this.handlefileclick}" variant="clear">
            <pap-icon custom-size="20" name="file">file</pap-icon>
          </pap-button>

          <pap-button radius="none" @click="${this.handleformatclick}" variant="clear">
            <pap-icon custom-size="20" name="format">format</pap-icon>
          </pap-button>
          
          <pap-textarea rows="1" size="medium"></pap-textarea>
  
          <pap-button variant="clear" @click="${this.handlesendclick}" radius="none">
            <pap-icon custom-size="24" name="send">send</pap-icon>
          </pap-button>
        </div>
      `
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-chat-writer": Writer;
  }
}