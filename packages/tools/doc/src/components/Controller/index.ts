// utils 
import { html } from "@circular-tools/utils";

// templates
import { BaseTemplate } from "@circular-templates/base";

import { style } from "./style.js";

export class Controller extends BaseTemplate {
  static style = style;

  private section!: HTMLElement;
  private pressed = false;
  private original_y = 0;
  private original_height = 0;

  disconnectedCallback(): void {
    super.disconnectedCallback();

    window.removeEventListener('mousemove', this.handlemousemove);
    window.removeEventListener('mouseup', this.handlemouseup);
  }

  firstUpdate() {
    if (this.shadowRoot)
    {
      const span = this.shadowRoot.querySelector<HTMLSpanElement>('span.resize'); 
      if (span) 
      {
        span.addEventListener('mousedown', this.handlemousedown);
        window.addEventListener('mousemove', this.handlemousemove);
        window.addEventListener('mouseup', this.handlemouseup);
      }
      const section = this.shadowRoot.querySelector('section');
      if (section)
      {
        this.section = section;
      }
    }
  }

  // event handlers
  private handlemousedown = (e:Event) => {
    if (e instanceof MouseEvent)
    {
      const box = this.section.getBoundingClientRect();
      this.original_y = e.pageY;
      this.original_height = box.height - 120; // padding
      this.pressed = true;
      this.handlemousemove(e);
    }
  }
  private handlemouseup = (e:MouseEvent) => {
    if (this.pressed) 
    {
      this.handlemousemove(e);
      this.pressed = false;
    }
  }
  private handlemousemove = (e:MouseEvent) => {
    if (this.pressed) 
    {
      const y = this.original_y - e.pageY;

      this.section.style.height = (this.original_height + y) + 'px';
    }
  }

  render() {
    return html`
      <main>
        <doc-card>
          <slot></slot>
        </doc-card>
      </main>
      <section>
        <span class="resize"></span>
        <slot name="setting"></slot>
      </section>
    `
  }
}