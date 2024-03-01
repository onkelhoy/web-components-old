export interface IVector {
  x: number;
  y: number;
  z?: number;
}
export class Vector {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  get magnitude() {
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
  }
  get angle() {
    return {
      azimuth: Math.atan2(this.y, this.x),
      elevation: Math.asin(this.z / this.magnitude)
    };
  }
  normalize() {
    const mag = this.magnitude;
    this.x /= mag;
    this.y /= mag;
    this.z /= mag;
  }

  copy() {
    return new Vector(this.x, this.y, this.z);
  }

  add(v: IVector) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z || 0;
  }
  subtract(v: IVector) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z || 0;
  }

  // scalors
  addScalor(v: number) {
    this.x += v;
    this.y += v;
    this.z += v;
  }
  subtractScalor(v: number) {
    this.x -= v;
    this.y -= v;
    this.z -= v;
  }
  multiplyScalor(v: number) {
    this.x *= v;
    this.y *= v;
    this.z *= v;
  }

  render(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.arc(this.x, this.y, 1, 0, Math.PI * 2);
    context.fill();
    context.closePath();
  }

  static Add(a: IVector, b: IVector) {
    return new Vector(a.x + b.x, a.y + b.y, (a.z || 0) + (b.z || 0));
  }
  static Subtract(a: IVector, b: IVector) {
    return new Vector(a.x - b.x, a.y - b.y, (a.z || 0) - (b.z || 0));
  }
  static FromAngle(azimuth: number, elevation?: number) {
    if (elevation === undefined) {
      return new Vector(Math.cos(azimuth), Math.sin(azimuth), 0);
    }

    const ecos = Math.cos(elevation);
    return new Vector(
      Math.cos(azimuth) * ecos,
      Math.sin(azimuth) * ecos,
      Math.sin(elevation)
    );
  }
  static Distance(a: IVector, b: IVector) {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + ((a.z || 0) - (b.z || 0)) ** 2)
  }
}
