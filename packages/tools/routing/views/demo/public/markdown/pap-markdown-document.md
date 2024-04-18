# Markdown

Atomic Type: organisms

Version: 1.0.0

## Development

Development takes place within the `src` folder. To add a new subcomponent, use the command `npm run component:add`. This command updates the `.env` file, creates a view folder, and adds a subfolder in the `components` folder (creating it if it doesn't exist) inside `src` with all the necessary files.

Styling is managed in the `style.scss` file, which automatically generates a `style.ts` file for use in the component.

## Viewing

To view the component, run `npm start`. This command is equivalent to `npm run start demo` and launches the development server for the demo folder located within the `views` folder. This allows you to preview your component during development.

## Assets

All assets required by the component, such as icons and images for translations, should be placed in the `assets` folder. This folder will already include an `icons` and `translations` folder with an `en.json` file for English translations. Use this structure to organize translations and make them easily accessible for other projects.

For assets used solely for display or demo purposes, create a `public` folder under the relevant directory inside the `views` folder. These assets are not included in the component package.

## Commands

- **build**: Builds the component in development mode. Use the `--prod` flag (`npm run build -- --prod`) for a production build, which includes minification.
- **watch**: Watches for changes to the component files and rebuilds them automatically without starting the development server.
- **start**: Starts the development server for a specific demo. The target folder within the `views` directory must contain an `index.html` file. Usage example: `npm run start --name=<folder>`.
- **analyse**: Generates a comprehensive analysis file, mainly useful for React scripts and potentially for generating pages. The analysis file is only generated if it does not exist, unless the `--force` flag is used. Optional flags include `--verbose` and `--force`.
- **react**: Generates the necessary React code based on the web component code, including any subcomponents. The generated code will not overwrite existing files, allowing for manual customization. Flags: `--verbose` & `--force`.

PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and register code provided to you - could you create a rather simple introduction text with maybe a code example how to use in html - keep it very simple. Do not give example how to run the register code it's already included (this is for you so you can see the element-tag)! The introduction should be read by developers so it needs not to be simple enough for beginners!

## SOURCE-CODE

// system
import { html, property } from "@pap-it/system-utils";

// molecules
import "@pap-it/codeblock";
import { Codeblock } from "@pap-it/codeblock";

// templates
import { Asset } from "@pap-it/templates-asset";

import { style } from './style';
import { Blockinfo } from "./types";

export class Markdown extends Asset {
  static style = style;

  @property({ onUpdate: "updateFILE" }) url?: string;
  @property({ onUpdate: "updateFILE" }) file?: string;

  private content: string = "";
  private codeblocks: string[] = [];

  // class functions
  constructor() {
    super();

    this.assetBase = "/public/markdown"
  }

  // update functions
  private async updateFILE() {
    try {
      let target = this.url ? this.url : this.file;
      if (!target) throw new Error("must have a target");

      const response = await this.loadAsset(target, !!this.url);
      if (!response) {
        throw new Error("something went wrong");
      }
      if (typeof response === "string") {
        return this.markdown(response);
      }

      const content = await response.text();
      this.markdown(content);
    }
    catch (e) {
      console.error("failed to load markdown file")
    }
  }

  // private functions
  private markdown(content: string) {
    const lines = content.split('\n');
    let htmlcontent: string[] = [];

    let insideelement: string | null = null;
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      const isblock = this.block(lines, i);
      if (isblock) {
        if (insideelement) {
          htmlcontent.push(`</${insideelement}>`);
          insideelement = null;
        }

        htmlcontent = htmlcontent.concat(isblock[0])
        i = isblock[1];
        continue;
      }

      if (line.startsWith(">")) {
        if (insideelement === "p") {
          htmlcontent.push("</p>");
          insideelement = null
        }
        else if (insideelement === null) {
          htmlcontent.push('<div class="blockquote">');
          insideelement = "div"
        }

        line = line.slice(1).trim();
      }
      else if (line !== "" && insideelement === null) {
        htmlcontent.push("<p>");
        insideelement = "p";
      }

      if (line === "") {
        if (insideelement) {
          htmlcontent.push(`</${insideelement}>`);
          insideelement = null;
        }
      }
      else {
        htmlcontent.push(this.generalLine(line) + " ");
      }
    }

    if (this.shadowRoot) {
      this.content = htmlcontent.join("");
      this.callAfterUpdate.push(this.updateCodeBlocks);
    }
  }

  private updateCodeBlocks() {
    if (this.shadowRoot) {
      const blocks = this.shadowRoot.querySelectorAll<Codeblock>('pap-codeblock');
      blocks.forEach((elm, index) => elm.format(this.codeblocks[index]));
    }
  }

  private block(lines: string[], i: number): Blockinfo {
    let htmlcontent: string[] = [];

    // code
    if (lines[i].startsWith('```')) {
      if (lines[i].length > 3 && lines[i].endsWith('```')) {
        this.codeblocks.push(lines[i].split('```')[1])
        // htmlcontent.push(`<pap-codeblock>${lines[i].split('```')[1]}</pap-codeblock>`);
        htmlcontent.push("<pap-codeblock theme-toggle='false'></pap-codeblock>")
      }
      else {
        let curr = i + 1;
        const lang = lines[i].split('```')[1].trim();
        const code: string[] = [];
        while (!lines[curr].startsWith('```')) {
          code.push(lines[curr]);
          curr++;
        }
        this.codeblocks.push(code.join('\n'))
        htmlcontent.push(`<pap-codeblock theme-toggle='false' lang="${lang}"></pap-codeblock>`)
        // htmlcontent.push("")
        i = curr + 1;
      }

      return [htmlcontent, i];
    }

    // table
    if (lines[i].startsWith("|")) {
      const hcols = lines[i].split("|").filter(l => l !== "").map(l => `<th>${this.generalLine(l).trim()}</th>`);
      htmlcontent.push(`<table cellspacing="0" cellpadding="5"><thead><tr>${hcols.join('')}</tr></thead><tbody>`);
      let curr = i + 2; // we skip the position info..
      while (lines[curr].startsWith('|')) {
        const cols = lines[curr].split("|").filter(l => l !== "").map(l => `<td>${this.generalLine(l).trim()}</td>`);
        htmlcontent.push(`<tr>${cols.join('')}</tr>`);
        curr++;
      }
      htmlcontent.push('</tbody></table>');
      i = curr - 1;

      return [htmlcontent, i];
    }

    const headingMatch = lines[i].match(/^(#*)\s(\w*)/);
    if (headingMatch) {
      const [_whole, headings, text] = headingMatch;
      const l = headings.length;
      htmlcontent.push(`<h${l}>${this.generalLine(text)}</h${l}>`)

      return [htmlcontent, i];
    }

    const listMatch = lines[i].match(/^(-|\d\.)\s/);
    if (listMatch) {
      if (listMatch[1] === '-') htmlcontent.push("<ul>");
      else htmlcontent.push("<ol>");
      let curr = i;

      let itemMatch;
      while ((itemMatch = lines[curr].match(/^(-|\d*\.)\s/))) {
        htmlcontent.push(`<li>${this.generalLine(lines[curr].slice(itemMatch[1].length + 1))}</li>`);
        curr++;
      }
      if (listMatch[1] === '-') htmlcontent.push("</ul>");
      else htmlcontent.push("</ol>");

      i = curr - 1;

      return [htmlcontent, i];
    }

    return null;
  }

  private generalLine(line: string) {
    let text = line;
    const linkMatch = line.match(/\[(\w*)\]\(([\w:\/\.]*)\)/g)
    if (linkMatch) {
      for (let linksstring of linkMatch) {
        const match = line.match(/\[(\w*)\]\(([\w:\/\.]*)\)/)
        if (match) {
          const [_whole, linktext, href] = match;
          text = line.replace(linksstring, `<a href="${href}">${linktext}</a>`)
        }
      }
    }
    const codeMatch = line.match(/[^`]`([^`]+)`/g);
    if (codeMatch) {
      for (let codestring of codeMatch) {
        const content = codestring
          .replace(/\`/g, "")
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');

        text = line.replace(codestring, `<code>${content}</code>`)
      }
    }

    return text;
  }

  render() {
    return this.content;
  }
}

## REGISTER-CODE

import { Markdown } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-markdown')) {
  cElements.define('pap-markdown', Markdown);
}
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables.

1. properties (columns: name, default-value, type, description)
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc)
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE

 // system
import { html, property } from "@pap-it/system-utils";

// molecules
import "@pap-it/codeblock";
import { Codeblock } from "@pap-it/codeblock";

// templates
import { Asset } from "@pap-it/templates-asset";

import { style } from './style';
import { Blockinfo } from "./types";

export class Markdown extends Asset {
  static style = style;

  @property({ onUpdate: "updateFILE" }) url?: string;
  @property({ onUpdate: "updateFILE" }) file?: string;

  private content: string = "";
  private codeblocks: string[] = [];

  // class functions
  constructor() {
    super();

    this.assetBase = "/public/markdown"
  }

  // update functions
  private async updateFILE() {
    try {
      let target = this.url ? this.url : this.file;
      if (!target) throw new Error("must have a target");

      const response = await this.loadAsset(target, !!this.url);
      if (!response) {
        throw new Error("something went wrong");
      }
      if (typeof response === "string") {
        return this.markdown(response);
      }

      const content = await response.text();
      this.markdown(content);
    }
    catch (e) {
      console.error("failed to load markdown file")
    }
  }

  // private functions
  private markdown(content: string) {
    const lines = content.split('\n');
    let htmlcontent: string[] = [];

    let insideelement: string | null = null;
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      const isblock = this.block(lines, i);
      if (isblock) {
        if (insideelement) {
          htmlcontent.push(`</${insideelement}>`);
          insideelement = null;
        }

        htmlcontent = htmlcontent.concat(isblock[0])
        i = isblock[1];
        continue;
      }

      if (line.startsWith(">")) {
        if (insideelement === "p") {
          htmlcontent.push("</p>");
          insideelement = null
        }
        else if (insideelement === null) {
          htmlcontent.push('<div class="blockquote">');
          insideelement = "div"
        }

        line = line.slice(1).trim();
      }
      else if (line !== "" && insideelement === null) {
        htmlcontent.push("<p>");
        insideelement = "p";
      }

      if (line === "") {
        if (insideelement) {
          htmlcontent.push(`</${insideelement}>`);
          insideelement = null;
        }
      }
      else {
        htmlcontent.push(this.generalLine(line) + " ");
      }
    }

    if (this.shadowRoot) {
      this.content = htmlcontent.join("");
      this.callAfterUpdate.push(this.updateCodeBlocks);
    }
  }

  private updateCodeBlocks() {
    if (this.shadowRoot) {
      const blocks = this.shadowRoot.querySelectorAll<Codeblock>('pap-codeblock');
      blocks.forEach((elm, index) => elm.format(this.codeblocks[index]));
    }
  }

  private block(lines: string[], i: number): Blockinfo {
    let htmlcontent: string[] = [];

    // code
    if (lines[i].startsWith('```')) {
      if (lines[i].length > 3 && lines[i].endsWith('```')) {
        this.codeblocks.push(lines[i].split('```')[1])
        // htmlcontent.push(`<pap-codeblock>${lines[i].split('```')[1]}</pap-codeblock>`);
        htmlcontent.push("<pap-codeblock theme-toggle='false'></pap-codeblock>")
      }
      else {
        let curr = i + 1;
        const lang = lines[i].split('```')[1].trim();
        const code: string[] = [];
        while (!lines[curr].startsWith('```')) {
          code.push(lines[curr]);
          curr++;
        }
        this.codeblocks.push(code.join('\n'))
        htmlcontent.push(`<pap-codeblock theme-toggle='false' lang="${lang}"></pap-codeblock>`)
        // htmlcontent.push("")
        i = curr + 1;
      }

      return [htmlcontent, i];
    }

    // table
    if (lines[i].startsWith("|")) {
      const hcols = lines[i].split("|").filter(l => l !== "").map(l => `<th>${this.generalLine(l).trim()}</th>`);
      htmlcontent.push(`<table cellspacing="0" cellpadding="5"><thead><tr>${hcols.join('')}</tr></thead><tbody>`);
      let curr = i + 2; // we skip the position info..
      while (lines[curr].startsWith('|')) {
        const cols = lines[curr].split("|").filter(l => l !== "").map(l => `<td>${this.generalLine(l).trim()}</td>`);
        htmlcontent.push(`<tr>${cols.join('')}</tr>`);
        curr++;
      }
      htmlcontent.push('</tbody></table>');
      i = curr - 1;

      return [htmlcontent, i];
    }

    const headingMatch = lines[i].match(/^(#*)\s(\w*)/);
    if (headingMatch) {
      const [_whole, headings, text] = headingMatch;
      const l = headings.length;
      htmlcontent.push(`<h${l}>${this.generalLine(text)}</h${l}>`)

      return [htmlcontent, i];
    }

    const listMatch = lines[i].match(/^(-|\d\.)\s/);
    if (listMatch) {
      if (listMatch[1] === '-') htmlcontent.push("<ul>");
      else htmlcontent.push("<ol>");
      let curr = i;

      let itemMatch;
      while ((itemMatch = lines[curr].match(/^(-|\d*\.)\s/))) {
        htmlcontent.push(`<li>${this.generalLine(lines[curr].slice(itemMatch[1].length + 1))}</li>`);
        curr++;
      }
      if (listMatch[1] === '-') htmlcontent.push("</ul>");
      else htmlcontent.push("</ol>");

      i = curr - 1;

      return [htmlcontent, i];
    }

    return null;
  }

  private generalLine(line: string) {
    let text = line;
    const linkMatch = line.match(/\[(\w*)\]\(([\w:\/\.]*)\)/g)
    if (linkMatch) {
      for (let linksstring of linkMatch) {
        const match = line.match(/\[(\w*)\]\(([\w:\/\.]*)\)/)
        if (match) {
          const [_whole, linktext, href] = match;
          text = line.replace(linksstring, `<a href="${href}">${linktext}</a>`)
        }
      }
    }
    const codeMatch = line.match(/[^`]`([^`]+)`/g);
    if (codeMatch) {
      for (let codestring of codeMatch) {
        const content = codestring
          .replace(/\`/g, "")
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');

        text = line.replace(codestring, `<code>${content}</code>`)
      }
    }

    return text;
  }

  render() {
    return this.content;
  }
}

## TYPE-CODE: export type Blockinfo = null|[string[],number]

PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE

// system
import { html, property } from "@pap-it/system-utils";

// molecules
import "@pap-it/codeblock";
import { Codeblock } from "@pap-it/codeblock";

// templates
import { Asset } from "@pap-it/templates-asset";

import { style } from './style';
import { Blockinfo } from "./types";

export class Markdown extends Asset {
  static style = style;

  @property({ onUpdate: "updateFILE" }) url?: string;
  @property({ onUpdate: "updateFILE" }) file?: string;

  private content: string = "";
  private codeblocks: string[] = [];

  // class functions
  constructor() {
    super();

    this.assetBase = "/public/markdown"
  }

  // update functions
  private async updateFILE() {
    try {
      let target = this.url ? this.url : this.file;
      if (!target) throw new Error("must have a target");

      const response = await this.loadAsset(target, !!this.url);
      if (!response) {
        throw new Error("something went wrong");
      }
      if (typeof response === "string") {
        return this.markdown(response);
      }

      const content = await response.text();
      this.markdown(content);
    }
    catch (e) {
      console.error("failed to load markdown file")
    }
  }

  // private functions
  private markdown(content: string) {
    const lines = content.split('\n');
    let htmlcontent: string[] = [];

    let insideelement: string | null = null;
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      const isblock = this.block(lines, i);
      if (isblock) {
        if (insideelement) {
          htmlcontent.push(`</${insideelement}>`);
          insideelement = null;
        }

        htmlcontent = htmlcontent.concat(isblock[0])
        i = isblock[1];
        continue;
      }

      if (line.startsWith(">")) {
        if (insideelement === "p") {
          htmlcontent.push("</p>");
          insideelement = null
        }
        else if (insideelement === null) {
          htmlcontent.push('<div class="blockquote">');
          insideelement = "div"
        }

        line = line.slice(1).trim();
      }
      else if (line !== "" && insideelement === null) {
        htmlcontent.push("<p>");
        insideelement = "p";
      }

      if (line === "") {
        if (insideelement) {
          htmlcontent.push(`</${insideelement}>`);
          insideelement = null;
        }
      }
      else {
        htmlcontent.push(this.generalLine(line) + " ");
      }
    }

    if (this.shadowRoot) {
      this.content = htmlcontent.join("");
      this.callAfterUpdate.push(this.updateCodeBlocks);
    }
  }

  private updateCodeBlocks() {
    if (this.shadowRoot) {
      const blocks = this.shadowRoot.querySelectorAll<Codeblock>('pap-codeblock');
      blocks.forEach((elm, index) => elm.format(this.codeblocks[index]));
    }
  }

  private block(lines: string[], i: number): Blockinfo {
    let htmlcontent: string[] = [];

    // code
    if (lines[i].startsWith('```')) {
      if (lines[i].length > 3 && lines[i].endsWith('```')) {
        this.codeblocks.push(lines[i].split('```')[1])
        // htmlcontent.push(`<pap-codeblock>${lines[i].split('```')[1]}</pap-codeblock>`);
        htmlcontent.push("<pap-codeblock theme-toggle='false'></pap-codeblock>")
      }
      else {
        let curr = i + 1;
        const lang = lines[i].split('```')[1].trim();
        const code: string[] = [];
        while (!lines[curr].startsWith('```')) {
          code.push(lines[curr]);
          curr++;
        }
        this.codeblocks.push(code.join('\n'))
        htmlcontent.push(`<pap-codeblock theme-toggle='false' lang="${lang}"></pap-codeblock>`)
        // htmlcontent.push("")
        i = curr + 1;
      }

      return [htmlcontent, i];
    }

    // table
    if (lines[i].startsWith("|")) {
      const hcols = lines[i].split("|").filter(l => l !== "").map(l => `<th>${this.generalLine(l).trim()}</th>`);
      htmlcontent.push(`<table cellspacing="0" cellpadding="5"><thead><tr>${hcols.join('')}</tr></thead><tbody>`);
      let curr = i + 2; // we skip the position info..
      while (lines[curr].startsWith('|')) {
        const cols = lines[curr].split("|").filter(l => l !== "").map(l => `<td>${this.generalLine(l).trim()}</td>`);
        htmlcontent.push(`<tr>${cols.join('')}</tr>`);
        curr++;
      }
      htmlcontent.push('</tbody></table>');
      i = curr - 1;

      return [htmlcontent, i];
    }

    const headingMatch = lines[i].match(/^(#*)\s(\w*)/);
    if (headingMatch) {
      const [_whole, headings, text] = headingMatch;
      const l = headings.length;
      htmlcontent.push(`<h${l}>${this.generalLine(text)}</h${l}>`)

      return [htmlcontent, i];
    }

    const listMatch = lines[i].match(/^(-|\d\.)\s/);
    if (listMatch) {
      if (listMatch[1] === '-') htmlcontent.push("<ul>");
      else htmlcontent.push("<ol>");
      let curr = i;

      let itemMatch;
      while ((itemMatch = lines[curr].match(/^(-|\d*\.)\s/))) {
        htmlcontent.push(`<li>${this.generalLine(lines[curr].slice(itemMatch[1].length + 1))}</li>`);
        curr++;
      }
      if (listMatch[1] === '-') htmlcontent.push("</ul>");
      else htmlcontent.push("</ol>");

      i = curr - 1;

      return [htmlcontent, i];
    }

    return null;
  }

  private generalLine(line: string) {
    let text = line;
    const linkMatch = line.match(/\[(\w*)\]\(([\w:\/\.]*)\)/g)
    if (linkMatch) {
      for (let linksstring of linkMatch) {
        const match = line.match(/\[(\w*)\]\(([\w:\/\.]*)\)/)
        if (match) {
          const [_whole, linktext, href] = match;
          text = line.replace(linksstring, `<a href="${href}">${linktext}</a>`)
        }
      }
    }
    const codeMatch = line.match(/[^`]`([^`]+)`/g);
    if (codeMatch) {
      for (let codestring of codeMatch) {
        const content = codestring
          .replace(/\`/g, "")
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');

        text = line.replace(codestring, `<code>${content}</code>`)
      }
    }

    return text;
  }

  render() {
    return this.content;
  }
}

## STYLE-CODE

:host {
    --background: var(--pap-markdown-background, var(--pap-color-bg, #FFFFFF));
    --block-background: var(--pap-markdown-block-background, var(--pap-color-bg-tertiary, #EAEBEF));
    --block-ribbon: var(--pap-markdown-block-ribbon, var(--pap-color-bg-brand, #009DD3));
    --border: var(--pap-markdown-border, var(--pap-color-border, #C7CBD4));
    --color: var(--pap-markdown-color, var(--pap-color-text, #29292F));
    --link: var(--pap-markdown-link, var(--pap-color-text-link, #0177A3));
    --link-hover: var(--pap-markdown-link-hover, var(--pap-color-text-link-oninverse, #36CEFA));
    --table-header-background: var(--pap-markdown-table-header-background, var(--pap-color-hover-400, rgba(0,0,0,0.1)));

    display: block;
    color: var(--color);
    background-color: var(--background);
    padding: 1rem 10%;
    font-family: inherit;
}

@mixin table_border($type) {
    border-#{$type}-width: 1px;
    border-#{$type}-color: var(--border);
    border-#{$type}-style: solid;
}

table {
    color: inherit;
    width: 100%;

    thead {
        @include table_border(bottom);
        
        th {
            background-color: var(--table-header-background);
            @include table_border(top);
            @include table_border(left);
            @include table_border(bottom);
            padding: 0.25rem 0.75rem;
        
            &:first-child {
                border-top-left-radius: var(--radius-small, 4px);
            }
            &:last-child {
                @include table_border(right);
                border-top-right-radius: var(--radius-small, 4px);
            }
        }
    }

    tbody {
        td {
            @include table_border(left);
            @include table_border(bottom);
            padding: 0.25rem 0.75rem;

            &:last-child {
                @include table_border(right);
            }
        }

        tr:last-child td:last-child {
            border-bottom-right-radius: var(--radius-small, 4px);
        }
        tr:last-child td:first-child {
            border-bottom-left-radius: var(--radius-small, 4px);
        }
    }
}

a {
    color: var(--link);
    &:hover {
        text-decoration-thickness: 2px;
        color: var(--link-hover);
    }
}

h1 {
    border-bottom: var(--border) 1px solid;
}

div.blockquote {
    background-color: var(--block-background);
    padding: 0.6rem;
    position: relative;
    padding-left: 1.2rem;

    &::after {
        width: 0.3rem;
        height: 100%;
        position: absolute;
        left: 0.3rem;
        top: 0;
        content: '';
        background-color: var(--block-ribbon);
    }
}

@media screen and (min-width: 1024px) {
    :host {
        padding: 1rem 20%;
    }
}
