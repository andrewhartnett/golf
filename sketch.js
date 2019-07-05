function setup() {
    createCanvas(640, 600);
}

let x = 300;
let y = 500;

var hitting = false;
var flight = false;

var distanceToFly = 0;
var flown = 0;
var flightStyle = 'straight';

let ball = {
    x: 360,
    y: 550,
    size: 10
}

let powerbar = {
    size: 0
}

function draw() {
    background(200);

    handleMouse();
    handleFlight();

    fill('red')
    rect(0, 0, powerbar.size, 25)

    fill(100);
    rect(x, y, 50, 50);

    fill('#fff')
    circle(ball.x, ball.y, ball.size)
}

var velocity = 8;
var dx = 0;

function handleFlight() {
    if (!flight) {
        return;
    }

    if (flown < (distanceToFly / 2)) {
        ball.size += 1;
    } else {
        ball.size -= 1;
    }

    if (flown > (distanceToFly / 3)) {
        switch (flightStyle) {
            case 'straight':
                dx = 0;
                break;
            case 'slice':
                dx -= .5;
                break;
            case 'hook':
                dx += .5;
                break;
        }
    }

    if (flown < distanceToFly) {
        ball.y -= 8;
        ball.x += dx;
        flown += 8;
    } else {
        ball.size = 10;
        flight = false;
    }
}

function handleMouse() {
    var size = powerbar.size;

    if (mouseIsPressed) {
        hitting = true;
        size += 5;
    } else {
        if (hitting == true) {
            hitTheBall(size);
        }
        hitting = false;
        if (size < 0) {
            size = 0;
        } else {
            size -= 5;
        }
    }

    powerbar.size = size;
}

function hitTheBall(size) {
    if (flight) {
        return;
    }

    flightStyle = random(['straight', 'slice', 'hook']);

    distanceToFly = size;
    flown = 0;
    flight = true;


}