PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and register code provided to you - could you create a rather simple introduction text with maybe a code example how to use in html - keep it very simple. Do not give example how to run the register code it's already included (this is for you so you can see the element-tag)! The introduction should be read by developers so it needs not to be simple enough for beginners!

## SOURCE-CODE:
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
## REGISTER-CODE:
import { Tabs } from './component.js';
import { Tab } from './components/tab/index.js';
import { TabContent } from './components/content/index.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('o-tab')) {
  cElements.define('o-tab', Tab);
}

if (!cElements.get('o-tab-content')) {
  cElements.define('o-tab-content', TabContent);
}

if (!cElements.get('o-tabs')) {
  cElements.define('o-tabs', Tabs);
}
