import { NextParent, property, debounce, convertFromString } from "@pap-it/system-utils";

import { Config, FunctionCallback, RenderType, PropertyConfig } from "./types";

// NOTE should this be there?
// export interface Base extends HTMLElement { }

export class Base extends HTMLElement {
  public static style?: string;
  public static styles?: string[];
  public static __propertyOptions: Record<string, PropertyConfig> = {};

  protected callAfterUpdate: (Function | FunctionCallback)[] = [];
  protected render_mode: 'greedy' | 'smart' = 'smart';
  protected render_style_mode: 'lazy' | 'smart' = 'lazy';
  protected hasrendered = false;
  protected attributeinit = false;

  private templateComperator!: HTMLTemplateElement;
  private styleComperator!: HTMLStyleElement;
  private delayedAttributes: Record<string, string> = {};

  public connected: boolean = false;
  public originalHTML: string = "";
  @property({ rerender: false, type: Boolean }) hasFocus: boolean = false;

  // class functions
  constructor(config?: Partial<Config>) {
    super();

    this.originalHTML = this.outerHTML;

    if (!config?.noblur) this.addEventListener('blur', this.handleblur);
    if (!config?.nofocus) this.addEventListener('focus', this.handlefocus);

    this.styleComperator = document.createElement('style');
    this.templateComperator = document.createElement('template');

    this.debouncedRequestUpdate = debounce(this.requestUpdate, 100);
    this.attachShadow({ mode: 'open', ...(config ? config : {} as ShadowRootInit) });

    // TODO should implement the function that calls then if fails calls later too
    this.updateAttribute = debounce(this.updateAttribute, 10);
    this.callAfterUpdate.push(this.firstUpdate);
  }
  connectedCallback() {
    this.attributeinit = false;
    this.debouncedRequestUpdate();
    this.connected = true;
    this.dispatchEvent(new Event('connected'));
  }
  disconnectedCallback() {
    this.connected = false;
    this.dispatchEvent(new Event('disconnected'));
  }
  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue) return;

    // implement something
    if (!this.delayedAttributes[name]) {
      if (Base.__propertyOptions[name]) {
        (this as any)[name + "internal"] = true;
        this[Base.__propertyOptions[name].propertyKey as keyof this] = convertFromString(newValue, Base.__propertyOptions[name].type);
      }
    }
    else {
      delete this.delayedAttributes[name];
      this[Base.__propertyOptions[name].propertyKey as keyof this] = convertFromString(newValue, Base.__propertyOptions[name].type);
    }
  }
  public firstUpdate() {
    this.hasrendered = true;
    this.updateAttribute();
  }

  // event handlers
  protected handleblur = () => {
    this.hasFocus = false;
  }
  protected handlefocus = () => {
    this.hasFocus = true;
  }

  protected getStyle(): string {
    // Get the constructor of the child class
    const childConstructor = this.constructor as typeof Base & { style?: string; styles?: string[]; };

    // Access the static property on the child class
    const styles = [
      ...(childConstructor.styles ?? []),
      ...(typeof childConstructor.style === "string" ? [childConstructor.style] : []),
    ];

    return styles.join(' ');
  }

  public querySelector<T extends Element>(selector: string): T | null {
    if (!selector) {
      console.log('empty string')
      return null;
    }
    if (this.shadowRoot) return this.shadowRoot.querySelector<T>(selector);
    return null;
  }
  public shadow_closest<T extends Element = HTMLElement>(selector: string) {
    let parent = NextParent(this);

    while (parent) {
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
    if (!this.shadowRoot) {
      // TODO wait until shadowRoot is here ! 
      return
    }

    const initalrender = this.shadowRoot.innerHTML === "";
    this.renderStyle();
    const content = this.render();

    if (initalrender || this.render_mode === "greedy") {
      this.flushHTML(this.shadowRoot);
      this.renderContent(content, this.shadowRoot);
    }
    else {
      this.renderHTML(content);
    }


    let info;
    const reverse = this.callAfterUpdate.reverse();
    while (info = reverse.pop()) {
      if (typeof info === "object") {
        info.callback.call(this, ...info.args);
      }
      if (info instanceof Function) {
        info.call(this);
      }
    }
    this.callAfterUpdate = [];
  }

  public debouncedRequestUpdate() { }

  public render(config?: any): RenderType {
    return 'Hello From Base Class'
  }

  // helper functions 
  private initAttributes() {
    if (this.attributeinit) return

    this.attributeinit = true;
    // we need to check if we have any initial values ?
    const a = this.attributes;
    for (let i = 0; i < a.length; i++) {
      const name = a[i].name;
      if (Base.__propertyOptions[name]) {
        let value = a[i].value;
        if (value === "") value = "true";

        this[Base.__propertyOptions[name].propertyKey as keyof this] = convertFromString(value, Base.__propertyOptions[name].type);
      }
    }
  }
  private updateAttribute() {
    if (this.hasrendered) {
      // we call this each time but it will probably just cancel anyway..
      this.initAttributes();

      for (let name in this.delayedAttributes) {
        const value = this.delayedAttributes[name];
        if (value === undefined) this.removeAttribute(name);
        else {
          this.setAttribute(name, value);
        }
      }

    }
  }
  private flushHTML(node: Element | ShadowRoot) {
    node.childNodes.forEach(child => {
      if (child.nodeName !== "STYLE") {
        node.removeChild(child);
      }
    });
  }
  private renderStyle() {
    if (!this.shadowRoot) return;

    // check if style is different 
    let targetElement = this.shadowRoot.querySelector('style');
    if (!targetElement) {
      targetElement = document.createElement("style");
      targetElement.innerHTML = this.getStyle();
      this.shadowRoot.appendChild(targetElement);
      return;
    }

    // NOTE most cases would never require style to be changed 
    if (this.render_style_mode === "lazy") return;

    this.styleComperator.innerHTML = this.getStyle();

    if (this.styleComperator.innerHTML !== targetElement.innerHTML) {
      targetElement.innerHTML = this.styleComperator.innerHTML;
    }
  }
  /** 
   * this element is made so we can find if the current element should be inserted infront a element 
   * so we dont just blindly append to end of parent using the appendChild 
   * 
   * so we need to traverser the next sibling and check if it exists in the real element 
   */
  private getNextElement(clone: HTMLTemplateElement, node: Element): Element | null {
    if (node.nextElementSibling) {
      const path = this.getComposedPath(clone, node.nextElementSibling);
      const shadowNode = this.querySelector(path.join(" > "));

      if (shadowNode) {
        return shadowNode;
      }

      return this.getNextElement(clone, node.nextElementSibling);
    }

    return null;
  }
  private renderHTML(content: RenderType) {
    if (!this.shadowRoot) return;
    this.hasrendered = true;

    // flush the html
    while (this.templateComperator.firstChild) {
      this.templateComperator.removeChild(this.templateComperator.firstChild);
    }

    this.templateComperator.appendChild(this.styleComperator);

    // NOTE we render to template first
    // and then we clone, which results in loss of event stuff (this)
    this.renderContent(content, this.templateComperator);

    // TODO figure out the reason why we clone, there was a very strong reason but I dont remember..
    // akward but it was the previous mentioned comment no? (that)
    const clone = this.templateComperator.cloneNode(true) as HTMLTemplateElement;
    if (this.tagName === "PAP-SIDEBAR-ITEM") console.log(clone.outerHTML, clone.innerHTML);

    clone.querySelectorAll('*:not(style)').forEach(node => {
      const path = this.getComposedPath(clone, node);

      const shadowNode = this.querySelector(path.join(" > "));

      if (!shadowNode) {
        // we need to traverse up the path until we find one node then insert until the end 
        let shadowtarget: ShadowRoot | Element | null = this.shadowRoot;
        let target: Element | null = node;

        if (path.length > 1) {
          for (let i = path.length - 1; i >= 0; i--) { // we need not to start at end as this case has just been checked
            const _shadownode = this.querySelector(path.slice(0, i).join(' > '));
            if (_shadownode) {
              // we found a node, now we can start inserting until we reach end of path (i==path.lenght - 1)
              shadowtarget = _shadownode;
              break;
            }
            else {
              target = node.parentElement;
            }
          }
        }

        if (target) {
          // we check if we can insert it before a element 
          // this function selects this element (if exists by traversing the next until its found in targetShadow)
          const nextElement = this.getNextElement(clone, node);
          if (nextElement) {
            shadowtarget?.insertBefore(target, nextElement);
          }
          else {
            shadowtarget?.appendChild(target);
          }

          // reapplyEventListeners(target);
        }
        else {
          console.error('[ERROR] this case should not happen')
          console.log({ shadowtarget, node, target, path })
        }
      }
      else {
        // check if it has changed ! 

        // need to keep track of which we already looked at so we know which to remove later ! 
        // const passedAttributes:string[] = []; 

        // attributes first 

        // look if changes or new attributes added 
        for (let i = 0; i < node.attributes.length; i++) {
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
        node.childNodes.forEach((child, key: number) => {
          if (child.nodeType === Node.TEXT_NODE) {
            // check if its just this weird html fillers
            if (child.textContent?.trim() === "") return;

            const shadowTextNode = shadowNode.childNodes[key];
            if (shadowTextNode) {
              if (shadowTextNode.nodeType === Node.TEXT_NODE) {
                if (shadowTextNode.textContent !== child.textContent) {
                  shadowTextNode.textContent = child.textContent;
                }
              }
              else {
                // NOTE this case seems not to show up really thus not implement for now
                console.error('[ERROR] if this can be seen we must update (1)')
                console.log({ shadowTextNode, child, content: child.textContent })
              }
            }
            else {
              if (shadowNode.childNodes.length === 0) {
                shadowNode.textContent = child.textContent;
              }
              else {
                console.error('[ERROR] if this can be seen we must update (2)')
                console.log({ child, content: child.textContent, shadowNode })
              }
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
      if (!templateNode) {
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
  private getComposedPath(base: ShadowRoot | Element, target: Element) {
    const path = [];
    while (target !== base) {
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
    else if (node.hasAttribute("key")) selector.push(`[key="${node.getAttribute("key")}"]`);
    else if (node.hasAttribute("part")) selector.push(`[part="${node.getAttribute("part")}"]`);
    else if (node.className) selector.push("." + node.className.trim().replace(/ /g, "."));

    // NOTE there's a big problem with class selection when a class can dynamically arrive.. 

    if (selector.length === 1) {
      // need to get child index then ! 
      if (node.parentNode) {
        if (node.parentNode.children.length > 1) {
          let index = 0;
          for (let i = 0; i < node.parentNode.children.length; i++) {
            if (node.parentNode.children[i] === node) {
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
  private renderContent(content: RenderType, parent: ShadowRoot | Element) {
    if (["string", "number", "boolean"].includes(typeof content)) {
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
    else if (content instanceof DocumentFragment) {
      parent.appendChild(content);
    }
    else if (content instanceof Array) {
      content.forEach(child => this.renderContent(child, parent));
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pap-base": Base;
  }
}