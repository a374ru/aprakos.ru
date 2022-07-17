/* TODO: STOP-NEXT! Задача: вычислить седмицу в соответствии с воздвиженской отступкой.
----------------------------------------
 */
// var prestupkaV = undefined;
// var otstupkaV = undefined;

function otstupkaVozdvijjenie() {
    timeBoxVozdvijjenie = new Date(dataPashi.toString().slice(11, 15), 8, 27);
    sedmicaVozdvijjenie = (Math.trunc((timeBoxVozdvijjenie - dataPashi) / 864E5 / 7) - 6);
    var otstupkaV = sedmica - (sedmicaVozdvijjenie - 17);
    var prestupkaV = sedmica;
    var norm = sedmicaVozdvijjenie + (17 - sedmicaVozdvijjenie);
    if (timeBox >= timeBoxVozdvijjenie & sedmica <= 17 & sedmicaVozdvijjenie < 17) {
        return norm;
    }
    if (timeBox >= timeBoxVozdvijjenie & sedmica > sedmicaVozdvijjenie & sedmica > 17) {
        return otstupkaV;
        // return console.log("\n\n Воздвиженье уже было по Пасхе в " + sedmicaVozdvijjenie + " седмице: " + timeBoxVozdvijjenie);
    }
    else if (timeBox >= timeBoxVozdvijjenie & sedmica < sedmicaVozdvijjenie & sedmica > 17) {
        return prestupkaV;
        // console.log(prestupkaV + timeBoxVozdvijjenie + "\n Воздвиженье еще будет на " + sedmicaVozdvijjenie + " седмице: " + timeBoxVozdvijjenie);
    }
    else
        return console.log("!!! ВОЗДВИЖЕНИЯ НЕ БЫЛО !!!" + timeBoxVozdvijjenie + sedmicaVozdvijjenie);
    // return sedmica;
}

otstupkaVozdvijjenie();


