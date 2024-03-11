// system
import { html, query, property, debounce } from "@pap-it/system-utils";

// tools
import { Translator } from "@pap-it/tools-translator";
import { IRectangle } from "@pap-it/tools-canvas";

// local 
import { style } from "./style";
import { CanvasFunction } from './types';

export class Canvas extends Translator {
  static style = style;

  @query({
    selector: 'canvas[part="canvas"]',
    load: function (this: Canvas) {
      this.canvasElement.width = this.width;
      this.canvasElement.height = this.height;
      this.context = this.canvasElement.getContext('2d');
      this.callfirstload();
    }
  }) canvasElement!: HTMLCanvasElement;

  @property({
    type: Number,
    rerender: false,
    after: function (this: Canvas) {
      if (this.canvasElement) this.canvasElement.width = this.width;
      this.callfirstload();
    }
  }) width: number = 100;
  @property({
    type: Number,
    rerender: false,
    after: function (this: Canvas) {
      if (this.canvasElement) this.canvasElement.height = this.height;
      this.callfirstload();
    }
  }) height: number = 100;
  @property({
    type: Boolean,
    rerender: false,
    after: function (this: Canvas, value: boolean, old: boolean) {
      if (value === true) {
        if (this.timer !== null) cancelAnimationFrame(this.timer);
        this.timer = null;
      }
      else if (value === false && old === true) {
        this.loop();
      }
    }
  }) paused: boolean = false;

  public context: CanvasRenderingContext2D | null = null;
  private timer: number | null = null;
  private updates: CanvasFunction[] = [];
  private renders: CanvasFunction[] = [];
  private deltatime: number = 0;
  private beforetime: number = 0;
  private computedStyle: CSSStyleDeclaration;

  public clear: boolean = true;

  constructor() {
    super();

    this.computedStyle = window.getComputedStyle(this);
    this.callfirstload = debounce(this.init);
  }

  private callfirstload() { }

  public get Viewport(): IRectangle {
    return { x: 0, y: 0, h: this.height, w: this.width };
  }

  /**
   * Represents a function that performs operations on a canvas.
   * @callback CanvasFunction
   * @param {CanvasRenderingContext2D} context - The canvas rendering context.
   * @param {number} deltaTime - The time difference between frames or updates.
   */

  /**
   * Adds a function to the update queue.
   * @param {CanvasFunction} callback - Function to be called during the update phase.
   */
  public set addUpdate(callback: CanvasFunction) {
    this.updates.push(callback);
  }

  /**
   * Adds a function to the update queue.
   * @param {CanvasFunction} callback - Function to be called during the update phase.
   */
  public set addRender(callback: CanvasFunction) {
    this.renders.push(callback);
  }

  // connectedCallback(): void {
  //   super.connectedCallback();

  //   window.addEventListener("resize", this.handleresize);
  // }

  // disconnectedCallback(): void {
  //   super.disconnectedCallback();

  //   window.removeEventListener("resize", this.handleresize);
  // }


  // // event handlers
  // private handleresize = () => {
  //   const rec = this.getBoundingClientRect();
  //   this.width = rec.width;
  //   this.height = rec.height;
  // }

  // override functions
  protected draw(context: CanvasRenderingContext2D, delta: number) {

  }
  protected update(context: CanvasRenderingContext2D, delta: number) {

  }
  protected async load() {

  }

  getColor(cssVariable: string) {
    return this.computedStyle.getPropertyValue(cssVariable);
  }

  // private functions
  private async init() {
    await this.load();
    this.beforetime = performance.now();
    this.loop();
  }
  private canvas_render = () => {
    if (this.clear) {
      this.context?.clearRect(0, 0, this.width, this.height);
    }
    this.draw(this.context as CanvasRenderingContext2D, this.deltatime);

    for (let render of this.renders) {
      render(this.context as CanvasRenderingContext2D, this.deltatime);
    }
  }
  private canvas_update = () => {
    this.update(this.context as CanvasRenderingContext2D, this.deltatime);

    for (let update of this.updates) {
      update(this.context as CanvasRenderingContext2D, this.deltatime);
    }
  }
  private loop = () => {
    const now = performance.now();
    this.deltatime = (now - this.beforetime) / 1000;
    this.beforetime = now;

    if (this.context) {
      this.canvas_update();
      this.canvas_render();
    }

    if (!this.paused) {
      this.timer = requestAnimationFrame(this.loop);
    } else {
      // When paused, reset the beforetime so that on resume deltaTime starts from 0
      this.beforetime = performance.now();
    }
  }

  render() {
    return html`
      <canvas part="canvas">
        <pap-typography part="no-support">${this.translateKey("Your browser does not support html canvas")}</pap-typography>
      </canvas>
    `
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-canvas-template": Canvas;
  }
}