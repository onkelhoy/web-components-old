// system 
import { ExtractSlotValue, Size, CustomElement, context, html, property } from "@pap-it/system-utils";

// atoms
import { Textarea } from "@pap-it/textarea";

// local
import { style } from "./style";
import { IColumn, Config, DefaultConfig, Alignment } from "../../types";

// @property({ spread: Spread.BREAKOUT, type: Object, verbose: true }) settings: Cell = DefaultCell;
export class Cell extends CustomElement {
  static style = style;

  @property() size: Size = "medium";
  @property() align: Alignment = "left";
  @property({ type: Boolean }) editable: boolean = false;
  @property() mode: "default" | "edit" = "default";
  @property() value: string = "";

  // contexts
  @context() config: Config = DefaultConfig;
  @context() columns: IColumn[] = [];
  @context() edit: boolean = false;

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
  firstRender(): void {
    super.firstRender();
    if (!this.hasAttribute("tabindex")) this.tabIndex = 0;
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
  private handleinput = (e: Event) => {
    if (e.target instanceof HTMLInputElement) {
      this.value = e.target.value;
    }
  }

  render() {
    return html`
      <div part="content">
        ${this.value}
      </div>
      <div part="edit">
        <input @input="${this.handleinput}" value="${this.value}" />
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-table-cell": Cell;
  }
}