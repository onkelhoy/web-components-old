PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

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
## STYLE-CODE:
:host {
    display: flex;
    position: relative;
}

::slotted(o-tab) {
    --tab-height: var(--tabs-height, 3rem);
}