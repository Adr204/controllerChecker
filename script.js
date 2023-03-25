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
function start() {
    animate = true;
    detect();
}
function stop() {
    animate = false;
}

function toggle() {
    if(animate) {
        stop();
    } else {
        start();
    }
}
document.getElementById("detectBtn").addEventListener("click", toggle);

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
        drawAxis(canvas, gamepad.axes[(i*2)], gamepad.axes[(i*2)+1]);
    }

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

function drawAxis(canvas, x, y, size = 8) {
    let ctx = canvas.getContext('2d');
    let width = canvas.width*0.8;
    let height = canvas.height*0.8;
    let pad = canvas.width*0.1;

    ctx.fillRect((x+1)*width/2 - size + pad, (y+1)*height/2 - size + pad, size*2, size*2);
    // console.log((x+1)*width/2 - size, (y+1)*height/2 - size, size, size)
}

function drawBackground(canvas) {
    let ctx = canvas.getContext('2d');
    let width = canvas.width*0.8;
    let height = canvas.height*0.8;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(0, canvas.height/2);
    ctx.lineTo(canvas.width, canvas.height/2);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(canvas.width/2, 0);
    ctx.lineTo(canvas.width/2, canvas.height);
    ctx.closePath();
    ctx.stroke();
}