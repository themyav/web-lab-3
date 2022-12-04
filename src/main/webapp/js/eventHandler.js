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
        //$('#OptionForm\\:sendButton').disabled = true;
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

    /*$('#submit').click(function () {
        sendAreaCheckRequest(false);
    });

    $('#cleanButton').click(function () {
        sendCleanRequest();
    });



    $("input:checkbox").on('click', function () {
        let $box = $(this);
        if ($box.is(":checked")) {
            let group = "input:checkbox[name='" + $box.attr("name") + "']";
            console.log(group);
            $(group).prop("checked", false);
            $box.prop("checked", true);
        } else {
            $box.prop("checked", false);
        }
    });*/



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
        x_cord = x_cord/width * SCALE
        y_cord = y_cord/height * SCALE

        const y_min = -5, y_max = 3, fraction = 4
        let x_val = x_cord.toFixed(fraction).toString();
        let y_val = y_cord.toFixed(fraction);
        console.log("before cast to int", y_val);

        //fix is possible
        if(y_val > y_max) y_val = Math.ceil(y_val);
        else if(y_val < y_min) y_val = Math.floor(y_val);
        else y_val = Math.round(y_val);

        console.log("after cast to int", y_val);

        y_val = Math.min(Math.max(y_val.toString(), y_min), y_max);
        points.push([x_pos, y_pos, R, true])


        $('#OptionForm\\:X').val(x_val);
        $('#OptionForm\\:Y').val(y_val);
        $('#OptionForm\\:sendButton').click()
        setTimeout(()=>{
            let hint = document.getElementById("OptionForm:output").innerHTML;
            let good = (hint === "OK");
            console.log(good, hint);
            drawPoint(x_pos, y_pos, '', ctx, good); //брать значение ячейки таблицы..
        }, 100);

        //$('#output').text(x_val);
        //console.log(x_val, y_val);
        /*if (checkValue(R, 1, 5, 1)) {
            let w = R / 0.8;
            let k = w / zero_x;
            x_cord *= k;
            y_cord *= k;
            document.getElementById('errorMessage').innerText = '';

            let x_val = Math.min(Math.max(Math.round(x_cord.toFixed(4)).toString(), -3), 3);
            let new_element = "input:checkbox[value=" + x_val.toString() + "]"
            let old_element = "input:checkbox[name='X']:checked";

            $(old_element).prop("checked", false);
            $(new_element).prop("checked", true);

            document.getElementById('Y').value = y_cord.toFixed(4).toString();

            let X = $("input:checkbox[name='X']:checked").val();
            let Y = $("#Y").val();
            if (X == null || Y == null || !checkValue(X, -5, 3, 0) || !checkValue(Y, -3, 5, 0)) {
                document.getElementById('errorMessage').innerText = 'Значение X или Y в данной точке не корректно!';
            } else {
                restoreCanvas();
                drawPoint(x_pos, y_pos, '', ctx);
                document.getElementById('errorMessage').innerText = '';
            }
        } else {
            document.getElementById('errorMessage').innerText = 'Введите корректный R!';
        }*/
    });
});


