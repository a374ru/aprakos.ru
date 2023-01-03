// Thu Dec 29 2022 09:12:30 GMT+0300
/*

    --- APRAKOS.BLOGSPOT.COM VERSION ---

    СКРИПТ ВЫЧИСЛЕНИЯ ДАТЫ ПАСХИ ТЕКУЩЕГО ГОДА И РАЗНИЦЫ МЕЖДУ ДАТАМИ ПРАЗДНЕСТВ.

    Разница – это количество седмиц, прошедших от Пасхи до текущего момента.

    Подробное описание смотри в ./doc.

*/

var url = "https://" + location.host + "/currentday/APRAKOS/";
var linkToCurrentSeed;
var massDays = [
  "0",
  "ВОСРЕСЕНЬЕ",
  "ПОНЕДЕЛЬНИК",
  "ВТОРНИК",
  "СРЕДА",
  "ЧЕТВЕРГ",
  "ПЯТНИЦА",
  "СУББОТА",
];

// Пасхалия, где месяц -03 это апрель, -04 май и тд
var pashalia = {
  year2015: [03, 12],
  year2016: [04, 01],
  year2017: [03, 16],
  year2018: [03, 08],
  year2019: [03, 28],
  year2020: [03, 19],
  year2021: [04, 02],
  year2022: [03, 24],
  year2023: [03, 16],
  year2024: [04, 05],
  year2025: [03, 20],
  year2026: [03, 12],
  year2027: [04, 02],
  year2028: [03, 16],
  year2029: [03, 08],
  year2030: [03, 28],
  year2031: [03, 13],
  year2032: [04, 02],
  year2033: [03, 24],
  year2034: [03, 09],
  year2035: [03, 29],
  year2036: [03, 20],
  year2037: [03, 05],
  year2038: [03, 25],
  year2039: [03, 17],
  year2040: [04, 06],
  year2041: [03, 21],
  year2042: [03, 13],
  year2043: [04, 03],
  year2044: [03, 24],
  year2045: [03, 09],
  year2046: [03, 29],
  year2047: [03, 21],
  year2048: [03, 05],
  year2049: [03, 25],
  year2050: [03, 17],
  year2051: [04, 07],
  year2052: [04, 21],
  year2053: [03, 13],
  year2054: [04, 03],
  year2055: [04, 18],
  year2056: [03, 09],
  year2057: [03, 29],
  year2058: [03, 14],
  year2059: [04, 04],
  year2060: [03, 25],
  year2061: [03, 10],
  year2062: [03, 30],
  year2063: [03, 22],
  year2064: [03, 13],
  year2065: [03, 26],
  year2066: [03, 18],
  year2067: [03, 10],
  year2068: [03, 29],
  year2069: [03, 14],
  year2070: [04, 04],
  year2071: [03, 19],
  year2072: [03, 10],
  year2073: [03, 30],
  year2074: [03, 22],
  year2075: [03, 07],
  year2076: [03, 26],
  year2077: [03, 18],
  year2078: [04, 08],
  year2079: [03, 23],
  year2080: [03, 14],
  year2081: [04, 04],
  year2082: [03, 19],
  year2083: [03, 11],
  year2084: [03, 30],
  year2085: [03, 15],
  year2086: [03, 07],
  year2087: [03, 27],
  year2088: [03, 18],
  year2089: [04, 01],
  year2090: [03, 23],
  year2091: [03, 08],
  year2092: [03, 27],
  year2093: [03, 19],
  year2094: [03, 11],
  year2095: [03, 24],
  year2096: [03, 15],
  year2097: [04, 05],
  year2098: [03, 27],
  year2099: [03, 12],
  year2100: [04, 02],
};

