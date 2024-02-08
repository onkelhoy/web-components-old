// system
import { html, query, property } from "@pap-it/system-utils";

import { Translator } from "@pap-it/tools-translator";

// local 
import { style } from "./style";
import { CanvasFunction } from './types';

export class Canvas extends Translator {
  static style = style;

  @query({ selector: 'canvas[part="canvas"]', onload: 'oncanvasload' }) canvasElement!: HTMLCanvasElement;

  @property({ type: Number, onUpdate: 'onwidthupdate', rerender: false }) width: number = 100;
  @property({ type: Number, onUpdate: 'onheightupdate', rerender: false }) height: number = 100;
  @property({ type: Boolean, onUpdate: 'onpauseupdate', rerender: false }) paused: boolean = false;

  public context: CanvasRenderingContext2D | null = null;
  private timer: number | null = null;
  private updates: CanvasFunction[] = [];
  private renders: CanvasFunction[] = [];
  private deltatime: number = 0;
  private beforetime: number = 0;

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

  // on updates
  private onheightupdate = () => {
    if (this.canvasElement) this.canvasElement.height = this.height;
  }
  private onwidthupdate = () => {
    if (this.canvasElement) this.canvasElement.width = this.width;
  }
  private onpauseupdate = (value: boolean, old: boolean) => {
    if (value === true) {
      if (this.timer !== null) cancelAnimationFrame(this.timer);
      this.timer = null;
    }
    else if (value === false && old === true) {
      this.loop();
    }
  }

  // on loads 
  private oncanvasload = () => {
    this.canvasElement.width = this.width;
    this.canvasElement.height = this.height;
    this.context = this.canvasElement.getContext('2d');
    this.beforetime = performance.now();
    this.loop();
  }

  // // event handlers
  // private handleresize = () => {
  //   const rec = this.getBoundingClientRect();
  //   this.width = rec.width;
  //   this.height = rec.height;
  // }

  // private functions
  private canvas_render = () => {
    for (let render of this.renders) {
      render(this.context as CanvasRenderingContext2D, this.deltatime);
    }
  }
  private canvas_update = () => {
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