import { NextParent, property, suspense, findComments } from "@papit/tools-utils";

import { FunctionCallback, RenderType } from "./types";

export class BaseTemplate extends HTMLElement {
    public static style?:string;
    public static styles?:string[];

    protected callAfterUpdate:(Function|FunctionCallback)[] = [];
    protected render_mode: 'greedy'|'smart' = 'smart';
    protected render_style_mode: 'lazy'|'smart' = 'lazy';

    private attributeObserver!: MutationObserver;
    private _pendingOperations: Function[] = [];
    private templateComperator!: HTMLTemplateElement;
    private styleComperator!: HTMLStyleElement;
    private connected: boolean = false;
    public originalHTML: string = "";
    @property({ rerender: false, type: Boolean }) hasFocus: boolean = false;

    // class functions
    constructor() {
        super();

        this.originalHTML = this.outerHTML;
        
        this.addEventListener('blur', this.handleblur);
        this.addEventListener('focus', this.handlefocus);

        this.styleComperator = document.createElement('style');
        this.templateComperator = document.createElement('template');

        this.debouncedRequestUpdate = suspense(this.requestUpdate, 100);
        this.attachShadow({mode:'open'});
        this.callAfterUpdate.push(this.firstUpdate);
    }
    connectedCallback() {
        this.connected = true;
        this.debouncedRequestUpdate();
        // Create an observer instance linked to a callback function
        this.attributeObserver = new MutationObserver((mutationsList, observer) => {
            // Look through all mutations that just occured
            for(let mutation of mutationsList) {
                // If the attribute modified is one we are tracking
                if (mutation.type === 'attributes' && mutation.attributeName) {
                    this.attributeChangedCallback(mutation.attributeName, mutation.oldValue, this.getAttribute(mutation.attributeName))
                }
            }
        });

        // Start observing the node with configured parameters
        // attributes: true indicates we want to observe attribute changes
        this.attributeObserver.observe(this, { attributes: true });

        this._pendingOperations.forEach(o => o());
        this._pendingOperations = [];
    }
    disconnectedCallback() {
        this.connected = false;
        this.attributeObserver.disconnect();
    }
    attributeChangedCallback(name:string, oldValue:string|null, newValue:string|null) {
        // implement something
    }

    // event handlers
    protected handleblur = () => {
        this.hasFocus = false;
    }
    protected handlefocus = () => {
        this.hasFocus = true;
    }

    protected getStyle():string {
        // Get the constructor of the child class
        const childConstructor = this.constructor as typeof BaseTemplate & { style?:string; styles?:string[]; };
        
        // Access the static property on the child class
        const styles = [
            ...(childConstructor.styles ?? []),
            ...(typeof childConstructor.style === "string" ? [childConstructor.style] : []),
        ];

        return styles.join(' ');
    }

    public querySelector(selector:string) {
        if (this.shadowRoot) return this.shadowRoot.querySelector(selector);
        return null;
    }
    public shadow_closest<T extends Element = HTMLElement>(selector: string) {
        let parent = NextParent(this);
        
        while (parent)
        {
            // check if parent is our selector
            const closest = parent.closest<T>(selector);
            if (closest) return closest;

            const target = parent.querySelector<T>(selector);
            if (target) return target;

            if (parent === document.documentElement) break;
            parent = NextParent(parent);
        }
    }

    public requestUpdate() {
        if (!this.shadowRoot) 
        {
            // TODO wait until shadowRoot is here ! 
            return 
        }

        const initalrender = this.shadowRoot.innerHTML === "";
        this.renderStyle();
        const content = this.render();

        if (initalrender || this.render_mode === "greedy")
        {
            this.flushHTML(this.shadowRoot);
            this.renderContent(content, this.shadowRoot);
        }
        else 
        {
            this.renderHTML(content);
        }


        let info;
        const reverse = this.callAfterUpdate.reverse();
        while (info = reverse.pop()) {
            if (typeof info === "object")
            {
                info.callback.call(this, ...info.args);
            }
            if (info instanceof Function) {
                info.call(this);
            }
        }
        this.callAfterUpdate = [];
    }

