const G = 0.1;
let i = 0;
class Body {
    constructor(position, velocity, mass, isStatic, color, radius) {
        this.x = position[0];
        this.y = position[1];
        this.vx = velocity[0];
        this.vy = velocity[1];
        this.isStatic = isStatic;
        this.mass = mass;
        this.radius = radius !== null && radius !== void 0 ? radius : mass;
        this.color = color;
        this.index = i;
        i++;
    }
    update(bodies) {
        if (this.isStatic)
            return;
        let totalForce = [0, 0];
        for (const body of bodies) {
            if (body.index != this.index) {
                const attractionForce = this.getAttractionForce(body);
                totalForce[0] += attractionForce[0];
                totalForce[1] += attractionForce[1];
            }
        }
        this.applyForce(totalForce);
    }
    getAttractionForce(body) {
        const distance = this.getDistanceBetween(body);
        const mag = (G * (this.mass * body.mass)) / (distance * distance);
        const a = body.x - this.x;
        const b = body.y - this.y;
        return [mag * a, mag * b];
    }
    getDistanceBetween(body) {
        const a = body.x - this.x;
        const b = body.y - this.y;
        return Math.sqrt(a * a + b * b);
    }
    applyForce(force) {
        this.vx += force[0] / this.mass;
        this.vy += force[1] / this.mass;
        this.applyVelocity();
    }
    applyVelocity() {
        this.x += this.vx;
        this.y += this.vy;
    }
    draw() {
        stroke(this.color);
        strokeWeight(this.radius);
        point(this.x, this.y);
    }
}
const ZOOM_AMOUNT = 2;
const bodies = [];
let img;
function preload() {
    img = loadImage('assets/background.png');
}
function setup() {
    console.log('🚀 - Setup initialized - P5 is running');
    createCanvas(800, 800, WEBGL);
    bodies.push(new Body([100 + 405, 100 + 401], [0, 0], 50, false, 'orange'));
    bodies.push(new Body([100 + 201, 100 + 450], [0, 0], 45, false, 'lightblue'));
    bodies.push(new Body([100 + 120, 100 + 102], [0, 0], 40, false, 'teal'));
    bodies.push(new Body([100 + 142, 100 + 503], [0, 0], 35, false, 'grey'));
}
function draw() {
    const [center, boundings] = calculateBoundings();
    background(22);
    moveCamera(center, boundings);
    for (const body of bodies) {
        body.update(bodies);
        body.draw();
    }
}
function drawBackground(center) {
    let imgWidth = img.width;
    let imgHeight = img.height;
    let sx = center[0] % imgWidth;
    let sy = center[1] % imgHeight;
    if (sx < 0)
        sx += imgWidth;
    if (sy < 0)
        sy += imgHeight;
    image(img, -width / 2, -height / 2, width, height, sx, sy, width, height);
}
function moveCamera(center, boundings) {
    const scaleX = width / boundings[0];
    const scaleY = height / boundings[1];
    const scaleFactor = Math.min(scaleX, scaleY);
    scale(scaleFactor / ZOOM_AMOUNT);
    translate(-center[0], -center[1]);
}
function calculateBoundings() {
    const boundingsX = [Infinity, -Infinity];
    const boundingsY = [Infinity, -Infinity];
    const center = [0, 0];
    for (const body of bodies) {
        if (body.x < boundingsX[0])
            boundingsX[0] = body.x;
        if (body.x > boundingsX[1])
            boundingsX[1] = body.x;
        if (body.y < boundingsY[0])
            boundingsY[0] = body.y;
        if (body.y > boundingsY[1])
            boundingsY[1] = body.y;
        center[0] += body.x;
        center[1] += body.y;
    }
    center[0] /= bodies.length;
    center[1] /= bodies.length;
    const boundingWidth = boundingsX[1] - boundingsX[0];
    const boundingHeight = boundingsY[1] - boundingsY[0];
    return [center, [boundingWidth, boundingHeight]];
}
//# sourceMappingURL=build.js.map