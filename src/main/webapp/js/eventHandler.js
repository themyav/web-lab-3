let R = 1

function changeR(val){
    R = val.value
    draw(R)
}

function checkValue(value, min, max, positive) {
    console.log(value, min, max);
    value = value.replace(",", ".");
    let ok = (value.search(/^-?\d[.,]?\d{0,5}$/) !== -1 && Number(value) >= min && Number(value) <= max);
    if (positive && value.search("-") !== -1) ok = false;
    return ok;
}

function changeX(val){
    if(!checkValue(val.value, -5, 5, false)){
        console.log("bad");
        document.getElementById("OptionForm:sendButton").disabled = "disabled";
        document.getElementById("OptionForm:output").innerHTML = "Некорректное значение X!";
    }
    else {
        document.getElementById("OptionForm:sendButton").removeAttribute("disabled");
        document.getElementById("OptionForm:output").innerHTML = '';

    }
}

$(document).ready(function () {

    $('#OptionForm\\:X').on('input', function () {
        this.value = this.value.replace(/[^0-9.,\-]/g, '');
    });

    $('#cleanButton').click(function () {
        restoreCanvas(R, false);
        console.log("clean all");
    });

    $('#graph').on('click', function (e) {

        canvas = document.querySelector('#graph');
        let width = canvas.width;
        let height = canvas.height;

        let x_pos = e.pageX - document.getElementById('graph').offsetLeft;
        let y_pos = e.pageY - document.getElementById('graph').offsetTop;
        console.log("you clicked to cord ", x_pos, y_pos, R);
        let zero_x = document.getElementById('graph').offsetWidth / 2;
        let zero_y = document.getElementById('graph').offsetHeight / 2;

        let y_cord = -1 * (y_pos - zero_y), x_cord = (x_pos - zero_x);
        console.log("you put point in ", x_cord, y_cord, R);

        //non-rounded coordinates
        x_cord = x_cord/width * SCALE;
        y_cord = y_cord/height * SCALE;

        //round coordinates
        let x_val = x_cord.toFixed(fraction).toString();
        let y_val = y_cord.toFixed(fraction);
        console.log("before cast to int", y_val);

        //3.1 -> 4, -5.1 -> -6
        if(y_val > y_max) y_val = Math.ceil(y_val);
        else if(y_val < y_min) y_val = Math.floor(y_val);
        else y_val = Math.round(y_val);

        console.log("after cast to int", y_val);

        //check if point invalid
        if(!(checkValue(x_val.toString(), x_min, x_max, false) && checkValue(y_val.toString(), y_min, y_max, false))){
            console.log("you clicked to invalid point");
            return;
        }

        //y_val = Math.min(Math.max(y_val.toString(), y_min), y_max);

        //else if point valid

        //draw with non-rounded cords
        let good = areaCheck(x_val, y_val, R);
        points.push([x_pos, y_pos, R, good])
        $('#OptionForm\\:X').val(x_val);
        $('#OptionForm\\:Y').val(y_val);
        $('#OptionForm\\:sendButton').click()
        drawPoint(x_pos, y_pos, '', ctx, good);
    });
});


