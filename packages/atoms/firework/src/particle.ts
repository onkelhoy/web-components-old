// tools 
import { lerpValue } from "@pap-it/system-utils";

import { Particle as BaseParticle, Collision, IRectangle, IVector, Vector } from "@pap-it/tools-canvas";

export class Particle extends BaseParticle {
  static GRAVITY = 0.002;
  static FRICTION = 0.99;

  private size!: number;
  private alpha!: number;
  private trail!: IVector;
  private trailLength: number;
  // private color: string;

  public color = "#FFFFFF";

  dead = false;

  set X(value: number) {
    this.x = value;
    this.trail.x = value;
  }

  constructor(x: number, y: number, speed: number, azimuth: number, elevation?: number | undefined) {
    super(x, y, speed, azimuth, elevation);
    // this.start = { x: this.x, y: this.y };
    this.trail = new Vector(this.x, this.y, this.z);
    this.trailLength = lerpValue(Math.random(), 0, 1, 40, 60);
  }

  update() {
    if (this.dead) return;

    super.update();
    this.velocity.multiplyScalor(Particle.FRICTION);

    const vmeg = this.velocity.magnitude;

    this.velocity.y += Particle.GRAVITY;
    this.size = lerpValue(this.z, -100, 100, 0.1, 1.5);
    this.alpha = lerpValue(this.z, -100, 100, 0, 1);

    // Calculate the direction vector from the trail to the particle
    const dir = {
      x: this.x - this.trail.x,
      y: this.y - this.trail.y,
      z: this.z - (this.trail.z || 0),
    };

    // Calculate the current distance between the particle and its trail
    const currentDistance = Math.sqrt(dir.x ** 2 + dir.y ** 2 + dir.z ** 2);

    // If the trail is already at or beyond the maximum length, adjust it
    if (currentDistance > this.trailLength * vmeg) {
      // Normalize the direction vector
      const normDir = {
        x: dir.x / currentDistance,
        y: dir.y / currentDistance,
        z: dir.z / currentDistance,
      };

      // Update the trail position to be exactly 'trailLength' away from the particle
      this.trail = {
        x: this.x - normDir.x * this.trailLength * vmeg,
        y: this.y - normDir.y * this.trailLength * vmeg,
        z: this.z - normDir.z * this.trailLength * vmeg,
      };
    }

    const angle = this.velocity.angle;
    const checkangle = Math.min(1, Math.abs(angle.azimuth - Math.PI / 2));
    this.alpha *= checkangle;

    if (checkangle < 0.1) {
      this.dead = true;
    }
  }

  override render(context: CanvasRenderingContext2D): void {
    const alphaHex = Math.floor(this.alpha * 255).toString(16).padStart(2, '0');
    const hex = this.color || '#000000';
    const color = `${hex}${alphaHex}`;

    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.fillStyle = color;
    context.fill();
    context.closePath();

    const gradient = context.createLinearGradient(this.trail.x, this.trail.y, this.x, this.y);
    gradient.addColorStop(0, `${hex}00`); // Start of the trail (transparent)
    gradient.addColorStop(1, color); // End of the trail (opaque)

    context.beginPath();
    context.moveTo(this.trail.x, this.trail.y);
    context.lineTo(this.x, this.y);
    context.lineWidth = this.size * 2;
    context.strokeStyle = gradient;
    context.stroke();
    context.closePath();
  }
}

