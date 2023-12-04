"use strict";
(() => {
  // ../../system/utils/dist/src/functions/decorators.js
  function query(options) {
    const selector = typeof options === "string" ? options : options.selector;
    return function(target, propertyKey) {
      const renderattemptsKey = propertyKey + "rerender_attempts_";
      const timeoutattemptsKey = propertyKey + "timeout_attempts_";
      const originalConnectedCallback = target.connectedCallback || function() {
      };
      target.connectedCallback = function() {
        originalConnectedCallback.call(this);
        initsearch.call(this);
      };
      function initsearch() {
        if (!search.call(this)) {
          rendersearch.call(this);
        }
      }
      function rendersearch() {
        let attempts = this[renderattemptsKey] || 0;
        attempts++;
        if (!search.call(this) && attempts < 5) {
          this[timeoutattemptsKey] = 0;
          this[renderattemptsKey] = attempts;
          setTimeout(() => timeoutsearch.call(this), 100);
          if (this.callAfterUpdate)
            this.callAfterUpdate.push(() => rendersearch.call(this));
        }
      }
      function timeoutsearch() {
        let attempts = this[timeoutattemptsKey] || 0;
        attempts++;
        if (!search.call(this) && attempts < 3) {
          this[timeoutattemptsKey] = attempts;
          setTimeout(() => timeoutsearch.call(this), 100);
        }
      }
      function search() {
        if (this[propertyKey])
          return true;
        if (this.shadowRoot) {
          const element = this.shadowRoot.querySelector(selector);
          if (element) {
            this[propertyKey] = element;
            if (typeof options === "object" && options.onload) {
              if (this[options.onload]) {
                this[options.onload].call(this, element);
              }
            }
            return true;
          }
        }
        return false;
      }
    };
  }
  var DefaultOptions = {
    type: String,
    attribute: true,
    rerender: true,
    verbose: false
  };
  function property(options) {
    const _options = options === void 0 ? DefaultOptions : { ...DefaultOptions, ...options };
    return function(target, propertyKey) {
      const attributeName = (typeof _options.attribute === "string" ? _options.attribute : propertyKey).toLowerCase();
      let internal = false;
      const observedAttributes = target.constructor.observedAttributes || [];
      observedAttributes.push(attributeName);
      target.constructor.observedAttributes = observedAttributes;
      const attributeChanged = target.attributeChangedCallback || function() {
      };
      target.attributeChangedCallback = function(name, oldValue, newValue) {
        attributeChanged.call(this, name, oldValue, newValue);
        if (name === attributeName && !internal && newValue !== oldValue) {
          this[propertyKey] = convertFromString(newValue, _options.type);
        }
      };
      Object.defineProperty(target, propertyKey, {
        get() {
          const data = this[`_${propertyKey}`];
          return (options === null || options === void 0 ? void 0 : options.get) ? options.get(data) : data;
        },
        set(value) {
          const valuestring = convertToString(value, _options.type);
          const oldvaluestring = convertToString(this[`_${propertyKey}`], _options.type);
          if (oldvaluestring === valuestring) {
            return;
          }
          const old = this[`_${propertyKey}`];
          this[`_${propertyKey}`] = (options === null || options === void 0 ? void 0 : options.set) ? options.set(value) : value;
          const operation = () => {
            if (_options.attribute) {
              internal = true;
              this.setAttribute(attributeName, valuestring);
              internal = false;
            }
            if (_options.onUpdate) {
              this[_options.onUpdate + "_attempts"] = 0;
              tryupdate.call(this, _options.onUpdate, value, old, !!_options.verbose);
            }
            if (_options.rerender) {
              this.debouncedRequestUpdate();
            }
          };
          if (!this.connected) {
            this._pendingOperations.push(operation);
            return;
          }
          operation();
        }
      });
    };
  }
  async function tryupdate(update, value, old, verbose) {
    if (verbose) {
      console.log({
        message: "calling update",
        property: update,
        value: this[update],
        attempt: this[update + "_attempts"]
      });
    }
    let ans = 10;
    if (this[update]) {
      ans = await this[update](value, old);
    }
    if (typeof ans === "number") {
      if (this[update + "_attempts"] < ans) {
        this[update + "_attempts"]++;
        setTimeout(() => {
          tryupdate.call(this, update, value, old, verbose);
        }, 100);
      }
    }
  }
  function convertFromString(value, type) {
    switch (type.name) {
      case "Boolean":
        if (value === null)
          return false;
        return value === "" || value.toLowerCase() === "true" ? true : false;
      case "Number":
        return Number(value);
      case "Object":
      case "Array":
        if (value === null)
          return null;
        return JSON.parse(value);
      default:
        return type(value);
    }
  }
  function convertToString(value, type) {
    switch (type.name) {
      case "Object":
      case "Array":
        return JSON.stringify(value);
      default:
        return String(value);
    }
  }

  // ../../system/utils/dist/src/functions/helpers.js
  function debounce(execute, delay = 300) {
    let timer = null;
    return function(...args) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        execute.apply(this, args);
        timer = null;
      }, delay);
    };
  }
  function NextParent(element) {
    if (element.parentElement)
      return element.parentElement;
    const root = element.getRootNode();
    if (root)
      return root.host;
    return null;
  }
  function ExtractSlotValue(slot) {
    const nodes = slot.assignedNodes();
    const values = [];
    nodes.forEach((node) => appendLeafValue(node, values));
    return values;
  }
  function appendLeafValue(node, L) {
    if (node.hasChildNodes()) {
      node.childNodes.forEach((child) => appendLeafValue(child, L));
    } else if (node.textContent) {
      if (node.textContent.trim() === "")
        return;
      L.push(node.textContent);
    }
  }
  function FormatNumber(num) {
    if (Math.abs(num) < 1e3) {
      return num.toString();
    } else if (Math.abs(num) < 1e6) {
      return Math.round(num * 10 / 1e3) / 10 + "k";
    } else if (Math.abs(num) < 1e9) {
      return Math.round(num * 10 / 1e6) / 10 + "m";
    } else if (Math.abs(num) < 1e12) {
      return Math.round(num * 10 / 1e9) / 10 + "bn";
    } else {
      return Math.round(num * 10 / 1e12) / 10 + "tn";
    }
  }

  // ../../system/utils/dist/src/functions/html.js
  function findComments(element) {
    let arr = [];
    for (let i7 = 0; i7 < element.childNodes.length; i7++) {
      let node = element.childNodes[i7];
      if (node.nodeType === 8) {
        arr.push(node);
      } else {
        arr.push.apply(arr, findComments(node));
      }
    }
    return arr;
  }
  function insertElement(parent, comment, indexes, values) {
    if (indexes === null)
      return;
    let target = values;
    for (let i7 = 0; i7 < indexes.length; i7++) {
      const index = Number(indexes[i7]);
      target = target[index];
    }
    try {
      parent.insertBefore(target, comment);
    } catch (e4) {
      console.error(e4);
      console.log("what is going on here", parent);
    }
  }
  function html(strings, ...values) {
    let result = "";
    for (let i7 = 0; i7 < values.length; i7++) {
      if (values[i7] instanceof Array) {
        let arr = [];
        for (let j2 = 0; j2 < values[i7].length; j2++) {
          if (values[i7][j2] instanceof DocumentFragment) {
            arr.push(`<!-- comment-node-${i7}.${j2} -->`);
          }
        }
        if (arr.length > 0) {
          result += strings[i7] + arr.join(" ");
          continue;
        }
      }
      if (values[i7] instanceof DocumentFragment) {
        result += strings[i7] + `<!-- comment-node-${i7} -->`;
        continue;
      }
      const trimmed = strings[i7].trim();
      const match = trimmed.match(/.*\s(on|@)([\w-]*)=/);
      if (match) {
        const [_whole, eventtype, name] = match;
        const split = trimmed.split(eventtype + name);
        result += split[0] + ` @${name}="${i7}"`;
      } else {
        result += strings[i7] + values[i7];
      }
    }
    result += strings[values.length];
    const template = document.createElement("template");
    template.innerHTML = result.trim();
    const content = template.content;
    findComments(content).forEach((comment) => {
      var _a;
      const parent = comment.parentNode;
      if (parent) {
        const trimmedCommentName = (_a = comment.nodeValue) === null || _a === void 0 ? void 0 : _a.trim();
        if (trimmedCommentName === null || trimmedCommentName === void 0 ? void 0 : trimmedCommentName.startsWith("comment-node")) {
          if (comment.textContent) {
            const indexes = comment.textContent.match(/\d+/g);
            insertElement(parent, comment, indexes, values);
          }
        }
        parent.removeChild(comment);
      }
    });
    content.querySelectorAll("*").forEach((element) => {
      Array.from(element.attributes).forEach((attr) => {
        if (attr.name.startsWith("@")) {
          const eventName = attr.name.slice(1);
          const indexValue = Number(element.getAttribute(attr.name));
          element.removeAttribute(attr.name);
          element.addEventListener(eventName, values[indexValue]);
        }
      });
      element.removeAttribute('"');
    });
    return content;
  }

  // ../../../node_modules/tslib/tslib.es6.mjs
  function __decorate(decorators, target, key, desc) {
    var c6 = arguments.length, r9 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d8;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r9 = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i7 = decorators.length - 1; i7 >= 0; i7--)
        if (d8 = decorators[i7])
          r9 = (c6 < 3 ? d8(r9) : c6 > 3 ? d8(target, key, r9) : d8(target, key)) || r9;
    return c6 > 3 && r9 && Object.defineProperty(target, key, r9), r9;
  }

  // ../../system/base/dist/src/component.js
  var BaseSystem = class extends HTMLElement {
    // class functions
    constructor() {
      super();
      this.callAfterUpdate = [];
      this.render_mode = "smart";
      this.render_style_mode = "lazy";
      this._pendingOperations = [];
      this.connected = false;
      this.originalHTML = "";
      this.hasFocus = false;
      this.handleblur = () => {
        this.hasFocus = false;
      };
      this.handlefocus = () => {
        this.hasFocus = true;
      };
      this.originalHTML = this.outerHTML;
      this.addEventListener("blur", this.handleblur);
      this.addEventListener("focus", this.handlefocus);
      this.styleComperator = document.createElement("style");
      this.templateComperator = document.createElement("template");
      this.debouncedRequestUpdate = debounce(this.requestUpdate, 100);
      this.attachShadow({ mode: "open" });
      this.callAfterUpdate.push(this.firstUpdate);
    }
    connectedCallback() {
      this.connected = true;
      this.debouncedRequestUpdate();
      this.attributeObserver = new MutationObserver((mutationsList, observer) => {
        for (let mutation of mutationsList) {
          if (mutation.type === "attributes" && mutation.attributeName) {
            this.attributeChangedCallback(mutation.attributeName, mutation.oldValue, this.getAttribute(mutation.attributeName));
          }
        }
      });
      this.attributeObserver.observe(this, { attributes: true });
      this._pendingOperations.forEach((o6) => o6());
      this._pendingOperations = [];
    }
    disconnectedCallback() {
      this.connected = false;
      this.attributeObserver.disconnect();
    }
    attributeChangedCallback(name, oldValue, newValue) {
    }
    getStyle() {
      var _a;
      const childConstructor = this.constructor;
      const styles = [
        ...(_a = childConstructor.styles) !== null && _a !== void 0 ? _a : [],
        ...typeof childConstructor.style === "string" ? [childConstructor.style] : []
      ];
      return styles.join(" ");
    }
    querySelector(selector) {
      if (this.shadowRoot)
        return this.shadowRoot.querySelector(selector);
      return null;
    }
    shadow_closest(selector) {
      let parent = NextParent(this);
      while (parent) {
        const closest = parent.closest(selector);
        if (closest)
          return closest;
        const target = parent.querySelector(selector);
        if (target)
          return target;
        if (parent === document.documentElement)
          break;
        parent = NextParent(parent);
      }
    }
    requestUpdate() {
      if (!this.shadowRoot) {
        return;
      }
      const initalrender = this.shadowRoot.innerHTML === "";
      this.renderStyle();
      const content = this.render();
      if (initalrender || this.render_mode === "greedy") {
        this.flushHTML(this.shadowRoot);
        this.renderContent(content, this.shadowRoot);
      } else {
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
    debouncedRequestUpdate() {
    }
    firstUpdate() {
    }
    render(child) {
      return "Hello From Base Class";
    }
    // helper functions 
    flushHTML(node) {
      node.childNodes.forEach((child) => {
        if (child.nodeName !== "STYLE") {
          node.removeChild(child);
        }
      });
    }
    renderStyle() {
      if (!this.shadowRoot)
        return;
      let targetElement = this.shadowRoot.querySelector("style");
      if (!targetElement) {
        targetElement = document.createElement("style");
        targetElement.innerHTML = this.getStyle();
        this.shadowRoot.appendChild(targetElement);
        return;
      }
      if (this.render_style_mode === "lazy")
        return;
      this.styleComperator.innerHTML = this.getStyle();
      if (this.styleComperator.innerHTML !== targetElement.innerHTML) {
        targetElement.innerHTML = this.styleComperator.innerHTML;
      }
    }
    renderHTML(content) {
      if (!this.shadowRoot)
        return;
      while (this.templateComperator.firstChild) {
        this.templateComperator.removeChild(this.templateComperator.firstChild);
      }
      this.templateComperator.appendChild(this.styleComperator);
      this.renderContent(content, this.templateComperator);
      const clone = this.templateComperator.cloneNode(true);
      clone.querySelectorAll("*:not(style)").forEach((node) => {
        const path = this.getComposedPath(clone, node);
        const shadowNode = this.querySelector(path.join(" > "));
        if (!shadowNode) {
          let shadowtarget = this.shadowRoot;
          let target = node;
          for (let i7 = path.length - 1; i7 >= 0; i7--) {
            const _shadownode = this.querySelector(path.slice(0, i7).join(" > "));
            if (_shadownode) {
              shadowtarget = _shadownode;
              break;
            } else {
              target = node.parentElement;
            }
          }
          if (target) {
            shadowtarget === null || shadowtarget === void 0 ? void 0 : shadowtarget.appendChild(target);
          } else {
            console.error("[ERROR] this case should not happen");
            console.log({ shadowtarget, node, target, path });
          }
        } else {
          for (let i7 = 0; i7 < node.attributes.length; i7++) {
            const name = node.attributes[i7].name;
            const value = node.attributes[i7].value;
            const shadowValue = shadowNode.getAttribute(name);
            if (shadowValue !== value)
              shadowNode.setAttribute(name, value);
          }
          node.childNodes.forEach((child, key) => {
            var _a;
            if (child.nodeType === Node.TEXT_NODE) {
              if (((_a = child.textContent) === null || _a === void 0 ? void 0 : _a.trim()) === "")
                return;
              const shadowTextNode = shadowNode.childNodes[key];
              if (shadowTextNode) {
                if (shadowTextNode.nodeType === Node.TEXT_NODE) {
                  if (shadowTextNode.textContent !== child.textContent) {
                    shadowTextNode.textContent = child.textContent;
                  }
                } else {
                  console.error("[ERROR] if this can be seen we must update (1)");
                  console.log({ shadowTextNode, child, content: child.textContent });
                }
              } else {
                console.error("[ERROR] if this can be seen we must update (2)");
                console.log({ child, content: child.textContent });
              }
            }
          });
        }
      });
      this.shadowRoot.querySelectorAll("*:not(style)").forEach((node) => {
        if (!node.parentNode)
          return;
        const path = this.getComposedPath(this.shadowRoot, node);
        const templateNode = this.templateComperator.querySelector(path.join(" > "));
        if (!templateNode) {
          node.parentNode.removeChild(node);
        }
      });
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
    getComposedPath(base, target) {
      const path = [];
      while (target !== base) {
        path.push(this.getSelector(target));
        let nexttarget = target.parentElement;
        if (nexttarget)
          target = nexttarget;
        else
          break;
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
    getSelector(node) {
      const selector = [node.tagName];
      if (node.id)
        selector.push("#" + node.id);
      if (node.className)
        selector.push("." + node.className.replace(/ /g, "."));
      if (node.hasAttribute("key"))
        selector.push(`[key="${node.getAttribute("key")}"]`);
      if (selector.length === 1) {
        if (node.parentNode) {
          if (node.parentNode.children.length > 1) {
            let index = 0;
            for (let i7 = 0; i7 < node.parentNode.children.length; i7++) {
              if (node.parentNode.children[i7] === node) {
                index = i7;
                break;
              }
            }
            selector.push(`:nth-child(${index + 1})`);
          }
        }
      }
      return selector.join("");
    }
    renderContent(content, parent) {
      if (["string", "number", "boolean"].includes(typeof content)) {
        const strcontent = content.toString();
        if (/</.test(strcontent) && />/.test(strcontent)) {
          parent.innerHTML = parent.innerHTML + strcontent;
        } else {
          const textNode = document.createTextNode(strcontent);
          parent.appendChild(textNode);
        }
      } else if (content instanceof DocumentFragment) {
        parent.appendChild(content);
      } else if (content instanceof Array) {
        content.forEach((child) => this.renderContent(child, parent));
      }
    }
  };
  __decorate([
    property({ rerender: false, type: Boolean })
  ], BaseSystem.prototype, "hasFocus", void 0);

  // ../../system/doc/dist/src/components/Card/style.js
  var style = `:host {
  display: inline-block;
  background-color: var(--pap-color-bg, #FFFFFF);
  color: var(--pap-color-text, #29292F);
  width: 100%;
  padding: var(--padding-large, 24px);
  box-sizing: border-box;
  border-radius: var(--radius-medium, 8px);
  margin-bottom: var(--margin-medium, 16px); }`;

  // ../../system/doc/dist/src/components/Card/index.js
  var Card = class extends BaseSystem {
    render() {
      return html`
            <slot name="header"></slot>
            <slot></slot>
        `;
    }
  };
  Card.style = style;

  // ../../system/doc/dist/src/components/Controller/style.js
  var style2 = `:host {
  display: block;
  height: 100%;
  position: relative;
  overflow: hidden;
  --background: var(--controller-background-light, var(--pap-color-canvas-100));
  --color: var(--controller-color-light, var(--pap-color-black));
  --border: var(--controller-border-light, var(--pap-color-canvas-600));
  color: var(--color); }

@media (prefers-color-scheme: dark) {
  :host {
    --background: var(--controller-background-dark, var(--pap-color-canvas-100));
    --color: var(--controller-color-dark, var(--pap-color-black));
    --border: var(--controller-border-dark, var(--pap-color-canvas-600)); } }

main {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 2rem);
  height: 100%;
  padding: 1rem; }
  main doc-card {
    display: flex;
    justify-content: center;
    min-height: 10rem;
    align-items: center; }

section {
  background-color: var(--background);
  width: 100%;
  position: absolute;
  bottom: 0;
  min-height: 5rem;
  max-height: calc(100vh - 10rem);
  border-top: 4px solid var(--border);
  overflow-y: auto;
  height: 50%;
  padding-bottom: 80px; }
  section span.resize {
    position: sticky;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 1rem;
    content: '';
    cursor: row-resize; }
  section:has(span.resize:hover) {
    border-top-color: cornflowerblue; }`;

  // ../../system/doc/dist/src/components/Controller/index.js
  var Controller = class extends BaseSystem {
    constructor() {
      super(...arguments);
      this.pressed = false;
      this.original_y = 0;
      this.original_height = 0;
      this.handlemousedown = (e4) => {
        if (e4 instanceof MouseEvent) {
          const box = this.section.getBoundingClientRect();
          this.original_y = e4.pageY;
          this.original_height = box.height - 80;
          this.pressed = true;
          this.handlemousemove(e4);
        }
      };
      this.handlemouseup = (e4) => {
        if (this.pressed) {
          this.handlemousemove(e4);
          this.pressed = false;
        }
      };
      this.handlemousemove = (e4) => {
        if (this.pressed) {
          const y6 = this.original_y - e4.pageY;
          this.section.style.height = this.original_height + y6 + "px";
        }
      };
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      window.removeEventListener("mousemove", this.handlemousemove);
      window.removeEventListener("mouseup", this.handlemouseup);
    }
    firstUpdate() {
      if (this.shadowRoot) {
        const span = this.shadowRoot.querySelector("span.resize");
        if (span) {
          span.addEventListener("mousedown", this.handlemousedown);
          window.addEventListener("mousemove", this.handlemousemove);
          window.addEventListener("mouseup", this.handlemouseup);
        }
        const section = this.shadowRoot.querySelector("section");
        if (section) {
          this.section = section;
        }
      }
    }
    render() {
      return html`
      <main>
        <doc-card>
          <slot></slot>
        </doc-card>
      </main>
      <section>
        <span class="resize"></span>
        <slot name="setting"></slot>
      </section>
    `;
    }
  };
  Controller.style = style2;

  // ../../system/doc/dist/src/components/ColorPicker/style.js
  var style3 = `:host {
  --size: var(--colorpicker-size, 300px);
  --border-outer: var(--pap-color-black);
  --border-inner: var(--pap-color-neutral-50);
  width: calc(var(--size) + 2.5rem);
  height: calc(var(--size) + 2.5rem);
  display: grid;
  grid-template-columns: var(--size) 2rem;
  grid-template-rows: var(--size) 2rem;
  grid-template-areas: "area slide" "output output";
  column-gap: 0.5rem;
  row-gap: 0.5rem; }

div {
  grid-area: area; }

div + div {
  grid-area: slide; }

div + div + div {
  grid-area: output;
  background-color: var(--output-color, red); }

div {
  position: relative; }
  div.area {
    height: 100%;
    content: '';
    background: linear-gradient(to right, white, var(--target-color, red)), linear-gradient(to top, black, transparent);
    background-blend-mode: multiply; }
    div.area span.picker {
      content: '';
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 1px solid var(--border-inner);
      outline: 1px solid var(--border-outer);
      position: absolute;
      top: 0;
      left: 100%;
      transform: translate(-50%, -50%); }
  div input[type="range"] {
    height: 2rem;
    width: var(--size);
    background: linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red);
    -webkit-appearance: none;
    /* Override default CSS styles */
    appearance: none;
    transform-origin: center;
    transform: translate(calc(-50% + 1rem), -50%) rotate(90deg);
    margin: 0;
    top: 50%;
    left: 0;
    position: absolute; }
    div input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      /* Override default look */
      appearance: none;
      width: 10px;
      /* Set a specific slider handle width */
      height: 2rem;
      /* Slider handle height */
      background: transparent;
      /* Green background */
      border: 1px solid var(--border-inner);
      outline: 1px solid var(--border-outer);
      cursor: pointer;
      /* Cursor on hover */ }
    div input[type="range"]::-moz-range-thumb {
      width: 10px;
      /* Set a specific slider handle width */
      height: 2rem;
      /* Slider handle height */
      background: transparent;
      /* Green background */
      border: 1px solid var(--border-inner);
      outline: 1px solid var(--border-outer);
      cursor: pointer;
      /* Cursor on hover */ }`;

  // ../../system/doc/dist/src/components/ColorPicker/index.js
  var ColorPicker = class extends BaseSystem {
    constructor() {
      super(...arguments);
      this.pressed = false;
      this.hue = 0;
      this.saturation = 100;
      this.lightness = 50;
      this.handleinput = (e4) => {
        if (e4.target instanceof HTMLInputElement) {
          this.hue = Number(e4.target.value);
          this._setColor();
        }
      };
      this.handlemousedown = (e4) => {
        this.pressed = true;
        this.areabox = this.areaElement.getBoundingClientRect();
        this.handlemousemove(e4);
      };
      this.handlemousemove = (e4) => {
        if (this.pressed && e4.target === this.areaElement) {
          let x5 = e4.offsetX;
          let y6 = e4.offsetY;
          if (x5 < 0)
            x5 = 0;
          if (y6 < 0)
            y6 = 0;
          if (x5 > this.areabox.width)
            x5 = this.areabox.width;
          if (y6 > this.areabox.height)
            y6 = this.areabox.height;
          this.pickerElement.style.left = x5 + "px";
          this.pickerElement.style.top = y6 + "px";
          this.saturation = x5 / this.areabox.width * 100;
          this.lightness = (1 - y6 / this.areabox.height) * (100 - this.saturation * 0.5);
          this._setColor();
        }
      };
      this.handlemouseup = (e4) => {
        if (this.pressed) {
          this.handlemousemove(e4);
          this.pressed = false;
        }
      };
    }
    _setColor(manual) {
      this.style.setProperty("--target-color", `hsl(${this.hue}, 100%, 50%)`);
      const hslcolor = this.getColor();
      this.style.setProperty("--output-color", hslcolor);
      if (!manual) {
        this.dispatchEvent(new CustomEvent("change", {
          detail: {
            value: hslcolor
          }
        }));
      }
    }
    // in the Color format 0-1
    setColor(hsl) {
      this.hue = 359 * hsl[0];
      this.saturation = 100 * hsl[1];
      this.lightness = 100 * hsl[2];
      if (this.areaElement && !this.areabox) {
        this.areabox = this.areaElement.getBoundingClientRect();
      }
      if (this.areabox) {
        const x5 = hsl[1] * this.areabox.width;
        const y6 = Math.max(0, Math.min(this.areabox.height, (this.lightness / (100 - this.saturation * 0.5) - 1) * -this.areabox.height));
        this.pickerElement.style.left = x5 + "px";
        this.pickerElement.style.top = y6 + "px";
      }
      if (this.sliderElement) {
        this.sliderElement.value = this.hue.toString();
      }
      this._setColor(true);
    }
    getColor() {
      return `hsl(${Math.round(this.hue)}, ${Math.round(this.saturation)}%, ${Math.round(this.lightness)}%)`;
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      window.removeEventListener("mouseup", this.handlemouseup);
    }
    firstUpdate() {
      super.firstUpdate();
      if (this.shadowRoot) {
        const area = this.shadowRoot.querySelector("div.area");
        if (area) {
          this.areaElement = area;
          area.addEventListener("mousedown", this.handlemousedown);
          area.addEventListener("mousemove", this.handlemousemove);
          window.addEventListener("mouseup", this.handlemouseup);
        }
        const slider = this.shadowRoot.querySelector("input");
        if (slider) {
          this.sliderElement = slider;
        }
        const pickerElement = this.shadowRoot.querySelector("div.area > span.picker");
        if (pickerElement) {
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
        `;
    }
  };
  ColorPicker.style = style3;

  // ../popover/dist/register.bundle.mjs
  var c = Object.defineProperty;
  var m = Object.getOwnPropertyDescriptor;
  var r = (n4, a5, o6, p8) => {
    for (var t6 = p8 > 1 ? void 0 : p8 ? m(a5, o6) : a5, s3 = n4.length - 1, l9; s3 >= 0; s3--)
      (l9 = n4[s3]) && (t6 = (p8 ? l9(a5, o6, t6) : l9(t6)) || t6);
    return p8 && t6 && c(a5, o6, t6), t6;
  };
  var h = `:host {
  position: relative;
  display: block;
  height: fit-content;
  --gap: var(--popover-gap, 1rem); }
  :host div.wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000; }

:host([open="true"]) div.wrapper {
  display: block; }

:host([open="false"]) div.wrapper {
  display: none; }

:host([placement="top-right"]) div.wrapper {
  padding-bottom: var(--gap);
  transform: translateY(-100%); }

:host([placement="top-center"]) div.wrapper {
  padding-bottom: var(--gap);
  left: 50%;
  transform: translate(-50%, -100%); }

:host([placement="top-left"]) div.wrapper {
  padding-bottom: var(--gap);
  left: 100%;
  transform: translate(-100%, -100%); }

:host([placement="bottom-right"]) div.wrapper {
  padding-top: var(--gap);
  top: 100%; }

:host([placement="bottom-center"]) div.wrapper {
  padding-top: var(--gap);
  top: 100%;
  left: 50%;
  transform: translateX(-50%); }

:host([placement="bottom-left"]) div.wrapper {
  padding-top: var(--gap);
  top: 100%;
  left: 100%;
  transform: translateX(-100%); }

:host([placement="left-top"]) div.wrapper {
  padding-right: var(--gap);
  transform: translateX(-100%); }

:host([placement="left-center"]) div.wrapper {
  padding-right: var(--gap);
  top: 50%;
  transform: translate(-100%, -50%); }

:host([placement="left-bottom"]) div.wrapper {
  padding-right: var(--gap);
  top: 100%;
  transform: translate(-100%, -100%); }

:host([placement="right-top"]) div.wrapper {
  padding-left: var(--gap);
  left: 100%; }

:host([placement="right-center"]) div.wrapper {
  padding-left: var(--gap);
  left: 100%;
  top: 50%;
  transform: translateY(-50%); }

:host([placement="right-bottom"]) div.wrapper {
  padding-left: var(--gap);
  left: 100%;
  top: 100%;
  transform: translateY(-100%); }`;
  var e = class extends BaseSystem {
    constructor() {
      super();
      this.revealby = "hover";
      this.placement = "bottom-center";
      this.hideonoutsideclick = true;
      this.open = false;
      this.outside = false;
      this.handlemouseenter = () => {
        this.outside = false, this.revealby === "hover" && this.show();
      };
      this.handlemouseleave = () => {
        this.outside = true, this.revealby === "hover" && this.hide();
      };
      this.handlemousedown = () => {
        this.revealby === "click" && this.show();
      };
      this.handlewindowclick = (o6) => {
        this.hideonoutsideclick && this.outside && this.revealby === "click" && this.hide();
      };
      this.addEventListener("mouseenter", this.handlemouseenter), this.addEventListener("mouseleave", this.handlemouseleave);
    }
    connectedCallback() {
      super.connectedCallback(), window.addEventListener("click", this.handlewindowclick);
    }
    disconnectedCallback() {
      super.disconnectedCallback(), window.removeEventListener("click", this.handlewindowclick);
    }
    show() {
      this.dispatchEvent(new Event("show")), this.open = true;
    }
    hide() {
      this.dispatchEvent(new Event("hide")), this.open = false;
    }
    render() {
      return html`
      <div 
        class="target" 
        part="target"
        @mousedown="${this.handlemousedown}"
      >
        <slot name="target"></slot>
      </div>
      <div class="wrapper" part="wrapper">
        <slot></slot>
      </div>
    `;
    }
  };
  e.styles = [h], r([property()], e.prototype, "revealby", 2), r([property()], e.prototype, "placement", 2), r([property({ type: Boolean })], e.prototype, "hideonoutsideclick", 2), r([property({ type: Boolean })], e.prototype, "open", 2);
  var d = customElements != null ? customElements : window == null ? void 0 : window.customElements;
  if (!d)
    throw new Error("Custom Elements not supported");
  d.get("pap-popover-template") || d.define("pap-popover-template", e);

  // ../color/dist/src/Color.js
  var Color = class {
    static init() {
      if (Color.canvasContext)
        return;
      Color.spectrumMap = /* @__PURE__ */ new Map();
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (context) {
        Color.canvasContext = context;
      } else {
        throw new Error("Could not create ContextAPI from canvas element");
      }
      Color.initspectrum();
    }
    static extractRootColors() {
      let rootvariables = [];
      const styleSheets = document.styleSheets;
      for (let i7 = 0; i7 < styleSheets.length; i7++) {
        const cssRules = styleSheets[i7].cssRules || styleSheets[i7].rules;
        for (let j2 = 0; j2 < cssRules.length; j2++) {
          const rule = cssRules[j2];
          if (rule.selectorText === ":root") {
            let start = 7;
            if (rule.cssText[5] === "{")
              start = 6;
            let trimmed = rule.cssText.slice(start, rule.cssText.length - 1).replace(/ /g, "");
            rootvariables = rootvariables.concat(trimmed.split(";"));
          }
        }
      }
      const sideColors = [];
      const rootColors = [];
      rootvariables.forEach((variable) => {
        if (variable.startsWith("--color")) {
          const [full, value] = variable.split(":");
          let name = full.split("--color")[1];
          if (name[0] === "-")
            name = name.slice(1, name.length);
          if (/\d$/.test(full)) {
            const number = name.match(/\d+/g);
            const newname = name.split(/-?\d+/);
            if (number && (number === null || number === void 0 ? void 0 : number.length) > 0 && newname.length > 0) {
              sideColors.push({ value, name: newname[0], number: number[0] });
            }
          } else {
            rootColors.push({ full, value, name });
          }
        }
      });
      return { colors: rootColors, sideColors };
    }
    static extractStyleColors() {
      let { colors, sideColors } = Color.extractRootColors();
      const root = document.documentElement;
      const styles = root.style;
      Object.values(styles).forEach((variable) => {
        if (variable.startsWith("--color")) {
          let name = variable.split("--color")[1];
          if (name[0] === "-")
            name = name.slice(1, name.length);
          const value = root.style.getPropertyValue(variable);
          if (/\d$/.test(variable)) {
            const number = name.match(/\d+/g);
            const newname = name.split(/-?\d+/);
            if (number && (number === null || number === void 0 ? void 0 : number.length) > 0 && newname.length > 0) {
              sideColors.push({ value, name: newname[0], number: number[0] });
            }
          } else {
            colors.push({ full: variable, name, value });
          }
        }
      });
      const changedSideColors = /* @__PURE__ */ new Set();
      const remainingSideColors = Array.from(Color.sideColors.keys());
      sideColors.forEach((color) => {
        const name = color.name + color.number;
        const prev = Color.sideColors.get(name);
        const index = remainingSideColors.findIndex((rname) => rname === name);
        if (index >= 0)
          remainingSideColors.splice(index, 1);
        if (!prev || prev.css !== color.value) {
          const rgb = Color.cssToRGB(color.value);
          const [h8, s3, l9] = Color.rgbToHSL(rgb[0], rgb[1], rgb[2]);
          const data = {
            css: color.value,
            h: h8,
            s: s3,
            l: l9
          };
          Color.sideColors.set(name, data);
          changedSideColors.add(color.name);
        }
      });
      remainingSideColors.forEach((name) => {
        Color.sideColors.delete(name);
        changedSideColors.add(name.split(/-?\d+/)[0]);
      });
      colors.forEach((color) => {
        const prev = Color.get(color.name);
        if (changedSideColors.has(color.name) || !prev || prev && prev.original !== color.value) {
          const spectrum = Color.spectrum(color.value, color.name, true);
          Color.set(color.name, {
            name: color.name,
            original: color.value,
            spectrum
          });
        }
      });
    }
    static initspectrum() {
      if (Color.observer)
        return;
      const root = document.documentElement;
      const handleChanges = (mutationsList, observer) => {
        for (const mutation of mutationsList) {
          if (mutation.type === "attributes" && mutation.attributeName === "style") {
            Color.extractStyleColors();
          }
        }
      };
      Color.observer = new MutationObserver(handleChanges);
      Color.observer.observe(root, {
        attributes: true,
        attributeFilter: ["style"]
      });
      Color.extractStyleColors();
    }
    static dispatch(colorname, spectrum) {
      const listeners = Color.listeners.get(colorname) || [];
      listeners.forEach((cb) => cb(spectrum));
    }
    static checkSideColor(name, number, data) {
      if (name) {
        const color = Color.sideColors.get(name + number);
        if (color) {
          data[number] = color;
          return true;
        }
      }
      return false;
    }
    static register(colorname, callback) {
      const currentlisteners = Color.listeners.get(colorname) || [];
      currentlisteners.push(callback);
      Color.listeners.set(colorname, currentlisteners);
    }
    static unregister(colorname, callback) {
      const currentlisteners = (Color.listeners.get(colorname) || []).filter((cb) => cb !== callback);
      Color.listeners.set(colorname, currentlisteners);
    }
    static isName(csscolor) {
      return Color.spectrumMap.has(csscolor);
    }
    static get(name) {
      return Color.spectrumMap.get(name);
    }
    static set(name, value) {
      Color.spectrumMap.set(name, value);
      Color.dispatch(name, value);
    }
    static cssToRGB(cssColor) {
      Color.canvasContext.fillStyle = cssColor;
      const computedColor = Color.canvasContext.fillStyle;
      if (computedColor.startsWith("#")) {
        const hex = computedColor.substring(1);
        const r9 = parseInt(hex.slice(0, 2), 16);
        const g6 = parseInt(hex.slice(2, 4), 16);
        const b4 = parseInt(hex.slice(4, 6), 16);
        return [r9, g6, b4];
      }
      return computedColor.replace(/rgba?\(|\)|\s/g, "").split(",").map((str) => Number(str));
    }
    static rgbToHSL(r9, g6, b4) {
      r9 /= 255, g6 /= 255, b4 /= 255;
      const max = Math.max(r9, g6, b4), min = Math.min(r9, g6, b4);
      let h8, s3, l9 = (max + min) / 2;
      if (max === min) {
        h8 = s3 = 0;
      } else {
        const d8 = max - min;
        s3 = l9 > 0.5 ? d8 / (2 - max - min) : d8 / (max + min);
        switch (max) {
          case r9:
            h8 = (g6 - b4) / d8 + (g6 < b4 ? 6 : 0);
            break;
          case g6:
            h8 = (b4 - r9) / d8 + 2;
            break;
          case b4:
          default:
            h8 = (r9 - g6) / d8 + 4;
            break;
        }
        h8 /= 6;
      }
      return [h8, s3, l9];
    }
    static hslToRgb(h8, s3, l9) {
      let r9, g6, b4;
      if (s3 === 0) {
        r9 = g6 = b4 = l9;
      } else {
        const hue2rgb = (p9, q2, t6) => {
          if (t6 < 0)
            t6 += 1;
          if (t6 > 1)
            t6 -= 1;
          if (t6 < 1 / 6)
            return p9 + (q2 - p9) * 6 * t6;
          if (t6 < 1 / 2)
            return q2;
          if (t6 < 2 / 3)
            return p9 + (q2 - p9) * (2 / 3 - t6) * 6;
          return p9;
        };
        const q = l9 < 0.5 ? l9 * (1 + s3) : l9 + s3 - l9 * s3;
        const p8 = 2 * l9 - q;
        r9 = hue2rgb(p8, q, h8 + 1 / 3);
        g6 = hue2rgb(p8, q, h8);
        b4 = hue2rgb(p8, q, h8 - 1 / 3);
      }
      return [Math.round(r9 * 255), Math.round(g6 * 255), Math.round(b4 * 255)];
    }
    static spectrum(css, name, force = false) {
      Color.init();
      const pre = Color.get(css);
      if (pre && !force)
        return pre.spectrum;
      const rgb = Color.cssToRGB(css);
      const [h8, s3, l9] = Color.rgbToHSL(rgb[0], rgb[1], rgb[2]);
      const lum_step = Math.min(l9, 1 - l9) / 5;
      const data = {};
      for (let i7 = -4; i7 <= 4; i7++) {
        const number = (9 - (i7 + 4)) * 100;
        if (Color.checkSideColor(name, number, data)) {
          continue;
        }
        const newl = Math.min(Math.max(l9 + lum_step * i7, 0), 1);
        data[number] = {
          h: h8,
          s: s3,
          l: newl,
          css: `hsl(${h8 * 360}, ${s3 * 100}%, ${newl * 100}%)`
        };
      }
      const complimentaryHue = (h8 + 0.5) % 1;
      if (!Color.checkSideColor(name, 2e3, data)) {
        data[2e3] = {
          h: complimentaryHue,
          s: s3,
          l: l9,
          css: `hsl(${complimentaryHue * 360}, ${s3 * 100}%, ${l9 * 100}%)`
        };
      }
      if (!Color.checkSideColor(name, 2e3, data)) {
        data["3000"] = {
          h: h8,
          s: 0.05,
          l: 0.97,
          css: `hsl(${h8 * 360}, 5%, 97%)`
        };
      }
      if (!Color.checkSideColor(name, 2e3, data)) {
        data["3100"] = {
          h: h8,
          s: 0.05,
          l: 0.4,
          css: `hsl(${h8 * 360}, 5%, 40%)`
        };
      }
      const sat_step = s3 / 6;
      for (let i7 = 0; i7 < 5; i7++) {
        const number = (11 + i7) * 100;
        if (Color.checkSideColor(name, number, data)) {
          continue;
        }
        const news = Math.min(Math.max(l9 - sat_step * i7, 0), 1);
        data[(11 + i7) * 100] = {
          h: h8,
          s: news,
          l: l9,
          css: `hsl(${h8 * 360}, ${news * 100}%, ${l9 * 100}%)`
        };
      }
      return data;
    }
  };
  Color.spectrumMap = /* @__PURE__ */ new Map();
  Color.listeners = /* @__PURE__ */ new Map();
  Color.sideColors = /* @__PURE__ */ new Map();
  window.addEventListener("load", () => Color.init());

  // ../color/dist/src/component.js
  var ColorTemplate = class extends BaseSystem {
    constructor() {
      super(...arguments);
      this.setColors = () => {
        if (!this.color)
          return;
        const spectrum = Color.spectrum(this.color);
        Object.entries(spectrum).forEach(([key, value]) => {
          this.style.setProperty(`--color${key}`, value.css);
          this.style.setProperty(`--text-color${key}`, value.l > 0.6 ? "black" : "white");
        });
      };
    }
    onColorUpdate(color, prev) {
      if (typeof prev === "string") {
        if (Color.isName(prev)) {
          Color.unregister(prev, this.setColors);
        }
      }
      if (Color.isName(color)) {
        Color.register(color, this.setColors);
      }
      this.setColors();
    }
  };
  __decorate([
    property({
      onUpdate: "onColorUpdate",
      rerender: false
    })
  ], ColorTemplate.prototype, "color", void 0);

  // ../../system/doc/dist/src/components/ColorPickerInput/style.js
  var style4 = `:host {
  display: block;
  font-family: inherit;
  --border-outer: #000;
  --border-inner: #fff; }

@media (prefers-color-scheme: dark) {
  :host {
    --border-outer: #fff;
    --border-inner: #000; } }

doc-input::part(input) {
  padding-left: 1.8rem; }

doc-input::part(span-wrapper) {
  position: relative; }
  doc-input::part(span-wrapper):before {
    content: '';
    top: 50%;
    left: 1rem;
    width: 1.1rem;
    height: 1.1rem;
    position: absolute;
    transform: translate(-50%, -50%);
    background-color: var(--display-color, red);
    border: 1px solid var(--border-inner);
    outline: 1px solid var(--border-outer); }`;

  // ../../system/doc/dist/src/components/ColorPickerInput/index.js
  function toHEX(value) {
    const h8 = value.toString(16);
    if (h8.length === 1)
      return `0${h8}`;
    return h8;
  }
  var ColorPickerInput = class extends BaseSystem {
    // class functions 
    constructor() {
      super();
      this.manual = false;
      this.name = "Color";
      this.label = "";
      this.value = "red";
      this.handleinputchange = (e4) => {
        const value = e4.detail.value;
        if (!this.manual) {
          const [r9, g6, b4] = Color.cssToRGB(value);
          const hsl = Color.rgbToHSL(r9, g6, b4);
          if (this.colorpicker_element) {
            this.colorpicker_element.setColor(hsl);
          }
          this.style.setProperty("--display-color", e4.detail.value);
          this.debouncedChange(e4.detail.value);
        }
        this.manual = false;
      };
      this.handlecolorchange = (e4) => {
        const [r9, g6, b4] = Color.cssToRGB(e4.detail.value);
        const hex = `#${toHEX(r9)}${toHEX(g6)}${toHEX(b4)}`;
        if (this.input_element) {
          this.manual = true;
          this.input_element.value = hex;
        }
        this.style.setProperty("--display-color", hex);
        this.debouncedChange(hex);
      };
      this.debouncedChange = debounce(this.debouncedChange, 250);
    }
    firstUpdate() {
      super.firstUpdate();
      if (this.shadowRoot && !this.colorpicker_element) {
        const picker = this.shadowRoot.querySelector("color-picker");
        if (picker) {
          this.colorpicker_element = picker;
        }
        const input = this.shadowRoot.querySelector("doc-input");
        if (input) {
          this.input_element = input;
        }
      }
      if (this.colorpicker_element && this.input_element) {
        this.onvalueupdate();
      }
    }
    // update functions
    onvalueupdate() {
      if (this.colorpicker_element) {
        this.setColor(this.value);
      }
    }
    // private functions
    debouncedChange(value) {
      this.dispatchEvent(new CustomEvent("change", { detail: { value } }));
    }
    setColor(value) {
      Color.init();
      try {
        const [r9, g6, b4] = Color.cssToRGB(value);
        const hsl = Color.rgbToHSL(r9, g6, b4);
        this.colorpicker_element.setColor(hsl);
      } catch (_a) {
        throw new Error("invalid color");
      }
    }
    render() {
      return html`
      <pap-popover-template 
        hideonoutsideclick="true"
        revealby="click" 
        placement="bottom-right"
      >
        <doc-input slot="target" value="${this.value}" @change=${this.handleinputchange} label="${this.label}" placeholder="Choose a color"></doc-input>
        <color-picker @change=${this.handlecolorchange}></color-picker>
      </pap-popover-template>
    `;
    }
  };
  ColorPickerInput.style = style4;
  __decorate([
    property()
  ], ColorPickerInput.prototype, "name", void 0);
  __decorate([
    property()
  ], ColorPickerInput.prototype, "label", void 0);
  __decorate([
    property({ onUpdate: "onvalueupdate" })
  ], ColorPickerInput.prototype, "value", void 0);

  // ../../system/doc/dist/src/components/Input/style.js
  var style5 = `:host {
  --background: var(--pap-color-neutral-50);
  --color: var(--pap-color-text, #29292F);
  font-family: inherit;
  font-size: 12pt;
  display: block; }

label, input, textarea, select {
  color: var(--color);
  display: block;
  width: 100%;
  box-sizing: border-box; }

input, textarea, select {
  padding: 0.5rem;
  font-size: inherit;
  font-family: inherit;
  background-color: var(--background);
  border: 1px solid var(--color);
  border-radius: 4px; }

textarea {
  max-height: 10rem; }`;

  // ../../system/doc/dist/src/components/Input/index.js
  var Input = class extends BaseSystem {
    constructor() {
      super();
      this.calls = 0;
      this.label = "";
      this.placeholder = "";
      this.value = "";
      this.name = "";
      this.variant = "input";
      this.options = [];
      this.handleselect = (e4) => {
        if (e4.target instanceof HTMLSelectElement) {
          this.dispatchEvent(new CustomEvent("change", { detail: { value: e4.target.value } }));
        }
      };
      this.handleinput = (e4) => {
        if (e4.target instanceof HTMLInputElement || e4.target instanceof HTMLTextAreaElement) {
          this.debouncedInput(e4.target.value);
        }
      };
      this.debouncedInput = debounce(this.debouncedInput, 250);
    }
    // updates
    updatevalue() {
      if (this.inputElement) {
        this.inputElement.value = this.value;
        if (this.variant === "select")
          this.inputElement.dispatchEvent(new Event("change"));
        else
          this.inputElement.dispatchEvent(new Event("input"));
      }
    }
    // private functions
    debouncedInput(value) {
      this.dispatchEvent(new CustomEvent("change", { detail: { value } }));
    }
    firstUpdate() {
      var _a;
      const element = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector("#input");
      if (element) {
        this.inputElement = element;
        this.updatevalue();
      }
    }
    render() {
      let content = null;
      if (this.variant === "select" || this.options.length > 0) {
        content = html`
      <span part="span-wrapper">
      <select @change="${this.handleselect}" part="select" id="input">
        ${this.options.map((value) => typeof value === "string" ? `<option value="${value}">${value}</option>` : `<option value="${value.value}">${value.text}</option>`)}
      </select>
      </span>`;
      } else if (this.variant === "textarea") {
        content = html`<span part="span-wrapper"><textarea value="${this.value}" part="textarea" @input="${this.handleinput}" id="input" placeholder="${this.placeholder}" col="10"></textarea></span>`;
      } else {
        content = html`<span part="span-wrapper"><input type="${this.variant === "number" ? "number" : "text"}" value="${this.value}" part="input" @input="${this.handleinput}" id="input" placeholder="${this.placeholder}"/></span>`;
      }
      return html`
      <label part="label" for="input">${this.label}</label>
      ${content}
    `;
    }
  };
  Input.style = style5;
  __decorate([
    property()
  ], Input.prototype, "label", void 0);
  __decorate([
    property()
  ], Input.prototype, "placeholder", void 0);
  __decorate([
    property({ onUpdate: "updatevalue" })
  ], Input.prototype, "value", void 0);
  __decorate([
    property()
  ], Input.prototype, "name", void 0);
  __decorate([
    property()
  ], Input.prototype, "variant", void 0);
  __decorate([
    property({ type: Array })
  ], Input.prototype, "options", void 0);

  // ../../system/doc/dist/src/components/Radio/style.js
  var style6 = `:host {
  --selected:rgb(255, 255, 255);
  --forground:rgb(243, 243, 243);
  --background: rgb(215, 215, 215);
  --color: black;
  --unselected-color: rgb(132, 132, 132);
  --selected-color: black;
  font-family: inherit;
  font-size: 12pt;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  user-select: none; }

@media (prefers-color-scheme: dark) {
  :host {
    --background: rgb(0, 0, 0);
    --color: white;
    --selected-color: white;
    --selected:rgb(48, 48, 48);
    --forground:rgb(63, 63, 63);
    --unselected-color: rgb(117, 117, 117); } }

label {
  color: var(--color);
  display: block; }

div {
  background-color: var(--background);
  display: flex;
  padding: 0.5rem;
  border-radius: 1000px;
  gap: 0.5rem; }
  div div {
    background-color: var(--forground);
    padding: 0.5rem 2rem;
    color: var(--unselected-color); }

:host([value="true"]) div.left {
  background-color: var(--selected);
  color: var(--selected-color);
  outline: 2px solid var(--unselected-color); }

:host([value="false"]) div.right {
  background-color: var(--selected);
  color: var(--selected-color);
  outline: 2px solid var(--unselected-color); }`;

  // ../../system/doc/dist/src/components/Radio/index.js
  var Radio = class extends BaseSystem {
    constructor() {
      super(...arguments);
      this.left = "True";
      this.right = "False";
      this.label = "Label";
      this.name = "";
      this.value = false;
      this.handleclick = (e4) => {
        this.value = !this.value;
        this.dispatchEvent(new CustomEvent("change", { detail: { value: this.value } }));
      };
    }
    render() {
      return html`
      <label>${this.label}</label>
      <div @click="${this.handleclick}">
        <div class="left">${this.left}</div>
        <div class="right">${this.right}</div>
      </div>
    `;
    }
  };
  Radio.style = style6;
  __decorate([
    property()
  ], Radio.prototype, "left", void 0);
  __decorate([
    property()
  ], Radio.prototype, "right", void 0);
  __decorate([
    property()
  ], Radio.prototype, "label", void 0);
  __decorate([
    property()
  ], Radio.prototype, "name", void 0);
  __decorate([
    property({ type: Boolean })
  ], Radio.prototype, "value", void 0);

  // ../../atoms/tabs/dist/register.bundle.mjs
  var y = Object.defineProperty;
  var x = Object.getOwnPropertyDescriptor;
  var r2 = (h8, l9, s3, a5) => {
    for (var e4 = a5 > 1 ? void 0 : a5 ? x(l9, s3) : l9, t6 = h8.length - 1, n4; t6 >= 0; t6--)
      (n4 = h8[t6]) && (e4 = (a5 ? n4(l9, s3, e4) : n4(e4)) || e4);
    return a5 && e4 && y(l9, s3, e4), e4;
  };
  var g = `:host header div {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--gap-small, 8px); }
  :host header div[part="header-tabs"] {
    overflow-x: auto;
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */ }
    :host header div[part="header-tabs"]::-webkit-scrollbar {
      display: none; }
    :host header div[part="header-tabs"] span[part=indicator] {
      content: '';
      display: inline-block;
      position: absolute;
      left: 0;
      top: 100%;
      translate: 0 -100%;
      height: var(--tabs-indicator-height, var(--unit-size-1, 4px));
      background-color: var(--tabs-indicator-color, var(--pap-color-border-brand, #009DD3));
      transition: all var(--tabs-indicator-animation-easing, ease) var(--tabs-indicator-animation-duration, 200ms);
      border-top-left-radius: var(--radius-small, 4px);
      border-top-right-radius: var(--radius-small, 4px); }

:host header ::slotted(*[slot="header"]) {
  flex-grow: 1;
  z-index: 20; }

::slotted(*[slot="header-prefix"]) {
  margin-right: auto; }

::slotted(*[slot="header-suffix"]) {
  margin-left: auto; }

:host([scrolling="true"]) main {
  max-height: var(--tabs-maxheight, 15rem);
  overflow-y: auto;
  scroll-snap-type: y proximity; }

:host([scrolling="true"]) ::slotted(pap-tab-content) {
  display: block; }`;
  var v = `:host {
  color: var(--pap-color-text, #29292F);
  cursor: var(--select-pointer, pointer);
  user-select: none;
  white-space: nowrap;
  height: var(--field-size-medium, 40px);
  padding-inline: var(--padding-large, 24px);
  margin-top: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative; }

:host(:hover) {
  color: var(--pap-color-text-hover); }
  :host(:hover):after {
    content: '';
    position: absolute;
    width: 100%;
    bottom: 0;
    height: var(--unit-size-1, 4px);
    border-top-left-radius: var(--radius-small, 4px);
    border-top-right-radius: var(--radius-small, 4px);
    background-color: var(--pap-color-bg-secondary, #F6F7F8); }

:host(:active) {
  color: var(--pap-color-text-pressed); }
  :host(:active):after {
    background-color: var(--pap-color-border-secondary, #DADDE3); }

::slotted(*) {
  pointer-events: none; }`;
  var o = class extends BaseSystem {
    constructor() {
      super();
      this.text = "Tab";
      this.setAttribute("slot", "tab");
    }
    init(s3) {
      s3.addEventListener("tab-select", (a5) => {
        a5 instanceof CustomEvent && (this.getAttribute("data-tab-id") === a5.detail.id ? this.classList.add("selected") : this.classList.remove("selected"));
      });
    }
    firstUpdate() {
      this.classList.contains("selected") && setTimeout(() => {
        this.dispatchEvent(new Event("click", { composed: false, cancelable: false }));
      }, 130);
    }
    render() {
      return html`
      <slot>${this.text}</slot>
    `;
    }
  };
  o.style = v, r2([property()], o.prototype, "text", 2);
  var E = `:host {
  display: none; }

:host(.selected) {
  display: block; }`;
  var c2 = class extends BaseSystem {
    constructor() {
      super(), this.setAttribute("slot", "content");
    }
    init(l9) {
      l9.addEventListener("tab-select", (s3) => {
        s3 instanceof CustomEvent && (this.getAttribute("data-tab-id") === s3.detail.id ? this.classList.add("selected") : this.classList.remove("selected"));
      });
    }
    render() {
      return html`
      <slot></slot>  
    `;
    }
  };
  c2.style = E;
  var i = class extends BaseSystem {
    constructor() {
      super(...arguments);
      this.tabs = [];
      this.contents = [];
      this.currentlyscrolling = false;
      this.scrollclick = false;
      this.internalclick = false;
      this.preselect = 0;
      this.indicator = true;
      this.scrolling = false;
      this.handleslotchange = (s3) => {
        if (s3.target instanceof HTMLSlotElement) {
          let a5 = null, e4 = null;
          s3.target.assignedElements().forEach((t6, n4) => {
            if (!t6.hasAttribute("data-tabs-pass")) {
              let b4 = t6 instanceof c2, u6 = t6 instanceof o, p8 = n4.toString();
              b4 && (p8 = this.contents.length.toString(), this.contents.push(t6)), u6 && (!e4 && n4 === this.preselect && (e4 = t6), p8 = this.tabs.length.toString(), t6.addEventListener("click", this.handletabclick), t6.classList.contains("selected") && (a5 = n4), this.tabs.push(t6)), t6.hasAttribute("id") && (p8 = t6.getAttribute("id")), (b4 || u6) && (t6.init(this), t6.setAttribute("data-tab-id", p8), t6.setAttribute("data-tabs-pass", "true"));
            }
          }), a5 === null && e4 !== null && setTimeout(() => {
            e4.click();
          }, 100);
        }
      };
      this.handletabclick = (s3) => {
        if (s3.target instanceof o) {
          this.scrollclick || (this.internalclick = true);
          let a5 = s3.target.getAttribute("data-tab-id");
          if (this.dispatchEvent(new CustomEvent("tab-select", { detail: { id: a5 } })), this.headerElement) {
            let e4 = s3.target.offsetLeft - this.headerElement.offsetLeft - this.offsetLeft;
            (e4 + s3.target.clientWidth > this.headerElement.scrollLeft + this.headerElement.clientWidth || e4 < this.headerElement.scrollLeft) && this.headerElement.scrollTo({ left: e4, behavior: "smooth" }), this.indicator && this.indicatorElement && (this.indicatorElement.style.left = e4 + "px", this.indicatorElement.style.width = s3.target.clientWidth + "px");
          }
          if (this.scrolling && this.mainElement && !this.currentlyscrolling) {
            let e4 = this.contents.find((t6) => t6.getAttribute("data-tab-id") === a5);
            e4 && this.mainElement.scrollTo({ top: e4.offsetTop - this.mainElement.offsetTop, behavior: "smooth" });
          }
        }
      };
      this.handlescroll = (s3) => {
        if (this.scrolling && this.mainElement) {
          this.currentlyscrolling = true;
          let a5 = this.mainElement.scrollTop, e4 = 0;
          for (let t6 = 0; t6 < this.contents.length; t6++)
            if (e4 += this.contents[t6].clientHeight, a5 < e4) {
              this.tabs[t6].classList.contains("selected") || (this.scrollclick = true, this.internalclick || this.tabs[t6].click());
              break;
            }
        }
      };
      this.handlescrollend = (s3) => {
        this.currentlyscrolling = false, this.internalclick = false, this.scrollclick = false;
      };
    }
    render() {
      return html`
      <header part="header">
        <slot name="header-top"></slot>
        <div part="header-content">
          <slot name="header-prefix"></slot>
          <div part="header-tabs">
            <slot @slotchange="${this.handleslotchange}" name="tab"></slot>
            <span part="indicator"></span>
          </div>
          <slot name="header-suffix"></slot>
        </div>
        <slot name="header-below"></slot>
      </header>
      <slot name="between"></slot>
      <main @scroll="${this.handlescroll}" @scrollend="${this.handlescrollend}" part="content">
        <slot @slotchange="${this.handleslotchange}" name="content"></slot>
      </main>
    `;
    }
  };
  i.style = g, r2([query('span[part="indicator"]')], i.prototype, "indicatorElement", 2), r2([query('div[part="header-tabs"]')], i.prototype, "headerElement", 2), r2([query("main")], i.prototype, "mainElement", 2), r2([property({ type: Number, rerender: false })], i.prototype, "preselect", 2), r2([property({ type: Boolean })], i.prototype, "indicator", 2), r2([property({ rerender: false, type: Boolean })], i.prototype, "scrolling", 2);
  var d2 = customElements != null ? customElements : window == null ? void 0 : window.customElements;
  if (!d2)
    throw new Error("Custom Elements not supported");
  d2.get("pap-tab") || d2.define("pap-tab", o);
  d2.get("pap-tab-content") || d2.define("pap-tab-content", c2);
  d2.get("pap-tabs") || d2.define("pap-tabs", i);

  // ../../atoms/typography/dist/register.bundle.mjs
  var y2 = Object.defineProperty;
  var f = Object.getOwnPropertyDescriptor;
  var i2 = (h8, e4, o6, r9) => {
    for (var a5 = r9 > 1 ? void 0 : r9 ? f(e4, o6) : e4, p8 = h8.length - 1, s3; p8 >= 0; p8--)
      (s3 = h8[p8]) && (a5 = (r9 ? s3(e4, o6, a5) : s3(a5)) || a5);
    return r9 && a5 && y2(e4, o6, a5), a5;
  };
  var l = `:host {
  text-align: left;
  display: block;
  color: inherit; }

:host([inline]) {
  display: inline; }

:host([alignment="center"]),
:host([align="center"]) {
  text-align: center; }

:host([alignment="justify"]),
:host([align="justify"]) {
  text-align: justify; }

:host([alignment="start"]),
:host([align="start"]) {
  text-align: start; }

:host([alignment="end"]),
:host([align="end"]) {
  text-align: end; }

:host([alignment="left"]),
:host([align="left"]) {
  text-align: left; }

:host([alignment="right"]),
:host([align="right"]) {
  text-align: right; }

:host([alignment="unset"]),
:host([align="unset"]) {
  text-align: unset; }

:host([alignment="inherit"]),
:host([align="inherit"]) {
  text-align: inherit; }

:host([alignment="initial"]),
:host([align="initial"]) {
  text-align: initial; }

:host([nowrap="true"]) {
  white-space: nowrap; }

:host([truncate="true"]) {
  white-space: nowrap;
  /* this ensures text remains on a single line */
  overflow: hidden;
  /* hides any overflow */
  text-overflow: ellipsis;
  /* shows ellipsis for any overflow */ }

:host([variant="heading1"]),
:host([variant="H1"]) {
  font-family: var(--typography-h1-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-h1-fontsize, 8.75rem);
  font-weight: var(--typography-h1-fontweight, 800);
  line-height: var(--typography-h1-lineheight, 120%);
  letter-spacing: var(--typography-h1-letterspacing, 0); }

:host([variant="heading2"]),
:host([variant="H2"]) {
  font-family: var(--typography-h2-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-h2-fontsize, 5.5rem);
  font-weight: var(--typography-h2-fontweight, 800);
  line-height: var(--typography-h2-lineheight, 120%);
  letter-spacing: var(--typography-h2-letterspacing, 0); }

:host([variant="heading3"]),
:host([variant="H3"]) {
  font-family: var(--typography-h3-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-h3-fontsize, 5rem);
  font-weight: var(--typography-h3-fontweight, 700);
  line-height: var(--typography-h3-lineheight, 120%);
  letter-spacing: var(--typography-h3-letterspacing, 0); }

:host([variant="heading4"]),
:host([variant="H4"]) {
  font-family: var(--typography-h4-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-h4-fontsize, 4rem);
  font-weight: var(--typography-h4-fontweight, 700);
  line-height: var(--typography-h4-lineheight, 120%);
  letter-spacing: var(--typography-h4-letterspacing, 0); }

:host([variant="heading5"]),
:host([variant="H5"]) {
  font-family: var(--typography-h5-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-h5-fontsize, 3.5rem);
  font-weight: var(--typography-h5-fontweight, 400);
  line-height: var(--typography-h5-lineheight, 120%);
  letter-spacing: var(--typography-h5-letterspacing, 0); }

:host([variant="title1"]),
:host([variant="T1"]) {
  font-family: var(--typography-t1-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-t1-fontsize, 3rem);
  font-weight: var(--typography-t1-fontweight, 700);
  line-height: var(--typography-t1-lineheight, 120%);
  letter-spacing: var(--typography-t1-letterspacing, 0); }

:host([variant="title2"]),
:host([variant="T2"]) {
  font-family: var(--typography-t2-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-t2-fontsize, 2.5rem);
  font-weight: var(--typography-t2-fontweight, 700);
  line-height: var(--typography-t2-lineheight, 120%);
  letter-spacing: var(--typography-t2-letterspacing, 0); }

:host([variant="title3"]),
:host([variant="T3"]) {
  font-family: var(--typography-t3-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-t3-fontsize, 2rem);
  font-weight: var(--typography-t3-fontweight, 600);
  line-height: var(--typography-t3-lineheight, 120%);
  letter-spacing: var(--typography-t3-letterspacing, 0); }

:host([variant="title4"]),
:host([variant="T4"]) {
  font-family: var(--typography-t4-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-t4-fontsize, 1.5rem);
  font-weight: var(--typography-t4-fontweight, 600);
  line-height: var(--typography-t4-lineheight, 140%);
  letter-spacing: var(--typography-t4-letterspacing, 0); }

:host([variant="copy1"]),
:host([variant="C1"]) {
  font-family: var(--typography-c1-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-c1-fontsize, 1.5rem);
  font-weight: var(--typography-c1-fontweight, 500);
  line-height: var(--typography-c1-lineheight, 140%);
  letter-spacing: var(--typography-c1-letterspacing, 0.01rem); }

:host([variant="copy2"]),
:host([variant="C2"]) {
  font-family: var(--typography-c2-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-c2-fontsize, 1rem);
  font-weight: var(--typography-c2-fontweight, 600);
  line-height: var(--typography-c2-lineheight, 140%);
  letter-spacing: var(--typography-c2-letterspacing, 0.01rem); }

:host([variant="copy3"]),
:host([variant="C3"]) {
  font-family: var(--typography-c3-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-c3-fontsize, 1rem);
  font-weight: var(--typography-c3-fontweight, 400);
  line-height: var(--typography-c3-lineheight, 140%);
  letter-spacing: var(--typography-c3-letterspacing, 0.01rem); }

:host([variant="copy4"]),
:host([variant="C4"]) {
  font-family: var(--typography-c4-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-c4-fontsize, 0.75rem);
  font-weight: var(--typography-c4-fontweight, 400);
  line-height: var(--typography-c4-lineheight, 140%);
  letter-spacing: var(--typography-c4-letterspacing, 0.01rem); }

:host([variant="button1"]),
:host([variant="B1"]) {
  font-family: var(--typography-b1-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-b1-fontsize, 1rem);
  font-weight: var(--typography-b1-fontweight, 600);
  line-height: var(--typography-b1-lineheight, 140%);
  letter-spacing: var(--typography-b1-letterspacing, 0.01rem); }

:host([variant="button2"]),
:host([variant="B2"]) {
  font-family: var(--typography-b2-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-b2-fontsize, 1rem);
  font-weight: var(--typography-b2-fontweight, 600);
  line-height: var(--typography-b2-lineheight, 140%);
  letter-spacing: var(--typography-b2-letterspacing, 0.01rem);
  text-decoration: underline; }`;
  var t = class extends BaseSystem {
    constructor() {
      super(...arguments);
      this.variant = "C3";
      this.align = "initial";
      this.nowrap = false;
      this.truncate = false;
    }
    render() {
      return html`
            <slot></slot>
        `;
    }
  };
  t.style = l, i2([property({ rerender: false })], t.prototype, "variant", 2), i2([property({ rerender: false })], t.prototype, "align", 2), i2([property({ rerender: false, type: Boolean })], t.prototype, "nowrap", 2), i2([property({ rerender: false, type: Boolean })], t.prototype, "truncate", 2);
  var g2 = customElements != null ? customElements : window == null ? void 0 : window.customElements;
  if (!g2)
    throw new Error("Custom Elements not supported");
  g2.get("pap-typography") || g2.define("pap-typography", t);

  // ../box/dist/src/style.js
  var style7 = `:host([radius="none"]) {
  border-radius: var(--box-radius-none, var(--radius-none, 0px)); }

:host([radius="small"]) {
  border-radius: var(--box-radius-small, var(--radius-small, var(--radius-small, 4px))); }

:host([radius="medium"]) {
  border-radius: var(--box-radius-medium, var(--radius-medium, var(--radius-medium, 8px))); }

:host([radius="large"]) {
  border-radius: var(--box-radius-large, var(--radius-large, var(--radius-large, 16px))); }

:host([radius="circular"]) {
  border-radius: var(--box-radius-circular, var(--radius-circular, var(--radius-max, 1000px))); }

:host([elevation="small"]) {
  box-shadow: var(--box-shadow-small, var(--shadow-s, 0 2px 4px var(--pap-color-shadow, color-mix(in oklab, var(--pap-color-neutral-600, #6E7087), transparent 80%)))); }

:host([elevation="medium"]) {
  box-shadow: var(--box-shadow-medium, var(--shadow-m, 0 4px 6px var(--pap-color-shadow, color-mix(in oklab, var(--pap-color-neutral-600, #6E7087), transparent 80%)))); }

:host([elevation="large"]) {
  box-shadow: var(--box-shadow-large, var(--shadow-l, 0 8px 12px var(--pap-color-shadow, color-mix(in oklab, var(--pap-color-neutral-600, #6E7087), transparent 80%)))); }

:host([elevation="x-large"]) {
  box-shadow: var(--box-shadow-x-large, var(--shadow-xl, 0 16px 20px var(--pap-color-shadow, color-mix(in oklab, var(--pap-color-neutral-600, #6E7087), transparent 80%)))); }

:host([elevation-direction="horizontal"][elevation="small"]) {
  box-shadow: var(--box-shadow-small, var(--shadow-horizontal-s, 2px 0 4px var(--pap-color-shadow, color-mix(in oklab, var(--pap-color-neutral-600, #6E7087), transparent 80%)))); }

:host([elevation-direction="horizontal"][elevation="medium"]) {
  box-shadow: var(--box-shadow-medium, var(--shadow-horizontal-m, 4px 0 6px var(--pap-color-shadow, color-mix(in oklab, var(--pap-color-neutral-600, #6E7087), transparent 80%)))); }

:host([elevation-direction="horizontal"][elevation="large"]) {
  box-shadow: var(--box-shadow-large, var(--shadow-horizontal-l, 8px 0 12px var(--pap-color-shadow, color-mix(in oklab, var(--pap-color-neutral-600, #6E7087), transparent 80%)))); }

:host([elevation-direction="horizontal"][elevation="x-large"]) {
  box-shadow: var(--box-shadow-x-large, var(--shadow-horizontal-xl, 16px 0 20px var(--pap-color-shadow, color-mix(in oklab, var(--pap-color-neutral-600, #6E7087), transparent 80%)))); }`;

  // ../box/dist/src/component.js
  var BoxTemplate = class extends BaseSystem {
    constructor() {
      super(...arguments);
      this.radius = "circular";
      this.elevation = "none";
      this.elevationdirection = "vertical";
    }
    render() {
      return `
            <slot></slot>
        `;
    }
  };
  BoxTemplate.styles = [style7];
  __decorate([
    property({ rerender: false })
  ], BoxTemplate.prototype, "radius", void 0);
  __decorate([
    property({ rerender: false })
  ], BoxTemplate.prototype, "elevation", void 0);
  __decorate([
    property({ rerender: false, attribute: "elevation-direction" })
  ], BoxTemplate.prototype, "elevationdirection", void 0);

  // ../../atoms/button/dist/register.bundle.mjs
  var v2 = Object.defineProperty;
  var u = Object.getOwnPropertyDescriptor;
  var r3 = (d8, n4, t6, l9) => {
    for (var e4 = l9 > 1 ? void 0 : l9 ? u(n4, t6) : n4, i7 = d8.length - 1, s3; i7 >= 0; i7--)
      (s3 = d8[i7]) && (e4 = (l9 ? s3(n4, t6, e4) : s3(e4)) || e4);
    return l9 && e4 && v2(n4, t6, e4), e4;
  };
  var p = `:host {
  cursor: var(--pap-button-cursor, pointer);
  align-items: center;
  display: flex;
  padding-inline: var(--padding-small, 8px);
  box-sizing: border-box;
  position: relative;
  -webkit-user-select: none;
  /* Safari */
  -ms-user-select: none;
  /* IE 10 and IE 11 */
  user-select: none;
  /* Standard syntax */
  border-style: solid;
  border-width: 2px;
  border-color: transparent;
  transition: background-color ease-in 80ms; }

span.content {
  padding-inline: var(--padding-small, 8px);
  margin-inline: auto;
  gap: var(--gap-small);
  display: inline-flex;
  align-items: center;
  justify-content: center; }

:host([variant="outlined"]:is(:active)),
:host([variant="outlined"]:is(:hover)) {
  border-color: transparent !important; }

:host([mode="hug"]) {
  display: inline-flex; }

:host([mode="fill"]) {
  display: flex;
  width: 100%; }

:host([textvariant="B1"]),
:host([textvariant="button1"]) {
  font-family: var(--typography-b1-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-b1-fontsize, 1rem);
  font-weight: var(--typography-b1-fontweight, 600);
  line-height: var(--typography-b1-lineheight, 140%);
  letter-spacing: var(--typography-b1-letterspacing, 0.01rem); }

:host([color="secondary"][variant="clear"]:not([textvariant="B1"]):not([textvariant="button1"])),
:host([color="inverse"][variant="clear"]:not([textvariant="B1"]):not([textvariant="button1"])),
:host([textvariant="B2"]),
:host([textvariant="button2"]) {
  font-family: var(--typography-b2-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-b2-fontsize, 1rem);
  font-weight: var(--typography-b2-fontweight, 600);
  line-height: var(--typography-b2-lineheight, 140%);
  letter-spacing: var(--typography-b2-letterspacing, 0.01rem);
  text-decoration: underline; }

:host([variant="filled"][color="primary"]:not([disabled]).default),
:host([variant="filled"][color="primary"]:not([disabled])) {
  border-color: transparent;
  background-color: var(--pap-button-primary-filled-default-background, var(--pap-color-bg-brand, #009DD3));
  color: var(--pap-button-primary-filled-default-text, var(--pap-color-text-onbrand, #FFFFFF)); }

:host([variant="filled"][color="primary"]:not([disabled]).default) ::slotted(pap-icon),
:host([variant="filled"][color="primary"]:not([disabled])) ::slotted(pap-icon) {
  color: var(--pap-button-primary-filled-default-icon, var(--pap-color-icon-onbrand, #FFFFFF)); }

:host([variant="filled"][color="primary"][loading="true"]:not([disabled]).default)::after,
:host([variant="filled"][color="primary"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--pap-button-primary-filled-default-icon, var(--pap-color-icon-onbrand, #FFFFFF)); }

:host([variant="filled"][color="primary"]:not([disabled]).hover),
:host([variant="filled"][color="primary"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--pap-button-primary-filled-hover-background, var(--pap-color-bg-brand-hover, #0050B3));
  color: var(--pap-button-primary-filled-hover-text, var(--pap-color-text-onbrand-hover, #FFFFFF)); }

:host([variant="filled"][color="primary"]:not([disabled]).hover) ::slotted(pap-icon),
:host([variant="filled"][color="primary"]:not([disabled]):hover) ::slotted(pap-icon) {
  color: var(--pap-button-primary-filled-hover-icon, var(--pap-color-icon-onbrand-hover, #FFFFFF)); }

:host([variant="filled"][color="primary"][loading="true"]:not([disabled]).hover)::after,
:host([variant="filled"][color="primary"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--pap-button-primary-filled-hover-icon, var(--pap-color-icon-onbrand-hover, #FFFFFF)); }

:host([variant="filled"][color="primary"]:not([disabled]).pressed),
:host([variant="filled"][color="primary"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--pap-button-primary-filled-pressed-background, var(--pap-color-bg-brand-pressed, #002652));
  color: var(--pap-button-primary-filled-pressed-text, var(--pap-color-text-onbrand-pressed, #FFFFFF)); }

:host([variant="filled"][color="primary"]:not([disabled]).pressed) ::slotted(pap-icon),
:host([variant="filled"][color="primary"]:not([disabled]):active) ::slotted(pap-icon) {
  color: var(--pap-button-primary-filled-pressed-icon, var(--pap-color-icon-onbrand-pressed, #FFFFFF)); }

:host([variant="filled"][color="primary"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="filled"][color="primary"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--pap-button-primary-filled-pressed-icon, var(--pap-color-icon-onbrand-pressed, #FFFFFF)); }

:host([variant="outlined"][color="primary"]:not([disabled]).default),
:host([variant="outlined"][color="primary"]:not([disabled])) {
  border-color: var(--pap-button-primary-outlined-default-border, var(--pap-color-border-brand, #009DD3));
  color: var(--pap-button-primary-outlined-default-text, var(--pap-color-text-brand, #0177A3)); }

:host([variant="outlined"][color="primary"]:not([disabled]).default) ::slotted(pap-icon),
:host([variant="outlined"][color="primary"]:not([disabled])) ::slotted(pap-icon) {
  color: var(--pap-button-primary-outlined-default-icon, var(--pap-color-icon-brand, #0177A3)); }

:host([variant="outlined"][color="primary"][loading="true"]:not([disabled]).default)::after,
:host([variant="outlined"][color="primary"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--pap-button-primary-outlined-default-icon, var(--pap-color-icon-brand, #0177A3)); }

:host([variant="outlined"][color="primary"]:not([disabled]).hover),
:host([variant="outlined"][color="primary"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--pap-button-primary-outlined-hover-background, var(--pap-color-bg-brand-hover, #0050B3));
  color: var(--pap-button-primary-outlined-hover-text, var(--pap-color-text-onbrand-hover, #FFFFFF)); }

:host([variant="outlined"][color="primary"]:not([disabled]).hover) ::slotted(pap-icon),
:host([variant="outlined"][color="primary"]:not([disabled]):hover) ::slotted(pap-icon) {
  color: var(--pap-button-primary-outlined-hover-icon, var(--pap-color-icon-onbrand-hover, #FFFFFF)); }

:host([variant="outlined"][color="primary"][loading="true"]:not([disabled]).hover)::after,
:host([variant="outlined"][color="primary"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--pap-button-primary-outlined-hover-icon, var(--pap-color-icon-onbrand-hover, #FFFFFF)); }

:host([variant="outlined"][color="primary"]:not([disabled]).pressed),
:host([variant="outlined"][color="primary"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--pap-button-primary-outlined-pressed-background, var(--pap-color-bg-brand-pressed, #002652));
  color: var(--pap-button-primary-outlined-pressed-text, var(--pap-color-text-onbrand-pressed, #FFFFFF)); }

:host([variant="outlined"][color="primary"]:not([disabled]).pressed) ::slotted(pap-icon),
:host([variant="outlined"][color="primary"]:not([disabled]):active) ::slotted(pap-icon) {
  color: var(--pap-button-primary-outlined-pressed-icon, var(--pap-color-icon-onbrand-pressed, #FFFFFF)); }

:host([variant="outlined"][color="primary"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="outlined"][color="primary"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--pap-button-primary-outlined-pressed-icon, var(--pap-color-icon-onbrand-pressed, #FFFFFF)); }

:host([variant="clear"][color="primary"]:not([disabled]).default),
:host([variant="clear"][color="primary"]:not([disabled])) {
  color: var(--pap-button-primary-clear-default-text, var(--pap-color-text-brand, #0177A3)); }

:host([variant="clear"][color="primary"]:not([disabled]).default) ::slotted(pap-icon),
:host([variant="clear"][color="primary"]:not([disabled])) ::slotted(pap-icon) {
  color: var(--pap-button-primary-clear-default-icon, var(--pap-color-icon-brand, #0177A3)); }

:host([variant="clear"][color="primary"][loading="true"]:not([disabled]).default)::after,
:host([variant="clear"][color="primary"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--pap-button-primary-clear-default-icon, var(--pap-color-icon-brand, #0177A3)); }

:host([variant="clear"][color="primary"]:not([disabled]).hover),
:host([variant="clear"][color="primary"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--pap-button-primary-clear-hover-background, var(--pap-color-bg-hover, #DADDE3));
  color: var(--pap-button-primary-clear-hover-text, var(--pap-color-text-brand-hover, #0050B3)); }

:host([variant="clear"][color="primary"]:not([disabled]).hover) ::slotted(pap-icon),
:host([variant="clear"][color="primary"]:not([disabled]):hover) ::slotted(pap-icon) {
  color: var(--pap-button-primary-clear-hover-icon, var(--pap-color-icon-brand-hover, #0050B3)); }

:host([variant="clear"][color="primary"][loading="true"]:not([disabled]).hover)::after,
:host([variant="clear"][color="primary"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--pap-button-primary-clear-hover-icon, var(--pap-color-icon-brand-hover, #0050B3)); }

:host([variant="clear"][color="primary"]:not([disabled]).pressed),
:host([variant="clear"][color="primary"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--pap-button-primary-clear-pressed-background, var(--pap-color-bg-pressed, #C7CBD4));
  color: var(--pap-button-primary-clear-pressed-text, var(--pap-color-text-brand-pressed, #002652)); }

:host([variant="clear"][color="primary"]:not([disabled]).pressed) ::slotted(pap-icon),
:host([variant="clear"][color="primary"]:not([disabled]):active) ::slotted(pap-icon) {
  color: var(--pap-button-primary-clear-pressed-icon, var(--pap-color-icon-brand-pressed, #002652)); }

:host([variant="clear"][color="primary"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="clear"][color="primary"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--pap-button-primary-clear-pressed-icon, var(--pap-color-icon-brand-pressed, #002652)); }

:host([variant="filled"][color="secondary"]:not([disabled]).default),
:host([variant="filled"][color="secondary"]:not([disabled])) {
  border-color: transparent;
  background-color: var(--pap-button-secondary-filled-default-background, var(--pap-color-bg-inverse, #29292F));
  color: var(--pap-button-secondary-filled-default-text, var(--pap-color-text-oninverse, #FFFFFF)); }

:host([variant="filled"][color="secondary"]:not([disabled]).default) ::slotted(pap-icon),
:host([variant="filled"][color="secondary"]:not([disabled])) ::slotted(pap-icon) {
  color: var(--pap-button-secondary-filled-default-icon, var(--pap-color-icon-oninverse, #FFFFFF)); }

:host([variant="filled"][color="secondary"][loading="true"]:not([disabled]).default)::after,
:host([variant="filled"][color="secondary"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--pap-button-secondary-filled-default-icon, var(--pap-color-icon-oninverse, #FFFFFF)); }

:host([variant="filled"][color="secondary"]:not([disabled]).hover),
:host([variant="filled"][color="secondary"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--pap-button-secondary-filled-hover-background, var(--pap-color-bg-inverse-hover, #4D4E58));
  color: var(--pap-button-secondary-filled-hover-text, var(--pap-color-text-oninverse-hover, #FFFFFF)); }

:host([variant="filled"][color="secondary"]:not([disabled]).hover) ::slotted(pap-icon),
:host([variant="filled"][color="secondary"]:not([disabled]):hover) ::slotted(pap-icon) {
  color: var(--pap-button-secondary-filled-hover-icon, var(--pap-color-icon-oninverse-hover, #FFFFFF)); }

:host([variant="filled"][color="secondary"][loading="true"]:not([disabled]).hover)::after,
:host([variant="filled"][color="secondary"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--pap-button-secondary-filled-hover-icon, var(--pap-color-icon-oninverse-hover, #FFFFFF)); }

:host([variant="filled"][color="secondary"]:not([disabled]).pressed),
:host([variant="filled"][color="secondary"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--pap-button-secondary-filled-pressed-background, var(--pap-color-bg-inverse-pressed, #6E7087));
  color: var(--pap-button-secondary-filled-pressed-text, var(--pap-color-text-oninverse-pressed, #FFFFFF)); }

:host([variant="filled"][color="secondary"]:not([disabled]).pressed) ::slotted(pap-icon),
:host([variant="filled"][color="secondary"]:not([disabled]):active) ::slotted(pap-icon) {
  color: var(--pap-button-secondary-filled-pressed-icon, var(--pap-color-icon-oninverse-pressed, #FFFFFF)); }

:host([variant="filled"][color="secondary"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="filled"][color="secondary"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--pap-button-secondary-filled-pressed-icon, var(--pap-color-icon-oninverse-pressed, #FFFFFF)); }

:host([variant="outlined"][color="secondary"]:not([disabled]).default),
:host([variant="outlined"][color="secondary"]:not([disabled])) {
  border-color: var(--pap-button-secondary-outlined-default-border, var(--pap-color-border, #C7CBD4));
  color: var(--pap-button-secondary-outlined-default-text, var(--pap-color-text, #29292F)); }

:host([variant="outlined"][color="secondary"]:not([disabled]).default) ::slotted(pap-icon),
:host([variant="outlined"][color="secondary"]:not([disabled])) ::slotted(pap-icon) {
  color: var(--pap-button-secondary-outlined-default-icon, var(--pap-color-icon, #29292F)); }

:host([variant="outlined"][color="secondary"][loading="true"]:not([disabled]).default)::after,
:host([variant="outlined"][color="secondary"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--pap-button-secondary-outlined-default-icon, var(--pap-color-icon, #29292F)); }

:host([variant="outlined"][color="secondary"]:not([disabled]).hover),
:host([variant="outlined"][color="secondary"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--pap-button-secondary-outlined-hover-background, var(--pap-color-bg-inverse-hover, #4D4E58));
  color: var(--pap-button-secondary-outlined-hover-text, var(--pap-color-text-oninverse-hover, #FFFFFF)); }

:host([variant="outlined"][color="secondary"]:not([disabled]).hover) ::slotted(pap-icon),
:host([variant="outlined"][color="secondary"]:not([disabled]):hover) ::slotted(pap-icon) {
  color: var(--pap-button-secondary-outlined-hover-icon, var(--pap-color-icon-oninverse-hover, #FFFFFF)); }

:host([variant="outlined"][color="secondary"][loading="true"]:not([disabled]).hover)::after,
:host([variant="outlined"][color="secondary"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--pap-button-secondary-outlined-hover-icon, var(--pap-color-icon-oninverse-hover, #FFFFFF)); }

:host([variant="outlined"][color="secondary"]:not([disabled]).pressed),
:host([variant="outlined"][color="secondary"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--pap-button-secondary-outlined-pressed-background, var(--pap-color-bg-inverse-pressed, #6E7087));
  color: var(--pap-button-secondary-outlined-pressed-text, var(--pap-color-text-oninverse-pressed, #FFFFFF)); }

:host([variant="outlined"][color="secondary"]:not([disabled]).pressed) ::slotted(pap-icon),
:host([variant="outlined"][color="secondary"]:not([disabled]):active) ::slotted(pap-icon) {
  color: var(--pap-button-secondary-outlined-pressed-icon, var(--pap-color-icon-oninverse-pressed, #FFFFFF)); }

:host([variant="outlined"][color="secondary"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="outlined"][color="secondary"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--pap-button-secondary-outlined-pressed-icon, var(--pap-color-icon-oninverse-pressed, #FFFFFF)); }

:host([variant="clear"][color="secondary"]:not([disabled]).default),
:host([variant="clear"][color="secondary"]:not([disabled])) {
  color: var(--pap-button-secondary-clear-default-text, var(--pap-color-text, #29292F)); }

:host([variant="clear"][color="secondary"]:not([disabled]).default) ::slotted(pap-icon),
:host([variant="clear"][color="secondary"]:not([disabled])) ::slotted(pap-icon) {
  color: var(--pap-button-secondary-clear-default-icon, var(--pap-color-icon, #29292F)); }

:host([variant="clear"][color="secondary"][loading="true"]:not([disabled]).default)::after,
:host([variant="clear"][color="secondary"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--pap-button-secondary-clear-default-icon, var(--pap-color-icon, #29292F)); }

:host([variant="clear"][color="secondary"]:not([disabled]).hover),
:host([variant="clear"][color="secondary"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--pap-button-secondary-clear-hover-background, var(--pap-color-bg-hover, #DADDE3));
  color: var(--pap-button-secondary-clear-hover-text, var(--pap-color-text, #29292F)); }

:host([variant="clear"][color="secondary"]:not([disabled]).hover) ::slotted(pap-icon),
:host([variant="clear"][color="secondary"]:not([disabled]):hover) ::slotted(pap-icon) {
  color: var(--pap-button-secondary-clear-hover-icon, var(--pap-color-icon, #29292F)); }

:host([variant="clear"][color="secondary"][loading="true"]:not([disabled]).hover)::after,
:host([variant="clear"][color="secondary"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--pap-button-secondary-clear-hover-icon, var(--pap-color-icon, #29292F)); }

:host([variant="clear"][color="secondary"]:not([disabled]).pressed),
:host([variant="clear"][color="secondary"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--pap-button-secondary-clear-pressed-background, var(--pap-color-bg-pressed, #C7CBD4));
  color: var(--pap-button-secondary-clear-pressed-text, var(--pap-color-text, #29292F)); }

:host([variant="clear"][color="secondary"]:not([disabled]).pressed) ::slotted(pap-icon),
:host([variant="clear"][color="secondary"]:not([disabled]):active) ::slotted(pap-icon) {
  color: var(--pap-button-secondary-clear-pressed-icon, var(--pap-color-icon, #29292F)); }

:host([variant="clear"][color="secondary"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="clear"][color="secondary"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--pap-button-secondary-clear-pressed-icon, var(--pap-color-icon, #29292F)); }

:host([variant="filled"][color="inverse"]:not([disabled]).default),
:host([variant="filled"][color="inverse"]:not([disabled])) {
  border-color: transparent;
  background-color: var(--pap-button-inverse-filled-default-background, var(--pap-color-bg, #FFFFFF));
  color: var(--pap-button-inverse-filled-default-text, var(--pap-color-text, #29292F)); }

:host([variant="filled"][color="inverse"]:not([disabled]).default) ::slotted(pap-icon),
:host([variant="filled"][color="inverse"]:not([disabled])) ::slotted(pap-icon) {
  color: var(--pap-button-inverse-filled-default-icon, var(--pap-color-icon, #29292F)); }

:host([variant="filled"][color="inverse"][loading="true"]:not([disabled]).default)::after,
:host([variant="filled"][color="inverse"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--pap-button-inverse-filled-default-icon, var(--pap-color-icon, #29292F)); }

:host([variant="filled"][color="inverse"]:not([disabled]).hover),
:host([variant="filled"][color="inverse"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--pap-button-inverse-filled-hover-background, var(--pap-color-bg-hover, #DADDE3));
  color: var(--pap-button-inverse-filled-hover-text, var(--pap-color-text, #29292F)); }

:host([variant="filled"][color="inverse"]:not([disabled]).hover) ::slotted(pap-icon),
:host([variant="filled"][color="inverse"]:not([disabled]):hover) ::slotted(pap-icon) {
  color: var(--pap-button-inverse-filled-hover-icon, var(--pap-color-icon, #29292F)); }

:host([variant="filled"][color="inverse"][loading="true"]:not([disabled]).hover)::after,
:host([variant="filled"][color="inverse"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--pap-button-inverse-filled-hover-icon, var(--pap-color-icon, #29292F)); }

:host([variant="filled"][color="inverse"]:not([disabled]).pressed),
:host([variant="filled"][color="inverse"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--pap-button-inverse-filled-pressed-background, var(--pap-color-bg-pressed, #C7CBD4));
  color: var(--pap-button-inverse-filled-pressed-text, var(--pap-color-text, #29292F)); }

:host([variant="filled"][color="inverse"]:not([disabled]).pressed) ::slotted(pap-icon),
:host([variant="filled"][color="inverse"]:not([disabled]):active) ::slotted(pap-icon) {
  color: var(--pap-button-inverse-filled-pressed-icon, var(--pap-color-icon, #29292F)); }

:host([variant="filled"][color="inverse"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="filled"][color="inverse"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--pap-button-inverse-filled-pressed-icon, var(--pap-color-icon, #29292F)); }

:host([variant="outlined"][color="inverse"]:not([disabled]).default),
:host([variant="outlined"][color="inverse"]:not([disabled])) {
  border-color: var(--pap-button-inverse-outlined-default-border, var(--pap-color-border-inverse-strong, #FFFFFF));
  color: var(--pap-button-inverse-outlined-default-text, var(--pap-color-text-oninverse, #FFFFFF)); }

:host([variant="outlined"][color="inverse"]:not([disabled]).default) ::slotted(pap-icon),
:host([variant="outlined"][color="inverse"]:not([disabled])) ::slotted(pap-icon) {
  color: var(--pap-button-inverse-outlined-default-icon, var(--pap-color-icon-oninverse, #FFFFFF)); }

:host([variant="outlined"][color="inverse"][loading="true"]:not([disabled]).default)::after,
:host([variant="outlined"][color="inverse"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--pap-button-inverse-outlined-default-icon, var(--pap-color-icon-oninverse, #FFFFFF)); }

:host([variant="outlined"][color="inverse"]:not([disabled]).hover),
:host([variant="outlined"][color="inverse"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--pap-button-inverse-outlined-hover-background, var(--pap-color-bg-hover, #DADDE3));
  color: var(--pap-button-inverse-outlined-hover-text, var(--pap-color-text, #29292F)); }

:host([variant="outlined"][color="inverse"]:not([disabled]).hover) ::slotted(pap-icon),
:host([variant="outlined"][color="inverse"]:not([disabled]):hover) ::slotted(pap-icon) {
  color: var(--pap-button-inverse-outlined-hover-icon, var(--pap-color-icon, #29292F)); }

:host([variant="outlined"][color="inverse"][loading="true"]:not([disabled]).hover)::after,
:host([variant="outlined"][color="inverse"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--pap-button-inverse-outlined-hover-icon, var(--pap-color-icon, #29292F)); }

:host([variant="outlined"][color="inverse"]:not([disabled]).pressed),
:host([variant="outlined"][color="inverse"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--pap-button-inverse-outlined-pressed-background, var(--pap-color-bg-pressed, #C7CBD4));
  color: var(--pap-button-inverse-outlined-pressed-text, var(--pap-color-text, #29292F)); }

:host([variant="outlined"][color="inverse"]:not([disabled]).pressed) ::slotted(pap-icon),
:host([variant="outlined"][color="inverse"]:not([disabled]):active) ::slotted(pap-icon) {
  color: var(--pap-button-inverse-outlined-pressed-icon, var(--pap-color-icon, #29292F)); }

:host([variant="outlined"][color="inverse"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="outlined"][color="inverse"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--pap-button-inverse-outlined-pressed-icon, var(--pap-color-icon, #29292F)); }

:host([variant="clear"][color="inverse"]:not([disabled]).default),
:host([variant="clear"][color="inverse"]:not([disabled])) {
  color: var(--pap-button-inverse-clear-default-text, var(--pap-color-text-oninverse, #FFFFFF)); }

:host([variant="clear"][color="inverse"]:not([disabled]).default) ::slotted(pap-icon),
:host([variant="clear"][color="inverse"]:not([disabled])) ::slotted(pap-icon) {
  color: var(--pap-button-inverse-clear-default-icon, var(--pap-color-icon-oninverse, #FFFFFF)); }

:host([variant="clear"][color="inverse"][loading="true"]:not([disabled]).default)::after,
:host([variant="clear"][color="inverse"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--pap-button-inverse-clear-default-icon, var(--pap-color-icon-oninverse, #FFFFFF)); }

:host([variant="clear"][color="inverse"]:not([disabled]).hover),
:host([variant="clear"][color="inverse"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--pap-button-inverse-clear-hover-background, var(--pap-color-bg-inverse-hover, #4D4E58));
  color: var(--pap-button-inverse-clear-hover-text, var(--pap-color-text-oninverse-hover, #FFFFFF)); }

:host([variant="clear"][color="inverse"]:not([disabled]).hover) ::slotted(pap-icon),
:host([variant="clear"][color="inverse"]:not([disabled]):hover) ::slotted(pap-icon) {
  color: var(--pap-button-inverse-clear-hover-icon, var(--pap-color-icon-oninverse-hover, #FFFFFF)); }

:host([variant="clear"][color="inverse"][loading="true"]:not([disabled]).hover)::after,
:host([variant="clear"][color="inverse"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--pap-button-inverse-clear-hover-icon, var(--pap-color-icon-oninverse-hover, #FFFFFF)); }

:host([variant="clear"][color="inverse"]:not([disabled]).pressed),
:host([variant="clear"][color="inverse"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--pap-button-inverse-clear-pressed-background, var(--pap-color-bg-inverse-pressed, #6E7087));
  color: var(--pap-button-inverse-clear-pressed-text, var(--pap-color-text-oninverse-pressed, #FFFFFF)); }

:host([variant="clear"][color="inverse"]:not([disabled]).pressed) ::slotted(pap-icon),
:host([variant="clear"][color="inverse"]:not([disabled]):active) ::slotted(pap-icon) {
  color: var(--pap-button-inverse-clear-pressed-icon, var(--pap-color-icon-oninverse-pressed, #FFFFFF)); }

:host([variant="clear"][color="inverse"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="clear"][color="inverse"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--pap-button-inverse-clear-pressed-icon, var(--pap-color-icon-oninverse-pressed, #FFFFFF)); }

:host([variant="filled"][color="danger"]:not([disabled]).default),
:host([variant="filled"][color="danger"]:not([disabled])) {
  border-color: transparent;
  background-color: var(--pap-button-danger-filled-default-background, var(--pap-color-bg-danger, #B70E1E));
  color: var(--pap-button-danger-filled-default-text, var(--pap-color-text-ondanger, #FFFFFF)); }

:host([variant="filled"][color="danger"]:not([disabled]).default) ::slotted(pap-icon),
:host([variant="filled"][color="danger"]:not([disabled])) ::slotted(pap-icon) {
  color: var(--pap-button-danger-filled-default-icon, var(--pap-color-icon-ondanger, #FFFFFF)); }

:host([variant="filled"][color="danger"][loading="true"]:not([disabled]).default)::after,
:host([variant="filled"][color="danger"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--pap-button-danger-filled-default-icon, var(--pap-color-icon-ondanger, #FFFFFF)); }

:host([variant="filled"][color="danger"]:not([disabled]).hover),
:host([variant="filled"][color="danger"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--pap-button-danger-filled-hover-background, var(--pap-color-bg-danger-hover, #A3111F));
  color: var(--pap-button-danger-filled-hover-text, var(--pap-color-text-ondanger-hover, #FFFFFF)); }

:host([variant="filled"][color="danger"]:not([disabled]).hover) ::slotted(pap-icon),
:host([variant="filled"][color="danger"]:not([disabled]):hover) ::slotted(pap-icon) {
  color: var(--pap-button-danger-filled-hover-icon, var(--pap-color-icon-ondanger-hover, #FFFFFF)); }

:host([variant="filled"][color="danger"][loading="true"]:not([disabled]).hover)::after,
:host([variant="filled"][color="danger"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--pap-button-danger-filled-hover-icon, var(--pap-color-icon-ondanger-hover, #FFFFFF)); }

:host([variant="filled"][color="danger"]:not([disabled]).pressed),
:host([variant="filled"][color="danger"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--pap-button-danger-filled-pressed-background, var(--pap-color-bg-danger-pressed, #871520));
  color: var(--pap-button-danger-filled-pressed-text, var(--pap-color-text-ondanger-pressed, #FFFFFF)); }

:host([variant="filled"][color="danger"]:not([disabled]).pressed) ::slotted(pap-icon),
:host([variant="filled"][color="danger"]:not([disabled]):active) ::slotted(pap-icon) {
  color: var(--pap-button-danger-filled-pressed-icon, var(--pap-color-icon-ondanger-pressed, #FFFFFF)); }

:host([variant="filled"][color="danger"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="filled"][color="danger"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--pap-button-danger-filled-pressed-icon, var(--pap-color-icon-ondanger-pressed, #FFFFFF)); }

:host([variant="outlined"][color="danger"]:not([disabled]).default),
:host([variant="outlined"][color="danger"]:not([disabled])) {
  border-color: var(--pap-button-danger-outlined-default-border, var(--pap-color-border-danger, #B70E1E));
  color: var(--pap-button-danger-outlined-default-text, var(--pap-color-text-danger, #A3111F)); }

:host([variant="outlined"][color="danger"]:not([disabled]).default) ::slotted(pap-icon),
:host([variant="outlined"][color="danger"]:not([disabled])) ::slotted(pap-icon) {
  color: var(--pap-button-danger-outlined-default-icon, var(--pap-color-icon-danger, #A3111F)); }

:host([variant="outlined"][color="danger"][loading="true"]:not([disabled]).default)::after,
:host([variant="outlined"][color="danger"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--pap-button-danger-outlined-default-icon, var(--pap-color-icon-danger, #A3111F)); }

:host([variant="outlined"][color="danger"]:not([disabled]).hover),
:host([variant="outlined"][color="danger"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--pap-button-danger-outlined-hover-background, var(--pap-color-bg-danger-hover, #A3111F));
  color: var(--pap-button-danger-outlined-hover-text, var(--pap-color-text-ondanger-hover, #FFFFFF)); }

:host([variant="outlined"][color="danger"]:not([disabled]).hover) ::slotted(pap-icon),
:host([variant="outlined"][color="danger"]:not([disabled]):hover) ::slotted(pap-icon) {
  color: var(--pap-button-danger-outlined-hover-icon, var(--pap-color-icon-ondanger-hover, #FFFFFF)); }

:host([variant="outlined"][color="danger"][loading="true"]:not([disabled]).hover)::after,
:host([variant="outlined"][color="danger"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--pap-button-danger-outlined-hover-icon, var(--pap-color-icon-ondanger-hover, #FFFFFF)); }

:host([variant="outlined"][color="danger"]:not([disabled]).pressed),
:host([variant="outlined"][color="danger"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--pap-button-danger-outlined-pressed-background, var(--pap-color-bg-danger-pressed, #871520));
  color: var(--pap-button-danger-outlined-pressed-text, var(--pap-color-text-ondanger-pressed, #FFFFFF)); }

:host([variant="outlined"][color="danger"]:not([disabled]).pressed) ::slotted(pap-icon),
:host([variant="outlined"][color="danger"]:not([disabled]):active) ::slotted(pap-icon) {
  color: var(--pap-button-danger-outlined-pressed-icon, var(--pap-color-icon-ondanger-pressed, #FFFFFF)); }

:host([variant="outlined"][color="danger"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="outlined"][color="danger"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--pap-button-danger-outlined-pressed-icon, var(--pap-color-icon-ondanger-pressed, #FFFFFF)); }

:host([variant="clear"][color="danger"]:not([disabled]).default),
:host([variant="clear"][color="danger"]:not([disabled])) {
  color: var(--pap-button-danger-clear-default-text, var(--pap-color-text-danger, #A3111F)); }

:host([variant="clear"][color="danger"]:not([disabled]).default) ::slotted(pap-icon),
:host([variant="clear"][color="danger"]:not([disabled])) ::slotted(pap-icon) {
  color: var(--pap-button-danger-clear-default-icon, var(--pap-color-icon-danger, #A3111F)); }

:host([variant="clear"][color="danger"][loading="true"]:not([disabled]).default)::after,
:host([variant="clear"][color="danger"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--pap-button-danger-clear-default-icon, var(--pap-color-icon-danger, #A3111F)); }

:host([variant="clear"][color="danger"]:not([disabled]).hover),
:host([variant="clear"][color="danger"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--pap-button-danger-clear-hover-background, var(--pap-color-bg-danger-hover, #A3111F));
  color: var(--pap-button-danger-clear-hover-text, var(--pap-color-text-ondanger-hover, #FFFFFF)); }

:host([variant="clear"][color="danger"]:not([disabled]).hover) ::slotted(pap-icon),
:host([variant="clear"][color="danger"]:not([disabled]):hover) ::slotted(pap-icon) {
  color: var(--pap-button-danger-clear-hover-icon, var(--pap-color-icon-ondanger-hover, #FFFFFF)); }

:host([variant="clear"][color="danger"][loading="true"]:not([disabled]).hover)::after,
:host([variant="clear"][color="danger"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--pap-button-danger-clear-hover-icon, var(--pap-color-icon-ondanger-hover, #FFFFFF)); }

:host([variant="clear"][color="danger"]:not([disabled]).pressed),
:host([variant="clear"][color="danger"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--pap-button-danger-clear-pressed-background, var(--pap-color-bg-danger-pressed, #871520));
  color: var(--pap-button-danger-clear-pressed-text, var(--pap-color-text-ondanger-pressed, #FFFFFF)); }

:host([variant="clear"][color="danger"]:not([disabled]).pressed) ::slotted(pap-icon),
:host([variant="clear"][color="danger"]:not([disabled]):active) ::slotted(pap-icon) {
  color: var(--pap-button-danger-clear-pressed-icon, var(--pap-color-icon-ondanger-pressed, #FFFFFF)); }

:host([variant="clear"][color="danger"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="clear"][color="danger"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--pap-button-danger-clear-pressed-icon, var(--pap-color-icon-ondanger-pressed, #FFFFFF)); }

:host([variant="filled"][color="success"]:not([disabled]).default),
:host([variant="filled"][color="success"]:not([disabled])) {
  border-color: transparent;
  background-color: var(--pap-button-success-filled-default-background, var(--pap-color-bg-success, #2E701B));
  color: var(--pap-button-success-filled-default-text, var(--pap-color-text-onsuccess, #FFFFFF)); }

:host([variant="filled"][color="success"]:not([disabled]).default) ::slotted(pap-icon),
:host([variant="filled"][color="success"]:not([disabled])) ::slotted(pap-icon) {
  color: var(--pap-button-success-filled-default-icon, var(--pap-color-icon-onsuccess, #FFFFFF)); }

:host([variant="filled"][color="success"][loading="true"]:not([disabled]).default)::after,
:host([variant="filled"][color="success"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--pap-button-success-filled-default-icon, var(--pap-color-icon-onsuccess, #FFFFFF)); }

:host([variant="filled"][color="success"]:not([disabled]).hover),
:host([variant="filled"][color="success"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--pap-button-success-filled-hover-background, var(--pap-color-bg-success-hover, #29591B));
  color: var(--pap-button-success-filled-hover-text, var(--pap-color-text-onsuccess-hover, #FFFFFF)); }

:host([variant="filled"][color="success"]:not([disabled]).hover) ::slotted(pap-icon),
:host([variant="filled"][color="success"]:not([disabled]):hover) ::slotted(pap-icon) {
  color: var(--pap-button-success-filled-hover-icon, var(--pap-color-icon-onsuccess-hover, #FFFFFF)); }

:host([variant="filled"][color="success"][loading="true"]:not([disabled]).hover)::after,
:host([variant="filled"][color="success"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--pap-button-success-filled-hover-icon, var(--pap-color-icon-onsuccess-hover, #FFFFFF)); }

:host([variant="filled"][color="success"]:not([disabled]).pressed),
:host([variant="filled"][color="success"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--pap-button-success-filled-pressed-background, var(--pap-color-bg-success-pressed, #244C1B));
  color: var(--pap-button-success-filled-pressed-text, var(--pap-color-text-onsuccess-pressed, #FFFFFF)); }

:host([variant="filled"][color="success"]:not([disabled]).pressed) ::slotted(pap-icon),
:host([variant="filled"][color="success"]:not([disabled]):active) ::slotted(pap-icon) {
  color: var(--pap-button-success-filled-pressed-icon, var(--pap-color-icon-onsuccess-pressed, #FFFFFF)); }

:host([variant="filled"][color="success"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="filled"][color="success"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--pap-button-success-filled-pressed-icon, var(--pap-color-icon-onsuccess-pressed, #FFFFFF)); }

:host([variant="outlined"][color="success"]:not([disabled]).default),
:host([variant="outlined"][color="success"]:not([disabled])) {
  border-color: var(--pap-button-success-outlined-default-border, var(--pap-color-border-success, #2E701B));
  color: var(--pap-button-success-outlined-default-text, var(--pap-color-text-success, #29591B)); }

:host([variant="outlined"][color="success"]:not([disabled]).default) ::slotted(pap-icon),
:host([variant="outlined"][color="success"]:not([disabled])) ::slotted(pap-icon) {
  color: var(--pap-button-success-outlined-default-icon, var(--pap-color-icon-success, #29591B)); }

:host([variant="outlined"][color="success"][loading="true"]:not([disabled]).default)::after,
:host([variant="outlined"][color="success"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--pap-button-success-outlined-default-icon, var(--pap-color-icon-success, #29591B)); }

:host([variant="outlined"][color="success"]:not([disabled]).hover),
:host([variant="outlined"][color="success"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--pap-button-success-outlined-hover-background, var(--pap-color-bg-success-hover, #29591B));
  color: var(--pap-button-success-outlined-hover-text, var(--pap-color-text-onsuccess-hover, #FFFFFF)); }

:host([variant="outlined"][color="success"]:not([disabled]).hover) ::slotted(pap-icon),
:host([variant="outlined"][color="success"]:not([disabled]):hover) ::slotted(pap-icon) {
  color: var(--pap-button-success-outlined-hover-icon, var(--pap-color-icon-onsuccess-hover, #FFFFFF)); }

:host([variant="outlined"][color="success"][loading="true"]:not([disabled]).hover)::after,
:host([variant="outlined"][color="success"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--pap-button-success-outlined-hover-icon, var(--pap-color-icon-onsuccess-hover, #FFFFFF)); }

:host([variant="outlined"][color="success"]:not([disabled]).pressed),
:host([variant="outlined"][color="success"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--pap-button-success-outlined-pressed-background, var(--pap-color-bg-success-pressed, #244C1B));
  color: var(--pap-button-success-outlined-pressed-text, var(--pap-color-text-onsuccess-pressed, #FFFFFF)); }

:host([variant="outlined"][color="success"]:not([disabled]).pressed) ::slotted(pap-icon),
:host([variant="outlined"][color="success"]:not([disabled]):active) ::slotted(pap-icon) {
  color: var(--pap-button-success-outlined-pressed-icon, var(--pap-color-icon-onsuccess-pressed, #FFFFFF)); }

:host([variant="outlined"][color="success"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="outlined"][color="success"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--pap-button-success-outlined-pressed-icon, var(--pap-color-icon-onsuccess-pressed, #FFFFFF)); }

:host([variant="clear"][color="success"]:not([disabled]).default),
:host([variant="clear"][color="success"]:not([disabled])) {
  color: var(--pap-button-success-clear-default-text, var(--pap-color-text-success, #29591B)); }

:host([variant="clear"][color="success"]:not([disabled]).default) ::slotted(pap-icon),
:host([variant="clear"][color="success"]:not([disabled])) ::slotted(pap-icon) {
  color: var(--pap-button-success-clear-default-icon, var(--pap-color-icon-success, #29591B)); }

:host([variant="clear"][color="success"][loading="true"]:not([disabled]).default)::after,
:host([variant="clear"][color="success"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--pap-button-success-clear-default-icon, var(--pap-color-icon-success, #29591B)); }

:host([variant="clear"][color="success"]:not([disabled]).hover),
:host([variant="clear"][color="success"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--pap-button-success-clear-hover-background, var(--pap-color-bg-success-hover, #29591B));
  color: var(--pap-button-success-clear-hover-text, var(--pap-color-text-onsuccess-hover, #FFFFFF)); }

:host([variant="clear"][color="success"]:not([disabled]).hover) ::slotted(pap-icon),
:host([variant="clear"][color="success"]:not([disabled]):hover) ::slotted(pap-icon) {
  color: var(--pap-button-success-clear-hover-icon, var(--pap-color-icon-onsuccess-hover, #FFFFFF)); }

:host([variant="clear"][color="success"][loading="true"]:not([disabled]).hover)::after,
:host([variant="clear"][color="success"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--pap-button-success-clear-hover-icon, var(--pap-color-icon-onsuccess-hover, #FFFFFF)); }

:host([variant="clear"][color="success"]:not([disabled]).pressed),
:host([variant="clear"][color="success"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--pap-button-success-clear-pressed-background, var(--pap-color-bg-success-pressed, #244C1B));
  color: var(--pap-button-success-clear-pressed-text, var(--pap-color-text-onsuccess-pressed, #FFFFFF)); }

:host([variant="clear"][color="success"]:not([disabled]).pressed) ::slotted(pap-icon),
:host([variant="clear"][color="success"]:not([disabled]):active) ::slotted(pap-icon) {
  color: var(--pap-button-success-clear-pressed-icon, var(--pap-color-icon-onsuccess-pressed, #FFFFFF)); }

:host([variant="clear"][color="success"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="clear"][color="success"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--pap-button-success-clear-pressed-icon, var(--pap-color-icon-onsuccess-pressed, #FFFFFF)); }

:host([variant="filled"][color="warning"]:not([disabled]).default),
:host([variant="filled"][color="warning"]:not([disabled])) {
  border-color: transparent;
  background-color: var(--pap-button-warning-filled-default-background, var(--pap-color-bg-warning, #FFA800));
  color: var(--pap-button-warning-filled-default-text, var(--pap-color-text-onwarning, #29292F)); }

:host([variant="filled"][color="warning"]:not([disabled]).default) ::slotted(pap-icon),
:host([variant="filled"][color="warning"]:not([disabled])) ::slotted(pap-icon) {
  color: var(--pap-button-warning-filled-default-icon, var(--pap-color-icon-onwarning, #29292F)); }

:host([variant="filled"][color="warning"][loading="true"]:not([disabled]).default)::after,
:host([variant="filled"][color="warning"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--pap-button-warning-filled-default-icon, var(--pap-color-icon-onwarning, #29292F)); }

:host([variant="filled"][color="warning"]:not([disabled]).hover),
:host([variant="filled"][color="warning"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--pap-button-warning-filled-hover-background, var(--pap-color-bg-warning-hover, #E27F00));
  color: var(--pap-button-warning-filled-hover-text, var(--pap-color-text-onwarning-hover, #FFFFFF)); }

:host([variant="filled"][color="warning"]:not([disabled]).hover) ::slotted(pap-icon),
:host([variant="filled"][color="warning"]:not([disabled]):hover) ::slotted(pap-icon) {
  color: var(--pap-button-warning-filled-hover-icon, var(--pap-color-icon-onwarning-hover, #FFFFFF)); }

:host([variant="filled"][color="warning"][loading="true"]:not([disabled]).hover)::after,
:host([variant="filled"][color="warning"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--pap-button-warning-filled-hover-icon, var(--pap-color-icon-onwarning-hover, #FFFFFF)); }

:host([variant="filled"][color="warning"]:not([disabled]).pressed),
:host([variant="filled"][color="warning"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--pap-button-warning-filled-pressed-background, var(--pap-color-bg-warning-pressed, #BB5802));
  color: var(--pap-button-warning-filled-pressed-text, var(--pap-color-text-onwarning-pressed, #FFFFFF)); }

:host([variant="filled"][color="warning"]:not([disabled]).pressed) ::slotted(pap-icon),
:host([variant="filled"][color="warning"]:not([disabled]):active) ::slotted(pap-icon) {
  color: var(--pap-button-warning-filled-pressed-icon, var(--pap-color-icon-onwarning-pressed, #FFFFFF)); }

:host([variant="filled"][color="warning"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="filled"][color="warning"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--pap-button-warning-filled-pressed-icon, var(--pap-color-icon-onwarning-pressed, #FFFFFF)); }

:host([variant="outlined"][color="warning"]:not([disabled]).default),
:host([variant="outlined"][color="warning"]:not([disabled])) {
  border-color: var(--pap-button-warning-outlined-default-border, var(--pap-color-border-warning, #E27F00));
  color: var(--pap-button-warning-outlined-default-text, var(--pap-color-text-warning, #984308)); }

:host([variant="outlined"][color="warning"]:not([disabled]).default) ::slotted(pap-icon),
:host([variant="outlined"][color="warning"]:not([disabled])) ::slotted(pap-icon) {
  color: var(--pap-button-warning-outlined-default-icon, var(--pap-color-icon-warning, #E27F00)); }

:host([variant="outlined"][color="warning"][loading="true"]:not([disabled]).default)::after,
:host([variant="outlined"][color="warning"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--pap-button-warning-outlined-default-icon, var(--pap-color-icon-warning, #E27F00)); }

:host([variant="outlined"][color="warning"]:not([disabled]).hover),
:host([variant="outlined"][color="warning"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--pap-button-warning-outlined-hover-background, var(--pap-color-bg-warning-hover, #E27F00));
  color: var(--pap-button-warning-outlined-hover-text, var(--pap-color-text-onwarning-hover, #FFFFFF)); }

:host([variant="outlined"][color="warning"]:not([disabled]).hover) ::slotted(pap-icon),
:host([variant="outlined"][color="warning"]:not([disabled]):hover) ::slotted(pap-icon) {
  color: var(--pap-button-warning-outlined-hover-icon, var(--pap-color-icon-onwarning-hover, #FFFFFF)); }

:host([variant="outlined"][color="warning"][loading="true"]:not([disabled]).hover)::after,
:host([variant="outlined"][color="warning"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--pap-button-warning-outlined-hover-icon, var(--pap-color-icon-onwarning-hover, #FFFFFF)); }

:host([variant="outlined"][color="warning"]:not([disabled]).pressed),
:host([variant="outlined"][color="warning"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--pap-button-warning-outlined-pressed-background, var(--pap-color-bg-warning-pressed, #BB5802));
  color: var(--pap-button-warning-outlined-pressed-text, var(--pap-color-text-onwarning-pressed, #FFFFFF)); }

:host([variant="outlined"][color="warning"]:not([disabled]).pressed) ::slotted(pap-icon),
:host([variant="outlined"][color="warning"]:not([disabled]):active) ::slotted(pap-icon) {
  color: var(--pap-button-warning-outlined-pressed-icon, var(--pap-color-icon-onwarning-pressed, #FFFFFF)); }

:host([variant="outlined"][color="warning"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="outlined"][color="warning"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--pap-button-warning-outlined-pressed-icon, var(--pap-color-icon-onwarning-pressed, #FFFFFF)); }

:host([variant="clear"][color="warning"]:not([disabled]).default),
:host([variant="clear"][color="warning"]:not([disabled])) {
  color: var(--pap-button-warning-clear-default-text, var(--pap-color-text-warning, #984308)); }

:host([variant="clear"][color="warning"]:not([disabled]).default) ::slotted(pap-icon),
:host([variant="clear"][color="warning"]:not([disabled])) ::slotted(pap-icon) {
  color: var(--pap-button-warning-clear-default-icon, var(--pap-color-icon-warning, #E27F00)); }

:host([variant="clear"][color="warning"][loading="true"]:not([disabled]).default)::after,
:host([variant="clear"][color="warning"][loading="true"]:not([disabled]))::after {
  border-top: 2px solid var(--pap-button-warning-clear-default-icon, var(--pap-color-icon-warning, #E27F00)); }

:host([variant="clear"][color="warning"]:not([disabled]).hover),
:host([variant="clear"][color="warning"]:not([disabled]):hover) {
  border-color: transparent;
  background-color: var(--pap-button-warning-clear-hover-background, var(--pap-color-bg-warning-hover, #E27F00));
  color: var(--pap-button-warning-clear-hover-text, var(--pap-color-text-onwarning-hover, #FFFFFF)); }

:host([variant="clear"][color="warning"]:not([disabled]).hover) ::slotted(pap-icon),
:host([variant="clear"][color="warning"]:not([disabled]):hover) ::slotted(pap-icon) {
  color: var(--pap-button-warning-clear-hover-icon, var(--pap-color-icon-onwarning-hover, #FFFFFF)); }

:host([variant="clear"][color="warning"][loading="true"]:not([disabled]).hover)::after,
:host([variant="clear"][color="warning"][loading="true"]:not([disabled]):hover)::after {
  border-top: 2px solid var(--pap-button-warning-clear-hover-icon, var(--pap-color-icon-onwarning-hover, #FFFFFF)); }

:host([variant="clear"][color="warning"]:not([disabled]).pressed),
:host([variant="clear"][color="warning"]:not([disabled]):active) {
  border-color: transparent;
  background-color: var(--pap-button-warning-clear-pressed-background, var(--pap-color-bg-warning-pressed, #BB5802));
  color: var(--pap-button-warning-clear-pressed-text, var(--pap-color-text-onwarning-pressed, #FFFFFF)); }

:host([variant="clear"][color="warning"]:not([disabled]).pressed) ::slotted(pap-icon),
:host([variant="clear"][color="warning"]:not([disabled]):active) ::slotted(pap-icon) {
  color: var(--pap-button-warning-clear-pressed-icon, var(--pap-color-icon-onwarning-pressed, #FFFFFF)); }

:host([variant="clear"][color="warning"][loading="true"]:not([disabled]).pressed)::after,
:host([variant="clear"][color="warning"][loading="true"]:not([disabled]):active)::after {
  border-top: 2px solid var(--pap-button-warning-clear-pressed-icon, var(--pap-color-icon-onwarning-pressed, #FFFFFF)); }

:host([disabled="true"]) {
  cursor: var(--pap-button-cursor-disabled, not-allowed);
  color: var(--pap-button-disabled-text, var(--pap-color-text-disabled, #A3A9B7)); }

:host([disabled="true"]) ::slotted(pap-icon) {
  color: var(--pap-button-icon-disabled, var(--pap-color-icon-disabled, #A3A9B7)); }

:host([variant="filled"][disabled="true"]) {
  background-color: var(--pap-button-disabled-filled-background, var(--pap-color-bg-disabled, #DADDE3)); }

:host([variant="outlined"][disabled="true"]) {
  border-color: var(--pap-button-disabled-outlined-border, var(--pap-color-border-disabled, #A3A9B7)) !important; }

:host(.focus),
:host(:focus-visible) {
  outline-offset: 2px;
  outline: 2px solid var(--pap-color-border-strong, #29292F) !important; }

:host([disabled="true"]:focus),
:host([disabled="true"].focus),
:host([disabled="true"]:focus-visible),
:host([disabled="true"]:focus-within) {
  outline: none !important; }

:host([loading="true"])::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--field-size-smaller, 24px);
  height: var(--field-size-smaller, 24px);
  border-radius: 50%;
  display: inline-block;
  border-right: 2px solid transparent;
  box-sizing: border-box;
  animation: spin 1s linear infinite;
  /* This line sets up the animation */ }

:host([loading="true"]) span.content,
:host([loading="true"]) ::slotted(*) {
  display: none !important; }

:host([loading="true"][mode="hug"]) {
  width: 110px; }

:host([size="small"]) {
  min-height: var(--pap-button-height-small, 2rem);
  height: fit-content; }

:host([size="small"]:not([circle="true"])) {
  min-width: var(--pap-button-min-width-small, 4.5rem); }

:host([circle="true"][size="small"]) {
  padding: 0;
  min-width: auto !important;
  justify-content: center;
  width: var(--pap-button-width-small, 2rem); }

:host([size="medium"]) {
  min-height: var(--pap-button-height-medium, 2.5rem);
  height: fit-content; }

:host([size="medium"]:not([circle="true"])) {
  min-width: var(--pap-button-min-width-medium, 5.625rem); }

:host([circle="true"][size="medium"]) {
  padding: 0;
  min-width: auto !important;
  justify-content: center;
  width: var(--pap-button-width-medium, 2.5rem); }

:host([size="large"]) {
  min-height: var(--pap-button-height-large, 3rem);
  height: fit-content; }

:host([size="large"]:not([circle="true"])) {
  min-width: var(--pap-button-min-width-large, 6.75rem); }

:host([circle="true"][size="large"]) {
  padding: 0;
  min-width: auto !important;
  justify-content: center;
  width: var(--pap-button-width-large, 3rem); }

@keyframes spin {
  0% {
    transform: translate(-50%, -50%) rotate(0deg); }
  100% {
    transform: translate(-50%, -50%) rotate(360deg); } }`;
  var o2 = class extends BoxTemplate {
    constructor() {
      super(...arguments);
      this.type = "button";
      this.size = "medium";
      this.circle = false;
      this.loading = false;
      this.textvariant = "B1";
      this.mode = "hug";
      this.variant = "filled";
      this.tabIndex = 1;
      this.color = "primary";
      this.ontypeupdate = () => {
        ["submit", "reset"].includes(this.type) ? setTimeout(() => {
          this.formelement || (this.formelement = this.shadow_closest("form"));
        }, 100) : this.formelement = void 0;
      };
      this.handlekeyup = (t6) => {
        (t6.key || t6.code).toLowerCase() === "enter" && this.hasFocus && this.dispatchEvent(new Event("click"));
      };
      this.handleclick = () => {
        this.href ? window.location.href = this.href : this.formelement && (this.type === "submit" ? this.formelement.requestSubmit() : this.type === "reset" && this.formelement.reset());
      };
    }
    connectedCallback() {
      super.connectedCallback(), this.addEventListener("click", this.handleclick, true), window.addEventListener("keyup", this.handlekeyup), this.role = "button";
    }
    disconnectedCallback() {
      super.disconnectedCallback(), window.removeEventListener("keyup", this.handlekeyup);
    }
    render() {
      return `
            <slot name="prefix"></slot>
            <span part="content" class="content"><slot></slot></span>
            <slot name="suffix"></slot>
        `;
    }
  };
  o2.style = p, r3([property({ rerender: false, onUpdate: "ontypeupdate" })], o2.prototype, "type", 2), r3([property({ rerender: false })], o2.prototype, "size", 2), r3([property({ rerender: false })], o2.prototype, "href", 2), r3([property({ rerender: false, type: Boolean })], o2.prototype, "circle", 2), r3([property({ rerender: false, type: Boolean })], o2.prototype, "loading", 2), r3([property({ rerender: false })], o2.prototype, "textvariant", 2), r3([property({ rerender: false })], o2.prototype, "mode", 2), r3([property({ rerender: false })], o2.prototype, "variant", 2), r3([property({ rerender: false, type: Number })], o2.prototype, "tabIndex", 2), r3([property({ rerender: false })], o2.prototype, "color", 2);
  var c3 = customElements != null ? customElements : window == null ? void 0 : window.customElements;
  if (!c3)
    throw new Error("Custom Elements not supported");
  c3.get("pap-button") || c3.define("pap-button", o2);

  // ../asset/dist/src/component.js
  var AssetTemplate = class extends BaseSystem {
    constructor() {
      super(...arguments);
      this.assetBase = "/public";
      this.cache = false;
    }
    async loadAsset(file, isurl = false) {
      try {
        let filename = file;
        if (filename[0] === "/")
          filename = filename.slice(1, filename.length);
        const url = isurl ? file : `${this.assetBase}/${filename}`;
        if (this.cache) {
          const item = window.localStorage.getItem(`pap-assets-${url}`);
          if (item) {
            return item;
          }
        }
        const response = await fetch(url);
        if (response.ok) {
          return response;
        } else {
          console.error("Error fetching asset:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error fetching asset:", error);
      }
      return null;
    }
    assetBaseUpdate(_value, _old) {
      if (this.assetBase[this.assetBase.length - 1] === "/") {
        this.assetBase = this.assetBase.slice(0, this.assetBase.length - 1);
      }
    }
    cacheData(file, data) {
      let filename = file;
      if (filename[0] === "/")
        filename = filename.slice(1, filename.length);
      const url = `${this.assetBase}/${filename}`;
      window.localStorage.setItem(`pap-assets-${url}`, data);
    }
  };
  __decorate([
    property({ onUpdate: "assetBaseUpdate", attribute: "asset-base" })
  ], AssetTemplate.prototype, "assetBase", void 0);
  __decorate([
    property({ type: Boolean })
  ], AssetTemplate.prototype, "cache", void 0);

  // ../../atoms/icon/dist/register.bundle.mjs
  var p2 = Object.defineProperty;
  var u2 = Object.getOwnPropertyDescriptor;
  var n = (c6, a5, t6, s3) => {
    for (var e4 = s3 > 1 ? void 0 : s3 ? u2(a5, t6) : a5, i7 = c6.length - 1, r9; i7 >= 0; i7--)
      (r9 = c6[i7]) && (e4 = (s3 ? r9(a5, t6, e4) : r9(e4)) || e4);
    return s3 && e4 && p2(a5, t6, e4), e4;
  };
  var d3 = `:host {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: var(--icon-custom-size);
  height: var(--icon-custom-size); }

:host([size="small"]) {
  --icon-custom-size: var(--icon-size-small, 16px); }

:host([size="medium"]) {
  --icon-custom-size: var(--icon-size-medium, 20px); }

:host([size="large"]) {
  --icon-custom-size: var(--icon-size-large, 40px); }

:host(:not([container])) svg {
  width: inherit;
  height: inherit; }

:host([container]) {
  display: flex; }
  :host([container]) svg {
    width: var(--icon-custom-size);
    height: var(--icon-custom-size); }

:host([container="small"]) {
  width: var(--field-size-small, 32px);
  height: var(--field-size-small, 32px); }

:host([container="medium"]) {
  width: var(--field-size-medium, 40px);
  height: var(--field-size-medium, 40px); }

:host([container="large"]) {
  width: var(--field-size-large, 56px);
  height: var(--field-size-large, 56px); }

svg {
  fill: currentColor; }

:host([data-hide-slot="true"])::part(fallback) {
  display: none; }

:host([data-hide-slot="false"]) {
  width: fit-content; }
  :host([data-hide-slot="false"]) svg {
    display: none; }`;
  var o3 = class extends AssetTemplate {
    constructor() {
      super();
      this.content = "";
      this.size = "medium";
      this.render_mode = "greedy", this.assetBase = "/icons";
    }
    firstUpdate() {
      if (this.shadowRoot) {
        let t6 = this.shadowRoot.querySelector("svg");
        if (t6 === null)
          throw new Error("Could not find svg element");
        this.svgElement = t6, this.content && this.setSVG();
      }
    }
    async updateName() {
      let t6 = `${this.name}.svg`;
      try {
        let s3 = await this.loadAsset(t6);
        if (s3) {
          let e4, i7 = "0 96 960 960";
          if (typeof s3 == "string")
            e4 = s3;
          else {
            e4 = await s3.text();
            let [r9, m8] = this.extractSvgContent(e4);
            m8 && (i7 = m8), r9 && (e4 = `SVG:${i7}##${r9.trim()}`, this.cacheData(t6, e4));
          }
          e4.startsWith("SVG:") ? (this.setAttribute("data-hide-slot", "true"), this.content = e4, this.getAttribute("show") && console.log(e4), this.setSVG()) : this.setAttribute("data-hide-slot", "false");
        } else
          this.setAttribute("data-hide-slot", "false");
      } catch (s3) {
        console.log("im hidden"), this.setAttribute("data-hide-slot", "false");
      }
    }
    updateColor() {
      this.color && (this.style.color = this.color);
    }
    updateSize() {
      this.style.removeProperty("--icon-custom-size");
    }
    updateCustomSize() {
      this.customSize !== void 0 && this.style.setProperty("--icon-custom-size", this.customSize + "px");
    }
    extractSvgContent(t6) {
      let i7 = new DOMParser().parseFromString(t6, "image/svg+xml").querySelector("svg");
      return i7 ? [i7.innerHTML, i7.getAttribute("viewBox")] : ["", ""];
    }
    setSVG() {
      if (this.svgElement) {
        let t6 = /SVG:(.*)##/.exec(this.content);
        if (t6) {
          let s3 = this.content.split(t6[1])[1];
          this.svgElement.setAttribute("viewBox", t6[1]), this.getAttribute("show") && console.log(this.content, t6, s3), this.svgElement.innerHTML = s3;
        }
      }
    }
    render() {
      return html`
      <slot part="fallback"></slot>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 96 960 960"
        part="svg"
      >
        ${this.content}
      </svg>
    `;
    }
  };
  o3.style = d3, n([property({ rerender: false })], o3.prototype, "container", 2), n([property({ onUpdate: "updateName", rerender: false })], o3.prototype, "name", 2), n([property({ onUpdate: "updateColor", rerender: false })], o3.prototype, "color", 2), n([property({ onUpdate: "updateSize", rerender: false })], o3.prototype, "size", 2), n([property({ onUpdate: "updateCustomSize", rerender: false, type: Number })], o3.prototype, "customSize", 2);
  var h2 = customElements != null ? customElements : window == null ? void 0 : window.customElements;
  if (!h2)
    throw new Error("Custom Elements not supported");
  h2.get("pap-icon") || h2.define("pap-icon", o3);

  // ../form-element/dist/src/component.js
  var FormElementTemplate = class extends BaseSystem {
    findForm() {
      setTimeout(() => {
        const closestOFORM = this.shadow_closest("pap-form");
        if (closestOFORM) {
          const form = closestOFORM.querySelector("form");
          if (form)
            this.assignForm(form);
        } else {
          const form = this.shadow_closest("form");
          if (form)
            this.assignForm(form);
        }
      }, 100);
    }
    assignForm(form) {
      this.formElement = form;
      this.dispatchEvent(new Event("form-element-loaded"));
    }
    connectedCallback() {
      super.connectedCallback();
      this.findForm();
    }
    firstUpdate() {
      if (!this.formElement)
        this.findForm();
    }
  };
  __decorate([
    property({ type: Boolean, rerender: false })
  ], FormElementTemplate.prototype, "disabled", void 0);
  __decorate([
    property({ type: Boolean, rerender: false })
  ], FormElementTemplate.prototype, "required", void 0);
  __decorate([
    property({ rerender: false })
  ], FormElementTemplate.prototype, "name", void 0);

  // ../box/dist/register.bundle.mjs
  var x2 = Object.defineProperty;
  var h3 = Object.getOwnPropertyDescriptor;
  var l2 = (s3, o6, t6, e4) => {
    for (var r9 = e4 > 1 ? void 0 : e4 ? h3(o6, t6) : o6, i7 = s3.length - 1, n4; i7 >= 0; i7--)
      (n4 = s3[i7]) && (r9 = (e4 ? n4(o6, t6, r9) : n4(r9)) || r9);
    return e4 && r9 && x2(o6, t6, r9), r9;
  };
  var v3 = `:host([radius="none"]) {
  border-radius: var(--box-radius-none, var(--radius-none, 0px)); }

:host([radius="small"]) {
  border-radius: var(--box-radius-small, var(--radius-small, var(--radius-small, 4px))); }

:host([radius="medium"]) {
  border-radius: var(--box-radius-medium, var(--radius-medium, var(--radius-medium, 8px))); }

:host([radius="large"]) {
  border-radius: var(--box-radius-large, var(--radius-large, var(--radius-large, 16px))); }

:host([radius="circular"]) {
  border-radius: var(--box-radius-circular, var(--radius-circular, var(--radius-max, 1000px))); }

:host([elevation="small"]) {
  box-shadow: var(--box-shadow-small, var(--shadow-s, 0 2px 4px var(--pap-color-shadow, color-mix(in oklab, var(--pap-color-neutral-600, #6E7087), transparent 80%)))); }

:host([elevation="medium"]) {
  box-shadow: var(--box-shadow-medium, var(--shadow-m, 0 4px 6px var(--pap-color-shadow, color-mix(in oklab, var(--pap-color-neutral-600, #6E7087), transparent 80%)))); }

:host([elevation="large"]) {
  box-shadow: var(--box-shadow-large, var(--shadow-l, 0 8px 12px var(--pap-color-shadow, color-mix(in oklab, var(--pap-color-neutral-600, #6E7087), transparent 80%)))); }

:host([elevation="x-large"]) {
  box-shadow: var(--box-shadow-x-large, var(--shadow-xl, 0 16px 20px var(--pap-color-shadow, color-mix(in oklab, var(--pap-color-neutral-600, #6E7087), transparent 80%)))); }

:host([elevation-direction="horizontal"][elevation="small"]) {
  box-shadow: var(--box-shadow-small, var(--shadow-horizontal-s, 2px 0 4px var(--pap-color-shadow, color-mix(in oklab, var(--pap-color-neutral-600, #6E7087), transparent 80%)))); }

:host([elevation-direction="horizontal"][elevation="medium"]) {
  box-shadow: var(--box-shadow-medium, var(--shadow-horizontal-m, 4px 0 6px var(--pap-color-shadow, color-mix(in oklab, var(--pap-color-neutral-600, #6E7087), transparent 80%)))); }

:host([elevation-direction="horizontal"][elevation="large"]) {
  box-shadow: var(--box-shadow-large, var(--shadow-horizontal-l, 8px 0 12px var(--pap-color-shadow, color-mix(in oklab, var(--pap-color-neutral-600, #6E7087), transparent 80%)))); }

:host([elevation-direction="horizontal"][elevation="x-large"]) {
  box-shadow: var(--box-shadow-x-large, var(--shadow-horizontal-xl, 16px 0 20px var(--pap-color-shadow, color-mix(in oklab, var(--pap-color-neutral-600, #6E7087), transparent 80%)))); }`;
  var a = class extends BaseSystem {
    constructor() {
      super(...arguments);
      this.radius = "circular";
      this.elevation = "none";
      this.elevationdirection = "vertical";
    }
    render() {
      return `
            <slot></slot>
        `;
    }
  };
  a.styles = [v3], l2([property({ rerender: false })], a.prototype, "radius", 2), l2([property({ rerender: false })], a.prototype, "elevation", 2), l2([property({ rerender: false, attribute: "elevation-direction" })], a.prototype, "elevationdirection", 2);
  var p3 = customElements != null ? customElements : window == null ? void 0 : window.customElements;
  if (!p3)
    throw new Error("Custom Elements not supported");
  p3.get("pap-box-template") || p3.define("pap-box-template", a);

  // dist/src/style.js
  var style8 = `:host([size="small"]) pap-box-template.wrapper {
  height: var(--pap-field-height-small, var(--field-size-small, 32px)); }

:host([size="small"]) footer,
:host([size="small"]) header {
  height: var(--pap-field-block-height-small, var(--field-size-small, 32px)); }

:host([size="medium"]) pap-box-template.wrapper {
  height: var(--pap-field-height-medium, var(--field-size-medium, 40px)); }

:host([size="medium"]) footer,
:host([size="medium"]) header {
  height: var(--pap-field-block-height-medium, var(--field-size-small, 32px)); }

:host([size="large"]) pap-box-template.wrapper {
  height: var(--pap-field-height-large, var(--field-size-large, 56px)); }

:host([size="large"]) footer,
:host([size="large"]) header {
  height: var(--pap-field-block-height-large, var(--field-size-small, 32px)); }

:host {
  --border: var(--pap-field-background-color-light, var(--pap-color-black, black));
  --outline: var(--pap-field-background-color-light, rgb(90, 46, 250));
  --color: var(--pap-field-text-color-light, var(--pap-color-black, black));
  display: block;
  color: var(--color); }
  :host footer,
  :host header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-inline: var(--padding-small, 8px); }
  :host footer div {
    display: none;
    align-items: center;
    gap: var(--gap-small, 8px); }
  :host pap-box-template.wrapper {
    box-sizing: border-box;
    position: relative;
    display: flex;
    align-items: center;
    padding-inline: var(--padding-medium, 16px);
    border: 1px solid var(--border); }
    :host pap-box-template.wrapper ::slotted(*:not([slot])),
    :host pap-box-template.wrapper input, :host pap-box-template.wrapper select, :host pap-box-template.wrapper textarea {
      color: inherit;
      font-family: var(--input-fontfamily, var(--typography-c3-fontfamily, "Libre Franklin", helvetica, sans-serif));
      font-size: var(--input-fontsize, var(--typography-c3-fontsize, 16px));
      font-weight: var(--input-fontweight, var(--typography-c3-fontweight, 400));
      line-height: var(--input-lineheight, var(--typography-c3-lineheight, 24px));
      letter-spacing: var(--input-letterspacing, var(--typography-c3-letterspacing, 0.01em));
      flex-grow: 1;
      display: block;
      border: none;
      background-color: transparent;
      outline: none !important; }
    :host pap-box-template.wrapper ::slotted(*[slot="prefix"]) {
      margin-right: var(--gap-small, 8px); }
    :host pap-box-template.wrapper ::slotted(*[slot="suffix"]) {
      margin-left: var(--gap-small, 8px); }
  :host:focus {
    outline: none; }

:host([isWarning="true"]) footer div:not(.warning) {
  display: none; }

:host([isWarning="true"]) footer div.warning {
  display: flex; }

:host([isError="true"]) footer div:not(.error) {
  display: none; }

:host([isError="true"]) footer div.error {
  display: flex; }

:host([hasfocus="true"]),
:host(:focus) {
  outline: none; }
  :host([hasfocus="true"]) pap-box-template.wrapper,
  :host(:focus) pap-box-template.wrapper {
    outline: 1px solid var(--outline); }

@media (prefers-color-scheme: dark) {
  :host {
    --border: var(--pap-field-background-color-dark, var(--pap-color-black, white));
    --outline: var(--pap-field-background-color-dark, rgb(195, 211, 255));
    --color: var(--pap-field-text-color-dark, var(--pap-color-black, white)); } }`;

  // dist/src/types.js
  var ValidationAttributes = ["min", "max", "pattern", "type", "minlenght", "maxlenght", "required", "multiple", "novalidate", "formnovalidate", "autofocus"];

  // dist/src/component.js
  var FieldTemplate = class extends FormElementTemplate {
    assignHiddenElement() {
      if (!this.formElement)
        this.findForm();
      if (!this.hiddenElement && this.getAttribute("name")) {
        this.hiddenElement = document.createElement("input");
        this.hiddenElement.value = this.value;
        this.hiddenElement.setAttribute("name", this.getAttribute("name"));
        this.hiddenElement.style.overflow = "hidden";
        this.hiddenElement.style.position = "absolute";
        this.hiddenElement.style.height = "0";
        this.hiddenElement.style.width = "0";
        this.hiddenElement.style.visibility = "hidden";
        this.hiddenElement.style.padding = "0";
        this.hiddenElement.style.margin = "0";
        this.hiddenElement.style.float = "right";
        this.hiddenElement.addEventListener("valid", this.handlevalid);
        this.hiddenElement.addEventListener("invalid", this.handleinvalid);
        while (this.attributequeue.length > 0) {
          const next = this.attributequeue.pop();
          if (next) {
            if (next[1] !== null)
              this.hiddenElement.setAttribute(next[0], next[1]);
            else
              this.hiddenElement.removeAttribute(next[0]);
          }
        }
        this.formElement.appendChild(this.hiddenElement);
      }
    }
    updateHidden() {
      if (this.hiddenElement) {
        const valid = this.hiddenElement.checkValidity();
        if (!valid) {
          const validity = this.hiddenElement.validity;
          for (let type in validity) {
            if (!validity[type])
              continue;
            if (this.customError && this.customError[type]) {
              if (this.errorText) {
                this.errorText.innerHTML = this.customError[type];
                this.isWarning = false;
                this.isError = true;
                return;
              }
            } else if (this.customWarning && this.customWarning[type]) {
              if (this.warningText) {
                this.warningText.innerHTML = this.customWarning[type];
                this.isWarning = true;
                this.isError = false;
                return;
              }
            } else {
              const auto_message = this.hiddenElement.validationMessage;
              if (this.errorText) {
                this.errorText.innerHTML = auto_message;
                this.isWarning = false;
                this.isError = true;
                return;
              }
            }
          }
        } else {
          this.handlevalid();
        }
      }
    }
    checkValidity() {
      if (this.hiddenElement)
        return this.hiddenElement.checkValidity();
      return false;
    }
    reportValidity() {
      if (this.hiddenElement)
        return this.hiddenElement.reportValidity();
      return false;
    }
    // class functions
    constructor(delay = 100) {
      super();
      this.size = "medium";
      this.radius = "small";
      this.tabIndex = 1;
      this.readonly = false;
      this.value = "";
      this.isError = false;
      this.isWarning = false;
      this._suffix = "<span> </span>";
      this._prefix = "<span> </span>";
      this.attributequeue = [];
      this.onvalueupdate = (value) => {
        if (!this.inputElement)
          return;
        const type = this.inputElement.getAttribute("type");
        if ("checked" in this.inputElement && (type === "radio" || type === "checkbox")) {
          this.checked = value === "true";
          this.inputElement.checked = this.checked;
          if (this.hiddenElement) {
            this.hiddenElement.checked = this.checked;
            this.hiddenElement.value = this.value;
            this.updateHidden();
          }
          if (!this.checked) {
            this.inputElement.removeAttribute("checked");
            if (this.hiddenElement) {
              this.hiddenElement.removeAttribute("checked");
              this.updateHidden();
            }
          }
        } else if ("value" in this.inputElement) {
          this.inputElement.value = this.value;
        }
        if (type === "radio" || type === "checkbox" || this.inputElement.getAttribute("data-tagname") === "select" || this.inputElement.tagName === "select") {
          this.inputElement.dispatchEvent(new Event("change"));
        } else {
          this.inputElement.dispatchEvent(new Event("input"));
        }
      };
      this.oncheckedupdate = (value) => {
        this.onvalueupdate(value.toString());
      };
      this.handleinvalid_field = (e4) => {
        console.log("invalid");
      };
      this.handlevalid_field = (e4) => {
        console.log("valid");
      };
      this.handleinput_field = (e4) => {
        this.handlechange_field(e4, false);
        this.dispatchEvent(new Event("input"));
        this.debouncedInput();
        if (this.maxLength && this.counterElement) {
          this.counterElement.innerHTML = this.value.length.toString();
        }
      };
      this.handlechange_field = (e4, dispatch = true) => {
        if (e4.target instanceof HTMLElement) {
          const type = e4.target.getAttribute("type");
          if ("checked" in e4.target && (type === "radio" || type === "checkbox")) {
            this.value = (e4.target.checked || false).toString();
            if (this.hiddenElement) {
              this.hiddenElement.value = this.value;
              this.updateHidden();
            }
          } else if ("value" in e4.target) {
            this.value = e4.target.value;
            if (this.hiddenElement) {
              this.hiddenElement.value = this.value;
              this.updateHidden();
            }
          }
          if (dispatch) {
            this.dispatchEvent(new Event("change"));
          }
        }
      };
      this.handleformelementload = () => {
        this.assignHiddenElement();
      };
      this.handlevalid = () => {
        this.isError = false;
        this.isWarning = false;
      };
      this.handleinvalid = (e4) => {
        if (!(this.isError && this.isWarning))
          this.updateHidden();
      };
      this.debouncedInput = () => {
        this.dispatchEvent(new Event("debounced-input"));
      };
      this.handlefocus = () => {
        if (this.inputElement) {
          this.inputElement.focus();
        }
      };
      this.debouncedInput = debounce(this.debouncedInput, delay);
      this.updateHidden = debounce(this.updateHidden, 10);
      super.addEventListener("form-element-loaded", this.handleformelementload);
    }
    connectedCallback() {
      super.connectedCallback();
      this.addEventListener("focus", this.handlefocus);
    }
    attributeChangedCallback(name, oldValue, newValue) {
      if (ValidationAttributes.includes(name.toLowerCase())) {
        if (this.hiddenElement) {
          if (newValue)
            this.hiddenElement.setAttribute(name, newValue);
          else
            this.hiddenElement.removeAttribute(name);
        } else {
          this.attributequeue.push([name, newValue]);
        }
        if (this.inputElement) {
          if (newValue)
            this.inputElement.setAttribute(name, newValue);
          else
            this.inputElement.removeAttribute(name);
        }
      }
    }
    render(element, selector = "input") {
      if (element) {
        const input = element.querySelector(selector);
        if (input && !input.hasAttribute("data-field-init")) {
          input.addEventListener("invalid", this.handleinvalid_field);
          input.addEventListener("valid", this.handlevalid_field);
          input.addEventListener("input", this.handleinput_field);
          input.addEventListener("change", this.handlechange_field);
          const type = input.getAttribute("type");
          if (type === "radio" || type === "checkbox") {
            if (this.checked) {
              input.setAttribute("checked", this.checked.toString());
            } else {
              input.removeAttribute("checked");
            }
          } else {
            if (this.value !== void 0) {
              input.setAttribute("value", this.value);
            }
          }
          if (this.readonly)
            input.setAttribute("readonly", "true");
          input.setAttribute("data-field-init", "true");
          this.inputElement = input;
          this.onvalueupdate(this.value);
        }
      }
      return html`
      <header part="header">
        <slot name="header"><pap-typography>${this.label || ""}</pap-typography></slot>
        ${this.maxLength ? html`<pap-typography><span class="counter"></span>/${this.maxLength}</pap-typography>` : ""}
      </header>
      <pap-box-template radius="${this.radius}" class="wrapper" part="wrapper">
        <slot name="prefix">${this._prefix}</slot>
        ${element ? element : "<slot></slot>"}
        <slot name="suffix">${this._suffix}</slot>
      </pap-box-template>
      <footer part="footer">
        <div class="warning">
          <pap-icon name="warning"></pap-icon>
          <pap-typography>This is a placeholder for warning</pap-typography>
        </div>
        <div class="error">
          <pap-icon name="error"></pap-icon>
          <pap-typography>This is a placeholder for error</pap-typography>
        </div>
      </footer>
    `;
    }
  };
  FieldTemplate.styles = [style8];
  __decorate([
    query(".counter")
  ], FieldTemplate.prototype, "counterElement", void 0);
  __decorate([
    query(".error > pap-typography")
  ], FieldTemplate.prototype, "errorText", void 0);
  __decorate([
    query(".warning > pap-typography")
  ], FieldTemplate.prototype, "warningText", void 0);
  __decorate([
    property({ type: Object })
  ], FieldTemplate.prototype, "message", void 0);
  __decorate([
    property()
  ], FieldTemplate.prototype, "label", void 0);
  __decorate([
    property({ rerender: false })
  ], FieldTemplate.prototype, "size", void 0);
  __decorate([
    property({ rerender: false })
  ], FieldTemplate.prototype, "radius", void 0);
  __decorate([
    property({ rerender: false, type: Boolean, onUpdate: "oncheckedupdate" })
  ], FieldTemplate.prototype, "checked", void 0);
  __decorate([
    property({ rerender: false, type: Number })
  ], FieldTemplate.prototype, "tabIndex", void 0);
  __decorate([
    property({ type: Boolean })
  ], FieldTemplate.prototype, "readonly", void 0);
  __decorate([
    property({ rerender: false, onUpdate: "onvalueupdate" })
  ], FieldTemplate.prototype, "value", void 0);
  __decorate([
    property({ rerender: false, type: Object })
  ], FieldTemplate.prototype, "customError", void 0);
  __decorate([
    property({ rerender: false, type: Object })
  ], FieldTemplate.prototype, "customWarning", void 0);
  __decorate([
    property({ rerender: false, type: Boolean })
  ], FieldTemplate.prototype, "isError", void 0);
  __decorate([
    property({ rerender: false, type: Boolean })
  ], FieldTemplate.prototype, "isWarning", void 0);
  __decorate([
    property({ rerender: false, type: Number })
  ], FieldTemplate.prototype, "max", void 0);
  __decorate([
    property({ rerender: false, type: Number })
  ], FieldTemplate.prototype, "min", void 0);
  __decorate([
    property({ rerender: false, type: Number })
  ], FieldTemplate.prototype, "maxLength", void 0);
  __decorate([
    property({ type: Object, attribute: false })
  ], FieldTemplate.prototype, "_suffix", void 0);
  __decorate([
    property({ type: Object, attribute: false })
  ], FieldTemplate.prototype, "_prefix", void 0);

  // ../../atoms/toggle/dist/register.bundle.mjs
  var i3 = `:host {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  color: var(--pap-color-icon, #29292F); }
  :host input {
    display: none !important; }
  :host::part(wrapper) {
    border: none;
    padding: 0;
    gap: 0;
    height: auto;
    border-radius: var(--radius-max, 1000px);
    margin-left: var(--margin-small, 8px); }
  :host pap-box-template.toggle {
    content: '';
    display: inline-block;
    padding: var(--padding-smaller, 4px);
    border: 1px solid var(--pap-color-border, #C7CBD4); }
    :host pap-box-template.toggle div {
      position: relative; }
      :host pap-box-template.toggle div span[part="indicator"] {
        position: absolute;
        transition: left ease var(--timing-fast, 80ms);
        content: '';
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background-color: var(--pap-color-bg-inverse, #29292F); }

:host([hasfocus="true"]),
:host(:focus) {
  outline: none; }
  :host([hasfocus="true"]) pap-box-template.wrapper,
  :host(:focus) pap-box-template.wrapper {
    outline: none !important; }
  :host([hasfocus="true"]) pap-box-template.toggle,
  :host(:focus) pap-box-template.toggle {
    outline: 1px solid var(--pap-color-border-strong, #29292F); }

:host([checked="false"]) span[part="indicator"] {
  left: 0; }

:host([size="small"]) pap-box-template.toggle {
  height: var(--unit-size3, 16px);
  width: var(--field-size-medium, 40px); }
  :host([size="small"]) pap-box-template.toggle div span[part="indicator"] {
    width: var(--unit-size3, 16px);
    height: var(--unit-size3, 16px); }

:host([size="small"][checked="true"]) span[part="indicator"] {
  left: calc(100% - var(--unit-size3, 16px)); }

:host([size="medium"]) pap-box-template.toggle {
  height: var(--field-size-smaller, 24px);
  width: var(--field-size-large, 56px); }
  :host([size="medium"]) pap-box-template.toggle div span[part="indicator"] {
    width: var(--field-size-smaller, 24px);
    height: var(--field-size-smaller, 24px); }

:host([size="medium"][checked="true"]) span[part="indicator"] {
  left: calc(100% - var(--field-size-smaller, 24px)); }

:host([size="large"]) pap-box-template.toggle {
  height: var(--field-size-small, 32px);
  width: calc(1.3 * var(--field-size-large, 56px)); }
  :host([size="large"]) pap-box-template.toggle div span[part="indicator"] {
    width: var(--field-size-small, 32px);
    height: var(--field-size-small, 32px); }

:host([size="large"][checked="true"]) span[part="indicator"] {
  left: calc(100% - var(--field-size-small, 32px)); }`;
  var e2 = class extends FieldTemplate {
    constructor() {
      super();
      this.handlekeyup = (a5) => {
        (a5.key || a5.code).toLowerCase() === "enter" && this.hasFocus && (this.value = (!this.checked).toString());
      };
      this.handleclick = () => {
        this.value = (!this.checked).toString();
      };
      this.size = "small", this.addEventListener("click", this.handleclick), this.addEventListener("keyup", this.handlekeyup);
    }
    render() {
      return super.render(html`
            <input type="checkbox" hidden />
            <pap-box-template class="toggle" radius="circular">
                <div>
                    <span part="indicator"><slot></slot></span>
                </div>
            </pap-box-template>
        `);
    }
  };
  e2.style = i3;
  var t2 = customElements != null ? customElements : window == null ? void 0 : window.customElements;
  if (!t2)
    throw new Error("Custom Elements not supported");
  t2.get("pap-toggle") || t2.define("pap-toggle", e2);

  // ../../molecules/codeblock/dist/register.bundle.mjs
  var j = Object.defineProperty;
  var B = Object.getOwnPropertyDescriptor;
  var m2 = (y6, u6, t6, e4) => {
    for (var a5 = e4 > 1 ? void 0 : e4 ? B(u6, t6) : u6, s3 = y6.length - 1, o6; s3 >= 0; s3--)
      (o6 = y6[s3]) && (a5 = (e4 ? o6(u6, t6, a5) : o6(a5)) || a5);
    return e4 && a5 && j(u6, t6, a5), a5;
  };
  var $ = `:host {
  display: block;
  margin-block: var(--margin-medium, 16px);
  color: var(--pap-color-text, #29292F); }
  :host .string {
    color: var(--pap-color-text-warning, #984308); }
  :host .keyword {
    color: var(--pap-color-text-danger, #A3111F); }
    :host .keyword.class, :host .keyword.implements, :host .keyword.extends, :host .keyword.this, :host .keyword.function {
      color: var(--pap-color-primary-500, #0CB9Eb); }
  :host .function-arg {
    color: var(--pap-color-text-warning, #984308); }
  :host .function-name {
    color: var(--pap-color-text-brand-strong, #002652); }
  :host div.line {
    min-height: 12px;
    color: var(--pap-color-text, #29292F); }
  :host .html-attribute {
    padding-left: var(--padding-smaller, 4px); }
    :host .html-attribute .html-attribute-name {
      color: var(--pap-color-primary-700, #0177A3); }
    :host .html-attribute .html-attribute-value {
      color: var(--pap-color-text-warning, #984308); }
  :host .html-tag {
    color: var(--pap-color-neutral-700, #4D4E58); }
  :host .html-tag-name {
    color: var(--pap-color-primary-500, #0CB9Eb); }
  :host code pap-box-template {
    background-color: var(--pap-color-bg-secondary, #F6F7F8);
    overflow: hidden;
    display: block; }
    :host code pap-box-template header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: inherit;
      background-color: var(--pap-color-bg-tertiary, #EAEBEF); }
      :host code pap-box-template header > pap-typography {
        text-indent: var(--padding-medium, 16px); }
      :host code pap-box-template header pap-toggle {
        color: var(--pap-color-text, #29292F); }
      :host code pap-box-template header pap-button pap-icon[name="done"] {
        display: none; }
      :host code pap-box-template header pap-button pap-icon[name="content_paste"] {
        display: initial; }
    :host code pap-box-template main {
      min-height: var(--unit-size5, 32px);
      padding: var(--padding-medium, 16px) var(--padding-large, 24px); }
  :host fieldset {
    background-color: var(--pap-color-bg, #FFFFFF); }

:host([display="code"]) fieldset {
  display: none; }

:host(.copied) header pap-button pap-icon[name="done"] {
  display: initial; }

:host(.copied) header pap-button pap-icon[name="content_paste"] {
  display: none; }`;
  var N = 2;
  var O = 180;
  var S = ["(", "[", "{"];
  var Z = [")", "]", "}"];
  var l3 = class extends BaseSystem {
    constructor() {
      super(...arguments);
      this.display = "code";
      this.themetoggle = true;
      this.value = "";
      this.timer = -1;
      this._indentationLevel = 0;
      this.stack = [];
      this.language = "text";
      this.onmainload = () => {
        this.value && this.format(this.value);
      };
      this.handlecopy = () => {
        navigator.clipboard.writeText(this.value).then(() => {
          console.log("Copied to clipboard"), clearTimeout(this.timer), this.copytext.innerHTML = "Copied!", this.timer = setTimeout(() => {
            this.copytext.innerHTML = "Copy code";
          }, 2e3);
        }, (t6) => {
          console.error("Failed to copy text: ", t6);
        });
      };
      this.handletogglechange = (t6) => {
        t6.target.checked ? (this.classList.remove("theme-light"), this.classList.add("theme-dark")) : (this.classList.add("theme-light"), this.classList.remove("theme-dark"));
      };
      this.handleslotchange = (t6) => {
        if (t6.target instanceof HTMLSlotElement) {
          if (this.value)
            return;
          let e4 = [], a5 = t6.target.assignedNodes();
          for (let s3 of a5)
            s3.nodeType === Node.TEXT_NODE ? s3.textContent && s3.textContent.trim() !== "" && e4.push(s3.textContent) : "originalHTML" in s3 ? e4.push(s3.originalHTML) : e4.push(s3.outerHTML);
          this.format(e4.join(`
`));
        }
      };
    }
    set indentationLevel(t6) {
      this._indentationLevel = Math.max(0, t6);
    }
    get indentationLevel() {
      return this._indentationLevel;
    }
    FormatLine(t6, e4 = "") {
      let a5 = this.formatHTML(t6, e4);
      return a5 !== null ? a5 || null : this.formatCODE(t6, e4);
    }
    format(t6) {
      if (this.value = t6, !this.main)
        return;
      let e4 = this.value.split(`
`);
      for (let a5 = 0; a5 < e4.length; a5++) {
        let o6 = e4[a5].trim();
        if (o6 === "" && (a5 === 0 || a5 === e4.length - 1))
          continue;
        let c6 = this.FormatLine(o6);
        c6 !== null && this.appendLine(c6);
      }
    }
    formatCODE(t6, e4) {
      let a5 = t6, s3 = "\\b(def|print|async|await|this|export|switch|if|else|for|while|case|break|return|let|const|var|continue)\\b", o6 = `(["'])(?:\\\\.|[^\\\\])*?\\1`, c6 = "\\b(function)\\s+([a-zA-Z_$][0-9a-zA-Z_$]*)?\\s*\\(([^)]*)\\)", h8 = "\\b(class)\\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\\s*(extends\\s+([a-zA-Z_$][0-9a-zA-Z_$]*))?\\s*(implements\\s+([a-zA-Z_$][0-9a-zA-Z_$]*))?", p8 = new RegExp(`${o6}|${c6}|${h8}|${s3}`, "g");
      a5 = a5.replace(p8, (i7, d8, E4, g6, T3, M2, F, _, H, A2, C2) => {
        if (d8)
          return `<span class="string">${i7}</span>`;
        if (E4) {
          this.lang !== "html" && this.setLanguage("javascript");
          let L = g6 ? `<span class="function-name">${g6}</span>` : "", f6 = "";
          return T3 && (f6 = T3.split(",").map((b4) => `<span class="function-arg">${b4.trim()}</span>`).join(", ")), `<span class="keyword function">function</span> ${L}(<span class="function-args">${f6}</span>)`;
        }
        if (M2) {
          this.lang !== "html" && this.setLanguage("javascript");
          let L = `<span class="class-name">${F}</span>`, f6 = _ ? `<span class="keyword extends"> extends</span> <span class="extends-class">${H}</span>` : "", b4 = A2 ? `<span class="keyword implements"> implements</span> <span class="implements-class">${C2}</span>` : "";
          return `<span class="keyword class">class</span> ${L}${f6}${b4}`;
        }
        return this.lang !== "html" && this.setLanguage("javascript"), `<span class="keyword ${i7}">${i7}</span>`;
      });
      let n4 = 0;
      for (let i7 of S)
        a5.endsWith(i7) && (this.stack.push(i7), n4++);
      let r9 = a5.match(new RegExp(`^(${Z.map((i7) => "\\" + i7).join("|")})+`));
      if (r9) {
        let i7 = r9[0].length;
        for (let d8 = 0; d8 < i7; d8++)
          this.stack.length > 0 && (this.stack.pop(), this.indentationLevel = Math.max(0, this.indentationLevel - 1));
      }
      return n4 === 0 ? e4 + a5 : (this.appendLine(e4 + a5), this.indentationLevel += n4, null);
    }
    formatHTML(t6, e4) {
      let a5 = /([^<]*)(<[^>]*>?)/, s3 = t6.match(a5);
      if (!s3)
        return null;
      ["javascript", "jsx"].includes(this.language) ? this.setLanguage("jsx") : this.setLanguage("html");
      let o6 = s3[1] || null, c6 = s3[2], h8 = t6.split(s3[0])[1], p8 = t6.length > O, n4 = e4;
      if (o6) {
        if (["script", "style"].includes(this.peek())) {
          let i7 = this.formatCODE(o6, e4);
          i7 && (o6 = i7);
        }
        n4 += o6, p8 && n4 && (this.appendLine(n4), n4 = "");
      }
      let r9 = this.formatHtmlTag(c6, p8, h8);
      if (r9 && (n4 ? n4 += r9 : n4 = r9), p8 && n4 && (console.warn("[codeblock] multiline but we see content!"), this.appendLine(n4), n4 = ""), h8) {
        let i7 = this.FormatLine(h8, e4);
        i7 && (p8 ? this.appendLine(i7) : n4 += i7);
      }
      return n4;
    }
    formatHtmlTag(t6, e4 = false, a5) {
      let s3 = t6.match(/<\/([\w-]+)>/);
      if (s3) {
        let r9 = s3[1];
        this.peek() === r9 && (this.stack.pop(), this.indentationLevel--);
        let i7 = `<span class="html-tag">&lt;/</span><span class="html-tag-name">${r9}</span><span class="html-tag">&gt;</span>`;
        if (e4)
          this.appendLine(i7);
        else
          return i7;
      }
      let o6 = t6.match(/<([\w-]+)([^>]*)/);
      if (!o6)
        return console.error("[codeblock] html but no html error"), null;
      let c6 = o6[1], h8 = o6[2] ? o6[2].trim().split(/\s/) : [], p8 = e4 || h8.length > N, n4 = `<span class="html-tag">&lt;</span><span class="html-tag-name">${c6}</span>`;
      p8 && (this.stack.push(c6), this.appendLine(n4), n4 = "", this.indentationLevel++);
      for (let r9 of h8) {
        let [i7, d8] = r9.split("="), g6 = `<span class="html-attribute ${p8 ? "indent" : ""}"><span class="html-attribute-name">${i7}</span>`;
        d8 && (g6 += `=<span class="html-attribute-value">${d8}</span>`), g6 += "</span>", p8 ? this.appendLine(g6) : n4 += g6;
      }
      if (!t6.endsWith("/>") && t6.endsWith(">")) {
        let r9 = '<span class="html-tag">&gt;</span>';
        if (p8)
          return this.indentationLevel--, this.appendLine(r9), this.indentationLevel++, null;
        if (p8 || !a5)
          return this.stack.push(c6), this.appendLine(n4 + r9), this.indentationLevel++, null;
        n4 += r9;
      }
      return n4;
    }
    appendLine(t6) {
      if (this.main) {
        let e4 = document.createElement("div");
        e4.className = "line", e4.style.paddingLeft = `calc(${this.indentationLevel} * var(--padding-medium, 16px))`, e4.innerHTML = t6, this.main.appendChild(e4);
      }
    }
    setLanguage(t6) {
      t6 !== this.language && (this.lang && t6 !== this.lang || (this.language = t6, this.languageElement && (this.languageElement.innerHTML = this.language)));
    }
    peek() {
      return this.stack[this.stack.length - 1];
    }
    render() {
      return html`
      <code>
        <pap-box-template radius="small">
          <header>
            <pap-typography id="language">${this.language}</pap-typography>
            ${this.themetoggle ? html`<pap-toggle 
              @change="${this.handletogglechange}" 
              value="${window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches}"
            >
              <pap-typography variant="C4" slot="prefix">light</pap-typography>
              <pap-typography variant="C4" slot="suffix">dark</pap-typography>
            </pap-toggle>` : ""}
            <pap-button 
              variant="clear" 
              size="small" 
              radius="none" 
              @click="${this.handlecopy}" 
            >
              <pap-icon cache name="done" slot="prefix"></pap-icon>
              <pap-icon cache name="content_paste" slot="prefix"></pap-icon>
              <pap-typography>Copy code</pap-typography>
            </pap-button>
          </header>
          <main></main>
        </pap-box-template>
      </code>
      <fieldset part="fieldset">
        <legend>
          <pap-typography>result</pap-typography>
        </legend>
        <slot @slotchange="${this.handleslotchange}"></slot>
      </fieldset>
    `;
    }
  };
  l3.style = $, m2([query({ selector: "main", onload: "onmainload" })], l3.prototype, "main", 2), m2([query("#language")], l3.prototype, "languageElement", 2), m2([query("header > pap-button > pap-typography")], l3.prototype, "copytext", 2), m2([query("fieldset")], l3.prototype, "fieldsetElement", 2), m2([property()], l3.prototype, "display", 2), m2([property({ type: Boolean })], l3.prototype, "themetoggle", 2), m2([property({ rerender: false, onUpdate: "setLanguage" })], l3.prototype, "lang", 2);
  var k = customElements != null ? customElements : window == null ? void 0 : window.customElements;
  if (!k)
    throw new Error("Custom Elements not supported");
  k.get("pap-codeblock") || k.define("pap-codeblock", l3);

  // ../../organisms/markdown/dist/register.bundle.mjs
  var g3 = Object.defineProperty;
  var f2 = Object.getOwnPropertyDescriptor;
  var p4 = (h8, n4, o6, r9) => {
    for (var t6 = r9 > 1 ? void 0 : r9 ? f2(n4, o6) : n4, l9 = h8.length - 1, a5; l9 >= 0; l9--)
      (a5 = h8[l9]) && (t6 = (r9 ? a5(n4, o6, t6) : a5(t6)) || t6);
    return r9 && t6 && g3(n4, o6, t6), t6;
  };
  var m3 = `:host {
  --background: var(--pap-markdown-background, var(--pap-color-bg, #FFFFFF));
  --block-background: var(--pap-markdown-block-background, var(--pap-color-bg-tertiary, #EAEBEF));
  --block-ribbon: var(--pap-markdown-block-ribbon, var(--pap-color-bg-brand, #009DD3));
  --border: var(--pap-markdown-border, var(--pap-color-border, #C7CBD4));
  --color: var(--pap-markdown-color, var(--pap-color-text, #29292F));
  --link: var(--pap-markdown-link, var(--pap-color-text-link, #0177A3));
  --link-hover: var(--pap-markdown-link-hover, var(--pap-color-text-link-oninverse, #36CEFA));
  --table-header-background: var(--pap-markdown-table-header-background, var(--pap-color-hover-400, rgba(0,0,0,0.1)));
  display: block;
  color: var(--color);
  background-color: var(--background);
  padding: 1rem 10%;
  font-family: inherit; }

table {
  color: inherit;
  width: 100%; }
  table thead {
    border-bottom-width: 1px;
    border-bottom-color: var(--border);
    border-bottom-style: solid; }
    table thead th {
      background-color: var(--table-header-background);
      border-top-width: 1px;
      border-top-color: var(--border);
      border-top-style: solid;
      border-left-width: 1px;
      border-left-color: var(--border);
      border-left-style: solid;
      border-bottom-width: 1px;
      border-bottom-color: var(--border);
      border-bottom-style: solid;
      padding: 0.25rem 0.75rem; }
      table thead th:first-child {
        border-top-left-radius: var(--radius-small, 4px); }
      table thead th:last-child {
        border-right-width: 1px;
        border-right-color: var(--border);
        border-right-style: solid;
        border-top-right-radius: var(--radius-small, 4px); }
  table tbody td {
    border-left-width: 1px;
    border-left-color: var(--border);
    border-left-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: var(--border);
    border-bottom-style: solid;
    padding: 0.25rem 0.75rem; }
    table tbody td:last-child {
      border-right-width: 1px;
      border-right-color: var(--border);
      border-right-style: solid; }
  table tbody tr:last-child td:last-child {
    border-bottom-right-radius: var(--radius-small, 4px); }
  table tbody tr:last-child td:first-child {
    border-bottom-left-radius: var(--radius-small, 4px); }

a {
  color: var(--link); }
  a:hover {
    text-decoration-thickness: 2px;
    color: var(--link-hover); }

h1 {
  border-bottom: var(--border) 1px solid; }

div.blockquote {
  background-color: var(--block-background);
  padding: 0.6rem;
  position: relative;
  padding-left: 1.2rem; }
  div.blockquote::after {
    width: 0.3rem;
    height: 100%;
    position: absolute;
    left: 0.3rem;
    top: 0;
    content: '';
    background-color: var(--block-ribbon); }

@media screen and (min-width: 1024px) {
  :host {
    padding: 1rem 20%; } }`;
  var c4 = class extends AssetTemplate {
    constructor() {
      super();
      this.content = "";
      this.codeblocks = [];
      this.render_mode = "greedy", this.assetBase = "/public/markdown";
    }
    async updateFILE() {
      try {
        let o6 = this.url ? this.url : this.file;
        if (!o6)
          throw new Error("must have a target");
        let r9 = await this.loadAsset(o6, !!this.url);
        if (!r9)
          throw new Error("something went wrong");
        if (typeof r9 == "string")
          return this.markdown(r9);
        let t6 = await r9.text();
        this.markdown(t6);
      } catch (o6) {
        console.error("failed to load markdown file");
      }
    }
    markdown(o6) {
      let r9 = o6.split(`
`), t6 = [], l9 = null;
      for (let a5 = 0; a5 < r9.length; a5++) {
        let e4 = r9[a5], s3 = this.block(r9, a5);
        if (s3) {
          l9 && (t6.push(`</${l9}>`), l9 = null), t6 = t6.concat(s3[0]), a5 = s3[1];
          continue;
        }
        e4.startsWith(">") ? (l9 === "p" ? (t6.push("</p>"), l9 = null) : l9 === null && (t6.push('<div class="blockquote">'), l9 = "div"), e4 = e4.slice(1).trim()) : e4 !== "" && l9 === null && (t6.push("<p>"), l9 = "p"), e4 === "" ? l9 && (t6.push(`</${l9}>`), l9 = null) : t6.push(this.generalLine(e4) + " ");
      }
      this.shadowRoot && (this.content = t6.join(""), this.requestUpdate());
    }
    updateCodeBlocks() {
      this.shadowRoot && this.shadowRoot.querySelectorAll("pap-codeblock").forEach((r9, t6) => r9.format(this.codeblocks[t6]));
    }
    block(o6, r9) {
      let t6 = [];
      if (o6[r9].startsWith("```")) {
        if (o6[r9].length > 3 && o6[r9].endsWith("```"))
          this.codeblocks.push(o6[r9].split("```")[1]), t6.push("<pap-codeblock themetoggle='false'></pap-codeblock>");
        else {
          let e4 = r9 + 1, s3 = o6[r9].split("```")[1].trim(), d8 = [];
          for (; !o6[e4].startsWith("```"); )
            d8.push(o6[e4]), e4++;
          this.codeblocks.push(d8.join(`
`)), t6.push(`<pap-codeblock themetoggle='false' lang="${s3}"></pap-codeblock>`), r9 = e4 + 1;
        }
        return [t6, r9];
      }
      if (o6[r9].startsWith("|")) {
        let e4 = o6[r9].split("|").filter((d8) => d8 !== "").map((d8) => `<th>${this.generalLine(d8).trim()}</th>`);
        t6.push(`<table cellspacing="0" cellpadding="5"><thead><tr>${e4.join("")}</tr></thead><tbody>`);
        let s3 = r9 + 2;
        for (; o6[s3].startsWith("|"); ) {
          let d8 = o6[s3].split("|").filter((i7) => i7 !== "").map((i7) => `<td>${this.generalLine(i7).trim()}</td>`);
          t6.push(`<tr>${d8.join("")}</tr>`), s3++;
        }
        return t6.push("</tbody></table>"), r9 = s3 - 1, [t6, r9];
      }
      let l9 = o6[r9].match(/^(#*)\s(\w*)/);
      if (l9) {
        let [e4, s3, d8] = l9, i7 = s3.length;
        return t6.push(`<h${i7}>${this.generalLine(d8)}</h${i7}>`), [t6, r9];
      }
      let a5 = o6[r9].match(/^(-|\d\.)\s/);
      if (a5) {
        a5[1] === "-" ? t6.push("<ul>") : t6.push("<ol>");
        let e4 = r9, s3;
        for (; s3 = o6[e4].match(/^(-|\d*\.)\s/); )
          t6.push(`<li>${this.generalLine(o6[e4].slice(s3[1].length + 1))}</li>`), e4++;
        return a5[1] === "-" ? t6.push("</ul>") : t6.push("</ol>"), r9 = e4 - 1, [t6, r9];
      }
      return null;
    }
    generalLine(o6) {
      let r9 = o6, t6 = o6.match(/\[(\w*)\]\(([\w:\/\.]*)\)/g);
      if (t6)
        for (let a5 of t6) {
          let e4 = o6.match(/\[(\w*)\]\(([\w:\/\.]*)\)/);
          if (e4) {
            let [s3, d8, i7] = e4;
            r9 = o6.replace(a5, `<a href="${i7}">${d8}</a>`);
          }
        }
      let l9 = o6.match(/[^`]`([^`]+)`/g);
      if (l9)
        for (let a5 of l9) {
          let e4 = a5.replace(/\`/g, "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
          r9 = o6.replace(a5, `<code>${e4}</code>`);
        }
      return r9;
    }
    render() {
      return this.content;
    }
  };
  c4.style = m3, p4([property({ onUpdate: "updateFILE" })], c4.prototype, "url", 2), p4([property({ onUpdate: "updateFILE" })], c4.prototype, "file", 2);
  var b = customElements != null ? customElements : window == null ? void 0 : window.customElements;
  if (!b)
    throw new Error("Custom Elements not supported");
  b.get("pap-markdown") || b.define("pap-markdown", c4);

  // ../../atoms/divider/dist/register.bundle.mjs
  var s = Object.defineProperty;
  var h4 = Object.getOwnPropertyDescriptor;
  var l4 = (i7, r9, a5, o6) => {
    for (var e4 = o6 > 1 ? void 0 : o6 ? h4(r9, a5) : r9, d8 = i7.length - 1, n4; d8 >= 0; d8--)
      (n4 = i7[d8]) && (e4 = (o6 ? n4(r9, a5, e4) : n4(e4)) || e4);
    return o6 && e4 && s(r9, a5, e4), e4;
  };
  var p5 = `:host div {
  background-color: var(--pap-divider-color, var(--pap-color-border, #C7CBD4));
  content: ''; }

:host([mode="horizontal"]) {
  display: flex;
  align-items: center;
  height: 16px; }
  :host([mode="horizontal"]) div {
    height: 1px;
    flex-grow: 1;
    transform: translateY(0.5px); }

:host([mode="vertical"]) {
  margin-inline: var(--divider-margin, 8px);
  height: 100%; }
  :host([mode="vertical"]) div {
    width: 1px;
    height: 100%; }`;
  var t3 = class extends BaseSystem {
    constructor() {
      super(...arguments);
      this.mode = "horizontal";
    }
    render() {
      return '<div part="line"></div>';
    }
  };
  t3.style = p5, l4([property({ rerender: false })], t3.prototype, "mode", 2);
  var m4 = customElements != null ? customElements : window == null ? void 0 : window.customElements;
  if (!m4)
    throw new Error("Custom Elements not supported");
  m4.get("pap-divider") || m4.define("pap-divider", t3);

  // ../../tools/theme/dist/src/types.js
  var THEMECHANGE_NAME = "pap-theme-change";
  var THEMEADD_NAME = "pap-theme-add";

  // ../../tools/theme/dist/src/theme.js
  function change(name) {
    var _a;
    if (!window.oTheme.map.has(name)) {
      throw new Error(`Theme: ${name} not found`);
    }
    const config = window.oTheme.map.get(name);
    if (!config) {
      throw new Error(`Theme: ${name} config not found`);
    }
    const previoustheme = document.querySelector(`link[theme]`);
    if (previoustheme) {
      (_a = previoustheme.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(previoustheme);
    }
    console.log("changing theme");
    if (name === "base") {
      window.oTheme.current = "base";
      window.dispatchEvent(new Event(THEMECHANGE_NAME));
      return;
    }
    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("theme", "true");
    link.setAttribute("href", `/themes/${config.name}`);
    document.head.appendChild(link);
    window.oTheme.current = config.name;
    window.dispatchEvent(new Event(THEMECHANGE_NAME));
  }
  function add(config) {
    window.oTheme.map.set(config.name, config);
    window.dispatchEvent(new Event(THEMEADD_NAME));
  }
  function init() {
    if (!window.oTheme) {
      window.oTheme = {
        change,
        add,
        current: "base",
        map: /* @__PURE__ */ new Map()
      };
    }
  }
  init();

  // ../../tools/translator/dist/register.bundle.mjs
  var h5 = `:host {
  padding: auto; }`;
  var r4 = "pap-translation-change";
  var T = "pap-translation-added";
  function m5(n4) {
    if (!n4.translations || typeof n4.translations != "object")
      throw new Error("you have to load a translation-data object<string,string>");
    window.oTranslation.map.set(n4.id, n4), window.oTranslation.change(n4.id), window.dispatchEvent(new Event(T));
  }
  function f3(n4) {
    let e4 = window.oTranslation.map.get(n4);
    if (!e4)
      throw new Error(`[error] translator-load-all: Could not find language set based on lang provided - ${n4}`);
    window.oTranslation.current = e4, window.dispatchEvent(new Event(r4));
  }
  function b2(n4) {
    try {
      n4.forEach((e4) => window.oTranslation.map.set(e4.id, e4)), window.dispatchEvent(new Event(T));
    } catch (e4) {
      console.error("[error] translator-load-all", e4);
    }
  }
  function E2(n4) {
    window.addEventListener(r4, n4);
  }
  function y3(n4) {
    window.removeEventListener(r4, n4);
  }
  function g4() {
    window.oTranslation = window.oTranslation || {}, window.oTranslation.load = window.oTranslation.load || m5, window.oTranslation.change = window.oTranslation.change || f3, window.oTranslation.loadAll = window.oTranslation.loadAll || b2, window.oTranslation.subscribe = window.oTranslation.subscribe || E2, window.oTranslation.unsubscribe = window.oTranslation.unsubscribe || y3, window.oTranslation.current = window.oTranslation.current || {}, window.oTranslation.map = window.oTranslation.map || /* @__PURE__ */ new Map();
  }
  var a2 = class extends BaseSystem {
    constructor() {
      super(...arguments);
      this.dynamicAttributes = /* @__PURE__ */ new Set();
      this.noupdate = false;
      this.handletranslateslotchange = (t6) => {
        if (t6.target instanceof HTMLSlotElement) {
          let o6 = ExtractSlotValue(t6.target).join(" ");
          this.Key = o6;
        }
      };
      this.updateText = () => {
        var d8, c6, p8;
        let t6 = ((p8 = (c6 = (d8 = window.oTranslation) == null ? void 0 : d8.current) == null ? void 0 : c6.translations) == null ? void 0 : p8[this.key]) || this.key;
        if (t6 === void 0 && this.key === void 0)
          return;
        let o6 = /{([^{}]+)}/g, i7 = t6.match(o6);
        i7 && i7.forEach((w) => {
          let s3 = w.slice(1, -1), u6 = this.getAttribute(s3);
          u6 && (t6 = t6.replace(w, u6), this.dynamicAttributes.has(s3) || this.dynamicAttributes.add(s3));
        }), this.text = t6, this.spanElement ? this.spanElement.innerText = t6 : this.noupdate || this.debouncedRequestUpdate(), this.noupdate = false;
      };
    }
    get Text() {
      return this.text;
    }
    get Key() {
      return this.key;
    }
    set Key(t6) {
      typeof t6 == "string" ? this.key = t6 : this.key = "", this.updateText();
    }
    connectedCallback() {
      var t6;
      super.connectedCallback(), g4(), (t6 = window.oTranslation) == null || t6.subscribe(this.updateText);
    }
    disconnectedCallback() {
      var t6;
      super.disconnectedCallback(), (t6 = window.oTranslation) == null || t6.unsubscribe(this.updateText);
    }
    attributeChangedCallback(t6, o6, i7) {
      this.dynamicAttributes.has(t6) && this.updateText();
    }
    firstUpdate() {
      if (this.shadowRoot) {
        let t6 = this.shadowRoot.querySelector("span.pap-translation-span");
        t6 && (this.spanElement = t6);
      }
    }
    translateKey(t6) {
      return this.key !== t6 && (this.noupdate = true, this.Key = t6), this.text;
    }
    render() {
      return html`
      <span class="pap-translation-span"></span>
      <slot style="display:none;" @slotchange="${this.handletranslateslotchange}"></slot>
    `;
    }
  };
  a2.style = h5;
  var l5 = customElements != null ? customElements : window == null ? void 0 : window.customElements;
  if (!l5)
    throw new Error("Custom Elements not supported");
  l5.get("pap-translator") || l5.define("pap-translator", a2);

  // ../../atoms/menu/dist/register.bundle.mjs
  var f4 = Object.defineProperty;
  var v4 = Object.getOwnPropertyDescriptor;
  var n2 = (p8, i7, t6, o6) => {
    for (var e4 = o6 > 1 ? void 0 : o6 ? v4(i7, t6) : i7, c6 = p8.length - 1, m8; c6 >= 0; c6--)
      (m8 = p8[c6]) && (e4 = (o6 ? m8(i7, t6, e4) : m8(e4)) || e4);
    return o6 && e4 && f4(i7, t6, e4), e4;
  };
  var u3 = `:host div {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
  padding: var(--pap-menuitem-padding, var(--padding-small, 8px)); }
  :host div:hover {
    background-color: var(--pap-menuitem-light-background-hover, var(--neutral-300, #F1F1F4)); }

:host([checked="false"]) pap-icon[name="check"] {
  display: none; }`;
  var r5 = class extends BaseSystem {
    constructor() {
      super();
      this.checked = false;
      this.value = "";
      this.slottext = "";
      this.handleclick = () => {
        this.checked = true, this.dispatchEvent(new Event("select"));
      };
      this.handleslotchange = (t6) => {
        if (t6.target instanceof HTMLSlotElement) {
          let o6 = ExtractSlotValue(t6.target);
          this.slottext = o6.join(" ");
        }
      };
      this.addEventListener("click", this.handleclick);
    }
    getvalue() {
      return this.value || this.slottext;
    }
    gettext() {
      return this.slottext;
    }
    render() {
      return html`
      <div>
        <pap-icon name="check" slot="prefix"></pap-icon>
        <slot @slotchange="${this.handleslotchange}"></slot>
      </div>
    `;
    }
  };
  r5.style = u3, n2([property({ type: Boolean, rerender: false })], r5.prototype, "checked", 2), n2([property({ attribute: false, rerender: false })], r5.prototype, "value", 2);
  var d4 = `:host {
  --menu-background: var(--pap-color-bg, #FFFFFF);
  --menu-color: var(--pap-color-text, #29292F);
  display: inline-block; }
  :host pap-button span.caret-wrapper {
    display: flex;
    justify-content: center;
    align-items: center; }
  :host pap-popover-template {
    display: inline-block; }
  :host pap-box-template {
    display: block;
    padding-block: var(--padding-small, 8px);
    min-width: 180px;
    background-color: var(--menu-background);
    max-height: 20rem;
    overflow-y: auto; }

:host([open="true"]) pap-button pap-icon[name="caret"] {
  transform: rotate(180deg); }

:host([open="false"]) pap-button pap-icon[name="caret"] {
  transform: rotate(0); }`;
  var a3 = class extends BaseSystem {
    constructor() {
      super(...arguments);
      this.open = false;
      this.placement = "bottom-center";
      this.size = "medium";
      this.buttonVariant = "clear";
      this.buttonColor = "secondary";
      this.buttonRadius = "medium";
      this.items = [];
      this.handleslotchange = (t6) => {
        t6.target instanceof HTMLSlotElement && t6.target.assignedElements().forEach((e4) => {
          e4 instanceof r5 && (e4.hasAttribute("data-menu-init") || (e4.addEventListener("select", this.handleitemselected), e4.setAttribute("data-menu-init", "true"), this.items.push(e4)));
        });
      };
      this.handleitemselected = (t6) => {
        t6.target instanceof r5 && (this.current && t6.target !== this.current && (this.current.checked = false), this.current = t6.target, this.dispatchEvent(new Event("select")));
      };
      this.handlehide = () => {
        this.open = false;
      };
      this.handleshow = () => {
        this.open = true;
      };
    }
    get value() {
      var t6;
      return ((t6 = this.current) == null ? void 0 : t6.getvalue()) || "";
    }
    set value(t6) {
      let o6 = this.items.find((e4) => e4.getvalue() === t6);
      o6 && o6.click();
    }
    get text() {
      var t6;
      return (t6 = this.current) == null ? void 0 : t6.gettext();
    }
    render() {
      return html`
      <pap-popover-template @hide="${this.handlehide}" @show="${this.handleshow}" revealby="click" hideonoutsideclick placement="${this.placement}">
        <pap-button 
          variant="${this.buttonVariant}" 
          color="${this.buttonColor}" 
          radius="${this.buttonRadius}" 
          part="button" 
          slot="target" 
          size="${this.size}"
        >
          <slot name="button-prefix" slot="prefix"></slot>
          <slot name="button-content"></slot>
          <slot name="button-suffix" slot="suffix">
            <pap-icon customSize="15" name="caret">v</pap-icon>
          </slot>
        </pap-button>
        <pap-box-template part="box" class="options" radius="small" elevation="small">
          <slot @slotchange="${this.handleslotchange}">
            <pap-menu-item>Missing Items</pap-menu-item>
          </slot>
        </pap-box-template>
      </pap-popover-template>
    `;
    }
  };
  a3.style = d4, n2([property({ rerender: false, type: Boolean })], a3.prototype, "open", 2), n2([property()], a3.prototype, "placement", 2), n2([property()], a3.prototype, "size", 2), n2([property()], a3.prototype, "buttonVariant", 2), n2([property()], a3.prototype, "buttonColor", 2), n2([property()], a3.prototype, "buttonRadius", 2);
  var l6 = customElements != null ? customElements : window == null ? void 0 : window.customElements;
  if (!l6)
    throw new Error("Custom Elements not supported");
  l6.get("pap-menu") || l6.define("pap-menu", a3);
  l6.get("pap-menu-item") || l6.define("pap-menu-item", r5);

  // ../../tools/translator/dist/src/style.js
  var style9 = `:host {
  padding: auto; }`;

  // ../../tools/translator/dist/src/translator.js
  var TRANSLATION_CHANGE_EVENTNAME = "pap-translation-change";
  var TRANSLATION_ADDED = "pap-translation-added";
  function load(set) {
    if (!set.translations || typeof set.translations !== "object")
      throw new Error("you have to load a translation-data object<string,string>");
    window.oTranslation.map.set(set.id, set);
    window.oTranslation.change(set.id);
    window.dispatchEvent(new Event(TRANSLATION_ADDED));
  }
  function change2(lang) {
    const set = window.oTranslation.map.get(lang);
    if (!set)
      throw new Error(`[error] translator-load-all: Could not find language set based on lang provided - ${lang}`);
    window.oTranslation.current = set;
    window.dispatchEvent(new Event(TRANSLATION_CHANGE_EVENTNAME));
  }
  function loadAll(array) {
    try {
      array.forEach((set) => window.oTranslation.map.set(set.id, set));
      window.dispatchEvent(new Event(TRANSLATION_ADDED));
    } catch (e4) {
      console.error("[error] translator-load-all", e4);
    }
  }
  function subscribe(callback) {
    window.addEventListener(TRANSLATION_CHANGE_EVENTNAME, callback);
  }
  function unsubscribe(callback) {
    window.removeEventListener(TRANSLATION_CHANGE_EVENTNAME, callback);
  }
  function InitTranslations() {
    window.oTranslation = window.oTranslation || {};
    window.oTranslation.load = window.oTranslation.load || load;
    window.oTranslation.change = window.oTranslation.change || change2;
    window.oTranslation.loadAll = window.oTranslation.loadAll || loadAll;
    window.oTranslation.subscribe = window.oTranslation.subscribe || subscribe;
    window.oTranslation.unsubscribe = window.oTranslation.unsubscribe || unsubscribe;
    window.oTranslation.current = window.oTranslation.current || {};
    window.oTranslation.map = window.oTranslation.map || /* @__PURE__ */ new Map();
  }

  // ../../tools/translator/dist/src/component.js
  var Translator = class extends BaseSystem {
    constructor() {
      super(...arguments);
      this.dynamicAttributes = /* @__PURE__ */ new Set();
      this.noupdate = false;
      this.handletranslateslotchange = (e4) => {
        if (e4.target instanceof HTMLSlotElement) {
          const nodetext = ExtractSlotValue(e4.target).join(" ");
          this.Key = nodetext;
        }
      };
      this.updateText = () => {
        var _a, _b, _c;
        let text = ((_c = (_b = (_a = window.oTranslation) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.translations) === null || _c === void 0 ? void 0 : _c[this.key]) || this.key;
        if (text === void 0 && this.key === void 0)
          return;
        const regex = /{([^{}]+)}/g;
        const matches = text.match(regex);
        if (matches) {
          matches.forEach((variable) => {
            const sliced = variable.slice(1, -1);
            const value = this.getAttribute(sliced);
            if (value) {
              text = text.replace(variable, value);
              if (!this.dynamicAttributes.has(sliced)) {
                this.dynamicAttributes.add(sliced);
              }
            }
          });
        }
        this.text = text;
        if (this.spanElement) {
          this.spanElement.innerText = text;
        } else if (!this.noupdate) {
          this.debouncedRequestUpdate();
        }
        this.noupdate = false;
      };
    }
    get Text() {
      return this.text;
    }
    get Key() {
      return this.key;
    }
    set Key(value) {
      if (typeof value === "string") {
        this.key = value;
      } else {
        this.key = "";
      }
      this.updateText();
    }
    // class functions 
    connectedCallback() {
      var _a;
      super.connectedCallback();
      InitTranslations();
      (_a = window.oTranslation) === null || _a === void 0 ? void 0 : _a.subscribe(this.updateText);
    }
    disconnectedCallback() {
      var _a;
      super.disconnectedCallback();
      (_a = window.oTranslation) === null || _a === void 0 ? void 0 : _a.unsubscribe(this.updateText);
    }
    attributeChangedCallback(name, oldValue, newValue) {
      if (this.dynamicAttributes.has(name)) {
        this.updateText();
      }
    }
    firstUpdate() {
      if (this.shadowRoot) {
        const span = this.shadowRoot.querySelector("span.pap-translation-span");
        if (span) {
          this.spanElement = span;
        }
      }
    }
    // public functions 
    translateKey(key) {
      if (this.key !== key) {
        this.noupdate = true;
        this.Key = key;
      }
      return this.text;
    }
    render() {
      return html`
      <span class="pap-translation-span"></span>
      <slot style="display:none;" @slotchange="${this.handletranslateslotchange}"></slot>
    `;
    }
  };
  Translator.style = style9;

  // ../../atoms/badge/dist/register.bundle.mjs
  var c5 = Object.defineProperty;
  var d5 = Object.getOwnPropertyDescriptor;
  var m6 = (p8, e4, a5, t6) => {
    for (var o6 = t6 > 1 ? void 0 : t6 ? d5(e4, a5) : e4, l9 = p8.length - 1, n4; l9 >= 0; l9--)
      (n4 = p8[l9]) && (o6 = (t6 ? n4(e4, a5, o6) : n4(o6)) || o6);
    return t6 && o6 && c5(e4, a5, o6), o6;
  };
  var i4 = `:host pap-box-template {
  background-color: var(--pap-color-bg, #FFFFFF);
  border: 1px solid var(--pap-color-border, #C7CBD4);
  color: var(--pap-color-text, #29292F);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  min-width: 2rem;
  padding: var(--padding-smaller, 4px) var(--padding-small, 8px); }

:host([mode="inactive"]) pap-box-template {
  background-color: var(--pap-color-bg-secondary, #F6F7F8);
  border: 1px solid var(--pap-color-border-secondary, #DADDE3);
  color: var(--pap-color-text-secondary, #6E7087); }`;
  var r6 = class extends BaseSystem {
    constructor() {
      super(...arguments);
      this.count = 0;
    }
    render() {
      return html`
            <pap-box-template part="box" radius="circular">
                <pap-typography variant="C4"><slot>${FormatNumber(this.count)}</slot></pap-typography>
            </pap-box-template>
        `;
    }
  };
  r6.style = i4, m6([property({ type: Number })], r6.prototype, "count", 2);
  var s2 = customElements != null ? customElements : window == null ? void 0 : window.customElements;
  if (!s2)
    throw new Error("Custom Elements not supported");
  s2.get("pap-badge") || s2.define("pap-badge", r6);

  // ../../molecules/header/dist/register.bundle.mjs
  var C = Object.defineProperty;
  var A = Object.getOwnPropertyDescriptor;
  var r7 = (u6, s3, e4, a5) => {
    for (var t6 = a5 > 1 ? void 0 : a5 ? A(s3, e4) : s3, i7 = u6.length - 1, n4; i7 >= 0; i7--)
      (n4 = u6[i7]) && (t6 = (a5 ? n4(s3, e4, t6) : n4(t6)) || t6);
    return a5 && t6 && C(s3, e4, t6), t6;
  };
  var E3 = `:host {
  display: inline-flex;
  align-items: center;
  gap: var(--gap-small, 8px); }

:host([hidden]) pap-menu {
  display: none; }

.theme-color {
  display: block;
  content: '';
  width: var(--field-size-small, 32px);
  height: var(--field-size-small, 32px);
  border-radius: 50%; }

pap-toggle::part(indicator) {
  background-color: transparent; }

pap-toggle[checked="true"] pap-icon[name="light-mode"] {
  display: none; }

pap-toggle[checked="false"] pap-icon[name="dark-mode"] {
  display: none; }`;
  var o4 = class extends BaseSystem {
    constructor() {
      super(...arguments);
      this.onloadmenu = () => {
        this.handlethemeadd(), this.handlethemechange(), setTimeout(() => {
          this.menuElement.value = window.oTheme.current;
        }, 100);
      };
      this.handleprefercolorchange = (e4) => {
        this.toggleElement && (this.toggleElement.value = e4.matches.toString());
      };
      this.handlethemeadd = () => {
        if (!this.menuElement || !this.templateElement || !this.themecolorElement)
          return;
        if (window.oTheme.map.size <= 1) {
          this.menuElement.setAttribute("hidden", "true");
          return;
        } else
          this.menuElement.hasAttribute("hidden") && this.menuElement.removeAttribute("hidden");
        let e4 = this.menuElement.querySelectorAll("pap-menu-item"), a5 = /* @__PURE__ */ new Set();
        e4.forEach((t6) => {
          window.oTheme.map.has(t6.value) ? a5.add(t6.value) : this.menuElement.removeChild(t6);
        }), Array.from(window.oTheme.map).forEach(([t6, i7]) => {
          if (!a5.has(t6)) {
            let n4 = this.templateElement.content.cloneNode(true), p8 = n4.querySelector("pap-menu-item");
            p8 && p8.setAttribute("value", t6);
            let h8 = n4.querySelector("span");
            h8 && (h8.style.backgroundColor = i7.representColor);
            let c6 = n4.querySelector("pap-typography");
            c6 && (c6.innerHTML = i7.name), this.menuElement.appendChild(n4);
          }
        });
      };
      this.handlethemechange = () => {
        if (this.menuElement) {
          let e4 = window.oTheme.map.get(window.oTheme.current);
          e4 && (this.themecolorElement.style.backgroundColor = e4.representColor, this.menuElement.value = window.oTheme.current);
        }
      };
      this.handleselect = (e4) => {
        let a5 = e4.target;
        a5 && window.oTheme.current !== a5.value && window.oTheme.change(a5.value);
      };
      this.handlechange = (e4) => {
        let a5 = e4.target;
        a5 && this.setlightdark(a5.checked ? "dark" : "light");
      };
    }
    connectedCallback() {
      super.connectedCallback(), window.sessionStorage.getItem("pap-lightdarktheme") || this.setlightdark(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", this.handleprefercolorchange), window.addEventListener(THEMECHANGE_NAME, this.handlethemechange), window.addEventListener(THEMEADD_NAME, this.handlethemeadd);
    }
    disconnectedCallback() {
      super.disconnectedCallback(), window.removeEventListener(THEMECHANGE_NAME, this.handlethemechange), window.removeEventListener(THEMEADD_NAME, this.handlethemeadd);
    }
    setlightdark(e4) {
      window.sessionStorage.setItem("pap-lightdarktheme", e4), window.dispatchEvent(new CustomEvent("theme-appearance-change", { detail: { value: e4 } })), document.documentElement.classList.remove("theme-light", "theme-dark"), document.documentElement.classList.add(`theme-${e4}`);
    }
    render() {
      return html`
      <template>
        <pap-menu-item>
          <span class="theme-color"></span>
          <pap-typography></pap-typography>
        </pap-menu-item>
      </template>

      <pap-toggle value="${window.sessionStorage.getItem("pap-lightdarktheme") === "dark" ? "true" : "false"}" @change="${this.handlechange}">
        <pap-icon name="light-mode"></pap-icon>
        <pap-icon name="dark-mode"></pap-icon>
      </pap-toggle>

      <pap-menu buttonRadius="circular" placement="bottom-left" @select="${this.handleselect}">
        <span slot="button-prefix" class="theme-color"></span>
        <pap-typography slot="button-content" class="theme-name"><pap-translator>Theme</pap-translator></pap-typography>
      </pap-menu>
    `;
    }
  };
  o4.style = E3, r7([query("span[slot].theme-color")], o4.prototype, "themecolorElement", 2), r7([query("template")], o4.prototype, "templateElement", 2), r7([query("pap-toggle")], o4.prototype, "toggleElement", 2), r7([query({ selector: "pap-menu", onload: "onloadmenu" })], o4.prototype, "menuElement", 2);
  var M = `:host {
  display: inline-block; }

.flag {
  display: inline-block;
  height: 24px;
  width: 24px;
  border-radius: 1000px;
  line-height: 28px;
  overflow: hidden; }
  .flag:not(.globe) span {
    left: -2rem;
    margin-left: -40%;
    font-size: 33pt; }

span.wrapper {
  display: flex;
  justify-content: center;
  align-items: center; }

::part(box) {
  min-width: 215px; }

.grid {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center; }`;
  var y4 = { "No Languages Available": "\u{1F1E6}\u{1F1E9}", Afghanistan: "\u{1F1E6}\u{1F1EB}", "Aland Islands": "\u{1F1E6}\u{1F1FD}", Albania: "\u{1F1E6}\u{1F1F1}", Algeria: "\u{1F1E9}\u{1F1FF}", "American Samoa": "\u{1F1E6}\u{1F1F8}", Andorra: "\u{1F1E6}\u{1F1E9}", Angola: "\u{1F1E6}\u{1F1F4}", Anguilla: "\u{1F1E6}\u{1F1EE}", Antarctica: "\u{1F1E6}\u{1F1F6}", "Antigua & Barbuda": "\u{1F1E6}\u{1F1EC}", Argentina: "\u{1F1E6}\u{1F1F7}", Armenia: "\u{1F1E6}\u{1F1F2}", Aruba: "\u{1F1E6}\u{1F1FC}", "Ascension Island": "\u{1F1E6}\u{1F1E8}", Australia: "\u{1F1E6}\u{1F1FA}", Austria: "\u{1F1E6}\u{1F1F9}", Azerbaijan: "\u{1F1E6}\u{1F1FF}", Bahamas: "\u{1F1E7}\u{1F1F8}", Bahrain: "\u{1F1E7}\u{1F1ED}", Bangladesh: "\u{1F1E7}\u{1F1E9}", Barbados: "\u{1F1E7}\u{1F1E7}", Belarus: "\u{1F1E7}\u{1F1FE}", Belgium: "\u{1F1E7}\u{1F1EA}", Belize: "\u{1F1E7}\u{1F1FF}", Benin: "\u{1F1E7}\u{1F1EF}", Bermuda: "\u{1F1E7}\u{1F1F2}", Bhutan: "\u{1F1E7}\u{1F1F9}", Bolivia: "\u{1F1E7}\u{1F1F4}", "Bosnia & Herzegovina": "\u{1F1E7}\u{1F1E6}", Botswana: "\u{1F1E7}\u{1F1FC}", "Bouvet Island": "\u{1F1E7}\u{1F1FB}", Brazil: "\u{1F1E7}\u{1F1F7}", "British Virgin Islands": "\u{1F1FB}\u{1F1EC}", Brunei: "\u{1F1E7}\u{1F1F3}", Bulgaria: "\u{1F1E7}\u{1F1EC}", "Burkina Faso": "\u{1F1E7}\u{1F1EB}", Burundi: "\u{1F1E7}\u{1F1EE}", Cambodia: "\u{1F1F0}\u{1F1ED}", Cameroon: "\u{1F1E8}\u{1F1F2}", Canada: "\u{1F1E8}\u{1F1E6}", "Canary Islands": "\u{1F1EE}\u{1F1E8}", "Cape Verde": "\u{1F1E8}\u{1F1FB}", "Caribbean Netherlands": "\u{1F1E7}\u{1F1F6}", "Cayman Islands": "\u{1F1F0}\u{1F1FE}", "Central African Republic": "\u{1F1E8}\u{1F1EB}", "Ceuta & Melilla": "\u{1F1EA}\u{1F1E6}", Chad: "\u{1F1F9}\u{1F1E9}", Chile: "\u{1F1E8}\u{1F1F1}", China: "\u{1F1E8}\u{1F1F3}", "Christmas Island": "\u{1F1E8}\u{1F1FD}", "Clipperton Island": "\u{1F1E8}\u{1F1F5}", "Cocos Islands": "\u{1F1E8}\u{1F1E8}", Colombia: "\u{1F1E8}\u{1F1F4}", Comoros: "\u{1F1F0}\u{1F1F2}", "Cook Islands": "\u{1F1E8}\u{1F1F0}", "Costa Rica": "\u{1F1E8}\u{1F1F7}", Croatia: "\u{1F1ED}\u{1F1F7}", Cuba: "\u{1F1E8}\u{1F1FA}", Curacao: "\u{1F1E8}\u{1F1FC}", Cyprus: "\u{1F1E8}\u{1F1FE}", Czechia: "\u{1F1E8}\u{1F1FF}", Denmark: "\u{1F1E9}\u{1F1F0}", "Diego Garcia": "\u{1F1E9}\u{1F1EC}", Djibouti: "\u{1F1E9}\u{1F1EF}", Dominica: "\u{1F1E9}\u{1F1F2}", "Dominican Republic": "\u{1F1E9}\u{1F1F4}", Ecuador: "\u{1F1EA}\u{1F1E8}", Egypt: "\u{1F1EA}\u{1F1EC}", "El Salvador": "\u{1F1F8}\u{1F1FB}", "Equatorial Guinea": "\u{1F1EC}\u{1F1F6}", Eritrea: "\u{1F1EA}\u{1F1F7}", Estonia: "\u{1F1EA}\u{1F1EA}", Eswatini: "\u{1F1F8}\u{1F1FF}", Ethiopia: "\u{1F1EA}\u{1F1F9}", "European Union": "\u{1F1EA}\u{1F1FA}", "Falkland Islands": "\u{1F1EB}\u{1F1F0}", "Faroe Islands": "\u{1F1EB}\u{1F1F4}", Fiji: "\u{1F1EB}\u{1F1EF}", Finland: "\u{1F1EB}\u{1F1EE}", France: "\u{1F1EB}\u{1F1F7}", "French Guiana": "\u{1F1EC}\u{1F1EB}", "French Polynesia": "\u{1F1F5}\u{1F1EB}", Gabon: "\u{1F1EC}\u{1F1E6}", Gambia: "\u{1F1EC}\u{1F1F2}", Georgia: "\u{1F1EC}\u{1F1EA}", Germany: "\u{1F1E9}\u{1F1EA}", Ghana: "\u{1F1EC}\u{1F1ED}", Gibraltar: "\u{1F1EC}\u{1F1EE}", Greece: "\u{1F1EC}\u{1F1F7}", Greenland: "\u{1F1EC}\u{1F1F1}", Grenada: "\u{1F1EC}\u{1F1E9}", Guadeloupe: "\u{1F1EC}\u{1F1F5}", Guam: "\u{1F1EC}\u{1F1FA}", Guatemala: "\u{1F1EC}\u{1F1F9}", Guernsey: "\u{1F1EC}\u{1F1EC}", Guinea: "\u{1F1EC}\u{1F1F3}", "Guinea-Bissau": "\u{1F1EC}\u{1F1FC}", Guyana: "\u{1F1EC}\u{1F1FE}", Haiti: "\u{1F1ED}\u{1F1F9}", "Heard & McDonald Islands": "\u{1F1ED}\u{1F1F2}", Honduras: "\u{1F1ED}\u{1F1F3}", "Hong Kong": "\u{1F1ED}\u{1F1F0}", Hungary: "\u{1F1ED}\u{1F1FA}", Iceland: "\u{1F1EE}\u{1F1F8}", India: "\u{1F1EE}\u{1F1F3}", Indonesia: "\u{1F1EE}\u{1F1E9}", Iran: "\u{1F1EE}\u{1F1F7}", Iraq: "\u{1F1EE}\u{1F1F6}", Ireland: "\u{1F1EE}\u{1F1EA}", "Isle of Man": "\u{1F1EE}\u{1F1F2}", Israel: "\u{1F1EE}\u{1F1F1}", Italy: "\u{1F1EE}\u{1F1F9}", Jamaica: "\u{1F1EF}\u{1F1F2}", Japan: "\u{1F1EF}\u{1F1F5}", Jersey: "\u{1F1EF}\u{1F1EA}", Jordan: "\u{1F1EF}\u{1F1F4}", Kazakhstan: "\u{1F1F0}\u{1F1FF}", Kenya: "\u{1F1F0}\u{1F1EA}", Kiribati: "\u{1F1F0}\u{1F1EE}", Kosovo: "\u{1F1FD}\u{1F1F0}", Kuwait: "\u{1F1F0}\u{1F1FC}", Kyrgyzstan: "\u{1F1F0}\u{1F1EC}", Laos: "\u{1F1F1}\u{1F1E6}", Latvia: "\u{1F1F1}\u{1F1FB}", Lebanon: "\u{1F1F1}\u{1F1E7}", Lesotho: "\u{1F1F1}\u{1F1F8}", Liberia: "\u{1F1F1}\u{1F1F7}", Libya: "\u{1F1F1}\u{1F1FE}", Liechtenstein: "\u{1F1F1}\u{1F1EE}", Lithuania: "\u{1F1F1}\u{1F1F9}", Luxembourg: "\u{1F1F1}\u{1F1FA}", Macao: "\u{1F1F2}\u{1F1F4}", Macedonia: "\u{1F1F2}\u{1F1F0}", Madagascar: "\u{1F1F2}\u{1F1EC}", Malawi: "\u{1F1F2}\u{1F1FC}", Malaysia: "\u{1F1F2}\u{1F1FE}", Maldives: "\u{1F1F2}\u{1F1FB}", Mali: "\u{1F1F2}\u{1F1F1}", Malta: "\u{1F1F2}\u{1F1F9}", "Marshall Islands": "\u{1F1F2}\u{1F1ED}", Martinique: "\u{1F1F2}\u{1F1F6}", Mauritania: "\u{1F1F2}\u{1F1F7}", Mauritius: "\u{1F1F2}\u{1F1FA}", Mayotte: "\u{1F1FE}\u{1F1F9}", Mexico: "\u{1F1F2}\u{1F1FD}", Micronesia: "\u{1F1EB}\u{1F1F2}", Moldova: "\u{1F1F2}\u{1F1E9}", Monaco: "\u{1F1F2}\u{1F1E8}", Mongolia: "\u{1F1F2}\u{1F1F3}", Montenegro: "\u{1F1F2}\u{1F1EA}", Montserrat: "\u{1F1F2}\u{1F1F8}", Morocco: "\u{1F1F2}\u{1F1E6}", Mozambique: "\u{1F1F2}\u{1F1FF}", Myanmar: "\u{1F1F2}\u{1F1F2}", Namibia: "\u{1F1F3}\u{1F1E6}", Nauru: "\u{1F1F3}\u{1F1F7}", Nepal: "\u{1F1F3}\u{1F1F5}", Netherlands: "\u{1F1F3}\u{1F1F1}", "New Caledonia": "\u{1F1F3}\u{1F1E8}", "New Zealand": "\u{1F1F3}\u{1F1FF}", Nicaragua: "\u{1F1F3}\u{1F1EE}", Niger: "\u{1F1F3}\u{1F1EA}", Nigeria: "\u{1F1F3}\u{1F1EC}", Niue: "\u{1F1F3}\u{1F1FA}", "Norfolk Island": "\u{1F1F3}\u{1F1EB}", "North Korea": "\u{1F1F0}\u{1F1F5}", "Northern Mariana Islands": "\u{1F1F2}\u{1F1F5}", Norway: "\u{1F1F3}\u{1F1F4}", Oman: "\u{1F1F4}\u{1F1F2}", Pakistan: "\u{1F1F5}\u{1F1F0}", Palau: "\u{1F1F5}\u{1F1FC}", "Palestinian Territories": "\u{1F1F5}\u{1F1F8}", Panama: "\u{1F1F5}\u{1F1E6}", "Papua New Guinea": "\u{1F1F5}\u{1F1EC}", Paraguay: "\u{1F1F5}\u{1F1FE}", Peru: "\u{1F1F5}\u{1F1EA}", Philippines: "\u{1F1F5}\u{1F1ED}", "Pitcairn Islands": "\u{1F1F5}\u{1F1F3}", Poland: "\u{1F1F5}\u{1F1F1}", Portugal: "\u{1F1F5}\u{1F1F9}", "Puerto Rico": "\u{1F1F5}\u{1F1F7}", Qatar: "\u{1F1F6}\u{1F1E6}", Romania: "\u{1F1F7}\u{1F1F4}", Russia: "\u{1F1F7}\u{1F1FA}", Rwanda: "\u{1F1F7}\u{1F1FC}", Samoa: "\u{1F1FC}\u{1F1F8}", "San Marino": "\u{1F1F8}\u{1F1F2}", "Saudi Arabia": "\u{1F1F8}\u{1F1E6}", Senegal: "\u{1F1F8}\u{1F1F3}", Serbia: "\u{1F1F7}\u{1F1F8}", Seychelles: "\u{1F1F8}\u{1F1E8}", "Sierra Leone": "\u{1F1F8}\u{1F1F1}", Singapore: "\u{1F1F8}\u{1F1EC}", "Sint Maarten": "\u{1F1F8}\u{1F1FD}", Slovakia: "\u{1F1F8}\u{1F1F0}", Slovenia: "\u{1F1F8}\u{1F1EE}", "Solomon Islands": "\u{1F1F8}\u{1F1E7}", Somalia: "\u{1F1F8}\u{1F1F4}", "South Africa": "\u{1F1FF}\u{1F1E6}", "South Korea": "\u{1F1F0}\u{1F1F7}", "South Sudan": "\u{1F1F8}\u{1F1F8}", Spain: "\u{1F1EA}\u{1F1F8}", "Sri Lanka": "\u{1F1F1}\u{1F1F0}", "St. Barthelemy": "\u{1F1E7}\u{1F1F1}", "St. Helena": "\u{1F1F8}\u{1F1ED}", "St. Kitts & Nevis": "\u{1F1F0}\u{1F1F3}", "St. Lucia": "\u{1F1F1}\u{1F1E8}", "St. Martin": "\u{1F1F2}\u{1F1EB}", "St. Pierre & Miquelon": "\u{1F1F5}\u{1F1F2}", "St. Vincent & Grenadines": "\u{1F1FB}\u{1F1E8}", Sudan: "\u{1F1F8}\u{1F1E9}", Suriname: "\u{1F1F8}\u{1F1F7}", "Svalbard & Jan Mayen": "\u{1F1F8}\u{1F1EF}", Sweden: "\u{1F1F8}\u{1F1EA}", Switzerland: "\u{1F1E8}\u{1F1ED}", Syria: "\u{1F1F8}\u{1F1FE}", Taiwan: "\u{1F1F9}\u{1F1FC}", Tajikistan: "\u{1F1F9}\u{1F1EF}", Tanzania: "\u{1F1F9}\u{1F1FF}", Thailand: "\u{1F1F9}\u{1F1ED}", "Timor-Leste": "\u{1F1F9}\u{1F1F1}", Togo: "\u{1F1F9}\u{1F1EC}", Tokelau: "\u{1F1F9}\u{1F1F0}", Tonga: "\u{1F1F9}\u{1F1F4}", "Trinidad & Tobago": "\u{1F1F9}\u{1F1F9}", "Tristan da Cunha": "\u{1F1F9}\u{1F1E6}", Tunisia: "\u{1F1F9}\u{1F1F3}", Turkey: "\u{1F1F9}\u{1F1F7}", Turkmenistan: "\u{1F1F9}\u{1F1F2}", "Turks & Caicos Islands": "\u{1F1F9}\u{1F1E8}", Tuvalu: "\u{1F1F9}\u{1F1FB}", "U.S. Outlying Islands": "\u{1F1FA}\u{1F1F2}", "U.S. Virgin Islands": "\u{1F1FB}\u{1F1EE}", Uganda: "\u{1F1FA}\u{1F1EC}", Ukraine: "\u{1F1FA}\u{1F1E6}", "United Arab Emirates": "\u{1F1E6}\u{1F1EA}", "United Kingdom": "\u{1F1EC}\u{1F1E7}", "United States": "\u{1F1FA}\u{1F1F8}", Uruguay: "\u{1F1FA}\u{1F1FE}", Uzbekistan: "\u{1F1FA}\u{1F1FF}", Vanuatu: "\u{1F1FB}\u{1F1FA}", "Vatican City": "\u{1F1FB}\u{1F1E6}", Venezuela: "\u{1F1FB}\u{1F1EA}", Vietnam: "\u{1F1FB}\u{1F1F3}", "Wallis & Futuna": "\u{1F1FC}\u{1F1EB}", "Western Sahara": "\u{1F1EA}\u{1F1ED}", Yemen: "\u{1F1FE}\u{1F1EA}", Zambia: "\u{1F1FF}\u{1F1F2}", Zimbabwe: "\u{1F1FF}\u{1F1FC}" };
  var l7 = class extends BaseSystem {
    constructor() {
      super();
      this.handlenewlanguage = () => {
        if (window.oTranslation) {
          let e4 = this.menuElement.querySelectorAll("pap-menu-item"), a5 = Array.from(window.oTranslation.map), t6 = /* @__PURE__ */ new Set();
          e4.forEach((i7) => {
            let n4 = i7.value;
            window.oTranslation.map.has(n4) ? t6.add(n4) : this.menuElement.removeChild(i7);
          }), a5.forEach(([i7, n4]) => {
            if (!t6.has(i7)) {
              let p8 = this.templateElement.content.cloneNode(true), h8 = p8.querySelector("pap-menu-item");
              h8 && h8.setAttribute("value", n4.id);
              let c6 = p8.querySelector("pap-translator");
              c6 && (c6.innerHTML = n4.name);
              let w = p8.querySelector("span.flag > span");
              w && (w.innerHTML = y4[n4.name]), this.menuElement.appendChild(p8);
            }
          });
        }
      };
      this.handlelanguagechange = () => {
        var e4, a5;
        this.menuElement && ((e4 = window.oTranslation) != null && e4.current) && (this.displayElement && ((a5 = this.displayElement.parentElement) == null || a5.classList.remove("globe"), this.displayElement.innerHTML = y4[window.oTranslation.current.name]), this.menuElement.value !== window.oTranslation.current.id && (this.menuElement.value = window.oTranslation.current.id));
      };
      this.handlelanguageselect = (e4) => {
        let a5 = e4.target;
        a5 && this.displayElement && a5.value !== "init" && window.oTranslation.change(a5.value);
      };
      InitTranslations();
    }
    connectedCallback() {
      var e4, a5;
      super.connectedCallback(), window.addEventListener(TRANSLATION_ADDED, this.handlenewlanguage), window.addEventListener(TRANSLATION_CHANGE_EVENTNAME, this.handlelanguagechange), ((a5 = (e4 = window.oTranslation) == null ? void 0 : e4.map) == null ? void 0 : a5.size) > 0 && this.handlenewlanguage();
    }
    disconnectedCallback() {
      super.disconnectedCallback(), window.removeEventListener(TRANSLATION_ADDED, this.handlenewlanguage);
    }
    render() {
      return html`
      <template>
        <pap-menu-item>
          <div class="grid">
            <span class="wrapper">
              <span class="flag">
                <span></span>
              </span>
            </span>
            <pap-typography><pap-translator></pap-translator></pap-typography>
          </div>
        </pap-menu-item>
      </template>

      <pap-menu buttonRadius="circular" placement="bottom-left" @select="${this.handlelanguageselect}">
        <span slot="button-prefix" class="wrapper">
          <span class="flag globe">
            <span class="display">
              <pap-icon name="globe">g</pap-icon>
            </span>
          </span>
        </span>
        <pap-menu-item value="init"><pap-translator>No Languages Available</pap-translator></pap-menu-item>
      </pap-menu>
    `;
    }
  };
  l7.style = M, r7([query("span.display")], l7.prototype, "displayElement", 2), r7([query("pap-menu")], l7.prototype, "menuElement", 2), r7([query("template")], l7.prototype, "templateElement", 2);
  var T2 = `:host,
:host > div {
  display: flex;
  align-items: center;
  gap: 1rem; }

:host {
  justify-content: space-between; }
  :host pap-menu::part(box) {
    min-width: 15rem; }

img.avatar {
  width: var(--field-size-medium, 40px);
  height: var(--field-size-medium, 40px);
  border-radius: 50%; }`;
  var d6 = class extends BaseSystem {
    constructor() {
      super(...arguments);
      this.handleuserselect = (e4) => {
        console.log("select user", e4);
      };
    }
    render() {
      var a5, t6, i7;
      let e4 = ((a5 = this.user) == null ? void 0 : a5.avatar) || `public/images/avatar${Math.round(Math.random() * 4) + 1}.png`;
      return html`
      <div class="prefix">
        <slot name="prefix"></slot>
      </div>
      <div class="center">
        <slot></slot>
      </div>
      <div class="suffix">
        <pap-theme></pap-theme>
        <pap-language></pap-language>

        ${this.user ? html`<pap-menu placement="bottom-left" @select="${this.handleuserselect}">
          <img class="avatar" slot="button-prefix" src="${e4}" alt="${((t6 = this.user) == null ? void 0 : t6.firstname) || "no-name"} profile picture" />
          <pap-typography slot="button-content">${((i7 = this.user) == null ? void 0 : i7.firstname) || "no-name"}</pap-typography>

          <pap-menu-item value="settings">
            <pap-typography><pap-translator>User Settings</pap-translator></pap-typography>
          </pap-menu-item>
          <pap-menu-item value="logout">
            <pap-typography><pap-translator>Logout</pap-translator></pap-typography>
          </pap-menu-item>
        </pap-menu>` : ""}
      </div>
    `;
    }
  };
  d6.style = T2, r7([property({ type: Object })], d6.prototype, "user", 2);
  var m7 = customElements != null ? customElements : window == null ? void 0 : window.customElements;
  if (!m7)
    throw new Error("Custom Elements not supported");
  m7.get("pap-header") || m7.define("pap-header", d6);
  m7.get("pap-language") || m7.define("pap-language", l7);
  m7.get("pap-theme") || m7.define("pap-theme", o4);

  // ../../system/showcase/dist/register.bundle.mjs
  var b3 = Object.defineProperty;
  var u4 = Object.getOwnPropertyDescriptor;
  var r8 = (s3, a5, l9, n4) => {
    for (var o6 = n4 > 1 ? void 0 : n4 ? u4(a5, l9) : a5, m8 = s3.length - 1, d8; m8 >= 0; m8--)
      (d8 = s3[m8]) && (o6 = (n4 ? d8(a5, l9, o6) : d8(o6)) || o6);
    return n4 && o6 && b3(a5, l9, o6), o6;
  };
  var v5 = `:host {
  display: block; }

pap-box-template {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: var(--gap-medium, 16px);
  overflow-x: auto;
  text-align: center;
  padding: var(--padding-large, 24px) var(--padding-medium, 16px);
  position: relative;
  box-sizing: border-box;
  min-height: 250px;
  width: 100%;
  background-color: var(--pap-color-bg-secondary, #F6F7F8); }
  pap-box-template ::slotted(*) {
    margin: auto; }`;
  var p6 = class extends BaseSystem {
    constructor() {
      super(...arguments);
      this.padding = "large";
    }
    render() {
      return html`
      <pap-box-template part="box" radius="medium">
        <slot></slot>
      </pap-box-template>
    `;
    }
  };
  p6.style = v5, r8([property({ rerender: false })], p6.prototype, "padding", 2);
  var x3 = `:host {
  display: block;
  --variant-bg-color: var(--pap-color-bg-success, #2E701B);
  --variant-text-color: var(--pap-color-text-success, #29591B); }

showcase-card {
  margin-bottom: var(--margin-medium, 16px); }

showcase-card::part(box) {
  overflow: hidden; }
  showcase-card::part(box)::after {
    z-index: 9999;
    content: '';
    width: 100%;
    height: 1rem;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: var(--variant-bg-color); }

div {
  display: flex;
  align-items: flex-start;
  gap: var(--gap-small, 8px); }
  div pap-icon {
    background-color: var(--variant-bg-color);
    color: var(--variant-text-color);
    padding: var(--padding-smaller, 4px);
    border-radius: var(--radius-max, 1000px); }

:host([variant="success"]) {
  --variant-bg-color: var(--pap-color-bg-success, #2E701B);
  --variant-text-color: var(--pap-color-text-inverse, #FFFFFF); }

:host([variant="error"]) {
  --variant-bg-color: var(--pap-color-bg-danger, #B70E1E);
  --variant-text-color: var(--pap-color-text-inverse, #FFFFFF); }

:host([variant="warning"]) {
  --variant-bg-color: var(--pap-color-bg-warning, #FFA800);
  --variant-text-color: var(--pap-color-text, #29292F); }`;
  var t4 = class extends BaseSystem {
    constructor() {
      super(...arguments);
      this.variant = "success";
      this.padding = "large";
      this.text = "This is ok";
    }
    render() {
      return html`
      <showcase-card padding="${this.padding}">
        <slot></slot>
      </showcase-card>
      <div>
        ${this.variant === "success" ? html`<pap-icon size="small" name="success"></pap-icon>` : ""}
        ${this.variant === "warning" ? html`<pap-icon size="small" name="warning"></pap-icon>` : ""}
        ${this.variant === "error" ? html`<pap-icon size="small" name="close"></pap-icon>` : ""}

        <pap-typography>${this.text}</pap-typography>
      </div>
    `;
    }
  };
  t4.style = x3, r8([property()], t4.prototype, "variant", 2), r8([property()], t4.prototype, "padding", 2), r8([property()], t4.prototype, "text", 2);
  var h6 = `:host {
  background-image: radial-gradient(circle at calc(100% - 5rem) -15rem, color-mix(in oklab, var(--pap-color-primary-50) 5%, white 5%), var(--pap-color-secondary-950) 50%);
  color: var(--pap-color-text-inverse, #FFFFFF);
  display: block;
  padding: 60px;
  padding-left: 100px; }

div {
  max-width: 450px; }`;
  var e3 = class extends BaseSystem {
    constructor() {
      super(...arguments);
      this.title = "Title";
      this.subtitle = "Sub title";
    }
    render() {
      return html`
      <div>
        <pap-typography variant="H4">${this.title}</pap-typography>
        <pap-typography>${this.subtitle}</pap-typography>
      </div>
    `;
    }
  };
  e3.style = h6, r8([property()], e3.prototype, "title", 2), r8([property()], e3.prototype, "subtitle", 2);
  var i5 = customElements != null ? customElements : window == null ? void 0 : window.customElements;
  if (!i5)
    throw new Error("Custom Elements not supported");
  i5.get("showcase-header") || i5.define("showcase-header", e3);
  i5.get("showcase-guideline") || i5.define("showcase-guideline", t4);
  i5.get("showcase-card") || i5.define("showcase-card", p6);

  // ../../system/doc/dist/src/register.js
  var cElements = customElements !== null && customElements !== void 0 ? customElements : window === null || window === void 0 ? void 0 : window.customElements;
  if (!cElements) {
    throw new Error("Custom Elements not supported");
  }
  if (!cElements.get("doc-card")) {
    cElements.define("doc-card", Card);
  }
  if (!cElements.get("doc-controller")) {
    cElements.define("doc-controller", Controller);
  }
  if (!cElements.get("color-picker")) {
    cElements.define("color-picker", ColorPicker);
  }
  if (!cElements.get("doc-input")) {
    cElements.define("doc-input", Input);
  }
  if (!cElements.get("doc-radio")) {
    cElements.define("doc-radio", Radio);
  }
  if (!cElements.get("color-picker-input")) {
    cElements.define("color-picker-input", ColorPickerInput);
  }

  // dist/register.bundle.mjs
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i22 = decorators.length - 1, decorator; i22 >= 0; i22--)
      if (decorator = decorators[i22])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp(target, key, result);
    return result;
  };
  function query2(options) {
    const selector = typeof options === "string" ? options : options.selector;
    return function(target, propertyKey) {
      const renderattemptsKey = propertyKey + "rerender_attempts_";
      const timeoutattemptsKey = propertyKey + "timeout_attempts_";
      const originalConnectedCallback = target.connectedCallback || function() {
      };
      target.connectedCallback = function() {
        originalConnectedCallback.call(this);
        initsearch.call(this);
      };
      function initsearch() {
        if (!search.call(this)) {
          rendersearch.call(this);
        }
      }
      function rendersearch() {
        let attempts = this[renderattemptsKey] || 0;
        attempts++;
        if (!search.call(this) && attempts < 5) {
          this[timeoutattemptsKey] = 0;
          this[renderattemptsKey] = attempts;
          setTimeout(() => timeoutsearch.call(this), 100);
          if (this.callAfterUpdate)
            this.callAfterUpdate.push(() => rendersearch.call(this));
        }
      }
      function timeoutsearch() {
        let attempts = this[timeoutattemptsKey] || 0;
        attempts++;
        if (!search.call(this) && attempts < 3) {
          this[timeoutattemptsKey] = attempts;
          setTimeout(() => timeoutsearch.call(this), 100);
        }
      }
      function search() {
        if (this[propertyKey])
          return true;
        if (this.shadowRoot) {
          const element = this.shadowRoot.querySelector(selector);
          if (element) {
            this[propertyKey] = element;
            if (typeof options === "object" && options.onload) {
              if (this[options.onload]) {
                this[options.onload].call(this, element);
              }
            }
            return true;
          }
        }
        return false;
      }
    };
  }
  var DefaultOptions2 = {
    type: String,
    attribute: true,
    rerender: true,
    verbose: false
  };
  function property2(options) {
    const _options = options === void 0 ? DefaultOptions2 : { ...DefaultOptions2, ...options };
    return function(target, propertyKey) {
      const attributeName = (typeof _options.attribute === "string" ? _options.attribute : propertyKey).toLowerCase();
      let internal = false;
      const observedAttributes = target.constructor.observedAttributes || [];
      observedAttributes.push(attributeName);
      target.constructor.observedAttributes = observedAttributes;
      const attributeChanged = target.attributeChangedCallback || function() {
      };
      target.attributeChangedCallback = function(name, oldValue, newValue) {
        attributeChanged.call(this, name, oldValue, newValue);
        if (name === attributeName && !internal && newValue !== oldValue) {
          this[propertyKey] = convertFromString2(newValue, _options.type);
        }
      };
      Object.defineProperty(target, propertyKey, {
        get() {
          const data = this[`_${propertyKey}`];
          return (options === null || options === void 0 ? void 0 : options.get) ? options.get(data) : data;
        },
        set(value) {
          const valuestring = convertToString2(value, _options.type);
          const oldvaluestring = convertToString2(this[`_${propertyKey}`], _options.type);
          if (oldvaluestring === valuestring) {
            return;
          }
          const old = this[`_${propertyKey}`];
          this[`_${propertyKey}`] = (options === null || options === void 0 ? void 0 : options.set) ? options.set(value) : value;
          const operation = () => {
            if (_options.attribute) {
              internal = true;
              this.setAttribute(attributeName, valuestring);
              internal = false;
            }
            if (_options.onUpdate) {
              this[_options.onUpdate + "_attempts"] = 0;
              tryupdate2.call(this, _options.onUpdate, value, old, !!_options.verbose);
            }
            if (_options.rerender) {
              this.debouncedRequestUpdate();
            }
          };
          if (!this.connected) {
            this._pendingOperations.push(operation);
            return;
          }
          operation();
        }
      });
    };
  }
  async function tryupdate2(update, value, old, verbose) {
    if (verbose) {
      console.log({
        message: "calling update",
        property: update,
        value: this[update],
        attempt: this[update + "_attempts"]
      });
    }
    let ans = 10;
    if (this[update]) {
      ans = await this[update](value, old);
    }
    if (typeof ans === "number") {
      if (this[update + "_attempts"] < ans) {
        this[update + "_attempts"]++;
        setTimeout(() => {
          tryupdate2.call(this, update, value, old, verbose);
        }, 100);
      }
    }
  }
  function convertFromString2(value, type) {
    switch (type.name) {
      case "Boolean":
        if (value === null)
          return false;
        return value === "" || value.toLowerCase() === "true" ? true : false;
      case "Number":
        return Number(value);
      case "Object":
      case "Array":
        if (value === null)
          return null;
        return JSON.parse(value);
      default:
        return type(value);
    }
  }
  function convertToString2(value, type) {
    switch (type.name) {
      case "Object":
      case "Array":
        return JSON.stringify(value);
      default:
        return String(value);
    }
  }
  function debounce2(execute, delay = 300) {
    let timer = null;
    return function(...args) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        execute.apply(this, args);
        timer = null;
      }, delay);
    };
  }
  function NextParent2(element) {
    if (element.parentElement)
      return element.parentElement;
    const root = element.getRootNode();
    if (root)
      return root.host;
    return null;
  }
  function findComments2(element) {
    let arr = [];
    for (let i22 = 0; i22 < element.childNodes.length; i22++) {
      let node = element.childNodes[i22];
      if (node.nodeType === 8) {
        arr.push(node);
      } else {
        arr.push.apply(arr, findComments2(node));
      }
    }
    return arr;
  }
  function insertElement2(parent, comment, indexes, values) {
    if (indexes === null)
      return;
    let target = values;
    for (let i22 = 0; i22 < indexes.length; i22++) {
      const index = Number(indexes[i22]);
      target = target[index];
    }
    try {
      parent.insertBefore(target, comment);
    } catch (e4) {
      console.error(e4);
      console.log("what is going on here", parent);
    }
  }
  function html2(strings, ...values) {
    let result = "";
    for (let i22 = 0; i22 < values.length; i22++) {
      if (values[i22] instanceof Array) {
        let arr = [];
        for (let j2 = 0; j2 < values[i22].length; j2++) {
          if (values[i22][j2] instanceof DocumentFragment) {
            arr.push(`<!-- comment-node-${i22}.${j2} -->`);
          }
        }
        if (arr.length > 0) {
          result += strings[i22] + arr.join(" ");
          continue;
        }
      }
      if (values[i22] instanceof DocumentFragment) {
        result += strings[i22] + `<!-- comment-node-${i22} -->`;
        continue;
      }
      const trimmed = strings[i22].trim();
      const match = trimmed.match(/.*\s(on|@)([\w-]*)=/);
      if (match) {
        const [_whole, eventtype, name] = match;
        const split = trimmed.split(eventtype + name);
        result += split[0] + ` @${name}="${i22}"`;
      } else {
        result += strings[i22] + values[i22];
      }
    }
    result += strings[values.length];
    const template = document.createElement("template");
    template.innerHTML = result.trim();
    const content = template.content;
    findComments2(content).forEach((comment) => {
      var _a;
      const parent = comment.parentNode;
      if (parent) {
        const trimmedCommentName = (_a = comment.nodeValue) === null || _a === void 0 ? void 0 : _a.trim();
        if (trimmedCommentName === null || trimmedCommentName === void 0 ? void 0 : trimmedCommentName.startsWith("comment-node")) {
          if (comment.textContent) {
            const indexes = comment.textContent.match(/\d+/g);
            insertElement2(parent, comment, indexes, values);
          }
        }
        parent.removeChild(comment);
      }
    });
    content.querySelectorAll("*").forEach((element) => {
      Array.from(element.attributes).forEach((attr) => {
        if (attr.name.startsWith("@")) {
          const eventName = attr.name.slice(1);
          const indexValue = Number(element.getAttribute(attr.name));
          element.removeAttribute(attr.name);
          element.addEventListener(eventName, values[indexValue]);
        }
      });
      element.removeAttribute('"');
    });
    return content;
  }
  function __decorate2(decorators, target, key, desc) {
    var c6 = arguments.length, r9 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d22;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r9 = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i22 = decorators.length - 1; i22 >= 0; i22--)
        if (d22 = decorators[i22])
          r9 = (c6 < 3 ? d22(r9) : c6 > 3 ? d22(target, key, r9) : d22(target, key)) || r9;
    return c6 > 3 && r9 && Object.defineProperty(target, key, r9), r9;
  }
  var BaseSystem2 = class extends HTMLElement {
    // class functions
    constructor() {
      super();
      this.callAfterUpdate = [];
      this.render_mode = "smart";
      this.render_style_mode = "lazy";
      this._pendingOperations = [];
      this.connected = false;
      this.originalHTML = "";
      this.hasFocus = false;
      this.handleblur = () => {
        this.hasFocus = false;
      };
      this.handlefocus = () => {
        this.hasFocus = true;
      };
      this.originalHTML = this.outerHTML;
      this.addEventListener("blur", this.handleblur);
      this.addEventListener("focus", this.handlefocus);
      this.styleComperator = document.createElement("style");
      this.templateComperator = document.createElement("template");
      this.debouncedRequestUpdate = debounce2(this.requestUpdate, 100);
      this.attachShadow({ mode: "open" });
      this.callAfterUpdate.push(this.firstUpdate);
    }
    connectedCallback() {
      this.connected = true;
      this.debouncedRequestUpdate();
      this.attributeObserver = new MutationObserver((mutationsList, observer) => {
        for (let mutation of mutationsList) {
          if (mutation.type === "attributes" && mutation.attributeName) {
            this.attributeChangedCallback(mutation.attributeName, mutation.oldValue, this.getAttribute(mutation.attributeName));
          }
        }
      });
      this.attributeObserver.observe(this, { attributes: true });
      this._pendingOperations.forEach((o22) => o22());
      this._pendingOperations = [];
    }
    disconnectedCallback() {
      this.connected = false;
      this.attributeObserver.disconnect();
    }
    attributeChangedCallback(name, oldValue, newValue) {
    }
    getStyle() {
      var _a;
      const childConstructor = this.constructor;
      const styles = [
        ...(_a = childConstructor.styles) !== null && _a !== void 0 ? _a : [],
        ...typeof childConstructor.style === "string" ? [childConstructor.style] : []
      ];
      return styles.join(" ");
    }
    querySelector(selector) {
      if (this.shadowRoot)
        return this.shadowRoot.querySelector(selector);
      return null;
    }
    shadow_closest(selector) {
      let parent = NextParent2(this);
      while (parent) {
        const closest = parent.closest(selector);
        if (closest)
          return closest;
        const target = parent.querySelector(selector);
        if (target)
          return target;
        if (parent === document.documentElement)
          break;
        parent = NextParent2(parent);
      }
    }
    requestUpdate() {
      if (!this.shadowRoot) {
        return;
      }
      const initalrender = this.shadowRoot.innerHTML === "";
      this.renderStyle();
      const content = this.render();
      if (initalrender || this.render_mode === "greedy") {
        this.flushHTML(this.shadowRoot);
        this.renderContent(content, this.shadowRoot);
      } else {
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
    debouncedRequestUpdate() {
    }
    firstUpdate() {
    }
    render(child) {
      return "Hello From Base Class";
    }
    // helper functions 
    flushHTML(node) {
      node.childNodes.forEach((child) => {
        if (child.nodeName !== "STYLE") {
          node.removeChild(child);
        }
      });
    }
    renderStyle() {
      if (!this.shadowRoot)
        return;
      let targetElement = this.shadowRoot.querySelector("style");
      if (!targetElement) {
        targetElement = document.createElement("style");
        targetElement.innerHTML = this.getStyle();
        this.shadowRoot.appendChild(targetElement);
        return;
      }
      if (this.render_style_mode === "lazy")
        return;
      this.styleComperator.innerHTML = this.getStyle();
      if (this.styleComperator.innerHTML !== targetElement.innerHTML) {
        targetElement.innerHTML = this.styleComperator.innerHTML;
      }
    }
    renderHTML(content) {
      if (!this.shadowRoot)
        return;
      while (this.templateComperator.firstChild) {
        this.templateComperator.removeChild(this.templateComperator.firstChild);
      }
      this.templateComperator.appendChild(this.styleComperator);
      this.renderContent(content, this.templateComperator);
      const clone = this.templateComperator.cloneNode(true);
      clone.querySelectorAll("*:not(style)").forEach((node) => {
        const path = this.getComposedPath(clone, node);
        const shadowNode = this.querySelector(path.join(" > "));
        if (!shadowNode) {
          let shadowtarget = this.shadowRoot;
          let target = node;
          for (let i22 = path.length - 1; i22 >= 0; i22--) {
            const _shadownode = this.querySelector(path.slice(0, i22).join(" > "));
            if (_shadownode) {
              shadowtarget = _shadownode;
              break;
            } else {
              target = node.parentElement;
            }
          }
          if (target) {
            shadowtarget === null || shadowtarget === void 0 ? void 0 : shadowtarget.appendChild(target);
          } else {
            console.error("[ERROR] this case should not happen");
            console.log({ shadowtarget, node, target, path });
          }
        } else {
          for (let i22 = 0; i22 < node.attributes.length; i22++) {
            const name = node.attributes[i22].name;
            const value = node.attributes[i22].value;
            const shadowValue = shadowNode.getAttribute(name);
            if (shadowValue !== value)
              shadowNode.setAttribute(name, value);
          }
          node.childNodes.forEach((child, key) => {
            var _a;
            if (child.nodeType === Node.TEXT_NODE) {
              if (((_a = child.textContent) === null || _a === void 0 ? void 0 : _a.trim()) === "")
                return;
              const shadowTextNode = shadowNode.childNodes[key];
              if (shadowTextNode) {
                if (shadowTextNode.nodeType === Node.TEXT_NODE) {
                  if (shadowTextNode.textContent !== child.textContent) {
                    shadowTextNode.textContent = child.textContent;
                  }
                } else {
                  console.error("[ERROR] if this can be seen we must update (1)");
                  console.log({ shadowTextNode, child, content: child.textContent });
                }
              } else {
                console.error("[ERROR] if this can be seen we must update (2)");
                console.log({ child, content: child.textContent });
              }
            }
          });
        }
      });
      this.shadowRoot.querySelectorAll("*:not(style)").forEach((node) => {
        if (!node.parentNode)
          return;
        const path = this.getComposedPath(this.shadowRoot, node);
        const templateNode = this.templateComperator.querySelector(path.join(" > "));
        if (!templateNode) {
          node.parentNode.removeChild(node);
        }
      });
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
    getComposedPath(base, target) {
      const path = [];
      while (target !== base) {
        path.push(this.getSelector(target));
        let nexttarget = target.parentElement;
        if (nexttarget)
          target = nexttarget;
        else
          break;
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
    getSelector(node) {
      const selector = [node.tagName];
      if (node.id)
        selector.push("#" + node.id);
      if (node.className)
        selector.push("." + node.className.replace(/ /g, "."));
      if (node.hasAttribute("key"))
        selector.push(`[key="${node.getAttribute("key")}"]`);
      if (selector.length === 1) {
        if (node.parentNode) {
          if (node.parentNode.children.length > 1) {
            let index = 0;
            for (let i22 = 0; i22 < node.parentNode.children.length; i22++) {
              if (node.parentNode.children[i22] === node) {
                index = i22;
                break;
              }
            }
            selector.push(`:nth-child(${index + 1})`);
          }
        }
      }
      return selector.join("");
    }
    renderContent(content, parent) {
      if (["string", "number", "boolean"].includes(typeof content)) {
        const strcontent = content.toString();
        if (/</.test(strcontent) && />/.test(strcontent)) {
          parent.innerHTML = parent.innerHTML + strcontent;
        } else {
          const textNode = document.createTextNode(strcontent);
          parent.appendChild(textNode);
        }
      } else if (content instanceof DocumentFragment) {
        parent.appendChild(content);
      } else if (content instanceof Array) {
        content.forEach((child) => this.renderContent(child, parent));
      }
    }
  };
  __decorate2([
    property2({ rerender: false, type: Boolean })
  ], BaseSystem2.prototype, "hasFocus", void 0);
  var AssetTemplate2 = class extends BaseSystem2 {
    constructor() {
      super(...arguments);
      this.assetBase = "/public";
      this.cache = false;
    }
    async loadAsset(file, isurl = false) {
      try {
        let filename = file;
        if (filename[0] === "/")
          filename = filename.slice(1, filename.length);
        const url = isurl ? file : `${this.assetBase}/${filename}`;
        if (this.cache) {
          const item = window.localStorage.getItem(`pap-assets-${url}`);
          if (item) {
            return item;
          }
        }
        const response = await fetch(url);
        if (response.ok) {
          return response;
        } else {
          console.error("Error fetching asset:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error fetching asset:", error);
      }
      return null;
    }
    assetBaseUpdate(_value, _old) {
      if (this.assetBase[this.assetBase.length - 1] === "/") {
        this.assetBase = this.assetBase.slice(0, this.assetBase.length - 1);
      }
    }
    cacheData(file, data) {
      let filename = file;
      if (filename[0] === "/")
        filename = filename.slice(1, filename.length);
      const url = `${this.assetBase}/${filename}`;
      window.localStorage.setItem(`pap-assets-${url}`, data);
    }
  };
  __decorate2([
    property2({ onUpdate: "assetBaseUpdate", attribute: "asset-base" })
  ], AssetTemplate2.prototype, "assetBase", void 0);
  __decorate2([
    property2({ type: Boolean })
  ], AssetTemplate2.prototype, "cache", void 0);
  var p7 = Object.defineProperty;
  var u5 = Object.getOwnPropertyDescriptor;
  var n3 = (c6, a22, t22, s3) => {
    for (var e4 = s3 > 1 ? void 0 : s3 ? u5(a22, t22) : a22, i22 = c6.length - 1, r9; i22 >= 0; i22--)
      (r9 = c6[i22]) && (e4 = (s3 ? r9(a22, t22, e4) : r9(e4)) || e4);
    return s3 && e4 && p7(a22, t22, e4), e4;
  };
  var d7 = `:host {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: var(--icon-custom-size);
  height: var(--icon-custom-size); }

:host([size="small"]) {
  --icon-custom-size: var(--icon-size-small, 16px); }

:host([size="medium"]) {
  --icon-custom-size: var(--icon-size-medium, 20px); }

:host([size="large"]) {
  --icon-custom-size: var(--icon-size-large, 40px); }

:host(:not([container])) svg {
  width: inherit;
  height: inherit; }

:host([container]) {
  display: flex; }
  :host([container]) svg {
    width: var(--icon-custom-size);
    height: var(--icon-custom-size); }

:host([container="small"]) {
  width: var(--field-size-small, 32px);
  height: var(--field-size-small, 32px); }

:host([container="medium"]) {
  width: var(--field-size-medium, 40px);
  height: var(--field-size-medium, 40px); }

:host([container="large"]) {
  width: var(--field-size-large, 56px);
  height: var(--field-size-large, 56px); }

svg {
  fill: currentColor; }

:host([data-hide-slot="true"])::part(fallback) {
  display: none; }

:host([data-hide-slot="false"]) {
  width: fit-content; }
  :host([data-hide-slot="false"]) svg {
    display: none; }`;
  var o5 = class extends AssetTemplate2 {
    constructor() {
      super();
      this.content = "";
      this.size = "medium";
      this.render_mode = "greedy", this.assetBase = "/icons";
    }
    firstUpdate() {
      if (this.shadowRoot) {
        let t22 = this.shadowRoot.querySelector("svg");
        if (t22 === null)
          throw new Error("Could not find svg element");
        this.svgElement = t22, this.content && this.setSVG();
      }
    }
    async updateName() {
      let t22 = `${this.name}.svg`;
      try {
        let s3 = await this.loadAsset(t22);
        if (s3) {
          let e4, i22 = "0 96 960 960";
          if (typeof s3 == "string")
            e4 = s3;
          else {
            e4 = await s3.text();
            let [r9, m8] = this.extractSvgContent(e4);
            m8 && (i22 = m8), r9 && (e4 = `SVG:${i22}##${r9.trim()}`, this.cacheData(t22, e4));
          }
          e4.startsWith("SVG:") ? (this.setAttribute("data-hide-slot", "true"), this.content = e4, this.getAttribute("show") && console.log(e4), this.setSVG()) : this.setAttribute("data-hide-slot", "false");
        } else
          this.setAttribute("data-hide-slot", "false");
      } catch (s3) {
        console.log("im hidden"), this.setAttribute("data-hide-slot", "false");
      }
    }
    updateColor() {
      this.color && (this.style.color = this.color);
    }
    updateSize() {
      this.style.removeProperty("--icon-custom-size");
    }
    updateCustomSize() {
      this.customSize !== void 0 && this.style.setProperty("--icon-custom-size", this.customSize + "px");
    }
    extractSvgContent(t22) {
      let i22 = new DOMParser().parseFromString(t22, "image/svg+xml").querySelector("svg");
      return i22 ? [i22.innerHTML, i22.getAttribute("viewBox")] : ["", ""];
    }
    setSVG() {
      if (this.svgElement) {
        let t22 = /SVG:(.*)##/.exec(this.content);
        if (t22) {
          let s3 = this.content.split(t22[1])[1];
          this.svgElement.setAttribute("viewBox", t22[1]), this.getAttribute("show") && console.log(this.content, t22, s3), this.svgElement.innerHTML = s3;
        }
      }
    }
    render() {
      return html2`
      <slot part="fallback"></slot>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 96 960 960"
        part="svg"
      >
        ${this.content}
      </svg>
    `;
    }
  };
  o5.style = d7, n3([property2({ rerender: false })], o5.prototype, "container", 2), n3([property2({ onUpdate: "updateName", rerender: false })], o5.prototype, "name", 2), n3([property2({ onUpdate: "updateColor", rerender: false })], o5.prototype, "color", 2), n3([property2({ onUpdate: "updateSize", rerender: false })], o5.prototype, "size", 2), n3([property2({ onUpdate: "updateCustomSize", rerender: false, type: Number })], o5.prototype, "customSize", 2);
  var h7 = customElements != null ? customElements : window == null ? void 0 : window.customElements;
  if (!h7)
    throw new Error("Custom Elements not supported");
  h7.get("pap-icon") || h7.define("pap-icon", o5);
  var y5 = Object.defineProperty;
  var f5 = Object.getOwnPropertyDescriptor;
  var i6 = (h32, e4, o22, r9) => {
    for (var a22 = r9 > 1 ? void 0 : r9 ? f5(e4, o22) : e4, p32 = h32.length - 1, s3; p32 >= 0; p32--)
      (s3 = h32[p32]) && (a22 = (r9 ? s3(e4, o22, a22) : s3(a22)) || a22);
    return r9 && a22 && y5(e4, o22, a22), a22;
  };
  var l8 = `:host {
  text-align: left;
  display: block;
  color: inherit; }

:host([inline]) {
  display: inline; }

:host([alignment="center"]),
:host([align="center"]) {
  text-align: center; }

:host([alignment="justify"]),
:host([align="justify"]) {
  text-align: justify; }

:host([alignment="start"]),
:host([align="start"]) {
  text-align: start; }

:host([alignment="end"]),
:host([align="end"]) {
  text-align: end; }

:host([alignment="left"]),
:host([align="left"]) {
  text-align: left; }

:host([alignment="right"]),
:host([align="right"]) {
  text-align: right; }

:host([alignment="unset"]),
:host([align="unset"]) {
  text-align: unset; }

:host([alignment="inherit"]),
:host([align="inherit"]) {
  text-align: inherit; }

:host([alignment="initial"]),
:host([align="initial"]) {
  text-align: initial; }

:host([nowrap="true"]) {
  white-space: nowrap; }

:host([truncate="true"]) {
  white-space: nowrap;
  /* this ensures text remains on a single line */
  overflow: hidden;
  /* hides any overflow */
  text-overflow: ellipsis;
  /* shows ellipsis for any overflow */ }

:host([variant="heading1"]),
:host([variant="H1"]) {
  font-family: var(--typography-h1-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-h1-fontsize, 8.75rem);
  font-weight: var(--typography-h1-fontweight, 800);
  line-height: var(--typography-h1-lineheight, 120%);
  letter-spacing: var(--typography-h1-letterspacing, 0); }

:host([variant="heading2"]),
:host([variant="H2"]) {
  font-family: var(--typography-h2-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-h2-fontsize, 5.5rem);
  font-weight: var(--typography-h2-fontweight, 800);
  line-height: var(--typography-h2-lineheight, 120%);
  letter-spacing: var(--typography-h2-letterspacing, 0); }

:host([variant="heading3"]),
:host([variant="H3"]) {
  font-family: var(--typography-h3-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-h3-fontsize, 5rem);
  font-weight: var(--typography-h3-fontweight, 700);
  line-height: var(--typography-h3-lineheight, 120%);
  letter-spacing: var(--typography-h3-letterspacing, 0); }

:host([variant="heading4"]),
:host([variant="H4"]) {
  font-family: var(--typography-h4-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-h4-fontsize, 4rem);
  font-weight: var(--typography-h4-fontweight, 700);
  line-height: var(--typography-h4-lineheight, 120%);
  letter-spacing: var(--typography-h4-letterspacing, 0); }

:host([variant="heading5"]),
:host([variant="H5"]) {
  font-family: var(--typography-h5-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-h5-fontsize, 3.5rem);
  font-weight: var(--typography-h5-fontweight, 400);
  line-height: var(--typography-h5-lineheight, 120%);
  letter-spacing: var(--typography-h5-letterspacing, 0); }

:host([variant="title1"]),
:host([variant="T1"]) {
  font-family: var(--typography-t1-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-t1-fontsize, 3rem);
  font-weight: var(--typography-t1-fontweight, 700);
  line-height: var(--typography-t1-lineheight, 120%);
  letter-spacing: var(--typography-t1-letterspacing, 0); }

:host([variant="title2"]),
:host([variant="T2"]) {
  font-family: var(--typography-t2-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-t2-fontsize, 2.5rem);
  font-weight: var(--typography-t2-fontweight, 700);
  line-height: var(--typography-t2-lineheight, 120%);
  letter-spacing: var(--typography-t2-letterspacing, 0); }

:host([variant="title3"]),
:host([variant="T3"]) {
  font-family: var(--typography-t3-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-t3-fontsize, 2rem);
  font-weight: var(--typography-t3-fontweight, 600);
  line-height: var(--typography-t3-lineheight, 120%);
  letter-spacing: var(--typography-t3-letterspacing, 0); }

:host([variant="title4"]),
:host([variant="T4"]) {
  font-family: var(--typography-t4-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-t4-fontsize, 1.5rem);
  font-weight: var(--typography-t4-fontweight, 600);
  line-height: var(--typography-t4-lineheight, 140%);
  letter-spacing: var(--typography-t4-letterspacing, 0); }

:host([variant="copy1"]),
:host([variant="C1"]) {
  font-family: var(--typography-c1-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-c1-fontsize, 1.5rem);
  font-weight: var(--typography-c1-fontweight, 500);
  line-height: var(--typography-c1-lineheight, 140%);
  letter-spacing: var(--typography-c1-letterspacing, 0.01rem); }

:host([variant="copy2"]),
:host([variant="C2"]) {
  font-family: var(--typography-c2-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-c2-fontsize, 1rem);
  font-weight: var(--typography-c2-fontweight, 600);
  line-height: var(--typography-c2-lineheight, 140%);
  letter-spacing: var(--typography-c2-letterspacing, 0.01rem); }

:host([variant="copy3"]),
:host([variant="C3"]) {
  font-family: var(--typography-c3-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-c3-fontsize, 1rem);
  font-weight: var(--typography-c3-fontweight, 400);
  line-height: var(--typography-c3-lineheight, 140%);
  letter-spacing: var(--typography-c3-letterspacing, 0.01rem); }

:host([variant="copy4"]),
:host([variant="C4"]) {
  font-family: var(--typography-c4-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-c4-fontsize, 0.75rem);
  font-weight: var(--typography-c4-fontweight, 400);
  line-height: var(--typography-c4-lineheight, 140%);
  letter-spacing: var(--typography-c4-letterspacing, 0.01rem); }

:host([variant="button1"]),
:host([variant="B1"]) {
  font-family: var(--typography-b1-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-b1-fontsize, 1rem);
  font-weight: var(--typography-b1-fontweight, 600);
  line-height: var(--typography-b1-lineheight, 140%);
  letter-spacing: var(--typography-b1-letterspacing, 0.01rem); }

:host([variant="button2"]),
:host([variant="B2"]) {
  font-family: var(--typography-b2-fontfamily, "Libre Franklin", helvetica, sans-serif);
  font-size: var(--typography-b2-fontsize, 1rem);
  font-weight: var(--typography-b2-fontweight, 600);
  line-height: var(--typography-b2-lineheight, 140%);
  letter-spacing: var(--typography-b2-letterspacing, 0.01rem);
  text-decoration: underline; }`;
  var t5 = class extends BaseSystem2 {
    constructor() {
      super(...arguments);
      this.variant = "C3";
      this.align = "initial";
      this.nowrap = false;
      this.truncate = false;
    }
    render() {
      return html2`
            <slot></slot>
        `;
    }
  };
  t5.style = l8, i6([property2({ rerender: false })], t5.prototype, "variant", 2), i6([property2({ rerender: false })], t5.prototype, "align", 2), i6([property2({ rerender: false, type: Boolean })], t5.prototype, "nowrap", 2), i6([property2({ rerender: false, type: Boolean })], t5.prototype, "truncate", 2);
  var g5 = customElements != null ? customElements : window == null ? void 0 : window.customElements;
  if (!g5)
    throw new Error("Custom Elements not supported");
  g5.get("pap-typography") || g5.define("pap-typography", t5);
  var FormElementTemplate2 = class extends BaseSystem2 {
    findForm() {
      setTimeout(() => {
        const closestOFORM = this.shadow_closest("pap-form");
        if (closestOFORM) {
          const form = closestOFORM.querySelector("form");
          if (form)
            this.assignForm(form);
        } else {
          const form = this.shadow_closest("form");
          if (form)
            this.assignForm(form);
        }
      }, 100);
    }
    assignForm(form) {
      this.formElement = form;
      this.dispatchEvent(new Event("form-element-loaded"));
    }
    connectedCallback() {
      super.connectedCallback();
      this.findForm();
    }
    firstUpdate() {
      if (!this.formElement)
        this.findForm();
    }
  };
  __decorate2([
    property2({ type: Boolean, rerender: false })
  ], FormElementTemplate2.prototype, "disabled", void 0);
  __decorate2([
    property2({ type: Boolean, rerender: false })
  ], FormElementTemplate2.prototype, "required", void 0);
  __decorate2([
    property2({ rerender: false })
  ], FormElementTemplate2.prototype, "name", void 0);
  var x4 = Object.defineProperty;
  var h22 = Object.getOwnPropertyDescriptor;
  var l22 = (s3, o22, t22, e4) => {
    for (var r9 = e4 > 1 ? void 0 : e4 ? h22(o22, t22) : o22, i22 = s3.length - 1, n22; i22 >= 0; i22--)
      (n22 = s3[i22]) && (r9 = (e4 ? n22(o22, t22, r9) : n22(r9)) || r9);
    return e4 && r9 && x4(o22, t22, r9), r9;
  };
  var v6 = `:host([radius="none"]) {
  border-radius: var(--box-radius-none, var(--radius-none, 0px)); }

:host([radius="small"]) {
  border-radius: var(--box-radius-small, var(--radius-small, var(--radius-small, 4px))); }

:host([radius="medium"]) {
  border-radius: var(--box-radius-medium, var(--radius-medium, var(--radius-medium, 8px))); }

:host([radius="large"]) {
  border-radius: var(--box-radius-large, var(--radius-large, var(--radius-large, 16px))); }

:host([radius="circular"]) {
  border-radius: var(--box-radius-circular, var(--radius-circular, var(--radius-max, 1000px))); }

:host([elevation="small"]) {
  box-shadow: var(--box-shadow-small, var(--shadow-s, 0 2px 4px var(--pap-color-shadow, color-mix(in oklab, var(--pap-color-neutral-600, #6E7087), transparent 80%)))); }

:host([elevation="medium"]) {
  box-shadow: var(--box-shadow-medium, var(--shadow-m, 0 4px 6px var(--pap-color-shadow, color-mix(in oklab, var(--pap-color-neutral-600, #6E7087), transparent 80%)))); }

:host([elevation="large"]) {
  box-shadow: var(--box-shadow-large, var(--shadow-l, 0 8px 12px var(--pap-color-shadow, color-mix(in oklab, var(--pap-color-neutral-600, #6E7087), transparent 80%)))); }

:host([elevation="x-large"]) {
  box-shadow: var(--box-shadow-x-large, var(--shadow-xl, 0 16px 20px var(--pap-color-shadow, color-mix(in oklab, var(--pap-color-neutral-600, #6E7087), transparent 80%)))); }

:host([elevation-direction="horizontal"][elevation="small"]) {
  box-shadow: var(--box-shadow-small, var(--shadow-horizontal-s, 2px 0 4px var(--pap-color-shadow, color-mix(in oklab, var(--pap-color-neutral-600, #6E7087), transparent 80%)))); }

:host([elevation-direction="horizontal"][elevation="medium"]) {
  box-shadow: var(--box-shadow-medium, var(--shadow-horizontal-m, 4px 0 6px var(--pap-color-shadow, color-mix(in oklab, var(--pap-color-neutral-600, #6E7087), transparent 80%)))); }

:host([elevation-direction="horizontal"][elevation="large"]) {
  box-shadow: var(--box-shadow-large, var(--shadow-horizontal-l, 8px 0 12px var(--pap-color-shadow, color-mix(in oklab, var(--pap-color-neutral-600, #6E7087), transparent 80%)))); }

:host([elevation-direction="horizontal"][elevation="x-large"]) {
  box-shadow: var(--box-shadow-x-large, var(--shadow-horizontal-xl, 16px 0 20px var(--pap-color-shadow, color-mix(in oklab, var(--pap-color-neutral-600, #6E7087), transparent 80%)))); }`;
  var a4 = class extends BaseSystem2 {
    constructor() {
      super(...arguments);
      this.radius = "circular";
      this.elevation = "none";
      this.elevationdirection = "vertical";
    }
    render() {
      return `
            <slot></slot>
        `;
    }
  };
  a4.styles = [v6], l22([property2({ rerender: false })], a4.prototype, "radius", 2), l22([property2({ rerender: false })], a4.prototype, "elevation", 2), l22([property2({ rerender: false, attribute: "elevation-direction" })], a4.prototype, "elevationdirection", 2);
  var p22 = customElements != null ? customElements : window == null ? void 0 : window.customElements;
  if (!p22)
    throw new Error("Custom Elements not supported");
  p22.get("pap-box-template") || p22.define("pap-box-template", a4);
  var style10 = `:host([size="small"]) pap-box-template.wrapper {
  height: var(--pap-field-height-small, var(--field-size-small, 32px)); }

:host([size="small"]) footer,
:host([size="small"]) header {
  height: var(--pap-field-block-height-small, var(--field-size-small, 32px)); }

:host([size="medium"]) pap-box-template.wrapper {
  height: var(--pap-field-height-medium, var(--field-size-medium, 40px)); }

:host([size="medium"]) footer,
:host([size="medium"]) header {
  height: var(--pap-field-block-height-medium, var(--field-size-small, 32px)); }

:host([size="large"]) pap-box-template.wrapper {
  height: var(--pap-field-height-large, var(--field-size-large, 56px)); }

:host([size="large"]) footer,
:host([size="large"]) header {
  height: var(--pap-field-block-height-large, var(--field-size-small, 32px)); }

:host {
  --border: var(--pap-field-background-color-light, var(--pap-color-black, black));
  --outline: var(--pap-field-background-color-light, rgb(90, 46, 250));
  --color: var(--pap-field-text-color-light, var(--pap-color-black, black));
  display: block;
  color: var(--color); }
  :host footer,
  :host header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-inline: var(--padding-small, 8px); }
  :host footer div {
    display: none;
    align-items: center;
    gap: var(--gap-small, 8px); }
  :host pap-box-template.wrapper {
    box-sizing: border-box;
    position: relative;
    display: flex;
    align-items: center;
    padding-inline: var(--padding-medium, 16px);
    border: 1px solid var(--border); }
    :host pap-box-template.wrapper ::slotted(*:not([slot])),
    :host pap-box-template.wrapper input, :host pap-box-template.wrapper select, :host pap-box-template.wrapper textarea {
      color: inherit;
      font-family: var(--input-fontfamily, var(--typography-c3-fontfamily, "Libre Franklin", helvetica, sans-serif));
      font-size: var(--input-fontsize, var(--typography-c3-fontsize, 16px));
      font-weight: var(--input-fontweight, var(--typography-c3-fontweight, 400));
      line-height: var(--input-lineheight, var(--typography-c3-lineheight, 24px));
      letter-spacing: var(--input-letterspacing, var(--typography-c3-letterspacing, 0.01em));
      flex-grow: 1;
      display: block;
      border: none;
      background-color: transparent;
      outline: none !important; }
    :host pap-box-template.wrapper ::slotted(*[slot="prefix"]) {
      margin-right: var(--gap-small, 8px); }
    :host pap-box-template.wrapper ::slotted(*[slot="suffix"]) {
      margin-left: var(--gap-small, 8px); }
  :host:focus {
    outline: none; }

:host([isWarning="true"]) footer div:not(.warning) {
  display: none; }

:host([isWarning="true"]) footer div.warning {
  display: flex; }

:host([isError="true"]) footer div:not(.error) {
  display: none; }

:host([isError="true"]) footer div.error {
  display: flex; }

:host([hasfocus="true"]),
:host(:focus) {
  outline: none; }
  :host([hasfocus="true"]) pap-box-template.wrapper,
  :host(:focus) pap-box-template.wrapper {
    outline: 1px solid var(--outline); }

@media (prefers-color-scheme: dark) {
  :host {
    --border: var(--pap-field-background-color-dark, var(--pap-color-black, white));
    --outline: var(--pap-field-background-color-dark, rgb(195, 211, 255));
    --color: var(--pap-field-text-color-dark, var(--pap-color-black, white)); } }`;
  var ValidationAttributes2 = ["min", "max", "pattern", "type", "minlenght", "maxlenght", "required", "multiple", "novalidate", "formnovalidate", "autofocus"];
  var FieldTemplate2 = class extends FormElementTemplate2 {
    // class functions
    constructor(delay = 100) {
      super();
      this.size = "medium";
      this.radius = "small";
      this.tabIndex = 1;
      this.readonly = false;
      this.value = "";
      this.isError = false;
      this.isWarning = false;
      this._suffix = "<span> </span>";
      this._prefix = "<span> </span>";
      this.attributequeue = [];
      this.onvalueupdate = (value) => {
        if (!this.inputElement)
          return;
        const type = this.inputElement.getAttribute("type");
        if ("checked" in this.inputElement && (type === "radio" || type === "checkbox")) {
          this.checked = value === "true";
          this.inputElement.checked = this.checked;
          if (this.hiddenElement) {
            this.hiddenElement.checked = this.checked;
            this.hiddenElement.value = this.value;
            this.updateHidden();
          }
          if (!this.checked) {
            this.inputElement.removeAttribute("checked");
            if (this.hiddenElement) {
              this.hiddenElement.removeAttribute("checked");
              this.updateHidden();
            }
          }
        } else if ("value" in this.inputElement) {
          this.inputElement.value = this.value;
        }
        if (type === "radio" || type === "checkbox" || this.inputElement.getAttribute("data-tagname") === "select" || this.inputElement.tagName === "select") {
          this.inputElement.dispatchEvent(new Event("change"));
        } else {
          this.inputElement.dispatchEvent(new Event("input"));
        }
      };
      this.oncheckedupdate = (value) => {
        this.onvalueupdate(value.toString());
      };
      this.handleinvalid_field = (e4) => {
        console.log("invalid");
      };
      this.handlevalid_field = (e4) => {
        console.log("valid");
      };
      this.handleinput_field = (e4) => {
        this.handlechange_field(e4, false);
        this.dispatchEvent(new Event("input"));
        this.debouncedInput();
        if (this.maxLength && this.counterElement) {
          this.counterElement.innerHTML = this.value.length.toString();
        }
      };
      this.handlechange_field = (e4, dispatch = true) => {
        if (e4.target instanceof HTMLElement) {
          const type = e4.target.getAttribute("type");
          if ("checked" in e4.target && (type === "radio" || type === "checkbox")) {
            this.value = (e4.target.checked || false).toString();
            if (this.hiddenElement) {
              this.hiddenElement.value = this.value;
              this.updateHidden();
            }
          } else if ("value" in e4.target) {
            this.value = e4.target.value;
            if (this.hiddenElement) {
              this.hiddenElement.value = this.value;
              this.updateHidden();
            }
          }
          if (dispatch) {
            this.dispatchEvent(new Event("change"));
          }
        }
      };
      this.handleformelementload = () => {
        this.assignHiddenElement();
      };
      this.handlevalid = () => {
        this.isError = false;
        this.isWarning = false;
      };
      this.handleinvalid = (e4) => {
        if (!(this.isError && this.isWarning))
          this.updateHidden();
      };
      this.debouncedInput = () => {
        this.dispatchEvent(new Event("debounced-input"));
      };
      this.handlefocus = () => {
        if (this.inputElement) {
          this.inputElement.focus();
        }
      };
      this.debouncedInput = debounce2(this.debouncedInput, delay);
      this.updateHidden = debounce2(this.updateHidden, 10);
      super.addEventListener("form-element-loaded", this.handleformelementload);
    }
    assignHiddenElement() {
      if (!this.formElement)
        this.findForm();
      if (!this.hiddenElement && this.getAttribute("name")) {
        this.hiddenElement = document.createElement("input");
        this.hiddenElement.value = this.value;
        this.hiddenElement.setAttribute("name", this.getAttribute("name"));
        this.hiddenElement.style.overflow = "hidden";
        this.hiddenElement.style.position = "absolute";
        this.hiddenElement.style.height = "0";
        this.hiddenElement.style.width = "0";
        this.hiddenElement.style.visibility = "hidden";
        this.hiddenElement.style.padding = "0";
        this.hiddenElement.style.margin = "0";
        this.hiddenElement.style.float = "right";
        this.hiddenElement.addEventListener("valid", this.handlevalid);
        this.hiddenElement.addEventListener("invalid", this.handleinvalid);
        while (this.attributequeue.length > 0) {
          const next = this.attributequeue.pop();
          if (next) {
            if (next[1] !== null)
              this.hiddenElement.setAttribute(next[0], next[1]);
            else
              this.hiddenElement.removeAttribute(next[0]);
          }
        }
        this.formElement.appendChild(this.hiddenElement);
      }
    }
    updateHidden() {
      if (this.hiddenElement) {
        const valid = this.hiddenElement.checkValidity();
        if (!valid) {
          const validity = this.hiddenElement.validity;
          for (let type in validity) {
            if (!validity[type])
              continue;
            if (this.customError && this.customError[type]) {
              if (this.errorText) {
                this.errorText.innerHTML = this.customError[type];
                this.isWarning = false;
                this.isError = true;
                return;
              }
            } else if (this.customWarning && this.customWarning[type]) {
              if (this.warningText) {
                this.warningText.innerHTML = this.customWarning[type];
                this.isWarning = true;
                this.isError = false;
                return;
              }
            } else {
              const auto_message = this.hiddenElement.validationMessage;
              if (this.errorText) {
                this.errorText.innerHTML = auto_message;
                this.isWarning = false;
                this.isError = true;
                return;
              }
            }
          }
        } else {
          this.handlevalid();
        }
      }
    }
    checkValidity() {
      if (this.hiddenElement)
        return this.hiddenElement.checkValidity();
      return false;
    }
    reportValidity() {
      if (this.hiddenElement)
        return this.hiddenElement.reportValidity();
      return false;
    }
    connectedCallback() {
      super.connectedCallback();
      this.addEventListener("focus", this.handlefocus);
    }
    attributeChangedCallback(name, oldValue, newValue) {
      if (ValidationAttributes2.includes(name.toLowerCase())) {
        if (this.hiddenElement) {
          if (newValue)
            this.hiddenElement.setAttribute(name, newValue);
          else
            this.hiddenElement.removeAttribute(name);
        } else {
          this.attributequeue.push([name, newValue]);
        }
        if (this.inputElement) {
          if (newValue)
            this.inputElement.setAttribute(name, newValue);
          else
            this.inputElement.removeAttribute(name);
        }
      }
    }
    render(element, selector = "input") {
      if (element) {
        const input = element.querySelector(selector);
        if (input && !input.hasAttribute("data-field-init")) {
          input.addEventListener("invalid", this.handleinvalid_field);
          input.addEventListener("valid", this.handlevalid_field);
          input.addEventListener("input", this.handleinput_field);
          input.addEventListener("change", this.handlechange_field);
          const type = input.getAttribute("type");
          if (type === "radio" || type === "checkbox") {
            if (this.checked) {
              input.setAttribute("checked", this.checked.toString());
            } else {
              input.removeAttribute("checked");
            }
          } else {
            if (this.value !== void 0) {
              input.setAttribute("value", this.value);
            }
          }
          if (this.readonly)
            input.setAttribute("readonly", "true");
          input.setAttribute("data-field-init", "true");
          this.inputElement = input;
          this.onvalueupdate(this.value);
        }
      }
      return html2`
      <header part="header">
        <slot name="header"><pap-typography>${this.label || ""}</pap-typography></slot>
        ${this.maxLength ? html2`<pap-typography><span class="counter"></span>/${this.maxLength}</pap-typography>` : ""}
      </header>
      <pap-box-template radius="${this.radius}" class="wrapper" part="wrapper">
        <slot name="prefix">${this._prefix}</slot>
        ${element ? element : "<slot></slot>"}
        <slot name="suffix">${this._suffix}</slot>
      </pap-box-template>
      <footer part="footer">
        <div class="warning">
          <pap-icon name="warning"></pap-icon>
          <pap-typography>This is a placeholder for warning</pap-typography>
        </div>
        <div class="error">
          <pap-icon name="error"></pap-icon>
          <pap-typography>This is a placeholder for error</pap-typography>
        </div>
      </footer>
    `;
    }
  };
  FieldTemplate2.styles = [style10];
  __decorateClass([
    query2(".counter")
  ], FieldTemplate2.prototype, "counterElement", 2);
  __decorateClass([
    query2(".error > pap-typography")
  ], FieldTemplate2.prototype, "errorText", 2);
  __decorateClass([
    query2(".warning > pap-typography")
  ], FieldTemplate2.prototype, "warningText", 2);
  __decorateClass([
    property2({ type: Object })
  ], FieldTemplate2.prototype, "message", 2);
  __decorateClass([
    property2()
  ], FieldTemplate2.prototype, "label", 2);
  __decorateClass([
    property2({ rerender: false })
  ], FieldTemplate2.prototype, "size", 2);
  __decorateClass([
    property2({ rerender: false })
  ], FieldTemplate2.prototype, "radius", 2);
  __decorateClass([
    property2({ rerender: false, type: Boolean, onUpdate: "oncheckedupdate" })
  ], FieldTemplate2.prototype, "checked", 2);
  __decorateClass([
    property2({ rerender: false, type: Number })
  ], FieldTemplate2.prototype, "tabIndex", 2);
  __decorateClass([
    property2({ type: Boolean })
  ], FieldTemplate2.prototype, "readonly", 2);
  __decorateClass([
    property2({ rerender: false, onUpdate: "onvalueupdate" })
  ], FieldTemplate2.prototype, "value", 2);
  __decorateClass([
    property2({ rerender: false, type: Object })
  ], FieldTemplate2.prototype, "customError", 2);
  __decorateClass([
    property2({ rerender: false, type: Object })
  ], FieldTemplate2.prototype, "customWarning", 2);
  __decorateClass([
    property2({ rerender: false, type: Boolean })
  ], FieldTemplate2.prototype, "isError", 2);
  __decorateClass([
    property2({ rerender: false, type: Boolean })
  ], FieldTemplate2.prototype, "isWarning", 2);
  __decorateClass([
    property2({ rerender: false, type: Number })
  ], FieldTemplate2.prototype, "max", 2);
  __decorateClass([
    property2({ rerender: false, type: Number })
  ], FieldTemplate2.prototype, "min", 2);
  __decorateClass([
    property2({ rerender: false, type: Number })
  ], FieldTemplate2.prototype, "maxLength", 2);
  __decorateClass([
    property2({ type: Object, attribute: false })
  ], FieldTemplate2.prototype, "_suffix", 2);
  __decorateClass([
    property2({ type: Object, attribute: false })
  ], FieldTemplate2.prototype, "_prefix", 2);
  var cElements2 = customElements != null ? customElements : window == null ? void 0 : window.customElements;
  if (!cElements2) {
    throw new Error("Custom Elements not supported");
  }
  if (!cElements2.get("pap-field-template")) {
    cElements2.define("pap-field-template", FieldTemplate2);
  }

  // views/demo/main.js
  window.onload = () => {
    console.log("[demo]: window loaded");
  };
})();
