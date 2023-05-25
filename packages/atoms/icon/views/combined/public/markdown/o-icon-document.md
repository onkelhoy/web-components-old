# Icon

Atomic Type: atoms

Version: 1.0.0

## Development 
Development servers can be started and should all exist inside `"views"` folder

## Scripts 
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and register code provided to you - could you create a rather simple introduction text with maybe a code example how to use in html - keep it very simple. Do not give example how to run the register code it's already included (this is for you so you can see the element-tag)! The introduction should be read by developers so it needs not to be simple enough for beginners!

## SOURCE-CODE:
import { property, html, Size } from '@circular-tools/utils';
import { AssetTemplate } from '@circular-templates/asset';

import { style } from './style.js';

export class Icon extends AssetTemplate {
    static style = style;
    
    private content: string = "";
    private svgElement!: SVGSVGElement;

    @property({ onUpdate: "updateName", rerender: false }) name?: string;
    @property({ onUpdate: "updateColor", rerender: false }) color?: string;
    @property({ onUpdate: "updateSize", rerender: false }) size: Size = "medium";
    @property({ onUpdate: "updateCustomSize", rerender: false }) customSize?: number;

    // class functions
    constructor() {
        super();

        this.assetBase = "/public/icons"
    }
    public firstUpdate() {
        if (this.shadowRoot)
        {
            const element = this.shadowRoot.querySelector<SVGSVGElement>("svg");
            if (element === null) throw new Error('Could not find svg element');
            this.svgElement = element;

            if (this.content)
            {
                this.setSVG();
            }
        }
    }

    // update functions
    private async updateName(): Promise<void> {
        const file = `${this.name}.svg`;
        const response = await this.loadAsset(file);
        if (response) {
            let content, viewbox = "0 96 960 960"; // default google icon's
            if (typeof response === "string")
            {
                content = response;
            }
            else 
            {
                content = await response.text();
                const [parsed_content, parsed_viewbox] = this.extractSvgContent(content);

                if (parsed_viewbox) {
                    viewbox = parsed_viewbox;
                }
                if (parsed_content) 
                {
                    content = `SVG:${viewbox}##${parsed_content.trim()}`;
                    this.cacheData(file, content);
                }
            }

            if (content.startsWith("SVG:"))
            {
                this.content = content;
                if (this.getAttribute("show")) console.log(content)
                this.setSVG();
            }
        }
    }
    private updateColor() {
        if (this.color) this.style.color = this.color;
    }
    private updateSize() {
        this.style.removeProperty("--icon-custom-size");    
    }
    private updateCustomSize() {
        if (this.customSize !== undefined) this.style.setProperty("--icon-custom-size", this.customSize.toString());
    }

    // helper functions
    private extractSvgContent(svgString:string) {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');
        const svgElement = svgDoc.querySelector('svg');
        if (svgElement)
        {
            return [svgElement.innerHTML, svgElement.getAttribute("viewBox")];
        }
        return ["", ""];
    }
    private setSVG() {
        if (this.svgElement)
        {

            const parsed = /SVG:(.*)##/.exec(this.content);
            if (parsed) {
                const content = this.content.split(parsed[1])[1];
                this.svgElement.setAttribute('viewBox', parsed[1]);
                if (this.getAttribute("show")) console.log(this.content, parsed, content)
                this.svgElement.innerHTML = content;
            }
        }
    }

    render() {
        return html`
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 96 960 960"
                part="svg"
            >
                ${this.content}
            </svg>
        `
    }
}
## REGISTER-CODE:
import { Icon } from './component.js';

// Register the element with the browser
const cElements = customElements ?? window?.customElements;

if (!cElements) {
  throw new Error('Custom Elements not supported');
}

if (!cElements.get('o-icon')) {
  cElements.define('o-icon', Icon);
}
PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and the types can you give me the following tables. 
1. properties (columns: name, default-value, type, description) 
2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc) 
3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)

## SOURCE-CODE:
 import { property, html, Size } from '@circular-tools/utils';
import { AssetTemplate } from '@circular-templates/asset';

import { style } from './style.js';

export class Icon extends AssetTemplate {
    static style = style;
    
    private content: string = "";
    private svgElement!: SVGSVGElement;

    @property({ onUpdate: "updateName", rerender: false }) name?: string;
    @property({ onUpdate: "updateColor", rerender: false }) color?: string;
    @property({ onUpdate: "updateSize", rerender: false }) size: Size = "medium";
    @property({ onUpdate: "updateCustomSize", rerender: false }) customSize?: number;

    // class functions
    constructor() {
        super();

        this.assetBase = "/public/icons"
    }
    public firstUpdate() {
        if (this.shadowRoot)
        {
            const element = this.shadowRoot.querySelector<SVGSVGElement>("svg");
            if (element === null) throw new Error('Could not find svg element');
            this.svgElement = element;

            if (this.content)
            {
                this.setSVG();
            }
        }
    }

