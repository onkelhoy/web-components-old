// system 
import { ExtractSlotValue, Size, Spread, context, html, property, query } from "@pap-it/system-utils";
import { BaseSystem } from "@pap-it/system-base";

// atoms
import { Textarea } from "@pap-it/textarea";
import "@pap-it/textarea/wc";

// local
import { style } from "./style";
import { Column, Config, DefaultConfig, Alignment } from "../../types";

// @property({ spread: Spread.BREAKOUT, type: Object, verbose: true }) settings: Cell = DefaultCell;
export class TableCell extends BaseSystem {
  static style = style;

  @property() size: Size = "medium";
  @property() align: Alignment = "left";
  @property({ type: Boolean }) editable: boolean = false;
  @property() mode: "default" | "edit" = "default";
  @property() value: string = "";

  // contexts
  @context() config: Config = DefaultConfig;
  @context() columns: Column[] = [];

  private hasdoubleclick = false;

  connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener("click", this.handleclick);
    window.addEventListener("click", this.handlewindowclick);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener("click", this.handlewindowclick);
  }

  // event handlers 
  private handleclick = (e: Event) => {
    e.stopPropagation();

    if (this.editable) {
      // should open form ? 
      // first check on cell level
      // second check on column level 
      // forth check on row level (?) 

      if (this.mode !== "edit") {
        this.mode = "edit";
      }
    }
  }
  private handlewindowclick = (e: Event) => {
    if (this.mode === "edit") {
      this.mode = "default";
    }
  }
  private handleslotchange = (e: Event) => {
    if (e.target instanceof HTMLSlotElement) {
      this.value = ExtractSlotValue(e.target).join(" ");
      console.log('set value', this.value)
    }
  }
  private handleinput = (e: Event) => {
    if (e.target instanceof HTMLElement) {
      const value = (e.target as Textarea).value;

      // TODO as inputs always emit their intital value (should be fixed)
      // we just make sure value is not same as before
      if (value !== "" && this.value !== value) {
        console.log('value?', value)
        this.value = value;
        // console.log('cgabge', value);
      }
    }
  }

  render() {
    return html`
      <div part="content" contenteditable="true">
        <slot @slotchange="${this.handleslotchange}"></slot>
      </div>
      <div part="edit">
        <pap-textarea resize="none" @input="${this.handleinput}" value="${this.value}"></pap-textarea>
      </div>
    `
  }
}