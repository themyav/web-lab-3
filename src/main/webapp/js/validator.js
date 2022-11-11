function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('txt').innerHTML = "Текущее время: " + h + ":" + m + ":" + s;
    setTimeout(startTime, 1000);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function fillTable(response) {
    let header = "<tr><th>X</th><th>Y</th><th>R</th><th>Результат</th><th>Время работы скрипта</th><th>Дата и время</th></tr>";
    document.getElementById("respTable").innerHTML = (header + response);

}

function fillValues() {
    startTime();
    sendFillRequest();

}

function checkValue(value, min, max, positive) {
    value = value.replace(",", ".");
    let ok = (value.search(/^-?\d.?\d{0,5}$/) !== -1 && Number(value) >= min && Number(value) <= max);
    if (positive && value.search("-") !== -1) ok = false;
    return ok;
}

function cleanTable() {
    restoreCanvas();
    let table = document.getElementById("respTable");
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
}

function colorError(id, ok) {
    if (!ok) {
        document.getElementById(id).style.backgroundColor = "lightpink";
    } else document.getElementById(id).style.backgroundColor = "white";
}

function validate() {
    let X = $("input:checkbox[name='X']:checked").val();
    let Y = document.forms["OptionForm"]["Y"].value;
    let R = document.forms["OptionForm"]["R"].value;

    colorError("Y", checkValue(Y, -3, 3, 0));
    return checkValue(X, -3, 5, 0) && checkValue(Y, -3, 3, 0) && checkValue(R, 1, 5, 1);

}