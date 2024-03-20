// system
import { generateUUID, html, property, query, CustomElement } from "@pap-it/system-utils";

// local 
import { style } from "./style";
import { Item } from "./components/item";

export class DragList extends CustomElement {
  static style = style;

  // queries
  @query({
    selector: 'div.copy', load: function (this: DragList) {
      this.handleresize();
    }
  }) copyElement!: HTMLDivElement;
  @query({
    selector: 'div[part="wrapper"', load: function (this: DragList) {
      this.handleresize();
    }
  }) wrapperElement!: HTMLDivElement;
  @query('span[part="indicator"]') indicatorElement!: HTMLSpanElement;

  // properties
  @property({ type: Boolean }) dragging: boolean = false;

  private selected: null | Item = null;
  private over: null | Item = null;
  private overmode: null | "top" | "bottom" = null;

  connectedCallback(): void {
    super.connectedCallback();

    window.addEventListener("mouseup", this.handlerelease);
    window.addEventListener("touchend", this.handlerelease);
    window.addEventListener("mousemove", this.handlemousemove);
    window.addEventListener("touchmove", this.handletouchmove);
    window.addEventListener("resize", this.handleresize);
  }
  disconnectedCallback(): void {
    super.disconnectedCallback();

    window.removeEventListener("touchend", this.handlerelease);
    window.removeEventListener("mouseup", this.handlerelease);
    window.removeEventListener("mousemove", this.handlemousemove);
    window.removeEventListener("touchmove", this.handletouchmove);
    window.removeEventListener("resize", this.handleresize);
  }

  // event handlers
  private handleresize = () => {
    if (this.wrapperElement) {
      if (this.copyElement) {
        this.copyElement.style.width = this.wrapperElement.clientWidth + 'px';
      }
    }
  }
  private handlemousemove = (e: MouseEvent) => {
    this.move(e.pageX, e.pageY);
  }
  private handletouchmove = (e: TouchEvent) => {
    const x = e.touches.item(0)?.pageX;
    const y = e.touches.item(0)?.pageY;

    if (x && y) {
      this.move(x, y);
    }
  }
  private handlerelease = () => {
    if (this.selected) {
      this.selected.dragged = false;

      if (this.over && this.selected !== this.over) {
        const clone = this.selected.cloneNode(true) as Element;
        console.log("clone", clone)
        // ReapplyEvents(this.selected, clone);

        this.initItem(clone);

        if (this.overmode === "top") {
          this.over.parentElement?.insertBefore(clone, this.over);
        }
        else {
          const next = this.over.nextElementSibling;
          if (next) {
            this.over.parentElement?.insertBefore(clone, next);
          }
          else {
            this.over.parentElement?.appendChild(clone);
          }
        }

        this.selected.parentElement?.removeChild(this.selected);
      }
    }
    this.dragging = false;
    this.selected = null;
    this.over = null;
    this.overmode = null;
    // this.copyElement.innerHTML = "";
  }
  private handleslotchange = (e: Event) => {
    if (e.target instanceof HTMLSlotElement) {
      const elements = e.target.assignedElements();

      for (const element of elements) {
        if (!element.hasAttribute("uuid")) {
          this.initItem(element);
        }
      }
    }
  }
  private handleitehover = (e: Event) => {
    if (this.selected) {
      if (this.indicatorElement) {

        let y = 0;
        if (e instanceof MouseEvent) {
          y = e.clientY;
        }

        if (e.target instanceof HTMLElement) {
          const itembox = e.target.getBoundingClientRect();
          const wrapbox = this.wrapperElement.getBoundingClientRect();
          const dy = itembox.y - wrapbox.y;

          const idy = y - itembox.y;

          this.overmode = idy >= itembox.height / 2 ? "bottom" : "top";

          this.over = e.target as Item;

          if (this.overmode === "top") {
            this.indicatorElement.style.top = (dy - 4) + 'px';
          }
          else {
            this.indicatorElement.style.top = (dy + itembox.height + 4) + 'px';
          }
        }
      }
    }
  }
  private handledragstart = (e: Event) => {
    if (this.selected === null) {
      if (e.target instanceof HTMLElement) {
        this.selected = e.target as Item;
        this.selected.dragged = true;
        this.dragging = true;

        const itembox = e.target.getBoundingClientRect();
        const wrapbox = this.wrapperElement.getBoundingClientRect();
        const dy = itembox.y - wrapbox.y;

        this.indicatorElement.style.top = (dy - 4) + 'px';

        // NOTE a bug on the optimizer part, it removes this element as "dragging" is set and triggers the 
        // rerender and the opimizer sees a difference and "removes" this programatically added element - SHOULD NOT!
        this.callAfterRender.push(() => {
          if (this.selected) {
            const clone = this.selected.cloneNode(true) as Item;

            clone.removeEventListener("mousemove", this.handleitehover);
            clone.removeEventListener("touchmove", this.handleitehover);
            clone.dragged = false;
            this.copyElement.appendChild(clone);
          }
        })
      }
    }
  }

  // helper functions
  private move(x: number, y: number) {
    if (this.selected) {
      this.copyElement.style.top = y + 'px';
      this.copyElement.style.left = x + 'px';
    }
  }
  private initItem(element: Element) {
    element.setAttribute("uuid", generateUUID());
    element.addEventListener("drag-start", this.handledragstart);
    element.addEventListener("mousemove", this.handleitehover);
    element.addEventListener("touchmove", this.handleitehover);
  }

  render() {
    return html`
      <div part="wrapper">
        <slot @slotchange="${this.handleslotchange}"></slot>
        <span part="indicator"></span>
      </div>
      <div class="copy"></div>
    `
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-drag-list": DragList;
  }
}