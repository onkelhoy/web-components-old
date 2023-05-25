import { BaseTemplate } from '@circular-templates/base';
import { property } from '@circular-tools/utils';

// locals
import { Color } from './Color';

// helper function 
function padWithZeros(number:number) {
    return String(number).padStart(3, '0');
}

export class ColorTemplate extends BaseTemplate {

    @property({
        onUpdate: 'onColorUpdate'
    }) color?: string;

    private onColorUpdate(color:string, prev:string) {
        if (typeof prev === "string")
        {
            if (Color.isName(prev))
            {
                Color.unregister(prev, this.setColors);
            }
        }
        

        if (Color.isName(color))
        {
            Color.register(color, this.setColors);
        }

        this.setColors();
    }

    private setColors = () => {
        if (!this.color) return;
        const spectrum = Color.spectrum(this.color);

        Object.entries(spectrum).forEach(([key, value]) => {
            this.style.setProperty(`--color${key}`, value.css);
            this.style.setProperty(`--text-color${key}`, value.l > 0.6 ? 'black' : 'white');
        })
    }
}