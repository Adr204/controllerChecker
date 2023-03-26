import { drawAxis, drawBackground, lineToPad, drawArrow, fillArrow, drawBtn, fillBtn } from "./virtual.js";

let gp;
window.addEventListener("gamepadconnected", e => {
    load(navigator.getGamepads()[e.gamepad.index]);
})

document.getElementById("connectBtn").addEventListener("click", connectAnother);
function connectAnother() {
    if(countGamepads() > 1) {
        let gamepads = navigator.getGamepads();
        let currentIndex = gp.index;
        for(let i = 1; i < gamepads.length; i++) {
            let nextIndex = (currentIndex + i) % gamepads.length;
            if(gamepads[nextIndex]) {
                load(gamepads[nextIndex]);
                break;
            }
        }
    }
}
function countGamepads() {
    let gamepads = navigator.getGamepads();
    let count = 0;
    for (let i = 0; i < gamepads.length; i++) {
        if (gamepads[i]) {
            count++;
        }
    }
    return count;
}

function load(gamepad) {
    gp = gamepad;
    console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
    gp.index, gp.id,
    gp.buttons.length, gp.axes.length);
    document.getElementById("device_name").innerHTML = gp.id;

    document.getElementById("button_count").innerHTML = `Buttons: ${gp.buttons.length}`;
    document.getElementById("axis_count").innerHTML = `Axis: ${gp.axes.length}`;

    document.getElementById("buttons").innerHTML = "";
    (() => {
        let canvas = document.createElement("canvas");
        canvas.width = 150;
        canvas.height = 150;
        canvas.id = "arrowBtn";
        document.getElementById("buttons").appendChild(canvas);
    })();
    (() => {
        let canvas = document.createElement("canvas");
        canvas.width = 150;
        canvas.height = 150;
        canvas.id = "abxyBtn";
        document.getElementById("buttons").appendChild(canvas);
    })();

    document.getElementById("axes").innerHTML = "";
    for(let i = 0;i < gp.axes.length/2;i++) {
        let canvas = document.createElement("canvas");
        canvas.width = 150;
        canvas.height = 150;
        canvas.id = `axis_${i}`;
        document.getElementById("axes").appendChild(canvas);
    }
    start();
}

let animate = false;
document.getElementById("detectBtn").addEventListener("click", toggle);
function start() {
    animate = true;
    detect();
}
function stop() {
    animate = false;
}
function toggle() {
    animate ? stop() : start();
}
function detect() {
    let gamepad = navigator.getGamepads()[gp.index];
    document.getElementById("button_press").innerHTML = '';
    document.getElementById("axis_gradient").innerHTML = '';

    for (let i = 0; i < gamepad.buttons.length; i++) {
        if (gamepad.buttons[i].pressed) {
            document.getElementById("button_press").innerHTML += `button: ${i}`;
        }
    }
    for (let i = 0; i < gamepad.axes.length/2; i++) {
        document.getElementById("axis_gradient").innerHTML += `axis: ${floor(gamepad.axes[(i*2)])}<br>`;
        document.getElementById("axis_gradient").innerHTML += `axis: ${floor(gamepad.axes[(i*2)+1])}<br>`;

        let canvas = document.getElementById(`axis_${i}`);
        drawBackground(canvas);
        drawAxis(canvas, gamepad.axes[(i*2)], gamepad.axes[(i*2)+1], {color: gamepad.buttons[10+i].pressed ? "red" : "black"});
    }

    (() => {
        let canvas = document.getElementById("arrowBtn");
        let arrow = {
            up: false,
            down: false,
            left: false,
            right: false
        };

        if(gamepad.buttons[12].pressed) arrow.up = true;
        if(gamepad.buttons[13].pressed) arrow.down = true;
        if(gamepad.buttons[14].pressed) arrow.left = true;
        if(gamepad.buttons[15].pressed) arrow.right = true;
        drawArrow(canvas);
        fillArrow(canvas, arrow);
    })();

    (() => {
        let canvas = document.getElementById("abxyBtn");
        let abxy = {
            a: false,
            b: false,
            x: false,
            y: false
        }

        if(gamepad.buttons[1].pressed) abxy.a = true;
        if(gamepad.buttons[0].pressed) abxy.b = true;
        if(gamepad.buttons[3].pressed) abxy.x = true;
        if(gamepad.buttons[2].pressed) abxy.y = true;
        drawBtn(canvas);
        fillBtn(canvas, abxy);
    })();

    if(document.getElementById("button_press").innerHTML == '') {
        document.getElementById("button_press").innerHTML = 'please any button press...';
    }
    if(document.getElementById("axis_gradient").innerHTML == '') {
        document.getElementById("axis_gradient").innerHTML = 'please axis gradient...';
    }
    document.getElementById("detectBtn").innerHTML = animate ? 'stop detect' : 'restart detect';
    if(animate) requestAnimationFrame(detect);
}

function floor(num) {
    return Math.floor(num*100)/100;
}

document.getElementById("vibrateBtn").addEventListener("click", () => {vibrate();});
function vibrate(ms = 1000) {
    gp.vibrationActuator.playEffect("dual-rumble", {
        startDelay: 0,
        duration: ms,
        weakMagnitude: 0.2,
        strongMagnitude: 0.2
    });
}