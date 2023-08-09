PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and register code provided to you - could you create a rather simple introduction text with maybe a code example how to use in html - keep it very simple. Do not give example how to run the register code it's already included (this is for you so you can see the element-tag)! The introduction should be read by developers so it needs not to be simple enough for beginners!

## SOURCE-CODE:
// utils 
import { html, property, query } from "@onkelhoy/tools-utils";
import { Translator } from "@onkelhoy/tools-translator";
import "@onkelhoy/tools-translator/wc";

// atoms 
import { Dropdown } from "@onkelhoy/dropdown";
import "@onkelhoy/icon/wc";
import "@onkelhoy/typography/wc";
import "@onkelhoy/button/wc";
import "@onkelhoy/dropdown/wc";

// templates
// import { BaseTemplate } from "@onkelhoy/templates-base";

// local 
import { style } from "./style";
// import { Foo, ClickEvent } from "./types";

export class Pagination extends Translator {
    static style = style;

    @property({ type: Number, rerender: false }) page: number = 1;
    @property({ type: Number, rerender: false, onUpdate: "onperpageupdate" }) perpage: number = 0;
    @property({ type: Number, rerender: false, onUpdate: "setInfo" }) total: number = 0; // maybe rerender on this ? 

    @query({ selector: 'o-dropdown[name="page"]', onload: 'onpagedload' }) pagedropdownElement!: Dropdown;
    @query('o-dropdown[name="perpage"]') perpagedropdownElement!: Dropdown;
    @query('o-translator') infoElement!: Translator;

    // on load functions
    private onpagedload = () => {
        this.setpageoptions();
    }
    private onperpageupdate = (value: number, old: number) => {
        if (!this.pagedropdownElement) return 10;
        
        // calculate the row of the first item on the current page view
        if (!old) this.page = 1;
        else 
        {
            const firstRow = old * (this.page - 1) + 1;
    
            // determine the new page number
            this.page = Math.max(1, Math.ceil(firstRow / value));
        }

        this.setpageoptions();
        
        setTimeout(() => {
            // update the page dropdown to reflect the new page number
            this.pagedropdownElement.value = this.page.toString();
        }, 1);
    }

    // event handlers
    private handlepagechange = (e:Event) => {
        if (e.target instanceof Dropdown)
        {
            this.page = Number(e.target.value);
            this.setInfo();
        }
    }
    private handleperpagechange = (e:Event) => {
        if (e.target instanceof Dropdown)
        {
            this.perpage = Number(e.target.value);
        }
    }
    
    private handlefirstclick = () => {
        this.page = 1;
        this.pagedropdownElement.value = this.page.toString();
        this.setInfo();
    }
    private handleprevclick = () => {
        if (this.page > 1)
        {
            this.page = this.page - 1;
            this.pagedropdownElement.value = this.page.toString();
            this.setInfo();
        }
    }
    private handlenextclick = () => {
        const totalpages = Math.ceil(this.total / this.perpage);
        if (this.page + 1 <= totalpages)
        {
            this.page = this.page + 1;
            this.pagedropdownElement.value = this.page.toString();
            this.setInfo();
        }
    }
    private handlelastclick = () => {
        const totalpages = Math.ceil(this.total / this.perpage);
        this.page = totalpages;
        this.pagedropdownElement.value = this.page.toString();
        this.setInfo();
    }

    // private functions
    private setpageoptions() {
        if (!this.pagedropdownElement) return;
        if (this.perpage === 0) 
        {
            this.pagedropdownElement.options = [];
            return;
        }
        const maxpages = Math.ceil(this.total / this.perpage);
        this.pagedropdownElement.options = new Array(maxpages).fill(0).map((_v, i) => i + 1);
    }
    private getrowpagearray() {
        if (this.total < 5) return [5];

        return [5, 10, 15, 20, 50, 100, 200, 500, 1000].filter(v => v <= this.total);
    }
    private setInfo = () => {
        if (this.infoElement)
        {
            const start = (this.page - 1) * this.perpage;
            const end = Math.min(start + this.perpage, this.total)
            this.infoElement.setAttribute("start", start.toString());
            this.infoElement.setAttribute("end", end.toString());
            this.infoElement.setAttribute("total", this.total.toString());
        }
    }

    render() {
        console.log('page is', this.page)
        return html`
            <div>
                <o-dropdown 
                    @change="${this.handlepagechange}"
                    variant="clear" 
                    name="page"
                    value="${this.page}"
                ></o-dropdown>
            </div>
            <div>
                <o-dropdown 
                    @change="${this.handleperpagechange}"
                    variant="clear" 
                    name="perpage"
                    value="${this.perpage}"
                >
                    ${this.getrowpagearray().map(v => html`<o-option>${v}</o-option>`)}
                </o-dropdown>
            </div>
            <o-typography>
                <o-translator 
                    start="${this.page * this.perpage}"
                    end="${this.page * this.perpage + this.perpage}"
                    total="${this.total}"
                >{start} - {end} of {total}</o-translator>
            </o-typography>

            <span class="button-group">
                <o-button variant="outlined" color="gray" @click="${this.handlefirstclick}"><o-icon name="pagination.first">|<</o-icon></o-button>
                <o-button variant="outlined" color="gray" @click="${this.handleprevclick}"><o-icon name="pagination.prev"><</o-icon></o-button>
                <o-button variant="outlined" color="gray" @click="${this.handlenextclick}"><o-icon name="pagination.next">></o-icon></o-button>
                <o-button variant="outlined" color="gray" @click="${this.handlelastclick}"><o-icon name="pagination.last">>|</o-icon></o-button>
            </span>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "o-pagination": Pagination;
    }
}
## REGISTER-CODE:
import { Pagination } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('o-pagination')) {
  cElements.define('o-pagination', Pagination);
}
