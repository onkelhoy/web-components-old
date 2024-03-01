// system
import { html, property } from "@pap-it/system-utils";


// templates 
import { Canvas } from '@pap-it/templates-canvas';

// local 
import { style } from "./style";
import { Rocket } from './rocket';
import { Explosion } from "./explosion";

export class Firework extends Canvas {
  static style = style;

  @property({ type: Number }) interval: number = 500;
  @property({ type: Number }) delay?: number;
  @property({ type: Number, attribute: 'cluster-spawn' }) clusterSpawn: number = 3;
  @property({ type: Number, attribute: 'cluster-spawn-random' }) clusterSpawnRandom: number = 3;
  @property({ type: Number, attribute: 'cluster-radius' }) clusterRadius: number = 20;
  @property({ type: Number, attribute: 'cluster-interval' }) clusterInterval: number = 0;
  @property({ type: Number, attribute: 'interval-random' }) intervalrandom: number = 100;
  @property({ type: Number, attribute: 'interval-amount' }) intervalAmount?: number = 2;

  private rockets: Rocket[] = [];
  private spawntimer = -100;
  private clustertimer = 0;
  private spawned = 0;
  private maxreached = false;

  private _dead = false;
  public get dead() {
    return this._dead;
  }

  constructor() {
    super();

    Explosion.Canvas = this;
  }

  public shoot(x: number, y: number) {
    const rocket = new Rocket(this.Viewport);
    rocket.x = x;
    rocket.y = y;
    this.rockets.push(rocket);
  }

  protected override update(ctx: CanvasRenderingContext2D, delta: number): void {
    if (this._dead) return;

    if (this.spawntimer === -100) {
      this.spawntimer = this.delay ? this.delay : this.interval - this.intervalrandom + Math.floor(this.intervalrandom * 2 * Math.random());
    }
    this.spawntimer--;

    if (this.spawntimer === 0) {
      this.spawntimer = this.interval - this.intervalrandom + Math.floor(this.intervalrandom * 2 * Math.random());

      let firstrocket: Rocket | null = null;
      const spawn = this.clusterSpawn + Math.round(Math.random() * this.clusterSpawnRandom);
      for (let i = 0; i < spawn; i++) {
        const rocket = new Rocket(this.Viewport);
        if (firstrocket === null) {
          firstrocket = rocket;
        }
        else {
          rocket.x = firstrocket.x - this.clusterRadius + this.clusterRadius * 2 * Math.random();
        }
        this.rockets.push(rocket);
      }
      this.spawned++;

      if (this.intervalAmount && this.spawned > this.intervalAmount) {
        this.maxreached = true;
      }
    }
  }

  protected override draw(ctx: CanvasRenderingContext2D, delta: number): void {
    for (let i = 0; i < this.rockets.length; i++) {
      this.rockets[i].update();
      this.rockets[i].render(ctx);

      if (this.rockets[i].dead) {
        this.rockets.splice(i, 1);
        i--;
      }
    }

    if (this.maxreached && this.rockets.length === 0) {
      this._dead = true;
      this.dispatchEvent(new Event('dead'));
    }
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "pap-firework": Firework;
  }
}