// Девять двунадесятых праздников
const NINEHOLIDAYS = {
  rojdestvoBogorodici: {
    year: 2021,
    month: 8,
    day: 21,
    monthRU: "09",
  },
  vozdvijjenieKresta: {
    year: 2020,
    month: 8,
    day: 27,
    monthRU: "09",
  },
  vvedenieVoHram: {
    year: 2020,
    month: 11,
    day: 4,
    monthRU: "12",
  },
  rojdestvoXristovo: {
    year: 2021,
    month: 0,
    day: 7,
    monthRU: "01",
  },
  // 0 = month of January
  kreshenieGospodne: {
    year: 2021,
    month: 0,
    day: 19,
    monthRU: "01",
  },
  sretenieGospodne: {
    year: 2021,
    month: 1,
    day: 15,
    monthRU: "02",
  },
  blagoveshenieBogorodici: {
    year: 2021,
    month: 3,
    day: 7,
    monthRU: "04",
  },
  // Здесь бывают по календарю еще четыре `ПЕРЕХОДЯЩИХ` празнества:
  // 8. Вход Господень в Иерусалим,
  // 0. Пасха(не входящая в состав двунадесятых),
  // 9. Вознесение,
  // 10. Пятьдесятница.
  preobrajjenieGospodne: {
    year: 2021,
    month: 7,
    day: 19,
    monthRU: "08",
  },
  uspenieBogorodici: {
    year: 2021,
    month: 7,
    day: 28,
    monthRU: "08",
  },
};
//=-=-=-=-=-=-=-=-=-=-=-=-=-=
//=-=-=-=-=-=-=-=-=-=-=-=-=-=
//=-=-=TEST DATE HERE-=-=-=-=
/**
 * Текущий момент времени (сейчас).
 */
var theMomentTime = new Date();
// var theMomentTime = new Date("2021-5-4");
// =-=-=-=-=-=-=-=-=-=-=-=-=-=

var stupka;

var ul_numDay = theMomentTime.getDay() + 1;
var dataPashi = "Пасхи нет";
var dataPashiNext = "ДАТЫ ОЖИДАЕМОЙ ПАСХИ НЕТ";

// Инит переменных после ГНГ
var curentYearPrefics = "year" + theMomentTime.getFullYear();
var curentYearPreficsNext = "year" + (theMomentTime.getFullYear() + 1);

// Проверка и установка даты Пасхи для начала вычислений.
if (
  // проверяем Пасху текущего года, была или нет?
  // Если Пасха была то:
  theMomentTime >=
  new Date(
    theMomentTime.getFullYear(),
    pashalia[curentYearPrefics][0],
    pashalia[curentYearPrefics][1]
  )
) {
  dataPashi = new Date(
    theMomentTime.getFullYear(),
    pashalia[curentYearPrefics][0],
    pashalia[curentYearPrefics][1]
  );
  curentYearPreficsNext = "year" + (theMomentTime.getFullYear() + 1);
  dataPashiNext = new Date(
    theMomentTime.getFullYear() + 1,
    pashalia[curentYearPreficsNext][0],
    pashalia[curentYearPreficsNext][1]
  );

  console.log(
    "\n\n\t\tГод и дата прошедшей Пасхи: " + dataPashi.toString().slice(0, 15)
  );
  console.log(
    "\t\tГод и дата ===ОЖИДАЕМОЙ=== Пасхи: " +
    dataPashiNext.toString().slice(0, 16)
  );
} else {
  // Если Пасхи еще не было в текущем году
  curentYearPrefics = "year" + (theMomentTime.getFullYear() - 1);
  dataPashi = new Date(
    theMomentTime.getFullYear() - 1,
    pashalia[curentYearPrefics][0],
    pashalia[curentYearPrefics][1]
  );
  curentYearPreficsNext = "year" + theMomentTime.getFullYear();
  dataPashiNext = new Date(
    theMomentTime.getFullYear(),
    pashalia[curentYearPreficsNext][0],
    pashalia[curentYearPreficsNext][1]
  );

  console.log(
    `\t\tГод и дата прошедшей Пасхи: ${dataPashi.toString().slice(0, 15)}`
  );
}

/**
 * Функция вычисляет первый понедельник по Воздвижении Креста. Начало чтения  от Луки, зачало 10-е.
 * Возвращает результат проверки данного дня. Наступил это день, или еще нет для БГ.
 *
 * @returns boolean
 */
