 var paskhalia = {
            1999: [4, 11], 2000: [4, 30], 2001: [4, 15], 2002: [5, 5], 2003: [4, 27], 2004: [4, 11], 2005: [5, 1], 2006: [4, 23], 2007: [4, 8], 2008: [4, 27], 2009: [4, 19], 2010: [4, 4], 2011: [4, 24], 2012: [4, 15], 2013: [5, 5], 2014: [4, 20], 2015: [4, 12], 2016: [5, 1], 2017: [4, 16], 2018: [4, 8], 2019: [4, 28], 2020: [4, 19], 2021: [5, 2], 2022: [4, 24], 2023: [4, 16], 2024: [5, 5], 2025: [4, 20], 2026: [4, 12], 2027: [5, 2], 2028: [4, 16], 2029: [4, 8], 2030: [4, 28], 2031: [4, 13], 2032: [5, 2], 2033: [4, 24], 2034: [4, 9], 2035: [4, 29], 2036: [4, 20], 2037: [4, 5], 2038: [4, 25], 2039: [4, 17], 2040: [5, 6], 2041: [4, 21], 2042: [4, 13], 2043: [5, 3], 2044: [4, 24], 2045: [4, 9], 2046: [4, 29], 2047: [4, 21], 2048: [4, 5], 2049: [4, 25], 2050: [4, 17], 2051: [5, 7], 2052: [5, 21], 2053: [4, 13], 2054: [5, 3], 2055: [5, 18], 2056: [4, 9], 2057: [4, 29], 2058: [4, 14], 2059: [5, 4], 2060: [4, 25], 2061: [4, 10], 2062: [4, 30], 2063: [4, 22], 2064: [4, 13], 2065: [4, 26], 2066: [4, 18], 2067: [4, 10], 2068: [4, 29], 2069: [4, 14], 2070: [5, 4], 2071: [4, 19], 2072: [4, 10], 2073: [4, 30], 2074: [4, 22], 2075: [4, 7], 2076: [4, 26], 2077: [4, 18], 2078: [5, 8], 2079: [4, 23], 2080: [4, 14], 2081: [5, 4], 2082: [4, 19], 2083: [4, 11], 2084: [4, 30], 2085: [4, 15], 2086: [4, 7], 2087: [4, 27], 2088: [4, 18], 2089: [5, 1], 2090: [4, 23], 2091: [4, 8], 2092: [4, 27], 2093: [4, 19], 2094: [4, 11], 2095: [4, 24], 2096: [4, 15], 2097: [5, 5], 2098: [4, 27], 2099: [4, 12], 2100: [5, 2]
        };

var mn = new Array(
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
);

var mnn = new Array(
  "31",
  "28",
  "31",
  "30",
  "31",
  "30",
  "31",
  "31",
  "30",
  "31",
  "30",
  "31",
);

var mnl = new Array(
  "31",
  "29",
  "31",
  "30",
  "31",
  "30",
  "31",
  "31",
  "30",
  "31",
  "30",
  "31",
);

// массив Юлианских месяцев
var monthUl = new Array(
  "їануaрій",
  "феvруа1рій",
  "ма1ртъ",
  "а3прjллій",
  "ма1ій",
  "їyній",
  "їyлій",
  "ѓвгустъ",
  "септе1мврій",
  "nктw1врій",
  "ноeмврій",
  "декeмврій",
);

// массив Григорианских месяцев
var monthGr = new Array(
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
);

// массив Юлианских ЦС дат
var ulday = new Array(
  "а7",
  "в7",
  "г7",
  "д7",
  "є7",
  "ѕ7",
  "з7",
  "и7",
  "f7",
  "‹",
  "а7i",
  "в7i",
  "г7i",
  "д7i",
  "є7i",
  "ѕ7i",
  "з7i",
  "и7i",
  "f7i",
  "к7",
  "к7а",
  "к7в",
  "к7г",
  "к7д",
  "к7є",
  "к7ѕ",
  "к7з",
  "к7и",
  "к7f",
  "л7",
  "л7а",
);

d = new Date();
td = d.getDate();

var XB = "";

if(`${d.getMonth()+1},${d.getDate()}` == `${paskhalia[d.getFullYear()]}`){


        XB = "ХРИСТОСЪ ВОСКРЕССЕ!";
        console.log(XB);

}


// Составление числа с учетом разрядности и разницы между календарями в 13 дней.
if (td <= 9) td = "0" + td;
tm = d.getMonth();
ty = d.getYear();

// Простая проверка на високосный год.
tmpVar = ((ty % 4) == 0) ? mnl : mnn;

if (tm == 0 && td <= 13) {
  mm = 11;
  pravkaNaVisokos = tmpVar[mm] - (13 - td);
} else if (tmpVar == mnl && tm == 2 && td <= 13) {
  mm = tm - 1;
  pravkaNaVisokos = tmpVar[mm] - (13 - td);

  if (td < 9) {
    td = "0" + (1 + Number(td));
  } else {
    td = 1 + Number(td);
  }
  console.log("--- Ныне високосный сдвиг ---");
} else if (tm > 0 && td <= 13) {
  mm = tm - 1;
  pravkaNaVisokos = tmpVar[mm] - (13 - td);
} else {
  mm = tm;
  pravkaNaVisokos = td - 13;
}

if (pravkaNaVisokos <= 9) uld = "0" + pravkaNaVisokos;
else uld = pravkaNaVisokos;

// Захват сегментов URL
var segments = location.pathname.match(/([a-z0-9_-]+)/ig);
console.log("Сегменты URL ", segments);
var currentDate = "Что то пошло не так!!!";
var linkMineaDay = currentDate;

if (segments[segments.length - 1] === "html") {
  var part = segments[segments.length - 3];
  // Юлианская дата
  var currentUlDay = (part[0] + part[1]) + " " +
    monthGr[mn.indexOf(segments[segments.length - 4])];
  var _01 = "block";
} else document.location.replace(document.location + "index.html");

var titleMineaDate = "Минея | Юл. " + currentUlDay;

// Текущая дата дня в Юлианском и Григорианском стилях
if (part == String(uld) + td) {
  gtd = d.getDate();
  currentDate =

     `
        <div class="name" style="margin-top: 0; color: #ff1400;">${XB}</div>
        <span style\="color: #000\; font-family: Irmologion\; font-size: 1.2em"><span class\="red">Ю#<\/span>ліа1нскій

     `
        +


    monthUl[mm] +
    '</span><br /><span style\="color: #e34234\; font-family: Irmologion\; font-size: 1.2em"> Де1нь ' +
    ulday[uld - 1] +
    '-й</span><br /><span style\="color: #ffe3e5">Григорианский: ' + gtd + " " +
    monthGr[tm] + "</span>";

  linkMineaDay = '<a href="' + uld + '.html" title="Минея текущего дня"' +
    "\>" + "Минjа днS," + "\<\/a\>" +
    '<a href="../../APRAKOS/index.html"> Ѓпракосъ днS</a>';
} else {
  currentDate = "Юл. " + part[0] + part[1] + " " +
    monthGr[mn.indexOf(segments[segments.length - 4])];
  linkMineaDay = '<a href="' + segments[segments.length - 3][0] +
    segments[segments.length - 3][1] + '.html">' + "Минjа днS, " + "<\/a> " +
    '<a href="../../APRAKOS/index.html"> Ѓпракосъ днS</a>';
  // _01 = "none"
}




document.title = titleMineaDate;
