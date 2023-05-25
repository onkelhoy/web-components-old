export interface ColorValue {
    h: number;
    s: number;
    l: number;
    css: string;
}

interface Spectrum {
    // luminance
    "100": ColorValue; // whitish
    "200": ColorValue;
    "300": ColorValue;
    "400": ColorValue;
    "500": ColorValue;
    "600": ColorValue;
    "700": ColorValue;
    "800": ColorValue;
    "900": ColorValue; // blackish

    // complimentary
    "2000": ColorValue; 

    // saturation
    "1100": ColorValue; // closer to base
    "1200": ColorValue;
    "1300": ColorValue;
    "1400": ColorValue;
    "1500": ColorValue; // grayish

    // disabled text (very bright + saturred)
    "3000": ColorValue;
    "3100": ColorValue; // invert of prev
}

interface ColorInfo {
    name: string;
    original: string;
    spectrum: Spectrum;
}

interface ColorVariable {
    full: string;
    name: string;
    value: string;
}

interface SideColorVariable {
    number: string;
    name: string;
    value: string;
}

type ColorEventFunction = (info: ColorInfo) => void;

// TODO this class should only exist once - expose it to windows instead 
// with functions etc 
export class Color {
    private static canvasContext:CanvasRenderingContext2D;

    private static spectrumMap: Map<string, ColorInfo> = new Map();
    private static observer: MutationObserver;
    private static listeners: Map<string, ColorEventFunction[]> = new Map();
    private static sideColors: Map<string, ColorValue> = new Map(); // all css-variables

    static init() {
        if (Color.canvasContext) return;
        Color.spectrumMap = new Map();
    
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (context)
        {
            Color.canvasContext = context;
        }
        else 
        {
            throw new Error('Could not create ContextAPI from canvas element')
        }

        // init spectrum colors based on CSS variables existing with "--color" syntax
        Color.initspectrum();
    }