    public debouncedRequestUpdate() {}
    public firstUpdate() {}

    public render(child?:RenderType):RenderType {
        return 'Hello From Base Class'
    }

    // helper functions 
    private flushHTML(node:Element|ShadowRoot) {
        node.childNodes.forEach(child => {
            if (child.nodeName !== "STYLE")
            {
                node.removeChild(child);
            }
        });
    }
    private renderStyle() {
        if (!this.shadowRoot) return;

        // check if style is different 
        let targetElement = this.shadowRoot.querySelector('style');
        if (!targetElement)
        {
            targetElement = document.createElement("style");
            targetElement.innerHTML = this.getStyle();
            this.shadowRoot.appendChild(targetElement);
            return;
        }

        // NOTE most cases would never require style to be changed 
        if (this.render_style_mode === "lazy") return;

        this.styleComperator.innerHTML = this.getStyle();

        if (this.styleComperator.innerHTML !== targetElement.innerHTML)
        {
            targetElement.innerHTML = this.styleComperator.innerHTML;
        }
    }
    private renderHTML(content:RenderType) {
        if (!this.shadowRoot) return;

        // flush the html
        while (this.templateComperator.firstChild)
        {
            this.templateComperator.removeChild(this.templateComperator.firstChild);
        }

        this.templateComperator.appendChild(this.styleComperator);

        
        this.renderContent(content, this.templateComperator);
        const clone = this.templateComperator.cloneNode(true) as HTMLTemplateElement;

        clone.querySelectorAll('*:not(style)').forEach(node => {
            const path = this.getComposedPath(clone, node);
            const shadowNode = this.querySelector(path.join(" > "));
            if (!shadowNode)
            {
                // we need to traverse up the path until we find one node then insert until the end 
                let shadowtarget:ShadowRoot|Element|null = this.shadowRoot;
                let target:Element|null = node;
                
                for (let i=path.length - 1; i>=0; i--) 
                { // we need not to start at end as this case has just been checked
                    const _shadownode = this.querySelector(path.slice(0, i).join(' > '));
                    if (_shadownode)
                    {
                        // we found a node, now we can start inserting until we reach end of path (i==path.lenght - 1)
                        shadowtarget = _shadownode;
                        break;
                    }
                    else 
                    {
                        target = node.parentElement;
                    }
                }
                
                if (target)
                {
                    shadowtarget?.appendChild(target);
                }
                else 
                {
                    console.error('[ERROR] this case should not happen')
                    console.log({shadowtarget, node, target, path})
                }
            }
            else 
            {
                // check if it has changed ! 
                
                // need to keep track of which we already looked at so we know which to remove later ! 
                // const passedAttributes:string[] = []; 

                // attributes first 

                // look if changes or new attributes added 
                for (let i=0; i<node.attributes.length; i++) 
                {
                    const name = node.attributes[i].name;
                    const value = node.attributes[i].value;

                    // passedAttributes.push(name);

                    const shadowValue = shadowNode.getAttribute(name);
                    if (shadowValue !== value) shadowNode.setAttribute(name, value);
                }
                // NOTE 
                // this is dangerous as many attributes are dynamically added on render 
                // plus is very rare we would have a case where we should remove attributes.. however if yes then rethink this ! 

                // // remove the left over attributes
                // for (let i=0; i<shadowNode.attributes.length; i++)
                // {
                //     const name = shadowNode.attributes[i].name;
                //     if (!passedAttributes.includes(name))
                //     {
                //         console.log(shadowNode, 'removing attribute', name, passedAttributes)
                //         shadowNode.removeAttribute(name);
                //     }
                // }
                
                // then content - also tricky case as we are interessted in only Text change 
                // as the rest would get also covered ! 
                node.childNodes.forEach((child, key:number) => {
                    if (child.nodeType === Node.TEXT_NODE)
                    {
                        // check if its just this weird html fillers
                        if (child.textContent?.trim() === "") return;

                        const shadowTextNode = shadowNode.childNodes[key];
                        if (shadowTextNode)
                        {
                            if (shadowTextNode.nodeType === Node.TEXT_NODE)
                            {
                                if (shadowTextNode.textContent !== child.textContent)
                                {
                                    shadowTextNode.textContent = child.textContent;
                                }
                            }
                            else 
                            {
                                // NOTE this case seems not to show up really thus not implement for now
                                console.error('[ERROR] if this can be seen we must update (1)')
                                console.log({ shadowTextNode, child, content: child.textContent })
                            }
                        }
                        else 
                        {
                            // NOTE this case seems not to show up really thus not implement for now
                            console.error('[ERROR] if this can be seen we must update (2)')
                            console.log({ child, content: child.textContent })
                        }
                    }
                })
            }
        })


        this.shadowRoot.querySelectorAll('*:not(style)').forEach(node => {
            // NOTE this node can already been removed now from a previous deletion 
            // (as it could be a child within a child)

            if (!node.parentNode) return;

            // determine which one should leave ! 
            const path = this.getComposedPath(this.shadowRoot as ShadowRoot, node);
            const templateNode = this.templateComperator.querySelector(path.join(" > "));
            if (!templateNode)
            {
                // needs to go!
                node.parentNode.removeChild(node);
            }
        });

        // compare each node to shadowroot and check if anything has changed ! 
    }
    /**
     * This function will get the composed path based on a base element 
     * - templateComperator & potentially shadowRoot
     * returns the CSS selector path 
     * 
     * @param base Element
     * @param target Element
     * @returns string - CSS selector
     */
    private getComposedPath(base:ShadowRoot|Element, target:Element) {
        const path = [];
        while (target !== base)
        {
            path.push(this.getSelector(target));
            let nexttarget = target.parentElement;
            if (nexttarget) target = nexttarget;
            else break;
        }

        return path.reverse();
    }
    /**
     * This function will return the selector for a element, tries to use the common things 
     * - included key as React does for array
     * OBS: if no special selector found it will base it on child index if parent has more then 1 child
     * 
     * @param node Element
     * @returns string 
     */
    private getSelector(node: Element) {
        const selector = [node.tagName];
        
        if (node.id) selector.push("#" + node.id);
        if (node.className) selector.push("." + node.className.replace(/ /g, "."));
        if (node.hasAttribute("key")) selector.push(`[key="${node.getAttribute("key")}"]`);

        if (selector.length === 1)
        {
            // need to get child index then ! 
            if (node.parentNode)
            {
                if (node.parentNode.children.length > 1)
                {
                    let index = 0;
                    for (let i=0; i<node.parentNode.children.length; i++) 
                    {
                        if (node.parentNode.children[i] === node)
                        {
                            index = i;
                            break;
                        }
                    }
                    selector.push(`:nth-child(${index + 1})`);
                }
            }
        }

        return selector.join("");
    }
    private renderContent(content:RenderType, parent:ShadowRoot|Element) {
        if (["string", "number", "boolean"].includes(typeof content)) 
        {
            const strcontent = content.toString();
            if (/</.test(strcontent) && />/.test(strcontent)) {
                // If it's HTML, set it directly 
                // NOTE this is not the best comperator nor the best way but its the easiest ! 
                parent.innerHTML = parent.innerHTML + strcontent;
            } else {
                // If it's plain text, create and append a text node
                const textNode = document.createTextNode(strcontent);
                parent.appendChild(textNode);
            }
        }
        else if (content instanceof DocumentFragment) 
        {
            parent.appendChild(content);
        }
        else if (content instanceof Array)
        {
            content.forEach(child => this.renderContent(child, parent));
        }
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "pap-base-template": BaseTemplate;
    }
}