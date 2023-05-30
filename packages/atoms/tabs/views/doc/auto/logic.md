PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables. 
1. properties (columns: name, default-value, type, description) 
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc) 
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE:
 // utils 
import { html, property } from "@circular-tools/utils";

// templates
import { BaseTemplate } from "@circular-templates/base";

// local 
import { style } from "./style";
import { ClickEvent, Tab } from "./components/tab";

export class Tabs extends BaseTemplate {
    static style = style;

    private tabs: Tab[] = [];

    @property({ type: Boolean }) updateHeight: boolean = true;

    // event handlers
    private handleslotchange = (e:Event) => {
        if (e.target instanceof HTMLSlotElement)
        {
            e.target
                .assignedElements()
                .forEach(element => {
                    if (element instanceof Tab)
                    {
                        if (!element.hasAttribute('tabs-pass'))
                        {
                            this.tabs.push(element);
                            element.addEventListener('tab-click', this.handletabclick);
                            element.setAttribute('tabs-pass', 'true');
                        }
                    }
                });
        }
    }
    private handletabclick = (e:Event) => {
        if (e instanceof CustomEvent<ClickEvent> && e.target instanceof Tab)
        {
            if (this.updateHeight)
            {
                this.style.height = `calc(${e.detail.sectionHeight}px + var(--tab-height, 3rem))`;
            }
            this.tabs.forEach(t => t.classList.remove('selected'));
            e.target.classList.add('selected');
        }
    }

    render() {
        return html`
            <slot @slotchange="${this.handleslotchange}"></slot>
        `
    }
}

## TYPE-CODE: export {}