import { IRectangle } from "@pap-it/tools-canvas";

import { Particle } from "./particle";
import { Canvas } from "@pap-it/templates-canvas";

export class Explosion {
  private particles: Particle[] = [];
  static ColorOptions = ['--pap-color-bg-inverse', '--pap-color-bg-inverse', '--pap-color-bg-inverse', '--pap-color-bg-inverse', '--pap-color-bg-danger', '--pap-color-bg-success', '--pap-color-bg-warning', '--pap-color-bg-accent-01', '--pap-color-bg-accent-02', '--pap-color-bg-brand'];
  static Canvas: Canvas;

  public dead = false;

  constructor(rocket: Particle) {
    const ammount = 20 + Math.round(Math.random() * 20);
    const rocketangle = rocket.angle;
    const colorindex = Math.round(Math.random() * Explosion.ColorOptions.length) % Explosion.ColorOptions.length;
    const color = Explosion.Canvas.getColor(Explosion.ColorOptions[colorindex]);

    for (let i = 0; i < ammount; i++) {
      const speed = Math.random() * 2;
      const azimuth = rocketangle.azimuth + (Math.random() + 0.5) * Math.PI * 2 - Math.PI / 4;
      const elevation = rocketangle.elevation + Math.random() * Math.PI * 2;

      const particle = new Particle(rocket.x, rocket.y, speed, azimuth, elevation);
      particle.color = color;
      this.particles.push(particle);
    }
  }

  render(context: CanvasRenderingContext2D) {
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.update();
      p.render(context);

      if (p.dead) {
        this.particles.splice(i, 1);
        i--;
      }
    }

    if (this.particles.length === 0) this.dead = true;
  }
}