function mondayAfterVozdviggenie() {
  // Дата Воздвижения Креста

  var a = new Date(curentYearPrefics.slice(-4) + "-09-27T00:00:00");
  var aaa = 1 + 7 - (a.getDay() % 7);
  var updateTheDate = a.getDate() + aaa;
  a.setDate(updateTheDate);
  return theMomentTime >= a;
}

/*
    Вычисление разницы между текущем временем
    и датой прошедшей Пасхи. Обрезка значения до целого.
    ----------------------------------------------------
*/
var sedmica = Math.trunc((theMomentTime - dataPashi) / 864e5 / 7) + 1;
let sedDay = Number("" + sedmica + ul_numDay);
let yM = "noneYearMonth/";

/**
 * Вычисляет и возвращает часть пути URL для входящего параметра.
 * Входящие данные - это имена файлов расположенных на сервере `blogspot.com`.
 * На каждый год/месяц/ определенный диапазон чисел.
 * Этот `Switch` дествителен только для публикаций на aprakos.blogspot.com 2020-2021 года, где дни чтений совпадают с текущими днями этих годов!!
 * Формирование части URL для ссылки на текущий Апракос в соответствии с месяцами ситемного года. Читай `../doc/`.
 *
 * @param {number} sds
 * @returns string
 */
function yearMonthPath(sds = sedDay) {
  switch (true) {
    case sds <= 25:
      yM = "2020/04/";
      break;
    case sds <= 72:
      yM = "2020/05/";
      break;
    case sds <= 113:
      yM = "2020/06/";
      break;
    case sds <= 156:
      yM = "2020/07/";
      break;
    case sds <= 202:
      yM = "2020/08/";
      break;
    case sds <= 244:
      yM = "2020/09/";
      break;
    case sds <= 287:
      yM = "2020/10/";
      break;
    case sds <= 332:
      yM = "2020/11/";
      break;
    case sds <= 375:
      yM = "2020/12/";
      break;
    case sds <= 407:
      yM = "2021/01/";
      break;
    case sds <= 421:
      yM = "2021/02/";
      break;
    case sds <= 472:
      yM = "2021/03/";
      break;
    case sds <= 506:
      yM = "2021/04/";
      break;
    case sds <= 517:
      yM = "2021/05/";
      break;

    default:
      yM;
      break;
  }

  return yM;
}

/**
 * Ссылка URL на страницу Апракоса текущего дня седмицы с учетом расположения материалов в aprakos.blogspot.com …
 */
var linkToAprakos = "/" + yearMonthPath() + sedDay + ".html";

/**
 * Количество всех седмиц Богослужебного года.
 */
var allSedmica = Math.trunc((dataPashiNext - dataPashi) / 864e5 / 7) + 1;

/**
 * Шаг отступки к чтениям 23 Недели, в зависимости от выбранной Уготовительной недели. Или Закхея, или Мытаря и Фарисея.
 */
var otstupkaK23Sedmice = 0;

/**
 *  Количество промежуточных седмиц пред Неделей Мытаря и Фарисея (41-ой из 50 по Пасхе)
 * !important: Число корректирует отступку до положенной по Уставу.
 * Эта отступка считается от 30 Недели (31 седмицы) по  Пасхе.
 * Она же 23 Неделя по Пятьдесятнице.
 */

if (zakheyTime() == true) {
  // отступка от Закхея, можно использовать функцию `mifTime()`
  var intermediateWeeks =
    allSedmica + otstupkaK23Sedmice + otstupkaVozdvijjenie() - 1 - 50;
} else {
  var intermediateWeeks = 1;
}

