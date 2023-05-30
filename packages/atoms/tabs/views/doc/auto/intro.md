PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and register code provided to you - could you create a rather simple introduction text with maybe a code example how to use in html - keep it very simple. Do not give example how to run the register code it's already included (this is for you so you can see the element-tag)! The introduction should be read by developers so it needs not to be simple enough for beginners!

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
## REGISTER-CODE:
import { Tabs } from './component.js';
import { Tab } from './components/tab/index.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('o-tab')) {
  cElements.define('o-tab', Tab);
}

if (!cElements.get('o-tabs')) {
  cElements.define('o-tabs', Tabs);
}
