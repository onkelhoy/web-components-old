PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE:
// utils 
import { html, property, query } from "@henry2/tools-utils";
import { Translator } from "@henry2/tools-translator";
import "@henry2/tools-translator/wc";

// atoms 
import { Dropdown } from "@henry2/dropdown";
import "@henry2/icon/wc";
import "@henry2/typography/wc";
import "@henry2/button/wc";
import "@henry2/dropdown/wc";

// templates
// import { BaseTemplate } from "@henry2/templates-base";

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
## STYLE-CODE:
:host {
    display: grid;
    grid-template-columns: 4fr 4fr 2fr 3fr;
    align-items: center;
    gap: var(--gap-small, 8px);

    o-button {
        gap: 0;
    }
    o-typography {
        white-space: nowrap;
        margin-inline: 1rem;
        text-align: center;
    }

    span.button-group {
        display: flex;
        justify-content: flex-end;
    }
}

@media (prefers-color-scheme: dark) {
    :host {
        --background: var(--pagination-dark-background-color, var(--o-color-black, black));
        --color: var(--pagination-dark-text-color, var(--o-color-white, white));
    }
}