console.log(
  `\n\n\t\tОт Пасхи ${dataPashi
    .toString()
    .slice(11, 15)} года и до Пасхи ${dataPashiNext
      .toString()
      .slice(11, 15)} года случается седмиц ••• ${allSedmica - 1}` +
  `\n\t\tСоответственно промежуточных седмиц пред Неделей МиФ  ••• ${allSedmica - 1 - 50
  }` +
  `\n\t\tОтступка по чтениям для промежуточных седмиц ••• ${intermediateWeeks}\n` +
  `\n\t\tНеделя Закхея: ${new Date(
    dataPashiNext.getTime() - 864e5 * 7 * 11
  ).toDateString()}` +
  `\n\t\t   Неделя МИФ: ${new Date(
    dataPashiNext.getTime() - 864e5 * 7 * 10
  ).toDateString()}` +
  `\n\t\t   Неделя ОБС: ${new Date(
    dataPashiNext.getTime() - 864e5 * 7 * 9
  ).toDateString()}` +
  `\n\t\tПрощенное ВСК: ${new Date(
    dataPashiNext.getTime() - 864e5 * 7 * 7
  ).toDateString()}` +
  `\n\t\t    Начало ВП: ${new Date(
    dataPashiNext.getTime() - 864e5 * 7 * 7 + 864e5
  ).toDateString()}\n\n\n\n\n`
);

// flag
let promWeek = 0;

/**
 * Высчитывает количество ступок,
 * Возвращает положительно число для Воздвиженской отступки, или отрицательное для преступки.
 *
 * @returns number
 */
function otstupkaVozdvijjenie() {
  // Функция определяет Воздвиженскую отступку.

  // Дата воздвижения, 27 сентября по Григорианскому календарю.
  // или 14 сентября по Юлианскому календарю.

  /**
   * Дата Воздвижения.
   */
  timeBoxVozdvijjenie = new Date(dataPashi.toString().slice(11, 15), 8, 27);

  /**
   *   Высчитываем номер седмицы для праздника Воздвижения по Пасхе.
   */
  sedmicaVozdvijjenie =
    Math.trunc((timeBoxVozdvijjenie - dataPashi) / 864e5 / 7) - 6;

  // Высчитываем ступку Воздвижения (может быть отступкой и преступкой).
  stupka = -(sedmicaVozdvijjenie - 17);

  // Проверяем  полное совпадение с 17 седмицей и было ли Воздвижения.
  if (sedmicaVozdvijjenie == 17 && sedmica > sedmicaVozdvijjenie) {
    return 0;
  }

  return stupka;
}

if (mondayAfterVozdviggenie()) {

  var sedmica = sedmica + otstupkaVozdvijjenie();
  var sedmicaNorm = sedmica - otstupkaVozdvijjenie();

  // IMPORTANT: Если нужно вывести на странице седмицы читаемые c учетом ступок, тогда заменить переменную `sedmica`  на `sedmicaStupka`

  //   alert(`mondayAfterVozdviggenie()`)
}

// конкатенация сегмента URL с учетом ступок
var sedDayStupka = sedmica + "" + ul_numDay;
/*
 * Сборка ссылки на id-элемент текущего дня c учетом Воздвиженской преступки
 * ----------------------------------------
 */

if (sedmica > 40 && intermediateWeeks != 0) {
  promWeek = 1;
  var sedDayStupka = sedmica - intermediateWeeks + "" + ul_numDay;

  // Изменяем `sedDay` с учетом отступок и преступок

  linkToAprakos = "/" + yearMonthPath(sedDayStupka) + sedDayStupka + ".html";

  linkToCurrentSeed =
    '<a href="' +
    "#seed" +
    sedmica +
    '"' +
    ' title="Сегодня : ' +
    massDays[ul_numDay] +
    '">' +
    sedmica +
    "</a>";

  console.log(`\n\n\n\t\tСтраница Апракоса-Евангелия с учетом отступки и промежуточных седмиц:
${location.host}${linkToAprakos}`);
}

/**
 * Функция добавляет текстовую мметку (или иную) для отображаемых на сайте промежуточных седмиц.
 */
// S:S // Добавить условие ВЫКЛючение отступки для двунадесятых праздников. 433-2021-333
function promWeeks() {
  var per = document
    .getElementById("apracos-dolu")
    .children[0].getAttribute("kpage");

  if (promWeek == 1 && per != "12") {
    var labelOfintermediateWeeks = document.getElementsByClassName("name");
    labelOfintermediateWeeks[0].firstChild.innerHTML += " согла~снw Tсту~пке";
  }
}