    // update functions
    private async updateName(): Promise<void> {
        const file = `${this.name}.svg`;
        const response = await this.loadAsset(file);
        if (response) {
            let content, viewbox = "0 96 960 960"; // default google icon's
            if (typeof response === "string")
            {
                content = response;
            }
            else 
            {
                content = await response.text();
                const [parsed_content, parsed_viewbox] = this.extractSvgContent(content);

                if (parsed_viewbox) {
                    viewbox = parsed_viewbox;
                }
                if (parsed_content) 
                {
                    content = `SVG:${viewbox}##${parsed_content.trim()}`;
                    this.cacheData(file, content);
                }
            }

            if (content.startsWith("SVG:"))
            {
                this.content = content;
                if (this.getAttribute("show")) console.log(content)
                this.setSVG();
            }
        }
    }
    private updateColor() {
        if (this.color) this.style.color = this.color;
    }
    private updateSize() {
        this.style.removeProperty("--icon-custom-size");    
    }
    private updateCustomSize() {
        if (this.customSize !== undefined) this.style.setProperty("--icon-custom-size", this.customSize.toString());
    }

    // helper functions
    private extractSvgContent(svgString:string) {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');
        const svgElement = svgDoc.querySelector('svg');
        if (svgElement)
        {
            return [svgElement.innerHTML, svgElement.getAttribute("viewBox")];
        }
        return ["", ""];
    }
    private setSVG() {
        if (this.svgElement)
        {

            const parsed = /SVG:(.*)##/.exec(this.content);
            if (parsed) {
                const content = this.content.split(parsed[1])[1];
                this.svgElement.setAttribute('viewBox', parsed[1]);
                if (this.getAttribute("show")) console.log(this.content, parsed, content)
                this.svgElement.innerHTML = content;
            }
        }
    }

    render() {
        return html`
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 96 960 960"
                part="svg"
            >
                ${this.content}
            </svg>
        `
    }
}

## TYPE-CODE: export {}PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!
 Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.
css-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).
parts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).
slots should include columns: (name, default-value, description)

## SOURCE-CODE:
import { property, html, Size } from '@circular-tools/utils';
import { AssetTemplate } from '@circular-templates/asset';

import { style } from './style.js';

export class Icon extends AssetTemplate {
    static style = style;
    
    private content: string = "";
    private svgElement!: SVGSVGElement;

    @property({ onUpdate: "updateName", rerender: false }) name?: string;
    @property({ onUpdate: "updateColor", rerender: false }) color?: string;
    @property({ onUpdate: "updateSize", rerender: false }) size: Size = "medium";
    @property({ onUpdate: "updateCustomSize", rerender: false }) customSize?: number;

    // class functions
    constructor() {
        super();

        this.assetBase = "/public/icons"
    }
    public firstUpdate() {
        if (this.shadowRoot)
        {
            const element = this.shadowRoot.querySelector<SVGSVGElement>("svg");
            if (element === null) throw new Error('Could not find svg element');
            this.svgElement = element;

            if (this.content)
            {
                this.setSVG();
            }
        }
    }

    // update functions
    private async updateName(): Promise<void> {
        const file = `${this.name}.svg`;
        const response = await this.loadAsset(file);
        if (response) {
            let content, viewbox = "0 96 960 960"; // default google icon's
            if (typeof response === "string")
            {
                content = response;
            }
            else 
            {
                content = await response.text();
                const [parsed_content, parsed_viewbox] = this.extractSvgContent(content);

                if (parsed_viewbox) {
                    viewbox = parsed_viewbox;
                }
                if (parsed_content) 
                {
                    content = `SVG:${viewbox}##${parsed_content.trim()}`;
                    this.cacheData(file, content);
                }
            }

            if (content.startsWith("SVG:"))
            {
                this.content = content;
                if (this.getAttribute("show")) console.log(content)
                this.setSVG();
            }
        }
    }
    private updateColor() {
        if (this.color) this.style.color = this.color;
    }
    private updateSize() {
        this.style.removeProperty("--icon-custom-size");    
    }
    private updateCustomSize() {
        if (this.customSize !== undefined) this.style.setProperty("--icon-custom-size", this.customSize.toString());
    }

    // helper functions
    private extractSvgContent(svgString:string) {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');
        const svgElement = svgDoc.querySelector('svg');
        if (svgElement)
        {
            return [svgElement.innerHTML, svgElement.getAttribute("viewBox")];
        }
        return ["", ""];
    }
    private setSVG() {
        if (this.svgElement)
        {

            const parsed = /SVG:(.*)##/.exec(this.content);
            if (parsed) {
                const content = this.content.split(parsed[1])[1];
                this.svgElement.setAttribute('viewBox', parsed[1]);
                if (this.getAttribute("show")) console.log(this.content, parsed, content)
                this.svgElement.innerHTML = content;
            }
        }
    }

    render() {
        return html`
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 96 960 960"
                part="svg"
            >
                ${this.content}
            </svg>
        `
    }
}
## STYLE-CODE:
:host {
    display: inline-block;

    width: var(--icon-custom-size);
    height: var(--icon-custom-size);
}

:host([size="small"]) {
    --icon-custom-size: var(--icon-size-small, 30);
}
:host([size="medium"]) {
    --icon-custom-size: var(--icon-size-medium, 48);
}
:host([size="large"]) {
    --icon-custom-size: var(--icon-size-large, 60);
}
svg {
    width: inherit;
    height: inherit;
    fill: currentColor;
    stroke: currentColor;
}