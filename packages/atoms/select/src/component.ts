// system
import { debounce, html, ifDefined, property, query } from "@pap-it/system-utils";

// templates
import { Placement, Reveal } from "@pap-it/templates-popover";
import { Field, RenderArgument, PrefixSuffixRender } from "@pap-it/templates-field";
import { Menu, Selected } from "@pap-it/templates-menu";
import "@pap-it/templates-menu/wc";

// local 
import { style } from "./style";
import { SearchType, OptionType } from "./types";

export class Select extends Field {
  static style = style;

  @query<HTMLInputElement>({
    selector: 'input',
    load: function (this: Select, element) {
      this.connectElement(element);
    }
  }) override element!: HTMLInputElement;
  @query<Menu>('pap-menu-template') menuelement!: Menu;

  @property({ type: Boolean }) multiple: boolean = false;
  @property({ attribute: 'menu-height' }) menuheight: string = "15rem";
  @property() revealby: Reveal = 'click';
  @property() placement: Placement = 'bottom-left';
  @property({ type: Boolean }) hideonoutsideclick: boolean = true;
  @property({ type: Boolean }) open: boolean = false;
  @property({ attribute: 'dynamic-width', type: Boolean }) dynamicwidth: boolean = false;
  @property({ attribute: false }) text: string = "";

  @property({ type: Number }) maxlength?: number;
  @property({ type: Number }) minlength?: number;
  @property({ type: Number }) max?: number;
  @property({ type: Number }) min?: number;
  @property() search?: SearchType;
  @property() pattern?: string;
  @property({
    type: Array,
    attribute: false,
    set: function (this: Select, list: Array<OptionType | string>): Array<OptionType> {
      if (list.length > 0 && typeof list[0] === "string") {
        return list.map(l => {
          if (typeof l === "string") return { value: l, text: l };
          return l;
        });
      }
      return list as Array<OptionType>;
    },
    after: function (this: Select) {
      // NOTE should we update the selected ? 
    }
  }) options?: Array<OptionType> = [];

  public searchvalue: string | undefined;

  constructor() {
    super();

    this.dosearch = debounce(this.dosearch, 150);
  }

  // event handlers
  private handleinput = (e: Event) => {
    if (e.target instanceof HTMLInputElement) {
      this.searchvalue = e.target.value;

      // TODO additive should open the option for user to click on a button to "add" the searched value
      // if (this.search === "additive") {
      //   this.value = this.searchvalue;
      // }

      this.dosearch();
    }
  }
  private handleshow = () => {
    this.dispatchEvent(new Event('show'));
    this.open = true;
  }
  private handlehide = () => {
    this.dispatchEvent(new Event('hide'));
    this.open = false;
  }
  private handleselect = (e: CustomEvent<Selected>) => {
    if (e.detail) {
      this.value = e.detail.value;
      this.text = e.detail.text;
      this.dispatchEvent(new Event('change'));
    }
    // else {
    //   text select ?
    //   console.log('oi what event are you?', e)
    // }
  }

  // helper function
  private dosearch = () => {
    this.dispatchEvent(new CustomEvent('search', {
      detail: {
        value: this.searchvalue,
        regexp: new RegExp(this.searchvalue || "", "i"),
      }
    }));
  }

  // overrides
  protected override renderMain(main: PrefixSuffixRender): DocumentFragment {
    return html`
      <pap-menu-template
        @show="${this.handleshow}"
        @hide="${this.handlehide}"
        @select="${this.handleselect}"
        revealby="${this.revealby}" 
        placement="${this.placement}"
        open="${this.open}"
        part="popover"
        hideonoutsideclick="${this.hideonoutsideclick}"
        multiple="${this.multiple}"
        menuheight="${this.menuheight}"
        dynamic-width="${this.dynamicwidth}"
      >
        <span slot="button">
          ${super.renderMain(main)}
        </span>
        <slot>${this.options}</slot>
      </pap-menu-template>
    `
  }

  render() {
    const render: RenderArgument = {
      main: {
        content: html`
          <input 
            @input="${this.handleinput}" 
            placeholder="${ifDefined(this.placeholder)}"
            name="${this.name}"
            value="${ifDefined(this.text)}"
            maxlength="${ifDefined(this.maxlength)}"
            minlength="${ifDefined(this.minlength)}"
            min="${ifDefined(this.min)}"
            max="${ifDefined(this.max)}"
            pattern="${ifDefined(this.pattern)}"
            required="${ifDefined(this.required)}"
            disabled="${ifDefined(this.disabled)}"
            ${(this.readonly || !this.search) ? "readonly" : ""}
          />
        `,
        suffix: '<pap-icon slot="suffix" size="small" container="small" part="caret" cache="true" name="caret"></pap-icon>'
      }
    }

    if (this.label) {
      if (!render.header) render.header = {};
      render.header.content = `<pap-typography key="label" part="label">${this.label}</pap-typography>`
    }

    return super.render(render);
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-select": Select;
  }
}