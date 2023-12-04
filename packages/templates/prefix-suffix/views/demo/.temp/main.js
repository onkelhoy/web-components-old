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
    for (let i6 = 0; i6 < element.childNodes.length; i6++) {
      let node = element.childNodes[i6];
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
    for (let i6 = 0; i6 < indexes.length; i6++) {
      const index = Number(indexes[i6]);
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
    for (let i6 = 0; i6 < values.length; i6++) {
      if (values[i6] instanceof Array) {
        let arr = [];
        for (let j2 = 0; j2 < values[i6].length; j2++) {
          if (values[i6][j2] instanceof DocumentFragment) {
            arr.push(`<!-- comment-node-${i6}.${j2} -->`);
          }
        }
        if (arr.length > 0) {
          result += strings[i6] + arr.join(" ");
          continue;
        }
      }
      if (values[i6] instanceof DocumentFragment) {
        result += strings[i6] + `<!-- comment-node-${i6} -->`;
        continue;
      }
      const trimmed = strings[i6].trim();
      const match = trimmed.match(/.*\s(on|@)([\w-]*)=/);
      if (match) {
        const [_whole, eventtype, name] = match;
        const split = trimmed.split(eventtype + name);
        result += split[0] + ` @${name}="${i6}"`;
      } else {
        result += strings[i6] + values[i6];
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
    var c6 = arguments.length, r9 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d7;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r9 = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i6 = decorators.length - 1; i6 >= 0; i6--)
        if (d7 = decorators[i6])
          r9 = (c6 < 3 ? d7(r9) : c6 > 3 ? d7(target, key, r9) : d7(target, key)) || r9;
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
      this._pendingOperations.forEach((o5) => o5());
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
          for (let i6 = path.length - 1; i6 >= 0; i6--) {
            const _shadownode = this.querySelector(path.slice(0, i6).join(" > "));
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
          for (let i6 = 0; i6 < node.attributes.length; i6++) {
            const name = node.attributes[i6].name;
            const value = node.attributes[i6].value;
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
            for (let i6 = 0; i6 < node.parentNode.children.length; i6++) {
              if (node.parentNode.children[i6] === node) {
                index = i6;
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
          const y5 = this.original_y - e4.pageY;
          this.section.style.height = this.original_height + y5 + "px";
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
          let x4 = e4.offsetX;
          let y5 = e4.offsetY;
          if (x4 < 0)
            x4 = 0;
          if (y5 < 0)
            y5 = 0;
          if (x4 > this.areabox.width)
            x4 = this.areabox.width;
          if (y5 > this.areabox.height)
            y5 = this.areabox.height;
          this.pickerElement.style.left = x4 + "px";
          this.pickerElement.style.top = y5 + "px";
          this.saturation = x4 / this.areabox.width * 100;
          this.lightness = (1 - y5 / this.areabox.height) * (100 - this.saturation * 0.5);
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
        const x4 = hsl[1] * this.areabox.width;
        const y5 = Math.max(0, Math.min(this.areabox.height, (this.lightness / (100 - this.saturation * 0.5) - 1) * -this.areabox.height));
        this.pickerElement.style.left = x4 + "px";
        this.pickerElement.style.top = y5 + "px";
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
  var r = (n3, a4, o5, p7) => {
    for (var t5 = p7 > 1 ? void 0 : p7 ? m(a4, o5) : a4, s3 = n3.length - 1, l8; s3 >= 0; s3--)
      (l8 = n3[s3]) && (t5 = (p7 ? l8(a4, o5, t5) : l8(t5)) || t5);
    return p7 && t5 && c(a4, o5, t5), t5;
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
      this.handlewindowclick = (o5) => {
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
      for (let i6 = 0; i6 < styleSheets.length; i6++) {
        const cssRules = styleSheets[i6].cssRules || styleSheets[i6].rules;
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
          const [h7, s3, l8] = Color.rgbToHSL(rgb[0], rgb[1], rgb[2]);
          const data = {
            css: color.value,
            h: h7,
            s: s3,
            l: l8
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
        const g5 = parseInt(hex.slice(2, 4), 16);
        const b4 = parseInt(hex.slice(4, 6), 16);
        return [r9, g5, b4];
      }
      return computedColor.replace(/rgba?\(|\)|\s/g, "").split(",").map((str) => Number(str));
    }
    static rgbToHSL(r9, g5, b4) {
      r9 /= 255, g5 /= 255, b4 /= 255;
      const max = Math.max(r9, g5, b4), min = Math.min(r9, g5, b4);
      let h7, s3, l8 = (max + min) / 2;
      if (max === min) {
        h7 = s3 = 0;
      } else {
        const d7 = max - min;
        s3 = l8 > 0.5 ? d7 / (2 - max - min) : d7 / (max + min);
        switch (max) {
          case r9:
            h7 = (g5 - b4) / d7 + (g5 < b4 ? 6 : 0);
            break;
          case g5:
            h7 = (b4 - r9) / d7 + 2;
            break;
          case b4:
          default:
            h7 = (r9 - g5) / d7 + 4;
            break;
        }
        h7 /= 6;
      }
      return [h7, s3, l8];
    }
    static hslToRgb(h7, s3, l8) {
      let r9, g5, b4;
      if (s3 === 0) {
        r9 = g5 = b4 = l8;
      } else {
        const hue2rgb = (p8, q2, t5) => {
          if (t5 < 0)
            t5 += 1;
          if (t5 > 1)
            t5 -= 1;
          if (t5 < 1 / 6)
            return p8 + (q2 - p8) * 6 * t5;
          if (t5 < 1 / 2)
            return q2;
          if (t5 < 2 / 3)
            return p8 + (q2 - p8) * (2 / 3 - t5) * 6;
          return p8;
        };
        const q = l8 < 0.5 ? l8 * (1 + s3) : l8 + s3 - l8 * s3;
        const p7 = 2 * l8 - q;
        r9 = hue2rgb(p7, q, h7 + 1 / 3);
        g5 = hue2rgb(p7, q, h7);
        b4 = hue2rgb(p7, q, h7 - 1 / 3);
      }
      return [Math.round(r9 * 255), Math.round(g5 * 255), Math.round(b4 * 255)];
    }
    static spectrum(css, name, force = false) {
      Color.init();
      const pre = Color.get(css);
      if (pre && !force)
        return pre.spectrum;
      const rgb = Color.cssToRGB(css);
      const [h7, s3, l8] = Color.rgbToHSL(rgb[0], rgb[1], rgb[2]);
      const lum_step = Math.min(l8, 1 - l8) / 5;
      const data = {};
      for (let i6 = -4; i6 <= 4; i6++) {
        const number = (9 - (i6 + 4)) * 100;
        if (Color.checkSideColor(name, number, data)) {
          continue;
        }
        const newl = Math.min(Math.max(l8 + lum_step * i6, 0), 1);
        data[number] = {
          h: h7,
          s: s3,
          l: newl,
          css: `hsl(${h7 * 360}, ${s3 * 100}%, ${newl * 100}%)`
        };
      }
      const complimentaryHue = (h7 + 0.5) % 1;
      if (!Color.checkSideColor(name, 2e3, data)) {
        data[2e3] = {
          h: complimentaryHue,
          s: s3,
          l: l8,
          css: `hsl(${complimentaryHue * 360}, ${s3 * 100}%, ${l8 * 100}%)`
        };
      }
      if (!Color.checkSideColor(name, 2e3, data)) {
        data["3000"] = {
          h: h7,
          s: 0.05,
          l: 0.97,
          css: `hsl(${h7 * 360}, 5%, 97%)`
        };
      }
      if (!Color.checkSideColor(name, 2e3, data)) {
        data["3100"] = {
          h: h7,
          s: 0.05,
          l: 0.4,
          css: `hsl(${h7 * 360}, 5%, 40%)`
        };
      }
      const sat_step = s3 / 6;
      for (let i6 = 0; i6 < 5; i6++) {
        const number = (11 + i6) * 100;
        if (Color.checkSideColor(name, number, data)) {
          continue;
        }
        const news = Math.min(Math.max(l8 - sat_step * i6, 0), 1);
        data[(11 + i6) * 100] = {
          h: h7,
          s: news,
          l: l8,
          css: `hsl(${h7 * 360}, ${news * 100}%, ${l8 * 100}%)`
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
    const h7 = value.toString(16);
    if (h7.length === 1)
      return `0${h7}`;
    return h7;
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
          const [r9, g5, b4] = Color.cssToRGB(value);
          const hsl = Color.rgbToHSL(r9, g5, b4);
          if (this.colorpicker_element) {
            this.colorpicker_element.setColor(hsl);
          }
          this.style.setProperty("--display-color", e4.detail.value);
          this.debouncedChange(e4.detail.value);
        }
        this.manual = false;
      };
      this.handlecolorchange = (e4) => {
        const [r9, g5, b4] = Color.cssToRGB(e4.detail.value);
        const hex = `#${toHEX(r9)}${toHEX(g5)}${toHEX(b4)}`;
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
        const [r9, g5, b4] = Color.cssToRGB(value);
        const hsl = Color.rgbToHSL(r9, g5, b4);
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
  var r2 = (h7, l8, s3, a4) => {
    for (var e4 = a4 > 1 ? void 0 : a4 ? x(l8, s3) : l8, t5 = h7.length - 1, n3; t5 >= 0; t5--)
      (n3 = h7[t5]) && (e4 = (a4 ? n3(l8, s3, e4) : n3(e4)) || e4);
    return a4 && e4 && y(l8, s3, e4), e4;
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
      s3.addEventListener("tab-select", (a4) => {
        a4 instanceof CustomEvent && (this.getAttribute("data-tab-id") === a4.detail.id ? this.classList.add("selected") : this.classList.remove("selected"));
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
    init(l8) {
      l8.addEventListener("tab-select", (s3) => {
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
          let a4 = null, e4 = null;
          s3.target.assignedElements().forEach((t5, n3) => {
            if (!t5.hasAttribute("data-tabs-pass")) {
              let b4 = t5 instanceof c2, u5 = t5 instanceof o, p7 = n3.toString();
              b4 && (p7 = this.contents.length.toString(), this.contents.push(t5)), u5 && (!e4 && n3 === this.preselect && (e4 = t5), p7 = this.tabs.length.toString(), t5.addEventListener("click", this.handletabclick), t5.classList.contains("selected") && (a4 = n3), this.tabs.push(t5)), t5.hasAttribute("id") && (p7 = t5.getAttribute("id")), (b4 || u5) && (t5.init(this), t5.setAttribute("data-tab-id", p7), t5.setAttribute("data-tabs-pass", "true"));
            }
          }), a4 === null && e4 !== null && setTimeout(() => {
            e4.click();
          }, 100);
        }
      };
      this.handletabclick = (s3) => {
        if (s3.target instanceof o) {
          this.scrollclick || (this.internalclick = true);
          let a4 = s3.target.getAttribute("data-tab-id");
          if (this.dispatchEvent(new CustomEvent("tab-select", { detail: { id: a4 } })), this.headerElement) {
            let e4 = s3.target.offsetLeft - this.headerElement.offsetLeft - this.offsetLeft;
            (e4 + s3.target.clientWidth > this.headerElement.scrollLeft + this.headerElement.clientWidth || e4 < this.headerElement.scrollLeft) && this.headerElement.scrollTo({ left: e4, behavior: "smooth" }), this.indicator && this.indicatorElement && (this.indicatorElement.style.left = e4 + "px", this.indicatorElement.style.width = s3.target.clientWidth + "px");
          }
          if (this.scrolling && this.mainElement && !this.currentlyscrolling) {
            let e4 = this.contents.find((t5) => t5.getAttribute("data-tab-id") === a4);
            e4 && this.mainElement.scrollTo({ top: e4.offsetTop - this.mainElement.offsetTop, behavior: "smooth" });
          }
        }
      };
      this.handlescroll = (s3) => {
        if (this.scrolling && this.mainElement) {
          this.currentlyscrolling = true;
          let a4 = this.mainElement.scrollTop, e4 = 0;
          for (let t5 = 0; t5 < this.contents.length; t5++)
            if (e4 += this.contents[t5].clientHeight, a4 < e4) {
              this.tabs[t5].classList.contains("selected") || (this.scrollclick = true, this.internalclick || this.tabs[t5].click());
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
  var i2 = (h7, e4, o5, r9) => {
    for (var a4 = r9 > 1 ? void 0 : r9 ? f(e4, o5) : e4, p7 = h7.length - 1, s3; p7 >= 0; p7--)
      (s3 = h7[p7]) && (a4 = (r9 ? s3(e4, o5, a4) : s3(a4)) || a4);
    return r9 && a4 && y2(e4, o5, a4), a4;
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
  var r3 = (d7, n3, t5, l8) => {
    for (var e4 = l8 > 1 ? void 0 : l8 ? u(n3, t5) : n3, i6 = d7.length - 1, s3; i6 >= 0; i6--)
      (s3 = d7[i6]) && (e4 = (l8 ? s3(n3, t5, e4) : s3(e4)) || e4);
    return l8 && e4 && v2(n3, t5, e4), e4;
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
      this.handlekeyup = (t5) => {
        (t5.key || t5.code).toLowerCase() === "enter" && this.hasFocus && this.dispatchEvent(new Event("click"));
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
  var n = (c6, a4, t5, s3) => {
    for (var e4 = s3 > 1 ? void 0 : s3 ? u2(a4, t5) : a4, i6 = c6.length - 1, r9; i6 >= 0; i6--)
      (r9 = c6[i6]) && (e4 = (s3 ? r9(a4, t5, e4) : r9(e4)) || e4);
    return s3 && e4 && p2(a4, t5, e4), e4;
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
        let t5 = this.shadowRoot.querySelector("svg");
        if (t5 === null)
          throw new Error("Could not find svg element");
        this.svgElement = t5, this.content && this.setSVG();
      }
    }
    async updateName() {
      let t5 = `${this.name}.svg`;
      try {
        let s3 = await this.loadAsset(t5);
        if (s3) {
          let e4, i6 = "0 96 960 960";
          if (typeof s3 == "string")
            e4 = s3;
          else {
            e4 = await s3.text();
            let [r9, m8] = this.extractSvgContent(e4);
            m8 && (i6 = m8), r9 && (e4 = `SVG:${i6}##${r9.trim()}`, this.cacheData(t5, e4));
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
    extractSvgContent(t5) {
      let i6 = new DOMParser().parseFromString(t5, "image/svg+xml").querySelector("svg");
      return i6 ? [i6.innerHTML, i6.getAttribute("viewBox")] : ["", ""];
    }
    setSVG() {
      if (this.svgElement) {
        let t5 = /SVG:(.*)##/.exec(this.content);
        if (t5) {
          let s3 = this.content.split(t5[1])[1];
          this.svgElement.setAttribute("viewBox", t5[1]), this.getAttribute("show") && console.log(this.content, t5, s3), this.svgElement.innerHTML = s3;
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
  var l2 = (s3, o5, t5, e4) => {
    for (var r9 = e4 > 1 ? void 0 : e4 ? h3(o5, t5) : o5, i6 = s3.length - 1, n3; i6 >= 0; i6--)
      (n3 = s3[i6]) && (r9 = (e4 ? n3(o5, t5, r9) : n3(r9)) || r9);
    return e4 && r9 && x2(o5, t5, r9), r9;
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

  // ../field/dist/src/style.js
  var style8 = `:host {
  --border-color: var(--pap-color-border-secondary, #DADDE3);
  --height: var(--field-size-medium, 40px);
  --message-text: var(--pap-color-text, #29292F);
  --message-icon: var(--pap-color-icon, #29292F);
  display: block;
  color: var(--pap-color-text, #29292F); }
  :host footer,
  :host header {
    display: none;
    align-items: center;
    justify-content: space-between;
    padding-inline: var(--padding-small, 8px);
    height: var(--height); }
  :host footer div.message {
    display: none;
    align-items: center;
    gap: var(--gap-small, 8px); }
    :host footer div.message pap-typography {
      color: var(--message-text); }
    :host footer div.message pap-icon {
      color: var(--message-icon); }
  :host pap-box-template.wrapper {
    box-sizing: border-box;
    position: relative;
    display: flex;
    align-items: center;
    padding-inline: var(--padding-medium, 16px);
    border: 1px solid var(--border-color);
    height: var(--height); }
    :host pap-box-template.wrapper:hover {
      --border-color: var(--pap-color-border-strong, #29292F); }
    :host pap-box-template.wrapper ::slotted(*:not([slot])),
    :host pap-box-template.wrapper input,
    :host pap-box-template.wrapper select,
    :host pap-box-template.wrapper textarea {
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

:host([size="small"]) {
  --height: var(--field-size-small, 32px); }

:host([size="medium"]) {
  --height: var(--field-size-medium, 40px); }

:host([size="large"]) {
  --height: var(--field-size-large, 48px); }

:host([isSuccess="true"]) {
  --border-color: var(--pap-color-border-success, #2E701B);
  --message-text: var(--pap-color-text-success, #94E274);
  --message-icon: var(--pap-color-icon-success, #94E274); }
  :host([isSuccess="true"]) pap-box-template.wrapper:hover {
    --border-color: var(--pap-color-border-success, #2E701B); }
  :host([isSuccess="true"]) footer div.message {
    display: flex; }

:host([isWarning="true"]) {
  --border-color: var(--pap-color-border-warning, #E27F00);
  --message-text: var(--pap-color-text-warning, #FFA800);
  --message-icon: var(--pap-color-icon-warning, #FFA800); }
  :host([isWarning="true"]) pap-box-template.wrapper:hover {
    --border-color: var(--pap-color-border-warning, #E27F00); }
  :host([isWarning="true"]) footer div.message {
    display: flex; }

:host([isError="true"]) {
  --border-color: var(--pap-color-border-danger, #B70E1E);
  --message-text: var(--pap-color-text-danger, #FF9EA7);
  --message-icon: var(--pap-color-icon-danger, #FF9EA7); }
  :host([isError="true"]) pap-box-template.wrapper:hover {
    --border-color: var(--pap-color-border-danger, #B70E1E); }
  :host([isError="true"]) footer div.message {
    display: flex; }

:host([hasfocus="true"]),
:host(:focus) {
  outline: none; }
  :host([hasfocus="true"]) pap-box-template.wrapper,
  :host(:focus) pap-box-template.wrapper {
    outline: 1px solid var(--border-color); }`;

  // ../field/dist/src/types.js
  var ValidationAttributes = ["min", "max", "pattern", "type", "minlenght", "maxlenght", "required", "multiple", "novalidate", "formnovalidate", "autofocus"];

  // ../field/dist/src/component.js
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
              if (this.messageText) {
                this.messageText.innerHTML = this.customError[type];
                this.isWarning = false;
                this.isError = true;
                return;
              }
            } else if (this.customWarning && this.customWarning[type]) {
              if (this.messageText) {
                this.messageText.innerHTML = this.customWarning[type];
                this.isWarning = true;
                this.isError = false;
                return;
              }
            } else {
              const auto_message = this.hiddenElement.validationMessage;
              if (this.messageText) {
                this.messageText.innerHTML = auto_message;
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
      this.isSuccess = false;
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
        <div class="message">
          <pap-icon name=${this.isError ? "error" : this.isWarning ? "warning" : this.isSuccess ? "success" : ""}></pap-icon>
          <pap-typography>This is a placeholder for message</pap-typography>
        </div>
        <slot name="footer"></slot>
      </footer>
    `;
    }
  };
  FieldTemplate.styles = [style8];
  __decorate([
    query(".counter")
  ], FieldTemplate.prototype, "counterElement", void 0);
  __decorate([
    query(".message > pap-typography")
  ], FieldTemplate.prototype, "messageText", void 0);
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
    property({ rerender: false, type: Boolean })
  ], FieldTemplate.prototype, "isSuccess", void 0);
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
      this.handlekeyup = (a4) => {
        (a4.key || a4.code).toLowerCase() === "enter" && this.hasFocus && (this.value = (!this.checked).toString());
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
  var m2 = (y5, u5, t5, e4) => {
    for (var a4 = e4 > 1 ? void 0 : e4 ? B(u5, t5) : u5, s3 = y5.length - 1, o5; s3 >= 0; s3--)
      (o5 = y5[s3]) && (a4 = (e4 ? o5(u5, t5, a4) : o5(a4)) || a4);
    return e4 && a4 && j(u5, t5, a4), a4;
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
        }, (t5) => {
          console.error("Failed to copy text: ", t5);
        });
      };
      this.handletogglechange = (t5) => {
        t5.target.checked ? (this.classList.remove("theme-light"), this.classList.add("theme-dark")) : (this.classList.add("theme-light"), this.classList.remove("theme-dark"));
      };
      this.handleslotchange = (t5) => {
        if (t5.target instanceof HTMLSlotElement) {
          if (this.value)
            return;
          let e4 = [], a4 = t5.target.assignedNodes();
          for (let s3 of a4)
            s3.nodeType === Node.TEXT_NODE ? s3.textContent && s3.textContent.trim() !== "" && e4.push(s3.textContent) : "originalHTML" in s3 ? e4.push(s3.originalHTML) : e4.push(s3.outerHTML);
          this.format(e4.join(`
`));
        }
      };
    }
    set indentationLevel(t5) {
      this._indentationLevel = Math.max(0, t5);
    }
    get indentationLevel() {
      return this._indentationLevel;
    }
    FormatLine(t5, e4 = "") {
      let a4 = this.formatHTML(t5, e4);
      return a4 !== null ? a4 || null : this.formatCODE(t5, e4);
    }
    format(t5) {
      if (this.value = t5, !this.main)
        return;
      let e4 = this.value.split(`
`);
      for (let a4 = 0; a4 < e4.length; a4++) {
        let o5 = e4[a4].trim();
        if (o5 === "" && (a4 === 0 || a4 === e4.length - 1))
          continue;
        let c6 = this.FormatLine(o5);
        c6 !== null && this.appendLine(c6);
      }
    }
    formatCODE(t5, e4) {
      let a4 = t5, s3 = "\\b(def|print|async|await|this|export|switch|if|else|for|while|case|break|return|let|const|var|continue)\\b", o5 = `(["'])(?:\\\\.|[^\\\\])*?\\1`, c6 = "\\b(function)\\s+([a-zA-Z_$][0-9a-zA-Z_$]*)?\\s*\\(([^)]*)\\)", h7 = "\\b(class)\\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\\s*(extends\\s+([a-zA-Z_$][0-9a-zA-Z_$]*))?\\s*(implements\\s+([a-zA-Z_$][0-9a-zA-Z_$]*))?", p7 = new RegExp(`${o5}|${c6}|${h7}|${s3}`, "g");
      a4 = a4.replace(p7, (i6, d7, E4, g5, T3, M2, F, _, H, A2, C2) => {
        if (d7)
          return `<span class="string">${i6}</span>`;
        if (E4) {
          this.lang !== "html" && this.setLanguage("javascript");
          let L = g5 ? `<span class="function-name">${g5}</span>` : "", f5 = "";
          return T3 && (f5 = T3.split(",").map((b4) => `<span class="function-arg">${b4.trim()}</span>`).join(", ")), `<span class="keyword function">function</span> ${L}(<span class="function-args">${f5}</span>)`;
        }
        if (M2) {
          this.lang !== "html" && this.setLanguage("javascript");
          let L = `<span class="class-name">${F}</span>`, f5 = _ ? `<span class="keyword extends"> extends</span> <span class="extends-class">${H}</span>` : "", b4 = A2 ? `<span class="keyword implements"> implements</span> <span class="implements-class">${C2}</span>` : "";
          return `<span class="keyword class">class</span> ${L}${f5}${b4}`;
        }
        return this.lang !== "html" && this.setLanguage("javascript"), `<span class="keyword ${i6}">${i6}</span>`;
      });
      let n3 = 0;
      for (let i6 of S)
        a4.endsWith(i6) && (this.stack.push(i6), n3++);
      let r9 = a4.match(new RegExp(`^(${Z.map((i6) => "\\" + i6).join("|")})+`));
      if (r9) {
        let i6 = r9[0].length;
        for (let d7 = 0; d7 < i6; d7++)
          this.stack.length > 0 && (this.stack.pop(), this.indentationLevel = Math.max(0, this.indentationLevel - 1));
      }
      return n3 === 0 ? e4 + a4 : (this.appendLine(e4 + a4), this.indentationLevel += n3, null);
    }
    formatHTML(t5, e4) {
      let a4 = /([^<]*)(<[^>]*>?)/, s3 = t5.match(a4);
      if (!s3)
        return null;
      ["javascript", "jsx"].includes(this.language) ? this.setLanguage("jsx") : this.setLanguage("html");
      let o5 = s3[1] || null, c6 = s3[2], h7 = t5.split(s3[0])[1], p7 = t5.length > O, n3 = e4;
      if (o5) {
        if (["script", "style"].includes(this.peek())) {
          let i6 = this.formatCODE(o5, e4);
          i6 && (o5 = i6);
        }
        n3 += o5, p7 && n3 && (this.appendLine(n3), n3 = "");
      }
      let r9 = this.formatHtmlTag(c6, p7, h7);
      if (r9 && (n3 ? n3 += r9 : n3 = r9), p7 && n3 && (console.warn("[codeblock] multiline but we see content!"), this.appendLine(n3), n3 = ""), h7) {
        let i6 = this.FormatLine(h7, e4);
        i6 && (p7 ? this.appendLine(i6) : n3 += i6);
      }
      return n3;
    }
    formatHtmlTag(t5, e4 = false, a4) {
      let s3 = t5.match(/<\/([\w-]+)>/);
      if (s3) {
        let r9 = s3[1];
        this.peek() === r9 && (this.stack.pop(), this.indentationLevel--);
        let i6 = `<span class="html-tag">&lt;/</span><span class="html-tag-name">${r9}</span><span class="html-tag">&gt;</span>`;
        if (e4)
          this.appendLine(i6);
        else
          return i6;
      }
      let o5 = t5.match(/<([\w-]+)([^>]*)/);
      if (!o5)
        return console.error("[codeblock] html but no html error"), null;
      let c6 = o5[1], h7 = o5[2] ? o5[2].trim().split(/\s/) : [], p7 = e4 || h7.length > N, n3 = `<span class="html-tag">&lt;</span><span class="html-tag-name">${c6}</span>`;
      p7 && (this.stack.push(c6), this.appendLine(n3), n3 = "", this.indentationLevel++);
      for (let r9 of h7) {
        let [i6, d7] = r9.split("="), g5 = `<span class="html-attribute ${p7 ? "indent" : ""}"><span class="html-attribute-name">${i6}</span>`;
        d7 && (g5 += `=<span class="html-attribute-value">${d7}</span>`), g5 += "</span>", p7 ? this.appendLine(g5) : n3 += g5;
      }
      if (!t5.endsWith("/>") && t5.endsWith(">")) {
        let r9 = '<span class="html-tag">&gt;</span>';
        if (p7)
          return this.indentationLevel--, this.appendLine(r9), this.indentationLevel++, null;
        if (p7 || !a4)
          return this.stack.push(c6), this.appendLine(n3 + r9), this.indentationLevel++, null;
        n3 += r9;
      }
      return n3;
    }
    appendLine(t5) {
      if (this.main) {
        let e4 = document.createElement("div");
        e4.className = "line", e4.style.paddingLeft = `calc(${this.indentationLevel} * var(--padding-medium, 16px))`, e4.innerHTML = t5, this.main.appendChild(e4);
      }
    }
    setLanguage(t5) {
      t5 !== this.language && (this.lang && t5 !== this.lang || (this.language = t5, this.languageElement && (this.languageElement.innerHTML = this.language)));
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
  var p4 = (h7, n3, o5, r9) => {
    for (var t5 = r9 > 1 ? void 0 : r9 ? f2(n3, o5) : n3, l8 = h7.length - 1, a4; l8 >= 0; l8--)
      (a4 = h7[l8]) && (t5 = (r9 ? a4(n3, o5, t5) : a4(t5)) || t5);
    return r9 && t5 && g3(n3, o5, t5), t5;
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
        let o5 = this.url ? this.url : this.file;
        if (!o5)
          throw new Error("must have a target");
        let r9 = await this.loadAsset(o5, !!this.url);
        if (!r9)
          throw new Error("something went wrong");
        if (typeof r9 == "string")
          return this.markdown(r9);
        let t5 = await r9.text();
        this.markdown(t5);
      } catch (o5) {
        console.error("failed to load markdown file");
      }
    }
    markdown(o5) {
      let r9 = o5.split(`
`), t5 = [], l8 = null;
      for (let a4 = 0; a4 < r9.length; a4++) {
        let e4 = r9[a4], s3 = this.block(r9, a4);
        if (s3) {
          l8 && (t5.push(`</${l8}>`), l8 = null), t5 = t5.concat(s3[0]), a4 = s3[1];
          continue;
        }
        e4.startsWith(">") ? (l8 === "p" ? (t5.push("</p>"), l8 = null) : l8 === null && (t5.push('<div class="blockquote">'), l8 = "div"), e4 = e4.slice(1).trim()) : e4 !== "" && l8 === null && (t5.push("<p>"), l8 = "p"), e4 === "" ? l8 && (t5.push(`</${l8}>`), l8 = null) : t5.push(this.generalLine(e4) + " ");
      }
      this.shadowRoot && (this.content = t5.join(""), this.requestUpdate());
    }
    updateCodeBlocks() {
      this.shadowRoot && this.shadowRoot.querySelectorAll("pap-codeblock").forEach((r9, t5) => r9.format(this.codeblocks[t5]));
    }
    block(o5, r9) {
      let t5 = [];
      if (o5[r9].startsWith("```")) {
        if (o5[r9].length > 3 && o5[r9].endsWith("```"))
          this.codeblocks.push(o5[r9].split("```")[1]), t5.push("<pap-codeblock themetoggle='false'></pap-codeblock>");
        else {
          let e4 = r9 + 1, s3 = o5[r9].split("```")[1].trim(), d7 = [];
          for (; !o5[e4].startsWith("```"); )
            d7.push(o5[e4]), e4++;
          this.codeblocks.push(d7.join(`
`)), t5.push(`<pap-codeblock themetoggle='false' lang="${s3}"></pap-codeblock>`), r9 = e4 + 1;
        }
        return [t5, r9];
      }
      if (o5[r9].startsWith("|")) {
        let e4 = o5[r9].split("|").filter((d7) => d7 !== "").map((d7) => `<th>${this.generalLine(d7).trim()}</th>`);
        t5.push(`<table cellspacing="0" cellpadding="5"><thead><tr>${e4.join("")}</tr></thead><tbody>`);
        let s3 = r9 + 2;
        for (; o5[s3].startsWith("|"); ) {
          let d7 = o5[s3].split("|").filter((i6) => i6 !== "").map((i6) => `<td>${this.generalLine(i6).trim()}</td>`);
          t5.push(`<tr>${d7.join("")}</tr>`), s3++;
        }
        return t5.push("</tbody></table>"), r9 = s3 - 1, [t5, r9];
      }
      let l8 = o5[r9].match(/^(#*)\s(\w*)/);
      if (l8) {
        let [e4, s3, d7] = l8, i6 = s3.length;
        return t5.push(`<h${i6}>${this.generalLine(d7)}</h${i6}>`), [t5, r9];
      }
      let a4 = o5[r9].match(/^(-|\d\.)\s/);
      if (a4) {
        a4[1] === "-" ? t5.push("<ul>") : t5.push("<ol>");
        let e4 = r9, s3;
        for (; s3 = o5[e4].match(/^(-|\d*\.)\s/); )
          t5.push(`<li>${this.generalLine(o5[e4].slice(s3[1].length + 1))}</li>`), e4++;
        return a4[1] === "-" ? t5.push("</ul>") : t5.push("</ol>"), r9 = e4 - 1, [t5, r9];
      }
      return null;
    }
    generalLine(o5) {
      let r9 = o5, t5 = o5.match(/\[(\w*)\]\(([\w:\/\.]*)\)/g);
      if (t5)
        for (let a4 of t5) {
          let e4 = o5.match(/\[(\w*)\]\(([\w:\/\.]*)\)/);
          if (e4) {
            let [s3, d7, i6] = e4;
            r9 = o5.replace(a4, `<a href="${i6}">${d7}</a>`);
          }
        }
      let l8 = o5.match(/[^`]`([^`]+)`/g);
      if (l8)
        for (let a4 of l8) {
          let e4 = a4.replace(/\`/g, "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
          r9 = o5.replace(a4, `<code>${e4}</code>`);
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
  var l4 = (i6, r9, a4, o5) => {
    for (var e4 = o5 > 1 ? void 0 : o5 ? h4(r9, a4) : r9, d7 = i6.length - 1, n3; d7 >= 0; d7--)
      (n3 = i6[d7]) && (e4 = (o5 ? n3(r9, a4, e4) : n3(e4)) || e4);
    return o5 && e4 && s(r9, a4, e4), e4;
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
  function m5(n3) {
    if (!n3.translations || typeof n3.translations != "object")
      throw new Error("you have to load a translation-data object<string,string>");
    window.oTranslation.map.set(n3.id, n3), window.oTranslation.change(n3.id), window.dispatchEvent(new Event(T));
  }
  function f3(n3) {
    let e4 = window.oTranslation.map.get(n3);
    if (!e4)
      throw new Error(`[error] translator-load-all: Could not find language set based on lang provided - ${n3}`);
    window.oTranslation.current = e4, window.dispatchEvent(new Event(r4));
  }
  function b2(n3) {
    try {
      n3.forEach((e4) => window.oTranslation.map.set(e4.id, e4)), window.dispatchEvent(new Event(T));
    } catch (e4) {
      console.error("[error] translator-load-all", e4);
    }
  }
  function E2(n3) {
    window.addEventListener(r4, n3);
  }
  function y3(n3) {
    window.removeEventListener(r4, n3);
  }
  function g4() {
    window.oTranslation = window.oTranslation || {}, window.oTranslation.load = window.oTranslation.load || m5, window.oTranslation.change = window.oTranslation.change || f3, window.oTranslation.loadAll = window.oTranslation.loadAll || b2, window.oTranslation.subscribe = window.oTranslation.subscribe || E2, window.oTranslation.unsubscribe = window.oTranslation.unsubscribe || y3, window.oTranslation.current = window.oTranslation.current || {}, window.oTranslation.map = window.oTranslation.map || /* @__PURE__ */ new Map();
  }
  var a2 = class extends BaseSystem {
    constructor() {
      super(...arguments);
      this.dynamicAttributes = /* @__PURE__ */ new Set();
      this.noupdate = false;
      this.handletranslateslotchange = (t5) => {
        if (t5.target instanceof HTMLSlotElement) {
          let o5 = ExtractSlotValue(t5.target).join(" ");
          this.Key = o5;
        }
      };
      this.updateText = () => {
        var d7, c6, p7;
        let t5 = ((p7 = (c6 = (d7 = window.oTranslation) == null ? void 0 : d7.current) == null ? void 0 : c6.translations) == null ? void 0 : p7[this.key]) || this.key;
        if (t5 === void 0 && this.key === void 0)
          return;
        let o5 = /{([^{}]+)}/g, i6 = t5.match(o5);
        i6 && i6.forEach((w) => {
          let s3 = w.slice(1, -1), u5 = this.getAttribute(s3);
          u5 && (t5 = t5.replace(w, u5), this.dynamicAttributes.has(s3) || this.dynamicAttributes.add(s3));
        }), this.text = t5, this.spanElement ? this.spanElement.innerText = t5 : this.noupdate || this.debouncedRequestUpdate(), this.noupdate = false;
      };
    }
    get Text() {
      return this.text;
    }
    get Key() {
      return this.key;
    }
    set Key(t5) {
      typeof t5 == "string" ? this.key = t5 : this.key = "", this.updateText();
    }
    connectedCallback() {
      var t5;
      super.connectedCallback(), g4(), (t5 = window.oTranslation) == null || t5.subscribe(this.updateText);
    }
    disconnectedCallback() {
      var t5;
      super.disconnectedCallback(), (t5 = window.oTranslation) == null || t5.unsubscribe(this.updateText);
    }
    attributeChangedCallback(t5, o5, i6) {
      this.dynamicAttributes.has(t5) && this.updateText();
    }
    firstUpdate() {
      if (this.shadowRoot) {
        let t5 = this.shadowRoot.querySelector("span.pap-translation-span");
        t5 && (this.spanElement = t5);
      }
    }
    translateKey(t5) {
      return this.key !== t5 && (this.noupdate = true, this.Key = t5), this.text;
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
  var n2 = (p7, i6, t5, o5) => {
    for (var e4 = o5 > 1 ? void 0 : o5 ? v4(i6, t5) : i6, c6 = p7.length - 1, m8; c6 >= 0; c6--)
      (m8 = p7[c6]) && (e4 = (o5 ? m8(i6, t5, e4) : m8(e4)) || e4);
    return o5 && e4 && f4(i6, t5, e4), e4;
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
      this.handleslotchange = (t5) => {
        if (t5.target instanceof HTMLSlotElement) {
          let o5 = ExtractSlotValue(t5.target);
          this.slottext = o5.join(" ");
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
      this.handleslotchange = (t5) => {
        t5.target instanceof HTMLSlotElement && t5.target.assignedElements().forEach((e4) => {
          e4 instanceof r5 && (e4.hasAttribute("data-menu-init") || (e4.addEventListener("select", this.handleitemselected), e4.setAttribute("data-menu-init", "true"), this.items.push(e4)));
        });
      };
      this.handleitemselected = (t5) => {
        t5.target instanceof r5 && (this.current && t5.target !== this.current && (this.current.checked = false), this.current = t5.target, this.dispatchEvent(new Event("select")));
      };
      this.handlehide = () => {
        this.open = false;
      };
      this.handleshow = () => {
        this.open = true;
      };
    }
    get value() {
      var t5;
      return ((t5 = this.current) == null ? void 0 : t5.getvalue()) || "";
    }
    set value(t5) {
      let o5 = this.items.find((e4) => e4.getvalue() === t5);
      o5 && o5.click();
    }
    get text() {
      var t5;
      return (t5 = this.current) == null ? void 0 : t5.gettext();
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
  var m6 = (p7, e4, a4, t5) => {
    for (var o5 = t5 > 1 ? void 0 : t5 ? d5(e4, a4) : e4, l8 = p7.length - 1, n3; l8 >= 0; l8--)
      (n3 = p7[l8]) && (o5 = (t5 ? n3(e4, a4, o5) : n3(o5)) || o5);
    return t5 && o5 && c5(e4, a4, o5), o5;
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
  var r7 = (u5, s3, e4, a4) => {
    for (var t5 = a4 > 1 ? void 0 : a4 ? A(s3, e4) : s3, i6 = u5.length - 1, n3; i6 >= 0; i6--)
      (n3 = u5[i6]) && (t5 = (a4 ? n3(s3, e4, t5) : n3(t5)) || t5);
    return a4 && t5 && C(s3, e4, t5), t5;
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
        let e4 = this.menuElement.querySelectorAll("pap-menu-item"), a4 = /* @__PURE__ */ new Set();
        e4.forEach((t5) => {
          window.oTheme.map.has(t5.value) ? a4.add(t5.value) : this.menuElement.removeChild(t5);
        }), Array.from(window.oTheme.map).forEach(([t5, i6]) => {
          if (!a4.has(t5)) {
            let n3 = this.templateElement.content.cloneNode(true), p7 = n3.querySelector("pap-menu-item");
            p7 && p7.setAttribute("value", t5);
            let h7 = n3.querySelector("span");
            h7 && (h7.style.backgroundColor = i6.representColor);
            let c6 = n3.querySelector("pap-typography");
            c6 && (c6.innerHTML = i6.name), this.menuElement.appendChild(n3);
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
        let a4 = e4.target;
        a4 && window.oTheme.current !== a4.value && window.oTheme.change(a4.value);
      };
      this.handlechange = (e4) => {
        let a4 = e4.target;
        a4 && this.setlightdark(a4.checked ? "dark" : "light");
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
          let e4 = this.menuElement.querySelectorAll("pap-menu-item"), a4 = Array.from(window.oTranslation.map), t5 = /* @__PURE__ */ new Set();
          e4.forEach((i6) => {
            let n3 = i6.value;
            window.oTranslation.map.has(n3) ? t5.add(n3) : this.menuElement.removeChild(i6);
          }), a4.forEach(([i6, n3]) => {
            if (!t5.has(i6)) {
              let p7 = this.templateElement.content.cloneNode(true), h7 = p7.querySelector("pap-menu-item");
              h7 && h7.setAttribute("value", n3.id);
              let c6 = p7.querySelector("pap-translator");
              c6 && (c6.innerHTML = n3.name);
              let w = p7.querySelector("span.flag > span");
              w && (w.innerHTML = y4[n3.name]), this.menuElement.appendChild(p7);
            }
          });
        }
      };
      this.handlelanguagechange = () => {
        var e4, a4;
        this.menuElement && ((e4 = window.oTranslation) != null && e4.current) && (this.displayElement && ((a4 = this.displayElement.parentElement) == null || a4.classList.remove("globe"), this.displayElement.innerHTML = y4[window.oTranslation.current.name]), this.menuElement.value !== window.oTranslation.current.id && (this.menuElement.value = window.oTranslation.current.id));
      };
      this.handlelanguageselect = (e4) => {
        let a4 = e4.target;
        a4 && this.displayElement && a4.value !== "init" && window.oTranslation.change(a4.value);
      };
      InitTranslations();
    }
    connectedCallback() {
      var e4, a4;
      super.connectedCallback(), window.addEventListener(TRANSLATION_ADDED, this.handlenewlanguage), window.addEventListener(TRANSLATION_CHANGE_EVENTNAME, this.handlelanguagechange), ((a4 = (e4 = window.oTranslation) == null ? void 0 : e4.map) == null ? void 0 : a4.size) > 0 && this.handlenewlanguage();
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
      var a4, t5, i6;
      let e4 = ((a4 = this.user) == null ? void 0 : a4.avatar) || `public/images/avatar${Math.round(Math.random() * 4) + 1}.png`;
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
          <img class="avatar" slot="button-prefix" src="${e4}" alt="${((t5 = this.user) == null ? void 0 : t5.firstname) || "no-name"} profile picture" />
          <pap-typography slot="button-content">${((i6 = this.user) == null ? void 0 : i6.firstname) || "no-name"}</pap-typography>

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
  var r8 = (s3, a4, l8, n3) => {
    for (var o5 = n3 > 1 ? void 0 : n3 ? u4(a4, l8) : a4, m8 = s3.length - 1, d7; m8 >= 0; m8--)
      (d7 = s3[m8]) && (o5 = (n3 ? d7(a4, l8, o5) : d7(o5)) || o5);
    return n3 && o5 && b3(a4, l8, o5), o5;
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
  function __decorate2(decorators, target, key, desc) {
    var c6 = arguments.length, r9 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d7;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r9 = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i6 = decorators.length - 1; i6 >= 0; i6--)
        if (d7 = decorators[i6])
          r9 = (c6 < 3 ? d7(r9) : c6 > 3 ? d7(target, key, r9) : d7(target, key)) || r9;
    return c6 > 3 && r9 && Object.defineProperty(target, key, r9), r9;
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
      this._pendingOperations.forEach((o5) => o5());
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
          for (let i6 = path.length - 1; i6 >= 0; i6--) {
            const _shadownode = this.querySelector(path.slice(0, i6).join(" > "));
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
          for (let i6 = 0; i6 < node.attributes.length; i6++) {
            const name = node.attributes[i6].name;
            const value = node.attributes[i6].value;
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
            for (let i6 = 0; i6 < node.parentNode.children.length; i6++) {
              if (node.parentNode.children[i6] === node) {
                index = i6;
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
  var style10 = `:host {
  align-items: center;
  display: flex;
  padding-inline: var(--padding-small, 8px);
  box-sizing: border-box;
  position: relative; }

span.content {
  padding-inline: var(--padding-small, 8px);
  margin-inline: auto;
  gap: var(--gap-small);
  display: inline-flex;
  align-items: center;
  justify-content: center; }`;
  var PrefixSuffixTemplate = class extends BaseSystem2 {
    render() {
      return `
      <slot name="prefix"></slot>
      <span part="content" class="content"><slot></slot></span>
      <slot name="suffix"></slot>
    `;
    }
  };
  PrefixSuffixTemplate.style = style10;
  var cElements2 = customElements != null ? customElements : window == null ? void 0 : window.customElements;
  if (!cElements2) {
    throw new Error("Custom Elements not supported");
  }
  if (!cElements2.get("pap-prefix-suffix-template")) {
    cElements2.define("pap-prefix-suffix-template", PrefixSuffixTemplate);
  }

  // views/demo/main.js
  window.onload = () => {
    console.log("[demo]: window loaded");
  };
})();
