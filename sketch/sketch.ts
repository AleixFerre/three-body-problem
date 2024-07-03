const bodies: Body[] = [];

let img: p5.Image;

function preload() {
  img = loadImage('/assets/background.png');
}

function setup() {
  console.log('🚀 - Setup initialized - P5 is running');
  createCanvas(800, 800, WEBGL);

  bodies.push(new Body([405, 401], [0, 0], 50, false, 'orange'));
  bodies.push(new Body([201, 450], [0, 0], 45, false, 'lightblue'));
  bodies.push(new Body([120, 102], [0, 0], 40, false, 'teal'));
  bodies.push(new Body([142, 503], [0, 0], 35, false, 'grey'));
}

function draw() {
  moveCamera();

  // drawBackground();
  background(22);

  for (const body of bodies) {
    body.update(bodies);
    body.draw();
  }
}

function drawBackground() {
  image(img, 0, 0, width, height);
}

function moveCamera() {
  translate(-width / 2, -height / 2);
}
