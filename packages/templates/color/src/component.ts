import { Base } from '@pap-it/system-base';
import { property } from '@pap-it/system-utils';

// locals
import { Color } from './Color';

// helper function 
function padWithZeros(number: number) {
  return String(number).padStart(3, '0');
}

export class ColorTemplate extends Base {

  @property({
    rerender: false,
    after: function (this: ColorTemplate, prev) {
      if (!this.color) return;

      if (typeof prev === "string") {
        if (Color.isName(prev)) {
          Color.unregister(prev, this.setColors);
        }
      }


      if (Color.isName(this.color)) {
        Color.register(this.color, this.setColors);
      }

      this.setColors();
    },
  }) color?: string;

  private setColors = () => {
    if (!this.color) return;
    const spectrum = Color.spectrum(this.color);

    Object.entries(spectrum).forEach(([key, value]) => {
      this.style.setProperty(`--color${key}`, value.css);
      this.style.setProperty(`--text-color${key}`, value.l > 0.6 ? 'black' : 'white');
    })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-color-template": ColorTemplate;
  }
}