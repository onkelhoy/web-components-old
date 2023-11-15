# ThemeTool

Atomic Type: tools

Version: 1.0.0

## Development 
Development servers can be started and should all exist inside `"views"` folder

## Scripts 
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and register code provided to you - could you create a rather simple introduction text with maybe a code example how to use in html - keep it very simple. Do not give example how to run the register code it's already included (this is for you so you can see the element-tag)! The introduction should be read by developers so it needs not to be simple enough for beginners!

## SOURCE-CODE:
// utils 
// import { html, property } from "@papit/tools-utils";

// templates
import { BaseTemplate } from "@papit/templates-base";

// local 
import { style } from "./style";

export class ThemeTool extends BaseTemplate {
    static style = style;

    render() {
        return '';
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "pap-theme-provider": ThemeTool;
    }
}
## REGISTER-CODE:
import { ThemeTool } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('pap-theme-tool')) {
  cElements.define('pap-theme-tool', ThemeTool);
}
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables. 
1. properties (columns: name, default-value, type, description) 
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc) 
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE:
 // utils 
// import { html, property } from "@papit/tools-utils";

// templates
import { BaseTemplate } from "@papit/templates-base";

// local 
import { style } from "./style";

export class ThemeTool extends BaseTemplate {
    static style = style;

    render() {
        return '';
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "pap-theme-provider": ThemeTool;
    }
}

## TYPE-CODE: export const THEMECHANGE_NAME = "pap-theme-change";
export const THEMEADD_NAME = "pap-theme-add";

export type ThemeConfig = {
  href: string;
  representColor: string;
  name: string;
};

declare global {
  interface Window {
    oTheme: {
      map: Map<string, ThemeConfig>;
      current: string;
      change(name:string): void;
      add(theme: ThemeConfig): void;
    }
  }
}PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE:
// utils 
// import { html, property } from "@papit/tools-utils";

// templates
import { BaseTemplate } from "@papit/templates-base";

// local 
import { style } from "./style";

export class ThemeTool extends BaseTemplate {
    static style = style;

    render() {
        return '';
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "pap-theme-provider": ThemeTool;
    }
}
## STYLE-CODE:
