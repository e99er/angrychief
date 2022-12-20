function setup() {
    createCanvas(400, 400);
}

function draw() {
    background(220);
}

const {
    Engine,
    World,
    Bodies,
    Mouse,
    MouseConstraint,
    Constraint
} = Matter;

let ground;
const boxes = [];
let bird;
let world, engine;
let mConstraint;
let slingshot;

let dotImg;
let boxImg;
let bkgImg;

function preload() {
    /* dotImg = loadImage('images/dot.png');
    boxImg = loadImage('images/equals.png');
    bkgImg = loadImage('images/skyBackground.png'); */
    dotImg = loadImage('https://raw.githubusercontent.com/e99er/angrychief/main/images/dot.png');
    boxImg = loadImage('https://raw.githubusercontent.com/e99er/angrychief/main/images/equals.png');
    bkgImg = loadImage('https://raw.githubusercontent.com/e99er/angrychief/main/images/skyBackground.png');
}

function setup() {
    // const canvas = createCanvas(711, 400);
    const canvas = createCanvas(displayWidth, displayHeight);
    engine = Engine.create();
    world = engine.world;
    ground = new Ground(width / 2, height - 10, width, 20);
    for (let i = 0; i < 3; i++) {
        boxes[i] = new Box(450, 300 - i * 75, 84, 100);
    }
    bird = new Bird(150, 300, 25);

    slingshot = new SlingShot(150, 300, bird.body);

    const mouse = Mouse.create(canvas.elt);
    const options = {
        mouse: mouse
    };

    // A fix for HiDPI displays
    mouse.pixelRatio = pixelDensity();
    mConstraint = MouseConstraint.create(engine, options);
    World.add(world, mConstraint);
}

function keyPressed() {
    if (key == ' ') {
        World.remove(world, bird.body);
        bird = new Bird(150, 300, 25);
        slingshot.attach(bird.body);
    }
}

function mouseReleased() {
    setTimeout(() => {
        slingshot.fly();
    }, 100);
}

function draw() {
    background(bkgImg);
    Matter.Engine.update(engine);
    ground.show();
    for (let box of boxes) {
        box.show();
    }
    slingshot.show();
    bird.show();
}