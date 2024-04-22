var mn = new Array('JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC');

var mnn = new Array('31', '28', '31', '30', '31', '30', '31', '31', '30', '31', '30', '31');

var mnl = new Array('31', '29', '31', '30', '31', '30', '31', '31', '30', '31', '30', '31');

// массив Юлианских месяцев
var monthUl = new Array("їануaрій", "феvруа1рій", "ма1ртъ", "а3прjллій", "ма1ій", "їyній", "їyлій", "ѓвгустъ", "септе1мврій", "nктw1врій", "ноeмврій", "декeмврій");

// массив Григорианских месяцев
var monthGr = new Array("января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря");

// массив Юлианских ЦС дат
var ulday = new Array("а7", "в7", "г7", "д7", "є7", "ѕ7", "з7", "и7", "f7", "‹", "а7i", "в7i", "г7i", "д7i", "є7i", "ѕ7i", "з7i", "и7i", "f7i", "к7", "к7а", "к7в", "к7г", "к7д", "к7є", "к7ѕ", "к7з", "к7и", "к7f", "л7", "л7а");



d = new Date();
		d = new Date();
td = d.getDate();

// Составление числа с учетом разрядности и разницы между календарями в 13 дней.
if (td <= 9) { td = "0" + td }
tm = d.getMonth();
ty = d.getYear();

// Простая проверка на високосный год.
tmpVar = ((ty % 4) == 0) ? mnl : mnn;

if (tm == 0 && td <= 13) { mm = 11; pravkaNaVisokos = tmpVar[mm] - (13 - td); }

else if (tmpVar == mnl && tm == 2 && td <= 13)
{
        mm = tm - 1;
        pravkaNaVisokos = tmpVar[mm] - (13 - td);

  if(td<9){

        td = "0" + (1 + Number(td));
  }
  else{

    td = 1 + Number(td);

  }
        console.log("--- Ныне високосный сдвиг ---");
}

else if (tm > 0 && td <= 13) { mm = tm - 1; pravkaNaVisokos = tmpVar[mm] - (13 - td); }

else { mm = tm; pravkaNaVisokos = (td - 13); }

if (pravkaNaVisokos < 10) { uld = '0' + pravkaNaVisokos; } 

else { uld = pravkaNaVisokos; }



// Захват сегментов URL
var segments = location.pathname.match(/([a-z0-9_-]+)/ig);
console.log("Сегменты URL ", segments);
var currentDate = "Что то пошло не так!!!";
var linkMineaDay = currentDate;


if (segments[segments.length - 1] === "html") {
        var part = segments[segments.length - 3];
        // Юлианская дата
        var currentUlDay = (part[0] + part[1]) + " " + monthGr[mn.indexOf(segments[segments.length - 4])];
        var _01 = "block";

} else { document.location.replace(document.location + "index.html") }

var titleMineaDate = "Минея | Юл. " + currentUlDay;

// Текущая дата дня в Юлианском и Григорианском стилях
if (part == String(uld) + td) {
        gtd = d.getDate();
        currentDate = "<span style\=\"color: #000\; font-family: Irmologion\; font-size: 1.2em\"><span class\=\"red\">Ю#<\/span>ліа1нскій " + monthUl[mm] + "</span><br /><span style\=\"color: #e34234\; font-family: Irmologion\; font-size: 1.2em\"> Де1нь " + ulday[uld - 1] + "-й</span><br /><span style\=\"color: #ffe3e5\">Григорианский: " + gtd + " " + monthGr[tm] + "</span>";
        
        linkMineaDay = '<a href=\"' + (uld) + '.html\" title=\"Минея текущего дня\"' + '\>' + 'Минjа днS,' + '\<\/a\>' + '<a href="../../APRAKOS/index.html"> Ѓпракосъ днS</a>'
                ;
} else {
        currentDate = "Юл. " + part[0] + part[1] + " " + monthGr[mn.indexOf(segments[segments.length - 4])];
        linkMineaDay = '<a href=\"' + segments[segments.length - 3][0] + segments[segments.length - 3][1] + '.html\">' + 'Минjа днS, ' + '<\/a> ' + '<a href="../../APRAKOS/index.html"> Ѓпракосъ днS</a>';
        // _01 = "none"
}

document.title = titleMineaDate;
