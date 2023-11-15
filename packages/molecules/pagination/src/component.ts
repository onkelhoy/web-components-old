// utils 
import { html, property, query } from "@papit/tools-utils";
import { Translator } from "@papit/tools-translator";
import "@papit/tools-translator/wc";

// atoms 
import { Dropdown } from "@papit/dropdown";
import "@papit/icon/wc";
import "@papit/typography/wc";
import "@papit/button/wc";
import "@papit/dropdown/wc";

// templates
// import { BaseTemplate } from "@papit/templates-base";

// local 
import { style } from "./style";
// import { Foo, ClickEvent } from "./types";

export class Pagination extends Translator {
    static style = style;

    @property({ type: Number, rerender: false }) page: number = 1;
    @property({ type: Number, rerender: false, onUpdate: "onperpageupdate" }) perpage: number = 0;
    @property({ type: Number, rerender: false, onUpdate: "setInfo" }) total: number = 0; // maybe rerender on this ? 

    @query({ selector: 'pap-dropdown[name="page"]', onload: 'onpagedload' }) pagedropdownElement!: Dropdown;
    @query('pap-dropdown[name="perpage"]') perpagedropdownElement!: Dropdown;
    @query('pap-translator') infoElement!: Translator;

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
                <pap-dropdown 
                    @change="${this.handlepagechange}"
                    variant="clear" 
                    name="page"
                    value="${this.page}"
                ></pap-dropdown>
            </div>
            <div>
                <pap-dropdown 
                    @change="${this.handleperpagechange}"
                    variant="clear" 
                    name="perpage"
                    value="${this.perpage}"
                >
                    ${this.getrowpagearray().map(v => html`<pap-option>${v}</pap-option>`)}
                </pap-dropdown>
            </div>
            <pap-typography>
                <pap-translator 
                    start="${this.page * this.perpage}"
                    end="${this.page * this.perpage + this.perpage}"
                    total="${this.total}"
                >{start} - {end} of {total}</pap-translator>
            </pap-typography>

            <span class="button-group">
                <pap-button variant="outlined" color="gray" @click="${this.handlefirstclick}"><pap-icon name="pagination.first">|<</pap-icon></pap-button>
                <pap-button variant="outlined" color="gray" @click="${this.handleprevclick}"><pap-icon name="pagination.prev"><</pap-icon></pap-button>
                <pap-button variant="outlined" color="gray" @click="${this.handlenextclick}"><pap-icon name="pagination.next">></pap-icon></pap-button>
                <pap-button variant="outlined" color="gray" @click="${this.handlelastclick}"><pap-icon name="pagination.last">>|</pap-icon></pap-button>
            </span>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "pap-pagination": Pagination;
    }
}