var nineHoliday = theMomentTime.getMonth() + ", " + theMomentTime.getDate();

for (const item in NINEHOLIDAYS) {
  // Проверка на двунадесятые праздники и комплектация ссылки на день праздника.
  if (
    nineHoliday != "7, 28" &&
    nineHoliday == NINEHOLIDAYS[item].month + ", " + NINEHOLIDAYS[item].day
  ) {
    promWeek = 9;
    linkToAprakos =
      "/" +
      NINEHOLIDAYS[item].year +
      "/" +
      NINEHOLIDAYS[item].monthRU +
      "/" +
      theMomentTime.getDate() +
      ".html";
    console.warn("Сегодня двунадесятый праздник… ", nineHoliday);
  }

  if (nineHoliday == "7, 28") {
    // FIXME: этот блок добавлен из-за нарушения последовательности страниц. Для исправления нужно перенести страницу Успение Богородицы на 2023 год с адресом 2023/08/28 на blogspot.com и справить в массиве двунадесятых праздников год на 2023, или на тот год в котором будет опубликована страница.
    promWeek = 9;
    linkToAprakos = "/2021/09/uspenie.html";
  }
}

/*
    Триггер класса seeddayON
    -------------------------
    */
function seeddayON() {
  per2 = stupka ? stupka : 0;

  linkToCurrentSeed = "";
  if (sedmica < 40) {
    linkToCurrentSeed =
      '<a href="' +
      ("#seed" + sedmica + '"') +
      ' title="Сегодня : ' +
      massDays[ul_numDay] +
      '">' +
      sedmica;
  } else {
    linkToCurrentSeed =
      '<a href="' +
      ("#seed" + (sedmica - intermediateWeeks) + '"') +
      ' title="Сегодня : ' +
      massDays[ul_numDay] +
      '">' +
      sedmica;
  }
  document.getElementById("date2").innerHTML = linkToCurrentSeed;

  //  формирование id элемента для выделения цветом
  var a = "seedday-" + sedmica + "-" + ul_numDay;

  if (sedmica > 39 && intermediateWeeks != 0) {
    var a = "seedday-" + (sedmica - intermediateWeeks) + "-" + ul_numDay;
  }

  try {
    var rrrrrr = (document.getElementById(a).className += "ON");
  } catch (error) {
    // alert('Сработало исключение : ' + error.stack + " для элемента " + b);
    document.getElementById("date4").innerHTML =
      "Отсутствуют данные текущей седмицы";
  }

  return a;
}

/**
 * Переместите строку ниже в функцию `seedON` и получите ссылки на ступки только со ствола. `Index.htm`l будет ссылаться на рядовое зачало без ступок.
 */
if (promWeek != 9) {
  linkToAprakos = "/" + yearMonthPath(sedDayStupka) + sedDayStupka + ".html";
}

function seedON() {
  // Включает оформление (выделение) текущей седмицы добавляя класс `colorBlock`
  var a = "seed" + sedmica;

  if (sedmica < 40) {
    a = "seed" + sedmica;
  } else {
    a = "seed" + (sedmica - intermediateWeeks);
  }

  var b = (document.getElementById(a).className += " colorBlock");
  // document.getElementsByClassName("colorBlock")[0].style.border = "3px";

  if (stupka != 0 && sedmica > 39) {
    document.getElementById(a).className += " promWeek";
  }

  if (promWeek != 0 || sedmica < 0) {
    document.getElementsByClassName("colorBlock")[0].style.backgroundColor =
      "#d5d5d5";
  }

  return a;
}

var sedmicaPyatidesyatnice = undefined;
var glas = undefined;

/**
 *  Возращает гласс по Октоиху для текущей седмицы.
 *
 * @param {*} sedmica
 * @returns number
 */
