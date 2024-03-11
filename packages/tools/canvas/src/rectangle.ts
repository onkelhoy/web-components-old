import { Vector } from "./vector";

export interface IRectangle {
  x: number;
  y: number;
  w: number;
  h: number;
}
export class Rectangle extends Vector {
  w: number;
  h: number;

  constructor(x: number, y: number, w: number, h: number) {
    super(x, y);
    this.w = w;
    this.h = h;
  }

  override render(context: CanvasRenderingContext2D): void {
    context.beginPath();

    context.rect(this.x, this.y, this.w, this.h);
    context.fill();

    context.closePath();
  }
}