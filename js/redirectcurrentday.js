var mn = new Array(

	'JAN', 'FEB', 'MAR',
	'APR', 'MAY', 'JUN',
	'JUL', 'AUG', 'SEP',
	'OCT', 'NOV', 'DEC'

);

var mnn = new Array(

	'31', '28', '31',
	'30', '31', '30',
	'31', '31', '30',
	'31', '30', '31'

);

var mnl = new Array(

	'31', '29', '31',
	'30', '31', '30',
	'31', '31', '30',
	'31', '30', '31'

);

d = new Date();
td = d.getDate();
if (td < 10) {
	td = "0" + td;
}
tm = d.getMonth();
ty = d.getYear();
marr = ((ty % 4) == 0) ? mnl : mnn;

	if (tm == 0 && td <= 13) {
		mm = 11;
		ss = marr[mm] - (13 - td);
	}
	else if (tm > 0 && td <= 13) {
		mm = tm - 1;
		ss = marr[mm] - (13 - td);
	}
	else {
		mm = tm;
		ss = (td - 13);
	}

	if (ss < 10) { dd = '0' + ss; }
	else { dd = ss; }

//document.writeln(mn[mm]);

location.replace(mn[mm] + "/" + dd + td + "/" + "index.html");