    private static extractRootColors() {
        let rootvariables:string[] = [];

        const styleSheets = document.styleSheets;
        for (let i=0; i<styleSheets.length; i++) {
            const cssRules = styleSheets[i].cssRules || styleSheets[i].rules;
            for (let j = 0; j < cssRules.length; j++) {
                const rule = cssRules[j] as CSSStyleRule;

                if (rule.selectorText === ':root') {
                    let start = 7;
                    if (rule.cssText[5] === '{') start = 6;

                    let trimmed = rule.cssText.slice(start, rule.cssText.length - 1).replace(/ /g, '');
                    rootvariables = rootvariables.concat(trimmed.split(';'));
                }
            }
        }

        const sideColors:SideColorVariable[] = [];
        const rootColors:ColorVariable[] = [];
        
        rootvariables.forEach(variable => {
            if (variable.startsWith("--color"))
            {
                const [full, value] = variable.split(':')
                let name = full.split('--color')[1];
                if (name[0] === '-') name = name.slice(1, name.length);

                
                if (/\d$/.test(full))
                {
                    const number = name.match(/\d+/g);
                    const newname = name.split(/-?\d+/);
                    
                    if (number && number?.length > 0 && newname.length > 0) {
                        sideColors.push({value, name: newname[0], number: number[0]});
                    }
                }
                else 
                {
                    rootColors.push({full, value, name});
                }
            }
        })
        
        return {colors:rootColors, sideColors};
    }
    private static extractStyleColors() {
        let {colors, sideColors} = Color.extractRootColors();

        const root = document.documentElement;

        const styles = root.style;

        Object.values(styles).forEach(variable => {
            if (variable.startsWith('--color'))
            {
                let name = variable.split('--color')[1];
                if (name[0] === '-') name = name.slice(1, name.length);
                const value = root.style.getPropertyValue(variable);

                if (/\d$/.test(variable))
                {
                    const number = name.match(/\d+/g);
                    const newname = name.split(/-?\d+/);
                    if (number && number?.length > 0 && newname.length > 0) {
                        sideColors.push({value, name: newname[0], number: number[0]});
                    }
                }
                else 
                {
                    colors.push({full: variable, name, value});
                }
            }
        });
        
        const changedSideColors:Set<string> = new Set();
        
        const remainingSideColors = Array.from(Color.sideColors.keys());

        
        sideColors.forEach(color => {
            const name = color.name+color.number;
            const prev = Color.sideColors.get(name);

            const index = remainingSideColors.findIndex(rname => rname === name);
            if (index >= 0) remainingSideColors.splice(index, 1);

            if (!prev || prev.css !== color.value)
            {
                const rgb = Color.cssToRGB(color.value);
                const [h,s,l] = Color.rgbToHSL(rgb[0], rgb[1], rgb[2]);

                const data:ColorValue = {
                    css: color.value,
                    h,s,l
                }
                Color.sideColors.set(name, data);
                changedSideColors.add(color.name);
            }
        });

        // these got removed
        remainingSideColors.forEach(name => {
            Color.sideColors.delete(name);
            changedSideColors.add(name.split(/-?\d+/)[0])
        });

        colors.forEach(color => {
            const prev = Color.get(color.name);
            if (changedSideColors.has(color.name) || !prev || (prev && prev.original !== color.value)) {
                const spectrum = Color.spectrum(color.value, color.name, true);
                Color.set(color.name, {
                    name: color.name,
                    original: color.value,
                    spectrum,
                });
            }
        })
    }
    private static initspectrum() {
        if (Color.observer) return;

        const root = document.documentElement;

        const handleChanges = (mutationsList: MutationRecord[], observer: MutationObserver) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    Color.extractStyleColors();
                }
            }
        };

        // create a MutationObserver and observe changes to the :root element
        Color.observer = new MutationObserver(handleChanges);
        Color.observer.observe(root, { 
            attributes: true,
            attributeFilter: ['style'],
        });

        Color.extractStyleColors();
    }

    private static dispatch(colorname:string, spectrum:ColorInfo) {
        const listeners = Color.listeners.get(colorname) || [];
        listeners.forEach(cb => cb(spectrum));
    } 
    private static checkSideColor(name:string|undefined, number:number, data:Record<string, ColorValue>) {
        if (name) 
        {
            const color = Color.sideColors.get(name+number);
            if (color) 
            {
                data[number] = color;

                return true;
            }
        }

        return false;
    }

    static register(colorname:string, callback: ColorEventFunction) {
        const currentlisteners = Color.listeners.get(colorname) || [];
        currentlisteners.push(callback);

        Color.listeners.set(colorname, currentlisteners);
    }
    static unregister(colorname:string, callback: ColorEventFunction) {
        const currentlisteners = (Color.listeners.get(colorname) || []).filter(cb => cb !== callback);
        Color.listeners.set(colorname, currentlisteners);
    }

    static isName(csscolor:string) {
        return Color.spectrumMap.has(csscolor);
    }
    static get(name:string) {
        return Color.spectrumMap.get(name);
    }

    static set(name:string, value:ColorInfo)
    {
        Color.spectrumMap.set(name, value);
        Color.dispatch(name, value);
    }

    static cssToRGB(cssColor:string):number[] {
        Color.canvasContext.fillStyle = cssColor;
        const computedColor = Color.canvasContext.fillStyle;
        
        if (computedColor.startsWith('#')) {
            const hex = computedColor.substring(1);
            const r = parseInt(hex.slice(0, 2), 16);
            const g = parseInt(hex.slice(2, 4), 16);
            const b = parseInt(hex.slice(4, 6), 16);

            return [r,g,b];
        }
        
        return computedColor.replace(/rgba?\(|\)|\s/g, '').split(',').map(str => Number(str));
    }

    static rgbToHSL(r:number, g:number, b:number) {
        r /= 255, g /= 255, b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h:number, s:number, l:number = (max + min) / 2;
      
        if (max === min) {
          h = s = 0; // achromatic
        } else {
          const d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: 
            default: h = (r - g) / d + 4; break;
          }
          h /= 6;
        }
      
        return [h, s, l];
    }

    static hslToRgb(h:number, s:number, l:number) {
        let r:number, g:number, b:number;
      
        if (s === 0) {
          r = g = b = l; // achromatic
        } else {
          const hue2rgb = (p:number, q:number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
          };
      
          const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          const p = 2 * l - q;
          r = hue2rgb(p, q, h + 1 / 3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1 / 3);
        }
      
        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }

    static spectrum(css:string, name?:string, force = false):Spectrum {
        Color.init();

        const pre = Color.get(css);
        if (pre && !force) return pre.spectrum;

        const rgb = Color.cssToRGB(css);
        const [h, s, l] = Color.rgbToHSL(rgb[0], rgb[1], rgb[2]);
        
        // add the luminance
        const lum_step = Math.min(l, 1 - l) / 5;
        const data:Record<string, ColorValue> = {};

        for (let i = -4; i <= 4; i++) {
            const number = (9 - (i + 4)) * 100;
            if (Color.checkSideColor(name, number, data)) 
            {
                continue;
            }

            const newl = Math.min(Math.max(l + lum_step * i, 0), 1);
            data[number] = {
                h,
                s,
                l: newl,
                css: `hsl(${h * 360}, ${s * 100}%, ${newl * 100}%)`
            };
        }

        // add the complimentatyHue
        const complimentaryHue = (h + 0.5) % 1;
        if (!Color.checkSideColor(name, 2000, data)) 
        {
            data[2000] = {
                h: complimentaryHue,
                s,
                l,
                css: `hsl(${complimentaryHue*360}, ${s * 100}%, ${l * 100}%)`
            }
        }
        // add disabled color
        if (!Color.checkSideColor(name, 2000, data)) 
        {
            data["3000"] = {
                h,
                s: .05,
                l: .97,
                css: `hsl(${h * 360}, 5%, 97%)`
            };
        }
        if (!Color.checkSideColor(name, 2000, data)) 
        {
            data["3100"] = {
                h,
                s: .05,
                l: .4,
                css: `hsl(${h * 360}, 5%, 40%)`
            };
        }

        // add the saturation
        const sat_step = s / 6;
        for (let i = 0; i < 5; i++) {
            const number = (11 + i) * 100;
            if (Color.checkSideColor(name, number, data)) 
            {
                continue;
            }
            const news = Math.min(Math.max(l - sat_step * i, 0), 1);

            data[(11 + i) * 100] = {
                h,
                s: news,
                l,
                css: `hsl(${h * 360}, ${news * 100}%, ${l * 100}%)`
            };
        }

        return data as unknown as Spectrum;
    }
}
window.addEventListener('load', () => Color.init());