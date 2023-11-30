// utils 
import { html, property, query } from "@pap-it/system-utils";

// atoms 
import { Icon } from '@pap-it/icon';
import { Typography } from "@pap-it/typography";
import "@pap-it/button/wc";
import "@pap-it/icon/wc";
import "@pap-it/typography/wc";

// templates
import { BaseSystem } from "@pap-it/system-base";

import { style } from "./style.js";

export type Display = "both" | "code";
export type Language = "html" | "javascript" | "typescript" | "css" | "text" | "python" | "bash";

export class CodeBlock extends BaseSystem {
  static style = style;

  constructor() {
    super();

    this.codeValue = this.innerHTML;
  }

  @property() lang: Language = "text";
  @property() display: Display = "code";
  @query('pap-button > pap-icon#copy-status') copyIcon!: Icon;
  @query('pap-button > pap-typography') copyText!: Typography;

  private codeValue: string;
  private formatContent!: string;
  private copytimer?: number;

  handleSlotChange = (e: Event) => {
    // const slot = e.currentTarget as HTMLSlotElement;
    // const nodes = slot.assignedElements();

    // this.format(nodes.reduce((p, c) => p + c.outerHTML, ""));
    if (this.codeValue) {
      this.format(this.codeValue);
    }
  }

  public format(slotcontent: string) {
    this.codeValue = slotcontent;
    let content = "";

    switch (this.lang) {
      case "html":
        content = this.formatHtml(this.codeValue);
        break;
      default:
        content = this.codeValue;
        break;
    }

    if (!this.appendFormatted(content)) {
      this.callAfterUpdate.push({ callback: this.appendFormatted, args: [content] });
    }
  }
  private appendFormatted(content: string) {
    this.formatContent = content;

    if (this.shadowRoot) {
      const pre = this.shadowRoot.querySelector('code > pre');
      if (pre) {
        pre.innerHTML = content;
        return true;
      }
    }

    return false;
  }
  private formatHtml(htmlString: string) {
    const attribute = /([\w-]+)="([^"]*)"/gi;

    const lines = htmlString.split('\n');

    let content: string[] = [];
    let indent = 0;

    const selfclosing = ["input", "br", "hr"];

    for (let i = 0; i < lines.length; i++) {
      const trimmedLine = lines[i].trim();
      let line = trimmedLine
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(attribute, match => {
          const [name, value] = match.split("=");
          if (value) {
            return `<div><span class="attribute">${name}=</span><span class="attribute-value">${value}</span></div>`
          }
          return `<span class="attribute">${match}</span>`
        })
        .replace(/&gt;(.*)&lt;/g, match => {
          const matched = match.match(/&gt;(.*)&lt;/);
          if (matched) {
            return `&gt;<span class="content">${matched[1]}</span>&lt;`
          }
          return match;
        })
        .replace(/&lt;\/?/g, match => `<span class="tag">${match}</span>`)
        .replace(/&gt;/g, match => `<span class="tag">${match}</span>`)

      const match = trimmedLine.match(/<\/?([\w-]+).*>$/);

      let later = 0;
      let className = "content";

      if (match) {

        className = "tag-name"
        if (trimmedLine.startsWith("</")) {
          indent -= 1;
        }
        else if (trimmedLine.startsWith("<") && !(selfclosing.includes(match[1]) && trimmedLine.endsWith(">"))) {
          if (!trimmedLine.endsWith(`</${match[1]}>`)) {
            // its not self closing
            later = 1;
          }
        }
      }

      content.push(`<span class="${className}" style="padding-left: ${indent}rem">${line}</span>`);
      indent += later;
    }

    return content.join('<br />');
  }

  handleCopy = () => {
    navigator.clipboard.writeText(this.codeValue).then(() => {
      console.log(`Copied to clipboard`);

      if (this.copyIcon) {
        this.copyText.innerHTML = "Copied!";
        this.copyIcon.setAttribute('name', 'done');

        clearTimeout(this.copytimer);

        this.copytimer = setTimeout(() => {
          this.copyText.innerHTML = "Copy code";
          this.copyIcon.setAttribute('name', 'content_paste');
        }, 2000);
      }
    }, (err) => {
      console.error('Failed to copy text: ', err);
    });
  }

  render() {
    return html`
            <code part="code">
                <nav>
                    <pap-typography>${this.lang}</pap-typography>
                    <pap-button 
                        variant="clear" 
                        size="small" 
                        radius="none" @click="${this.handleCopy}" 
                        id="copy"
                    >
                        <pap-icon id="copy-status" name="content_paste" slot="prefix"></pap-icon>
                        <pap-typography>Copy code</pap-typography>
                    </pap-button>
                </nav>
                <pre>
                    ${this.formatContent}
                </pre>
            </code>
            <fieldset part="fieldset">
                <legend><pap-typography>Result</pap-typography></legend>
                <span>
                <slot @slotchange=${this.handleSlotChange}></slot>
                </span>
            </fieldset>
        `;
  }
}