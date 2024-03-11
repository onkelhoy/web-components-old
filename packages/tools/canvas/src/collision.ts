import { IRectangle } from "./rectangle";
import { IVector } from "./vector";

export class Collision {
  static AABB(a: IRectangle, b: IRectangle) {
    return (
      (
        a.x >= b.x && a.x <= (b.x + b.w) &&
        a.y >= b.y && a.y <= (b.y + b.h)
      ) ||
      (
        b.x >= a.x && b.x <= (a.x + a.w) &&
        b.y >= a.y && b.y <= (a.y + a.h)
      )
    );
  }
  static PointRect(p: IVector, rec: IRectangle) {
    return (
      p.x >= rec.x &&
      p.x <= rec.x + rec.w &&
      p.y >= rec.y &&
      p.y <= rec.y + rec.h
    );
  }
}