function glasSedmici(sedmica) {
  glasSedmici = {
    1: 8,
    2: 1,
    3: 2,
    4: 3,
    5: 4,
    6: 5,
    7: 6,
    8: 7,
    9: 8,
    10: 1,
    11: 2,
    12: 3,
    13: 4,
    14: 5,
    15: 6,
    16: 7,
    17: 8,
    18: 1,
    19: 2,
    20: 3,
    21: 4,
    22: 5,
    23: 6,
    24: 7,
    25: 8,
    26: 1,
    27: 2,
    28: 3,
    29: 4,
    30: 5,
    31: 6,
    32: 7,
    33: 8,
    34: 1,
    35: 2,
    36: 3,
    37: 4,
    38: 5,
    39: 6,
    40: 7,
    41: 8,
    42: 1,
    43: 2,
    44: 3,
    45: 4,
    46: 5,
    47: 6,
    48: 7,
    49: 8,
    50: 1,
    51: 2,
    52: 3,
    53: 4,
    54: 5,
    55: 6,
    56: 7,
    57: 8,
    58: 1,
    59: 2,
    60: 3,
    61: 4,
    62: 5,
    63: 6,
    64: 7,
    65: 8,
  };

  if (sedmica) {
    return glasSedmici[sedmica];
  } else return "невнятный";
}

/**
 * Корретирует аргумент седмицы по Пятидесятнице.
 * Обновляет элементы `html`.
 */
function seedPyatidesyatnica() {
  var seedIn = "";
  if (sedmica > 39) {
    per4 = intermediateWeeks;
    // простая активация seedON()
    seedON();
    seedIn = "seed" + (sedmica - intermediateWeeks);
  } else {
    per4 = stupka ? stupka : 0;
    seedIn = seedON();
  }
  if (sedmica > 7) {
    sedmicaPyatidesyatnice = sedmica - 7;
    document.getElementById("date3").innerHTML = "По Пятидесятнице";
    document.getElementById("date4").innerHTML =
      '<a href="' + "#" + seedIn + '">' + sedmicaPyatidesyatnice + "</a>";
    glas = glasSedmici(sedmicaNorm);
    document.getElementById("date5").innerHTML = "Глас " + glas;
  } else {
    glas = glasSedmici(sedmica);
    sedmicaPyatidesyatnice =
      "Глас " +
      glas +
      "<br>" +
      " Сейчас идет счет седмиц от Пасхи до Пятидесятницы. ";
    // linkToAprakos = "/" + yM + sedDay + '.html';

    if (sedmica <= 39) {
      document.getElementById("date3").className += "PlusUngles";
      document.getElementById("date3").innerHTML = sedmicaPyatidesyatnice;
      document.getElementById("date4").className += "blockOFF";
    }
  }
}

function zakheyTime() {
  var dateZakhey = new Date(dataPashiNext.getTime() - (864e5 * 7 * 11 + 1000));
  if (theMomentTime < dateZakhey) {
    otstupkaK23Sedmice = 9;
    return true;
  } else {
    console.log(`${intermediateWeeks}`);
    return false;
  }
}

function mifTime() {
  var dateMiF = new Date(dataPashiNext.getTime() - 864e5 * 7 * 10);
  if (theMomentTime < dateMiF) {
    otstupkaK23Sedmice = 10;
    console.log(dateMiF);
    return true;
  } else {
    false;
  }
}

/**
Ссылка на текущий день Апракоса без учета двунадесятых празнеств.
 */
backToRowAprakos = `
  /${yearMonthPath(sedDay)}${sedDay}.html
`;

/**
 * Функция замены слова при выдаче результатов в поиске.
 */
function replaceSearchContent() {
  let getTextOfElement = document.querySelector(
    ".post-filter-message"
  ).innerHTML;
  newText = "Есть ответы";

  if (document.querySelector(".no-posts-message") != null) {
    newText = "Отсутствуют результаты";
  }

  document.querySelector(".post-filter-message").innerHTML =
    getTextOfElement.replace("Показаны сообщения", newText);
}

// После полной загрузки документа
document.addEventListener(
  "DOMContentLoaded",
  function () {
    getElement = document.querySelector(".post-filter-message");
    if (getElement != null) {
      replaceSearchContent();
    }
  },
  true
);

