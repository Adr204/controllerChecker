export { drawAxis, drawBackground, lineToPad, drawArrow, fillArrow, drawBtn, fillBtn };

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

function lineToPad(ctx, pad, x, y) {
    ctx.lineTo(x+pad, y+pad);
}

function drawArrow(canvas) {
    let ctx = canvas.getContext('2d');
    let width = canvas.width*0.8;
    let height = canvas.height*0.8;
    let pad = canvas.width*0.1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(width/3 + pad, pad);
    lineToPad(ctx, pad, width*2/3, 0);
    lineToPad(ctx, pad, width*2/3, height/3);
    lineToPad(ctx, pad, width, height/3);
    lineToPad(ctx, pad, width, height*2/3);
    lineToPad(ctx, pad, width*2/3, height*2/3);
    lineToPad(ctx, pad, width*2/3, height);
    lineToPad(ctx, pad, width/3, height);
    lineToPad(ctx, pad, width/3, height*2/3);
    lineToPad(ctx, pad, 0, height*2/3);
    lineToPad(ctx, pad, 0, height/3);
    lineToPad(ctx, pad, width/3, height/3);
    lineToPad(ctx, pad, width/3, 0);
    ctx.closePath();
    ctx.stroke();
}

function fillArrow(canvas, arrows) {
    let ctx = canvas.getContext('2d');
    let width = canvas.width*0.8;
    let height = canvas.height*0.8;
    let pad = canvas.width*0.1;

    if(arrows.up) ctx.fillRect(width/3 + pad, 0 + pad, width/3, height/3);
    if(arrows.down) ctx.fillRect(width/3 + pad, height*2/3 + pad, width/3, height/3);
    if(arrows.left) ctx.fillRect(0 + pad, height/3 + pad, width/3, height/3);
    if(arrows.right) ctx.fillRect(width*2/3 + pad, height/3 + pad, width/3, height/3);
}

function drawBtn(canvas) {
    let ctx = canvas.getContext('2d');
    let width = canvas.width*0.8;
    let height = canvas.height*0.8;
    let pad = canvas.width*0.1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // up
    ctx.beginPath();
    ctx.arc(width/2+pad,height/6+pad, width/6, 0,2*Math.PI,false);
    ctx.stroke();
    // down
    ctx.beginPath();
    ctx.arc(width/2+pad,height*5/6+pad, width/6, 0,2*Math.PI,false);
    ctx.stroke();
    // left
    ctx.beginPath();
    ctx.arc(width/6+pad,height/2+pad, width/6, 0,2*Math.PI,false);
    ctx.stroke();
    // right
    ctx.beginPath();
    ctx.arc(width*5/6+pad,height/2+pad, width/6, 0,2*Math.PI,false);
    ctx.stroke();
}

function fillBtn(canvas, abxy) {
    let ctx = canvas.getContext("2d");
    let width = canvas.width*0.8;
    let height = canvas.height*0.8;
    let pad = canvas.width*0.1;

    if(abxy.a) {
        ctx.beginPath();
        ctx.arc(width*5/6+pad,height/2+pad, width/6, 0, 2*Math.PI, false);
        ctx.fill();
    }
    if(abxy.b) {
        ctx.beginPath();
        ctx.arc(width/2+pad,height*5/6+pad, width/6, 0, 2*Math.PI, false);
        ctx.fill();
    }
    if(abxy.x) {
        ctx.beginPath();
        ctx.arc(width/2+pad,height/6+pad, width/6, 0, 2*Math.PI, false);
        ctx.fill();
    }
    if(abxy.y) {
        ctx.beginPath();
        ctx.arc(width/6+pad,height/2+pad, width/6, 0, 2*Math.PI, false);
        ctx.fill();
    }
}