import { Vector } from "./vector";

export class Particle extends Vector {
  velocity: Vector;
  speed: number;

  constructor(x: number, y: number, speed: number, azimuth: number, elevation?: number) {
    super(x, y);
    this.speed = speed;
    this.velocity = Vector.FromAngle(azimuth, elevation);
    // this.velocity.multiplyScalor(speed);
  }

  override get angle() {
    return this.velocity.angle;
  }

  override get magnitude() {
    return this.velocity.magnitude;
  }

  update() {
    this.add({
      x: this.velocity.x * this.speed,
      y: this.velocity.y * this.speed,
      z: this.velocity.z * this.speed,
    });
    // this.velocity.subtract()
  }

  override render(context: CanvasRenderingContext2D): void {
    super.render(context);

    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.x - this.velocity.x, this.y - this.velocity.y);
    context.stroke();
    context.closePath();
  }
}