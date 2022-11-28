// четверг, 24 ноября 2022 г. 23: 00: 39(MSK)
// segment – это часть адреса `url` между двумя слешами.
segment = document.URL.split('/');
all_seg = segment.length;
monthM = segment[all_seg - 3]; // month of segment
ul_numDay = "" + segment[all_seg - 2].slice(0, 2).replace(/^0+/, ''); // date
grg_numDay = "" + segment[all_seg - 2].slice(2).replace(/^0+/, ''); // date

month_ru = {
	"JAN": "января",
	"FEB": "февраля",
	"MAR": "марта",
	"APR": "апреля",
	"MAY": "мая",
	"JUN": "июня",
	"JUL": "июля",
	"AUG": "августа",
	"SEP": "сентября",
	"OCT": "октября",
	"NOV": "ноября",
	"DEC": "декабря",
}

gitie = document.querySelector('.name').innerText;

if (!ul_numDay) {
	b =
		document.title = `Юл. ${ul_numDay} ${month_ru[monthM]}, Жития святых: ${gitie}`;
} else {
	b2 = document.title = `${gitie}`;
}
