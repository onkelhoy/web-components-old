PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables. 
1. properties (columns: name, default-value, type, description) 
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc) 
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE:
 // utils 
import { html, property } from "@onkelhoy/tools-utils";

// templates
import { BaseTemplate } from "@onkelhoy/templates-base";

// local 
import { style } from "./style";
import { Tab } from "./components/tab";
import { TabContent } from "./components/content";
import { SelectEvent } from "./types";

export class Tabs extends BaseTemplate {
    static style = style;

    private tabs = 0;
    private contents = 0;

    // event handlers
    private handleslotchange = (e:Event) => {
        if (e.target instanceof HTMLSlotElement)
        {
            e.target
                .assignedElements()
                .forEach((element, index) => {
                    const isContent = element instanceof TabContent;
                    const isTab = element instanceof Tab;

                    let id = index.toString();
                    if (isContent) 
                    {
                        id = this.contents.toString();
                        this.contents++;
                    }
                    if (isTab) 
                    {
                        id = this.tabs.toString();
                        element.addEventListener('click', this.handletabclick);
                        this.tabs++;
                    }

                    if (element.hasAttribute('id'))
                    {
                        id = element.getAttribute('id') as string;
                    }

                    if (isContent || isTab)
                    {
                        if (!element.hasAttribute('tabs-pass'))
                        {
                            element.init(this);
                            element.setAttribute('data-tab-id', id);
                            element.setAttribute('tabs-pass', 'true');
                        }
                    }
                });
        }
    }
    private handletabclick = (e:Event) => {
        if (e.target instanceof Tab)
        {
            this.dispatchEvent(new CustomEvent<SelectEvent>("tab-select", { 
                detail: { 
                    id: e.target.getAttribute('data-tab-id') as string 
                } 
            }))
        }
    }

    render() {
        return html`
            <header part="header">
                <slot @slotchange="${this.handleslotchange}" name="tab"></slot>
            </header>
            <main part="content">
                <slot @slotchange="${this.handleslotchange}" name="content"></slot>
            </main>
        `
    }
}

## TYPE-CODE: export type SelectEvent = { id: string };