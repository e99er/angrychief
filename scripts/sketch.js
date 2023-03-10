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
    let chiefNr = Math.floor(Math.random() * 3) + 1;
    dotImg = loadImage(`https://raw.githubusercontent.com/e99er/angrychief/main/images/chief${chiefNr}.png`);
    bkgImg = loadImage('https://raw.githubusercontent.com/e99er/angrychief/main/images/darkgarda.jpg');
    tesla = loadImage('https://raw.githubusercontent.com/e99er/angrychief/main/images/tesla.png');
    coco = loadImage('https://raw.githubusercontent.com/e99er/angrychief/main/images/coco.jpg');
    louis = loadImage('https://raw.githubusercontent.com/e99er/angrychief/main/images/louis.png');
    moncler = loadImage('https://raw.githubusercontent.com/e99er/angrychief/main/images/moncler.png');
    phone = loadImage('https://raw.githubusercontent.com/e99er/angrychief/main/images/phone.png');
    p8 = loadImage('https://raw.githubusercontent.com/e99er/angrychief/main/images/p8.png');
}

function setup() {
    // const canvas = createCanvas(711, 400);
    const canvas = createCanvas(1500, 800);
    engine = Engine.create();
    world = engine.world;
    ground = new Ground(width / 2, height - 10, width, 20);

    boxes[5] = new Box(1050, 300, 60, 120, phone);
    boxes[4] = new Box(1050, 300, 110, 100, moncler);
    boxes[3] = new Box(1050, 300, 90, 90, p8);
    boxes[2] = new Box(1050, 300, 200, 70, louis);
    boxes[1] = new Box(1050, 300, 290, 150, tesla);
    boxes[0] = new Box(1050, 300, 450, 190, coco);
    bird = new Bird(250, 500, 70);

    slingshot = new SlingShot(250, 500, bird.body);

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
        bird = new Bird(250, 500, 70);
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