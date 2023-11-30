PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables. 
1. properties (columns: name, default-value, type, description) 
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc) 
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE:
 // utils
import { html, property } from "@pap-it/system-utils";

// templates
import { FieldTemplate } from "@pap-it/templates-field";

// local
import { style } from "./style";

export class Checkbox extends FieldTemplate {
  static style = style;

  @property({ rerender: false, onUpdate: "checkboxColorUpdate" }) color: string = "blue";

  constructor() {
    super();

    this.addEventListener("click", this.handleclick, true);
  }

  // update functions
  private checkboxColorUpdate = () => {
    if (this.inputElement) {
      this.inputElement.style.accentColor = this.color;
    }
  }
  private handleclick = (e: Event) => {
    e.stopPropagation();
    this.checked = !this.checked;
  }

  render() {
    return super.render(html`
            <input readonly type="checkbox" />
        `)
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-checkbox": Checkbox;
  }
}

## TYPE-CODE: export {}
