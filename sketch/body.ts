const G = 0.1;
let i = 0;

class Body {
  x: number;
  y: number;

  vx: number;
  vy: number;

  mass: number;
  radius: number;

  isStatic: boolean;

  index: number;
  color: string;

  constructor(
    position: [number, number],
    velocity: [number, number],
    mass: number,
    isStatic: boolean,
    color: string,
    radius?: number
  ) {
    this.x = position[0];
    this.y = position[1];
    this.vx = velocity[0];
    this.vy = velocity[1];

    this.isStatic = isStatic;
    this.mass = mass;

    this.radius = radius ?? mass;
    this.color = color;

    this.index = i;
    i++;
  }

  update(bodies: Body[]) {
    if (this.isStatic) return;

    let totalForce: [number, number] = [0, 0];

    for (const body of bodies) {
      if (body.index != this.index) {
        const attractionForce = this.getAttractionForce(body);
        totalForce[0] += attractionForce[0];
        totalForce[1] += attractionForce[1];
      }
    }
    this.applyForce(totalForce);
  }

  private getAttractionForce(body: Body): [number, number] {
    const distance = this.getDistanceBetween(body);
    const mag = (G * (this.mass * body.mass)) / (distance * distance);

    const a = body.x - this.x;
    const b = body.y - this.y;
    return [mag * a, mag * b];
  }

  private getDistanceBetween(body: Body): number {
    const a = body.x - this.x;
    const b = body.y - this.y;
    return Math.sqrt(a * a + b * b);
  }

  private applyForce(force: [number, number]) {
    this.vx += force[0] / this.mass;
    this.vy += force[1] / this.mass;
    this.applyVelocity();
  }

  private applyVelocity() {
    this.x += this.vx;
    this.y += this.vy;
  }

  draw() {
    stroke(this.color);
    strokeWeight(this.radius);
    point(this.x, this.y);
  }
}
