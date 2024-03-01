import { IRectangle } from '@pap-it/tools-canvas';

import { Particle } from './particle';
import { Explosion } from './explosion';

export class Rocket {
  private explosion!: Explosion;
  private rocket: Particle;

  dead = false;

  set x(value: number) {
    this.rocket.X = value;
  }
  get x() {
    return this.rocket.x;
  }
  set y(value: number) {
    this.rocket.y = value;
  }
  get y() {
    return this.rocket.y;
  }


  constructor(viewport: IRectangle) {
    const spread = Math.PI / 10;
    this.rocket = new Particle(
      Math.random() * (viewport.w * 0.8) + viewport.w * 0.1,
      viewport.h,
      Math.random() * 2 + 3,
      -Math.PI / 2 - spread + Math.random() * spread * 2
    );

    this.rocket.color = Explosion.Canvas.getColor('--pap-color-bg-inverse');
  }

  update() {
    if (!this.rocket.dead) {
      this.rocket.update();

      if (this.rocket.dead) {
        this.explosion = new Explosion(this.rocket);
      }
    }
  }

  render(context: CanvasRenderingContext2D) {
    if (!this.rocket.dead) {
      this.rocket.render(context);
    }
    else if (!this.explosion.dead) {
      this.explosion.render(context);
    }
  }
}