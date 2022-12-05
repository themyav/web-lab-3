var ctx, canvas;
let points = []
const SCALE = 6.1
//нужен массив точек, которые будут перерисовываться в зависимости от размера...
//рисуем в соответвии с радиусом??

function areaCheck(x, y, R){
    if(x >= 0 && y >= 0){
        return x <= R && y <= R;
    }
    else if(x <= 0 && y >= 0){
        return x*x + y*y <= R*R/4;
    }
    else if(x <= 0 && y <= 0){
        return y >= -2*x - R;
    }
    else return false;
}
function drawPoint(x, y, text, ctx, good=true){
    if(good) ctx.fillStyle= 'green';
    else ctx.fillStyle = 'red'
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 2 * Math.PI, true);
    ctx.fill();
    ctx.fillText(text, x + 3, y - 6);
}

function restorePoints(R){

    //can simplify
    let zero_x = document.getElementById('graph').offsetWidth / 2;
    let zero_y = document.getElementById('graph').offsetHeight / 2;
    let width = canvas.width;
    let height = canvas.height;

    for(let i = 0; i < points.length; i++){
        let x_pos = points[i][0]
        let y_pos = points[i][1]
        let oldR = points[i][2]


       let y_cord = -1 * (y_pos - zero_y), x_cord = (x_pos - zero_x);

        x_cord = x_cord/width * SCALE;
        y_cord = y_cord/height * SCALE;

        let good = areaCheck(x_cord, y_cord, R)
        //console.log(x_cord, y_cord, R, good)

        //x_cord *= R/oldR
        //y_cord *= R/oldR

        //x_cord += zero_x
        //y_cord = -y_cord + zero_y

        drawPoint(x_pos, y_pos, '', ctx, good)
    }

}
function draw(R=1, withPoints=true) {
    canvas = document.querySelector('#graph');
    let width = canvas.width; //consider as 6.1?
    let height = canvas.height;

    //recalculation of R
    R = width * (R/SCALE)

    if (!canvas.getContext) {
        return;
    }
    ctx = canvas.getContext('2d');

    ctx.fillStyle= 'white';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#89CFF0';
    ctx.strokeStyle = 'blue';
    ctx.font = '12px serif';

    ctx.beginPath(); //I
    ctx.moveTo(width / 2 - R / 2, height / 2);
    ctx.lineTo(width / 2, height / 2);
    ctx.lineTo(width / 2, height / 2 - R / 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, R / 2, Math.PI,
        -Math.PI / 2, false);
    ctx.fill();

    ctx.fillRect(width / 2, height / 2 - R, R, R); //II

    ctx.beginPath(); //IV
    ctx.moveTo(width / 2 - R / 2, height / 2);
    ctx.lineTo(width / 2, height / 2);
    ctx.lineTo(width / 2, height / 2 + R);
    ctx.fill();

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1.1;

    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();

    drawPoint(width / 2, height/ 2 - R, 'R', ctx);
    drawPoint(width / 2, height/ 2 - R / 2, 'R/2', ctx);
    drawPoint(width / 2, height/ 2 + R, '-R', ctx);
    drawPoint(width / 2, height/ 2 + R / 2, '-R/2', ctx);
    drawPoint(width / 2 + R, height/ 2, 'R', ctx);
    drawPoint(width / 2 + R / 2, height/ 2, 'R/2', ctx);
    drawPoint(width / 2 - R, height/ 2, '-R', ctx);
    drawPoint(width / 2 - R / 2, height/ 2, '-R/2', ctx);

    if(withPoints) restorePoints(R * SCALE/width)


}

function restoreCanvas(R=1, withPoints=true){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw(R, withPoints);
}
draw();