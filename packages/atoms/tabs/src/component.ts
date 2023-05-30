// utils 
import { html, property } from "@circular-tools/utils";

// templates
import { BaseTemplate } from "@circular-templates/base";

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