// if (document.readyState !== 'loading') {
//    us_clickInterception();
//  } else {
//    document.addEventListener('DOMContentLoaded', us_clickInterception);
//  }

//  function us_clickInterception() {
//    var links = document.querySelectorAll('a');
//    Array.prototype.forEach.call(links, function (link) {
//      link.addEventListener('click', function () {
//        /* здесь пишем нужное действие */
//       alert('РАБОТАЕТ ПЕРЕОПРЕДЕЛЕНИЕ…');
//      });
//    });
//  }

reversePack = true;

if (localStorage.ystm === undefined) {
  setLocalStorage();
}

var lastSegment = location.pathname.split("/");
lastSegment = lastSegment[lastSegment.length - 1];

// Установка в хранилище свойств CSS для модального окна
function setLocalStorage() {
  localStorage.ystm = JSON.stringify({
    entries: null,
    reversePack: true,
    timerOff: 0,
    visibility: "visible",
    lastSegment: lastSegment,
  });
}
// Вызов модального окна первый раз после полной загрузки страницы
if (
  (lastSegment == "stvol.html") &
  (JSON.parse(localStorage.ystm).entries == null)
) {
  document.addEventListener(
    "DOMContentLoaded",
    () => {
      firstPreview();
    },
    false
  );
}

// Показ стартового модального окна
const closeClick = '<span id="close" class="close" onclick="closeFP00()">+</span>';
const commentStvol =
  "<span class='comment-stvol'>В стволе указаны читаемые седмицы с учетом ступок.<br> Подробнее<a class='a-href' href='https://www.aprakos.ru/p/blog-page.html'> здесь</a>.</div>";

function firstPreview() {
  // instalLocalStorage();
  str = `
        <section id="fp-content" class="fp-content">
        <b>Текущая седмица:</b>
        <div>по Пасхе&nbsp; <span class="red bold">${sedmicaNorm},</span></div>
        <div>по Пять&shy;десят&shy;нице <span class="red bold">
        ${sedmicaNorm - 7}.</span>
        <div>${lastSegment === "stvol.html" ? commentStvol : ""}</div></div>
        <div>${lastSegment === "blog-post.html" ? `Отступка <span class="red bold">${stupka}</span> седм.` : ""}</div></div>
        ${closeClick}
        </section>
        `;

  fp = document.getElementById("first-preview").innerHTML = str;
  document.querySelector("#fp00").classList.add("fp00");
  document.querySelector("#first-preview").classList.add("fp01");
  reversePack = false;

  timerOff = setTimeout(() => {
    closeFP00();
    alert(
      "\n Долгое отсутствие увеличивает расстояние разлуки."
    );
  }, 3600000);
  // return { fp, reversePack };
}

// Закрытие модального окна
function closeFP00() {
  localStorage.ystm = JSON.stringify({
    entries: 1,
    opasity: 0,
    visibility: "hidden",
  });
  document.querySelector("#fp00").classList.remove("fp00");
  document.querySelector("#first-preview").classList.remove("fp01");
  // Removed items
  document.querySelector("#close").outerHTML = '<!-- Will embed element-->';
  document.querySelector("#fp-content").outerHTML = '<!-- Will embed element-->';
  doubleClick700 = "";
  reversePack = true;
  clearTimeout(timerOff);
}

doubleClick700 = "";
// Прослушивание нажатий клавиатуры
document.addEventListener("keyup", function (event) {
  if (event.code == "F2" || event.key == "Shift") {
    doubleClick700 += event.code + "";
    setTimeout(() => {
      doubleClick700 = "";
    }, 700);
    console.log(doubleClick700);
  }

  const state = doubleClick700 == event.code + event.code;
  console.log(state);
  if (state && reversePack) {
    firstPreview();
  } else if (state && !reversePack) {
    closeFP00();
  }

  if (event.code === "Escape") {
    closeFP00();
  }
});

// rrr = document.getElementById('#first-preview');
// if (rrr) {
//   rrr.addEventListener('click', () => {
//     console.log("CLICK-CLACK")
//   });
// }
// else { console.log('=========================='); }
