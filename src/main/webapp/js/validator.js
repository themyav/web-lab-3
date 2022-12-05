const y_min = -5, y_max = 3;
const x_min = -5, x_max = 5;
fraction = 4;

function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('txt').innerHTML = "Текущее время: " + h + ":" + m + ":" + s;
    setTimeout(startTime, 12000);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function checkValue(value, min, max, positive) {
    value = value.replace(",", ".");
    let ok = (value.search(/^-?\d.?\d{0,5}$/) !== -1 && Number(value) >= min && Number(value) <= max);
    if (positive && value.search("-") !== -1) ok = false;
    return ok;
}

function colorError(id, ok) {
    if (!ok) {
        document.getElementById(id).style.backgroundColor = "lightpink";
    } else document.getElementById(id).style.backgroundColor = "white";
}
