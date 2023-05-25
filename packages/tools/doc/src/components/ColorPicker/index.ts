// utils 
import { html } from "@circular-tools/utils";

// templates
import { BaseTemplate } from "@circular-templates/base";

import { style } from "./style.js";

export type ColorEvent = { value: string };

export class ColorPicker extends BaseTemplate {
    static style = style;

    private sliderElement!: HTMLInputElement;
    private pickerElement!: HTMLDivElement;
    private areaElement!: HTMLDivElement;
    private pressed = false;
    private areabox!: DOMRect;

    private hue = 0;
    private saturation = 100;
    private lightness = 50;

    private handleinput = (e:Event) => {
        if (e.target instanceof HTMLInputElement)
        {
            this.hue = Number(e.target.value);
            // we need to refresh the color
            this._setColor();
        }
    }
    private handlemousedown = (e:MouseEvent) => {
        this.pressed = true;
        this.areabox = this.areaElement.getBoundingClientRect();
        this.handlemousemove(e);
    }
    private handlemousemove = (e:MouseEvent) => {
        if (this.pressed && e.target === this.areaElement) 
        {
            let x = e.offsetX;
            let y = e.offsetY;

            if (x < 0) x = 0;
            if (y < 0) y = 0;
            if (x > this.areabox.width) x = this.areabox.width;
            if (y > this.areabox.height) y = this.areabox.height;

            this.pickerElement.style.left = x + 'px';
            this.pickerElement.style.top = y + 'px';

            this.saturation = x / this.areabox.width * 100;
            this.lightness = (1 - (y / this.areabox.height)) * (100 - this.saturation * 0.5);
            this._setColor();          
        }
    }
    private handlemouseup = (e:MouseEvent) => {
        if (this.pressed) 
        {
            this.handlemousemove(e);
            this.pressed = false;
        }
    }

    private _setColor(manual?:boolean) {
        this.style.setProperty('--target-color', `hsl(${this.hue}, 100%, 50%)`);
        const hslcolor = this.getColor();
        this.style.setProperty('--output-color', hslcolor);

        if (!manual)
        {
            this.dispatchEvent(new CustomEvent<ColorEvent>("change", {
                detail: {
                    value: hslcolor
                }
            }))
        }
    }

    // in the Color format 0-1
    public setColor(hsl:number[]) {
        this.hue = 359 * hsl[0];
        this.saturation = 100 * hsl[1];
        this.lightness = 100 * hsl[2];
        
        if (this.areaElement && !this.areabox)
        {
            this.areabox = this.areaElement.getBoundingClientRect();
        }
        if (this.areabox)
        {
            const x = hsl[1] * this.areabox.width;
            const y = Math.max(0, Math.min(this.areabox.height, (this.lightness / (100 - this.saturation * 0.5) - 1) * -this.areabox.height));

            this.pickerElement.style.left = x + 'px';
            this.pickerElement.style.top = y + 'px';
        }

        if (this.sliderElement)
        {
            this.sliderElement.value = this.hue.toString();
        }

        this._setColor(true);
    }
    public getColor() {
        return `hsl(${Math.round(this.hue)}, ${Math.round(this.saturation)}%, ${Math.round(this.lightness)}%)`;
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        window.removeEventListener('mouseup', this.handlemouseup);
    }

    firstUpdate(): void {
        super.firstUpdate();
        if (this.shadowRoot)
        {
            const area = this.shadowRoot.querySelector<HTMLDivElement>('div.area');
            
            if (area) {
                this.areaElement = area;
                area.addEventListener('mousedown', this.handlemousedown);
                area.addEventListener('mousemove', this.handlemousemove);
                window.addEventListener('mouseup', this.handlemouseup);
            }

            const slider = this.shadowRoot.querySelector<HTMLInputElement>('input');
            if (slider)
            {
                this.sliderElement = slider;
            }

            const pickerElement = this.shadowRoot.querySelector<HTMLDivElement>('div.area > span.picker');
            if (pickerElement)
            {
                this.pickerElement = pickerElement;
            }
        } 
    }

    render() {
        return html`
            <div class="area">
                <span class="picker"></span>
            </div>
            <div>
                <input value="${Math.round(this.hue)}" type="range" min="0" max="359" step="1" @input=${this.handleinput} />
            </div>
            <div></div>
        `
    }
}