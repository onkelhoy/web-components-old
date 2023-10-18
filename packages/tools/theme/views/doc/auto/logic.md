PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables.

1. properties (columns: name, default-value, type, description)
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc)
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE

 // utils
// import { html, property } from "@pap-it/system-utils";

// templates
import { BaseSystem } from "@pap-it/system-base";

// local
import { style } from "./style";

export class ThemeTool extends BaseSystem {
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

## TYPE-CODE: export const THEMECHANGE_NAME = "pap-theme-change"

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
}
