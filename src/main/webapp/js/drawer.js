var ctx, canvas;
let points = []
const SCALE = 6.1
//нужен массив точек, которые будут перерисовываться в зависимости от размера...
//рисуем в соответвии с радиусом??
function drawPoint(x, y, text, ctx, good=true){
    if(good) ctx.fillStyle= 'green';
    else ctx.fillStyle = 'red'
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 2 * Math.PI, true);
    ctx.fill();
    ctx.fillText(text, x + 3, y - 6);
}

function restorePoints(R){
    for(let i = 0; i < points.length; i++){
        let x = points[i][0]
        console.log(x)
        let y = points[i][1]
        let good = points[i][2]
        drawPoint(x, y, '', ctx, good)
    }

}
function draw(R=1) {
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

    restorePoints(R)


}

function restoreCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
}
draw();