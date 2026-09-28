"use strict";
class OLY {
    get debug() { return this._debug; }
    set debug(v) {
        this._debug = v;
        try {
            if (v)
                localStorage.setItem('apr_debug', '1');
            else
                localStorage.removeItem('apr_debug');
        }
        catch (_a) { }
    }
    static setDebug(on) {
        try {
            if (on)
                localStorage.setItem('apr_debug', '1');
            else
                localStorage.removeItem('apr_debug');
        }
        catch (_a) { }
        console.log('%c[OLY] setDebug -> ' + on + ' (apr_debug=' +
            (() => { try {
                return localStorage.getItem('apr_debug');
            }
            catch (_a) {
                return 'n/a';
            } })() +
            '), перезагрузка…', 'background:#9cf;color:#000;padding:2px 4px');
        setTimeout(() => document.location.reload(), 50);
    }
    constructor(year) {
        var _a, _b;
        this.year = year;
        this.theMoment = new Date();
        this.offsetZone = this.theMoment.getTimezoneOffset() * 60000;
        this.theMomentOffsetZone = new Date(this.theMoment.getTime() - this.offsetZone);
        this.theMomentTime = new Date();
        this.anchorElemID = '#11';
        this.stateModalView = false;
        this._debug = (() => {
            try {
                return localStorage.getItem('apr_debug') === '1';
            }
            catch (_a) {
                return false;
            }
        })();
        this.arrayDaysRu = [
            'ВОСРЕСЕНЬЕ', 'ПОНЕДЕЛЬНИК', 'ВТОРНИК', 'СРЕДА', 'ЧЕТВЕРГ', 'ПЯТНИЦА', 'СУББОТА',
        ];
        this.weeks = {};
        this.easterDates = {
            1998: [3, 19], 1999: [3, 11], 2000: [3, 30], 2001: [3, 15],
            2002: [4, 5], 2003: [3, 27], 2004: [3, 11], 2005: [4, 1],
            2006: [3, 23], 2007: [3, 8], 2008: [3, 27], 2009: [3, 19],
            2010: [3, 4], 2011: [3, 24], 2012: [3, 15], 2013: [4, 5],
            2014: [3, 20], 2015: [3, 12], 2016: [4, 1], 2017: [3, 16],
            2018: [3, 8], 2019: [3, 28], 2020: [3, 19], 2021: [4, 2],
            2022: [3, 24], 2023: [3, 16], 2024: [4, 5], 2025: [3, 20],
            2026: [3, 12], 2027: [4, 2], 2028: [3, 16], 2029: [3, 8],
            2030: [3, 28], 2031: [3, 13], 2032: [4, 2], 2033: [3, 24],
            2034: [3, 9], 2035: [3, 29], 2036: [3, 20], 2037: [3, 5],
            2038: [3, 25], 2039: [3, 17], 2040: [4, 6], 2041: [3, 21],
            2042: [3, 13], 2043: [4, 3], 2044: [3, 24], 2045: [3, 9],
            2046: [3, 29], 2047: [3, 21], 2048: [3, 5], 2049: [3, 25],
            2050: [3, 17], 2051: [4, 7], 2052: [3, 21], 2053: [3, 13],
            2054: [4, 3], 2055: [3, 18], 2056: [3, 9], 2057: [3, 29],
            2058: [3, 14], 2059: [4, 4], 2060: [3, 25], 2061: [3, 10],
            2062: [3, 30], 2063: [3, 22], 2064: [3, 13], 2065: [3, 26],
            2066: [3, 18], 2067: [3, 10], 2068: [3, 29], 2069: [3, 14],
            2070: [4, 4], 2071: [3, 19], 2072: [3, 10], 2073: [3, 30],
            2074: [3, 22], 2075: [3, 7], 2076: [3, 26], 2077: [3, 18],
            2078: [4, 8], 2079: [3, 23], 2080: [3, 14], 2081: [4, 4],
            2082: [3, 19], 2083: [3, 11], 2084: [3, 30], 2085: [3, 15],
            2086: [3, 7], 2087: [3, 27], 2088: [3, 18], 2089: [4, 1],
            2090: [3, 23], 2091: [3, 8], 2092: [3, 27], 2093: [3, 19],
            2094: [3, 11], 2095: [3, 24], 2096: [3, 15], 2097: [4, 5],
            2098: [3, 27], 2099: [3, 12], 2100: [4, 2], 2101: [3, 24],
        };
        this.NINEHOLIDAYS = {
            rojdestvoBogorodici: { year: 2021, month: 8, day: 21, monthRU: '09' },
            vozdvizgenieKresta: { year: 2020, month: 8, day: 27, monthRU: '09' },
            vvedenieVoHram: { year: 2020, month: 11, day: 4, monthRU: '12' },
            rojdestvoXristovo: { year: 2021, month: 0, day: 7, monthRU: '01' },
            kreshenieGospodne: { year: 2021, month: 0, day: 19, monthRU: '01' },
            sretenieGospodne: { year: 2021, month: 1, day: 15, monthRU: '02' },
            blagoveshenieBogorodici: { year: 2021, month: 3, day: 7, monthRU: '04' },
            preobrajjenieGospodne: { year: 2021, month: 7, day: 19, monthRU: '08' },
            uspenieBogorodici: { year: 2021, month: 7, day: 28, monthRU: '08' },
        };
        this.datesOLY = {};
        console.log('%c[OLY] экземпляр создан. debug=' + this.debug +
            ' | apr_debug=' +
            (() => { try {
                return localStorage.getItem('apr_debug');
            }
            catch (_a) {
                return 'n/a';
            } })() +
            ' | userDate=' + ((_a = sessionStorage.getItem('userDate')) !== null && _a !== void 0 ? _a : '—'), 'background:#9cf;color:#000;padding:2px 4px');
        this.theMomentTime = this.controlDates(year);
        this.initOLY();
        this.initDatesOLY();
        this.initWeeks();
        this.linkToAprakos = '/' + this.yearMonthID() + '.html';
        this.anchorElemID = '' + this.weeks.current[0];
        this.linkToHolydays = (_b = this.holydays_9()) !== null && _b !== void 0 ? _b : this.linkToAprakos;
        if (this.debug)
            this.dumpVozdvizhenie();
        this.initElementsDOM();
        this.firstViewModal();
        this.eventKeys();
        this.reloadAprakosPage();
    }
    compareCalendarDays(a, b) {
        const ay = a.getFullYear(), am = a.getMonth(), ad = a.getDate();
        const by = b.getFullYear(), bm = b.getMonth(), bd = b.getDate();
        if (ay !== by)
            return ay < by ? -1 : 1;
        if (am !== bm)
            return am < bm ? -1 : 1;
        if (ad !== bd)
            return ad < bd ? -1 : 1;
        return 0;
    }
    initOLY() {
        const yearNumber = this.theMomentTime.getFullYear();
        if (this.theMomentTime >=
            new Date(Date.UTC(this.theMomentTime.getFullYear(), this.easterDates[yearNumber][0], this.easterDates[yearNumber][1]))) {
            this.oldEaster = new Date(Date.UTC(this.theMomentTime.getFullYear(), this.easterDates[yearNumber][0], this.easterDates[yearNumber][1]));
            this.newEaster = new Date(Date.UTC(this.theMomentTime.getFullYear() + 1, this.easterDates[yearNumber + 1][0], this.easterDates[yearNumber + 1][1]));
        }
        else {
            this.oldEaster = new Date(Date.UTC(this.theMomentTime.getFullYear() - 1, this.easterDates[yearNumber - 1][0], this.easterDates[yearNumber - 1][1]));
            this.newEaster = new Date(Date.UTC(this.theMomentTime.getFullYear(), this.easterDates[yearNumber][0], this.easterDates[yearNumber][1]));
        }
        this.oldEasterMLS = this.oldEaster.getTime();
        this.newEasterMLS = this.newEaster.getTime();
        return true;
    }
    ruday() {
        const days = ['Воскресенье', 'Понедельник', 'Вторник', ' Среда', 'Четверг', 'Пятница', 'Суббота'];
        return days[this.theMomentTime.getDay()];
    }
    initWeeks() {
        this.weeks['day'] = [
            this.theMomentTime.getDay() + 1,
            'День седмицы',
            ' … ' + this.ruday(),
        ];
        const all = (this.weeks['all'] = [
            Math.ceil((this.newEasterMLS - this.oldEasterMLS) / 864e5 / 7),
            'Протяженность ПБГ',
            'седм.',
        ]);
        const current = (this.weeks['current'] = [
            Math.ceil((this.theMomentTime.getTime() - this.offsetZone - this.oldEasterMLS) /
                864e5 /
                7),
            'Текущая седмица',
        ]);
        if (current[0] == 0 || current[0] > 55) {
            this.weeks['current'][0] = 1;
        }
        this.weeks['mif2'] = [
            Math.ceil((this.datesOLY.pip[0].getTime() -
                (this.datesOLY.pentecost[0].getTime() + 864e5 * 7)) /
                864e5),
            'Петров пост',
            'дн.',
        ];
        this.weeks['zakhey'] = [all[0] - 10, 'Седмица Закхея по Пасхе'];
        this.weeks['mif'] = [all[0] - 9, 'Седмица МиФ по Пасхе'];
        const vozdvizgenie = (this.weeks['vozdvizgenie'] = [
            Math.floor((this.datesOLY.vozdvizgenieKresta[0].getTime() - this.oldEasterMLS) /
                864e5 /
                7) + 1,
            'Седмица Воздвижения по Пасхе',
        ]);
        let stupkaV = (this.weeks['stupkaV'] = [
            Math.ceil((this.datesOLY.week24[0].getTime() - this.oldEasterMLS) / 864e5 / 7) - vozdvizgenie[0],
            'Воздвиженская ступка',
            'седм.',
        ]);
        let stupkaK = (this.weeks['stupkaK'] = [
            Math.abs(all[0] - 50 - -stupkaV[0]),
            'Крещенская отступка',
            'седм.',
        ]);
        this.correctorStupka();
        return this.weeks;
    }
    mondayAfterVozdvizgenie() {
        const v = this.datesOLY.vozdvizgenieKresta[0];
        const day = v.getDay();
        const daysUntilMonday = ((8 - day) % 7) || 7;
        const monday = new Date(v.getFullYear(), v.getMonth(), v.getDate() + daysUntilMonday);
        return this.compareCalendarDays(this.theMomentTime, monday) >= 0;
    }
    isVozdvizhenieOnSunday() {
        return this.datesOLY.vozdvizgenieKresta[0].getDay() === 0;
    }
    initDatesOLY() {
        this.datesOLY['voznesenie'] = [
            new Date(this.oldEasterMLS + 864e5 * 39),
            'Вознесение Христово',
        ];
        this.datesOLY['pentecost'] = [
            new Date(this.oldEasterMLS + 864e5 * 49),
            'Пятьдесятница',
        ];
        this.datesOLY['pip'] = [
            new Date(this.oldEaster.getFullYear() + '-07-12T00:00:00'),
            'Петра и Павла',
        ];
        this.datesOLY['vozdvizgenieKresta'] = [
            new Date(Date.UTC(this.oldEaster.getFullYear(), 8, 27)),
            'Воздвижение Креста Господня',
        ];
        this.datesOLY['week24'] = [
            new Date(this.oldEasterMLS + 864e5 * 168),
            '17/24 седмица по Пасхе',
        ];
        this.datesOLY['zakhey'] = [
            new Date(this.newEasterMLS - 864e5 * 77),
            'Неделя Закхея',
        ];
        this.datesOLY['mif'] = [
            new Date(this.newEasterMLS - 864e5 * 70),
            'Неделя МиФ',
        ];
        this.datesOLY['aboutTheProdigalSon'] = [
            new Date(this.newEasterMLS - 864e5 * 63),
            'Неделя о блудном сыне',
        ];
        this.datesOLY['aboutTheLastJudgment'] = [
            new Date(this.newEasterMLS - 864e5 * 56),
            'Неделя о страшном суде',
        ];
        this.datesOLY['aboutTheAdamsExile'] = [
            new Date(this.newEasterMLS - 864e5 * 49),
            'Неделя Адамова изгнания',
        ];
        this.datesOLY['theBeginningOfLent'] = [
            new Date(this.newEasterMLS - 864e5 * 48),
            'Начало Великого Поста',
        ];
        this.datesOLY['CrossSunday'] = [
            new Date(this.newEaster - 864e5 * 28),
            'Неделя Крестопоклонная',
        ];
        return this.datesOLY;
    }
    controlDates(userYear) {
        var _a, _b, _c;
        let currentDate = this.theMomentTime;
        let sStorageDate = sessionStorage.getItem('userDate');
        if (sessionStorage.userDate != null && userYear == undefined) {
            currentDate = new Date(Number(sessionStorage.getItem('userDate')));
        }
        else if (userYear != undefined &&
            userYear[0] < 2100 &&
            userYear[0] >= 1999) {
            currentDate = new Date(Date.UTC(userYear[0], (_a = userYear[1]) !== null && _a !== void 0 ? _a : currentDate.getMonth(), Number((_b = userYear[2]) !== null && _b !== void 0 ? _b : currentDate.getDate())));
            sessionStorage.setItem('userDate', String(currentDate.getTime()));
            location.reload();
        }
        else {
            console.info(`${userYear
                ? 'Формат введенный пользователем не подходит… попробуйте ([2099,0,7])'
                : 'Год пользователем не предоставлен…'}.\nБудет использован текущий год.\nСПАСИБО ЗА ВНИМАНИЕ!`);
        }
        if (currentDate != this.theMomentTime) {
            (_c = document.querySelector('#userdate')) === null || _c === void 0 ? void 0 : _c.remove();
            document.body.insertAdjacentHTML('beforeend', `<div id="userdate" class='userdate'><a id='a-visited-userdate' href="#" onclick="apr.deleteUserDateFromSessionStorage()">${currentDate.toLocaleDateString()}</a></div>`);
        }
        return currentDate;
    }
    info() {
        for (const key in this.datesOLY) {
            if (Object.prototype.hasOwnProperty.call(this.datesOLY, key)) {
                const element = this.datesOLY[key];
                console.log(element[1] + ' | ' + element[0].toLocaleDateString());
            }
        }
        for (const key in this.weeks) {
            if (Object.prototype.hasOwnProperty.call(this.weeks, key)) {
                const element = this.weeks[key];
                console.log(element[1] + ' | ' + element[0]);
            }
        }
    }
    getAllById(id) {
        const els = document.querySelectorAll('#' + id);
        return Array.from(els);
    }
    addClassToAll(id, cls) {
        const els = this.getAllById(id);
        for (const el of els)
            el.classList.add(cls);
        return els.length;
    }
    removeClassFromAll(id, cls) {
        const els = this.getAllById(id);
        for (const el of els)
            el.classList.remove(cls);
        return els.length;
    }
    setStyleOnAll(id, prop, val) {
        const els = this.getAllById(id);
        for (const el of els)
            el.style.setProperty(prop, val);
        return els.length;
    }
    findDayCell(week, day) {
        const patterns = [
            'weekday' + week + day,
            'weekday' + week + '_' + day,
            'weekday' + week + '-' + day,
            'weekday' + week + '0' + day,
        ];
        for (const p of patterns) {
            const els = this.getAllById(p);
            if (els.length > 0)
                return els;
        }
        const weekRow = document.getElementById('week' + week);
        if (weekRow) {
            const prefix = 'weekday' + week;
            const candidates = [];
            const walk = (node) => {
                if (!node)
                    return;
                for (const c of Array.from(node.children)) {
                    const id = c.id || '';
                    if (id.startsWith(prefix) && id.endsWith(String(day))) {
                        candidates.push(c);
                    }
                    walk(c);
                }
            };
            walk(weekRow);
            if (candidates.length > 0)
                return candidates;
        }
        const anyWeekDay = document.querySelectorAll('[id^="weekday' + week + '"]');
        const matching = [];
        for (const el of Array.from(anyWeekDay)) {
            const id = el.id;
            const tail = id.slice(('weekday' + week).length);
            if (tail.replace(/[^0-9]/g, '') === String(day)) {
                matching.push(el);
            }
        }
        return matching;
    }
    dumpWeekCells(week) {
        const prefix = 'weekday' + week;
        const all = Array.from(document.querySelectorAll('[id^="' + prefix + '"]'));
        console.log('%c[OLY] все id, начинающиеся на "' + prefix + '":', 'background:#9cf;color:#000;padding:2px 4px');
        if (all.length === 0) {
            console.log('  (ничего не найдено)');
            return;
        }
        for (const el of all) {
            const e = el;
            console.log('  #' + e.id + ' | tag=' + e.tagName + ' | class=' + e.className);
        }
    }
    reportDOMCells() {
        const w0 = this.weeks.evnglElemID[0];
        const w1 = this.weeks.apstlElemID[0];
        const weeks = new Set();
        for (let w = Math.min(w0, w1) - 2; w <= Math.max(w0, w1) + 2; w++) {
            if (w >= 1 && w <= 55)
                weeks.add(w);
        }
        console.log('%c[OLY] проверка ячеек stvol.html', 'background:#9cf;color:#000;padding:2px 4px');
        for (const w of Array.from(weeks).sort((a, b) => a - b)) {
            const parts = [];
            for (let d = 1; d <= 7; d++) {
                const els = this.getAllById('weekday' + w + d);
                parts.push('d' + d + (els.length === 0 ? '·' : els.length > 1 ? String(els.length) : '+'));
            }
            const weekCell = this.getAllById('week' + w).length;
            console.log('  week ' + String(w).padStart(2) + ' : ' +
                parts.join(' ') + ' | week=' + (weekCell === 0 ? '·' : weekCell > 1 ? String(weekCell) : '+'));
        }
    }
    dumpVozdvizhenie() {
        var _a, _b, _c, _d, _e, _f, _g;
        const v = this.datesOLY.vozdvizgenieKresta[0];
        const m = new Date(v.getFullYear(), v.getMonth(), v.getDate() + (((8 - v.getDay()) % 7) || 7));
        const t = this.theMomentTime;
        const rows = [
            ['today', t.toLocaleDateString() + ' | getDay=' + t.getDay()],
            ['vozdvizhenie', v.toLocaleDateString() + ' | getDay=' + v.getDay() + ' | onSunday=' + this.isVozdvizhenieOnSunday()],
            ['monday after', m.toLocaleDateString() + ' | getDay=' + m.getDay()],
            ['mondayAfter()', this.mondayAfterVozdvizgenie()],
            ['weeks.vozdvizgenie', (_a = this.weeks.vozdvizgenie) === null || _a === void 0 ? void 0 : _a[0]],
            ['weeks.week24', this.datesOLY.week24[0].toLocaleDateString()],
            ['weeks.stupkaV[0]', (_b = this.weeks.stupkaV) === null || _b === void 0 ? void 0 : _b[0]],
            ['stupkaVozdvizjenia()', this.stupkaVozdvizjenia()],
            ['stupkaN()', this.stupkaN()],
            ['stupka()', this.stupka()],
            ['current[0]', (_c = this.weeks.current) === null || _c === void 0 ? void 0 : _c[0]],
            ['apstlElemID', (_d = this.weeks.apstlElemID) === null || _d === void 0 ? void 0 : _d[0]],
            ['evnglElemID', (_e = this.weeks.evnglElemID) === null || _e === void 0 ? void 0 : _e[0]],
            ['aprID', (_f = this.weeks.aprID) === null || _f === void 0 ? void 0 : _f[0]],
            ['day', (_g = this.weeks.day) === null || _g === void 0 ? void 0 : _g[0]],
        ];
        console.log('%c[OLY] Воздвиженская ступка — дамп', 'background:#9cf;color:#000;padding:2px 4px');
        for (const [k, val] of rows) {
            console.log('  ' + k.padEnd(22) + ' : ' + val);
        }
        let panel = document.getElementById('oly-debug-panel');
        if (!panel) {
            panel = document.createElement('pre');
            panel.id = 'oly-debug-panel';
            panel.setAttribute('style', 'position:fixed;left:8px;bottom:8px;max-width:calc(100vw - 16px);' +
                'max-height:40vh;overflow:auto;z-index:99999;' +
                'background:#eef6ff;color:#000;border:2px solid #39f;' +
                'border-radius:6px;padding:8px 10px;font:12px/1.35 monospace;' +
                'box-shadow:0 4px 12px rgba(0,0,0,.25)');
            document.body.appendChild(panel);
        }
        panel.textContent =
            '[OLY] отладка (apr.debug = true)\n' +
                rows.map(([k, val]) => '  ' + String(k).padEnd(22) + ' : ' + val).join('\n');
    }
    yearMonthID() {
        var apostolElemID = this.weeks.current[0] > 40
            ? this.weeks.current[0] + this.stupka()
            : this.weeks.current[0];
        var evangelieElemID = this.weeks.current[0] + this.stupka();
        let aprID = Number('' + evangelieElemID + this.weeks.day[0]);
        let partURL;
        switch (true) {
            case aprID <= 25:
                partURL = '2020/04/' + aprID;
                break;
            case aprID <= 71:
                partURL = '2020/05/' + aprID;
                break;
            case aprID <= 113:
                partURL = '2020/06/' + aprID;
                break;
            case aprID <= 156:
                partURL = '2020/07/' + aprID;
                break;
            case aprID <= 202:
                partURL = '2020/08/' + aprID;
                break;
            case aprID <= 244:
                partURL = '2020/09/' + aprID;
                break;
            case aprID <= 287:
                partURL = '2020/10/' + aprID;
                break;
            case aprID <= 332:
                partURL = '2020/11/' + aprID;
                break;
            case aprID <= 375:
                partURL = '2020/12/' + aprID;
                break;
            case aprID <= 407:
                partURL = '2021/01/' + aprID;
                break;
            case aprID <= 421:
                partURL = '2021/02/' + aprID;
                break;
            case aprID <= 472:
                partURL = '2021/03/' + aprID;
                break;
            case aprID <= 507:
                partURL = '2021/04/' + aprID;
                break;
            case aprID <= 517:
                partURL = '2021/05/' + aprID;
                break;
            default:
                partURL = 'search/';
                break;
        }
        this.weeks['aprID'] = [aprID, 'Апракос-ID'];
        this.weeks['apstlElemID'] = [apostolElemID, 'Апостола-ID'];
        this.weeks['evnglElemID'] = [evangelieElemID, 'Евангелие-ID '];
        return partURL;
    }
    stupka() {
        let stupka;
        switch (this.mondayAfterVozdvizgenie()) {
            case true:
                stupka = this.stupkaN();
                break;
            case false:
                stupka = this.stupkaVozdvizjenia();
                break;
            default:
                stupka = 0;
                break;
        }
        return stupka;
    }
    stupkaN() {
        if (this.weeks.current[0] >= this.weeks.mif[0]) {
            return -(this.weeks.stupkaK[0] - this.weeks.stupkaV[0]);
        }
        if (this.weeks.current[0] < this.weeks.mif[0]) {
            var stepStupka = this.weeks.current[0] + this.weeks.stupkaV[0];
            var per = -this.weeks.stupkaK[0] + this.weeks.stupkaV[0];
            if (stepStupka > 40 && stepStupka < 47) {
                return per;
            }
            return this.weeks.stupkaV[0];
        }
        return 0;
    }
    stupkaVozdvizjenia(week) {
        return 0;
    }
    stupkaK() {
        return 0;
    }
    holydays_9() {
        let link_to_hld9 = undefined;
        let tmt = this.theMomentTime.getMonth() + '/' + this.theMomentTime.getDate();
        for (let item in this.NINEHOLIDAYS) {
            let pathToHollliday = this.NINEHOLIDAYS[item].year + '/' +
                this.NINEHOLIDAYS[item].monthRU + '/' +
                this.NINEHOLIDAYS[item].day;
            let date_9 = new Date(pathToHollliday);
            let h9 = date_9.getMonth() + '/' + date_9.getDate();
            if (h9 === tmt) {
                link_to_hld9 =
                    '/' + this.NINEHOLIDAYS[item].year + '/' +
                        this.NINEHOLIDAYS[item].monthRU + '/' +
                        this.NINEHOLIDAYS[item].day + '.html';
                return link_to_hld9;
            }
        }
        return undefined;
    }
    modalCweek50() {
        if (this.weeks.current[0] < 7)
            return '';
        return `По Пять&shy;десят&shy;нице <span class="red bold">${this.weeks.current[0] - 7}</span>`;
    }
    initModalView() {
        var _a, _b;
        let lastSegment = document.location.pathname.split('/').pop();
        const closeClick = '<span id="close" class="close" onclick="apr.closeModalView()"></span>';
        const commentStvol = "<span class='comment-stvol'><br> Подробнее<a class='a-href' href='https://www.aprakos.ru/p/blog-page.html'> здесь</a>.</div>";
        let str = `
        <section id="fp-content" class="fp-content">
        <b>Седмица Евангелия: </b>
        <div id="modal-cweek">По Пасхе&nbsp; <span style="background-color: white; border-radius: 50%; padding: 0 .7rem 0" class="red bold">${this.anchorElemID}</span></div>
        ${this.modalCweek50()}
        <div>${lastSegment === 'stvol.html'
            ? `${this.weeks.stupkaV[1]} <span class="red bold">${Math.abs(this.weeks.stupkaV[0])}</span> седм.`
            : ''}</div></div>
        <div>${lastSegment === 'stvol.html'
            ? `${this.weeks.stupkaK[1]} <span class="red bold">${Math.abs(this.weeks.stupkaK[0])}</span> седм.`
            : ''}</div></div>
        <div>${lastSegment === 'stvol.html'
            ? `${this.weeks.all[1]} <span class="red bold">${Math.abs(this.weeks.all[0])}</span> седм.`
            : ''}</div></div>
        <div>${lastSegment === 'stvol.html' ? commentStvol : ''}</div></div>
        ${closeClick}
        </section>`;
        const fp = document.getElementById('first-preview');
        if (fp)
            fp.innerHTML = str;
        (_a = document.querySelector('#fp00')) === null || _a === void 0 ? void 0 : _a.classList.add('fp00');
        (_b = document.querySelector('#first-preview')) === null || _b === void 0 ? void 0 : _b.classList.add('fp01');
        const rpack = this.reversePack();
        rpack();
        let timerOff = setTimeout(() => {
            this.closeModalView(timerOff);
            alert('\n Долгое отсутствие увеличивает расстояние разлуки.');
        }, 3600000);
    }
    correctorStupka() {
        if (this.isVozdvizhenieOnSunday() && this.weeks.stupkaV[0] >= 0) {
            this.weeks.stupkaV[0] = -1;
        }
        this.weeks.stupkaV[1] = String(this.weeks.stupkaV[0] <= 0
            ? 'Воздвиженская отступка'
            : 'Воздвиженская преступка');
    }
    initElementsDOM() {
        var _a, _b;
        const stvol = document.location.pathname.split('/').pop();
        if (stvol != 'stvol.html')
            return;
        const nameEl = document.getElementById('name');
        if (nameEl && nameEl.children[0])
            nameEl.children[0]
                .setAttribute('href', (_a = this.linkToHolydays) !== null && _a !== void 0 ? _a : this.linkToAprakos);
        let elemsID = {
            curweek: `${this.weeks.current[0]}`,
            curweek50: `${this.weeks.current[0] < 8 ? '*' : this.weeks.current[0] - 7}`,
            glass: 'Глаc: ' + this.glas(+this.weeks.current[0]),
        };
        for (const atrubuteID in elemsID) {
            if (Object.prototype.hasOwnProperty.call(elemsID, atrubuteID)) {
                if (atrubuteID === 'curweek') {
                    for (const el of this.getAllById(atrubuteID))
                        el.innerHTML = `<a href="#week${this.weeks.apstlElemID[0]}">${elemsID[atrubuteID]}</a>`;
                }
                else if (atrubuteID === 'curweek50') {
                    for (const el of this.getAllById(atrubuteID))
                        el.innerHTML = `<a href="#week${this.weeks.evnglElemID[0]}">${elemsID[atrubuteID]}</a>`;
                }
                else {
                    for (const el of this.getAllById(atrubuteID))
                        el.innerHTML = elemsID[atrubuteID];
                }
                if (atrubuteID == 'glass') {
                    const g = document.querySelector('#glass');
                    if (g)
                        g.innerHTML = elemsID[atrubuteID];
                }
            }
        }
        if (Number(elemsID.curweek) < 8) {
            this.getAllById('id50').forEach(el => el.remove());
        }
        const apstlWeekNum = this.weeks.apstlElemID[0];
        const evnglWeekNum = this.weeks.evnglElemID[0];
        const dayNum = this.weeks.day[0];
        const apstlDayID = 'weekday' + apstlWeekNum + dayNum;
        const evnglDayID = 'weekday' + evnglWeekNum + dayNum;
        const apstlWeekID = 'week' + apstlWeekNum;
        const evnglWeekID = 'week' + evnglWeekNum;
        if (this.debug) {
            console.log('[OLY] initElementsDOM', JSON.stringify({
                apstlDayID, evnglDayID, apstlWeekID, evnglWeekID,
                aprID: (_b = this.weeks.aprID) === null || _b === void 0 ? void 0 : _b[0],
                day: dayNum,
                current: this.weeks.current[0],
                stupka: this.stupka(),
                apstlFound: this.getAllById(apstlDayID).length,
                evnglFound: this.getAllById(evnglDayID).length,
                sameWeek: evnglWeekNum === apstlWeekNum,
            }));
            this.reportDOMCells();
        }
        this.addClassToAll(apstlDayID, 'apstl-day');
        this.setStyleOnAll(apstlDayID, 'line-height', '3.5rem');
        this.addClassToAll(apstlWeekID, 'color-block-apstl-stupka');
        if (evnglWeekNum !== apstlWeekNum) {
            const evnglCells = this.findDayCell(evnglWeekNum, dayNum);
            if (evnglCells.length > 0) {
                for (const el of evnglCells) {
                    el.classList.add('evngl-day');
                    el.style.setProperty('line-height', '3.5rem');
                }
                if (this.debug) {
                    console.log('[OLY] найдено ячеек Евангелия (' + evnglDayID +
                        '): ' + evnglCells.length);
                    for (const el of evnglCells) {
                        console.log('[OLY] итоговый className #' + el.id + ' : "' +
                            el.className + '"');
                    }
                }
            }
            else {
                console.warn('[OLY] не найдена ни одна ячейка для Евангелия ' +
                    '(week=' + evnglWeekNum + ', day=' + dayNum + ').');
                if (this.debug)
                    this.dumpWeekCells(evnglWeekNum);
            }
            this.addClassToAll(evnglWeekID, 'color-block-evngl-stupka');
        }
        else {
            this.addClassToAll(evnglDayID, 'evngl-day');
            this.addClassToAll('weekday' + this.weeks.aprID[0], 'seedday-week-on');
            this.removeClassFromAll(apstlWeekID, 'color-block-apstl-stupka');
            this.addClassToAll(apstlWeekID, 'color-block');
        }
        if (this.weeks.evnglElemID[0] == 50) {
            this.getAllById('week50').forEach(el => el.setAttribute('style', 'border: solid 4rem #fedede; background-color: #fedede;'));
        }
    }
    glas(sedmica) {
        let x = sedmica;
        let n = (x % 8) * 0.1;
        let g = Math.floor(n * 10) - 1;
        switch (g) {
            case 0: return '8';
            case -1: return '7';
            default: return g.toString();
        }
    }
    reversePack() {
        let i = this.stateModalView;
        const reverseP = () => { i = !i; this.stateModalView = i; return i; };
        return reverseP;
    }
    closeModalView(timerOff) {
        var _a, _b;
        localStorage.ystm = JSON.stringify({
            entries: 1, opasity: 0, visibility: 'hidden',
        });
        (_a = document.querySelector('#fp00')) === null || _a === void 0 ? void 0 : _a.classList.remove('fp00');
        (_b = document.querySelector('#first-preview')) === null || _b === void 0 ? void 0 : _b.classList.remove('fp01');
        const c = document.querySelector('#close');
        if (c)
            c.outerHTML = '<!-- Will embed element-->';
        const fc = document.querySelector('#fp-content');
        if (fc)
            fc.outerHTML = '<!-- Will embed element-->';
        const rpack = this.reversePack();
        rpack();
        clearTimeout(timerOff);
    }
    firstViewModal() {
        const aaa = localStorage.ystm;
        if (aaa == null)
            this.initModalView();
        return {};
    }
    eventKeys() {
        let oneClickInfo = '';
        document.addEventListener('keyup', event => {
            if (event.key == 'F2') {
                oneClickInfo += event.code + '';
                setTimeout(() => { oneClickInfo = ''; }, 700);
            }
            if (oneClickInfo == 'F2F2' && this.stateModalView == false) {
                this.initModalView();
            }
            else if (oneClickInfo == 'F2F2' && this.stateModalView == true) {
                oneClickInfo = '';
                this.closeModalView();
            }
            if (event.code == 'Escape')
                oneClickInfo += event.code + '';
            if (oneClickInfo == 'EscapeEscape') {
                sessionStorage.removeItem('userDate');
                oneClickInfo = '';
                document.location.replace('');
            }
        });
    }
    deleteUserDateFromSessionStorage() {
        sessionStorage.removeItem('userDate');
        document.location.replace(document.location.origin);
    }
    reloadAprakosPage() {
        let cd = new Date();
        let nextDay = new Date(cd.getFullYear(), cd.getMonth(), cd.getDate() + 1);
        let interval = nextDay.getTime() - cd.getTime();
        setTimeout(function () { document.location.reload(); }, interval);
    }
}
let apr = new OLY();
window.OLY = OLY;
window.apr = apr;
class SelectedDay {
    constructor() {
        this.newDate = document.getElementById('form-date');
        this.userDate_ss = sessionStorage.getItem('userDate');
        this.checkbox = sessionStorage.getItem('userCheck');
        this.counter = 0;
        if (this.newDate) {
            this.setUserData();
            this.setColor();
            this.widthButton();
            this.listener();
        }
    }
    setUserData() {
        const color = this.userDate_ss ? '<span style="color: #e34234">' : '<span style="color: #000">';
        const color2 = this.userDate_ss ? '<span style="font-weight: 600; color: #5d01ff">' : '<span style="color: #000">';
        if (this.counter == 0) {
            let easterData = document.querySelector('#easter');
            if (easterData) {
                easterData.innerHTML +=
                    '<span style="font-size: 1.5rem; opasity: .5;"><span style="color: #0005"> Прошедшая Пасха: ' +
                        apr.oldEaster.toLocaleDateString() + '</span><br>' +
                        'ОЖИДАЕМАЯ ПАСХА: ' + color +
                        apr.newEaster.toLocaleDateString() + '</span></span>';
            }
            const obj = apr.weeks;
            const ul = document.getElementById('listWeeks');
            if (ul) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        var element = obj[key];
                        const li = document.createElement('li');
                        var str = ' ';
                        if (element[2] != undefined)
                            str += element[2];
                        li.innerHTML += element[1] + ': ' + color2 + element[0] + str;
                        ul.appendChild(li);
                    }
                }
            }
            const obj2 = apr.datesOLY;
            const ul2 = document.getElementById('listDatesOly');
            if (ul2) {
                for (var key in obj2) {
                    if (Object.prototype.hasOwnProperty.call(obj2, key)) {
                        let element = obj2[key];
                        const li = document.createElement('li');
                        li.innerHTML += element[1] + ': ' + color + element[0].toLocaleDateString();
                        ul2.appendChild(li);
                    }
                }
            }
        }
        this.counter += 1;
    }
    reloadPage() {
        if (!this.checkbox) {
            sessionStorage.removeItem('userCheck');
            sessionStorage.removeItem('userDate');
        }
        else {
            var lastDate = new Date(Number(this.userDate_ss));
            sessionStorage.setItem('lastInstalledDate', lastDate.toISOString().slice(0, 10));
            sessionStorage.removeItem('userDate');
        }
        document.location.reload();
    }
    setColor() {
        var _a, _b, _c, _d;
        let show = 'visibility';
        let hide = 'hidden';
        if (this.userDate_ss) {
            (_a = document.getElementById('form-date')) === null || _a === void 0 ? void 0 : _a.classList.add(hide);
            let returnToRealDate = document.getElementById('button-red');
            if (returnToRealDate) {
                returnToRealDate.classList.add(show);
                returnToRealDate.focus();
            }
            (_b = document
                .getElementById('warningString')) === null || _b === void 0 ? void 0 : _b.setAttribute('style', 'color:red; font-wigth: bold; font-weight: bolder;');
            const aprYear = document.getElementById('apr-year');
            if (aprYear)
                aprYear.innerHTML =
                    ' для <span style="padding-left: .4rem; color: #000"> ' +
                        new Date(+this.userDate_ss).toLocaleDateString() + ' ✔️ </span>';
        }
        else {
            let dateFromForm = document.querySelector('input[type="date"]');
            if (this.checkbox)
                this.newDate[0].checked = true;
            !this.checkbox
                ? (dateFromForm.value = apr.theMomentOffsetZone.toISOString().slice(0, 10))
                : (dateFromForm.value = sessionStorage.getItem('lastInstalledDate'));
            (_c = document.getElementById('form-date')) === null || _c === void 0 ? void 0 : _c.classList.add(show);
            (_d = document.getElementById('button-red')) === null || _d === void 0 ? void 0 : _d.classList.add(hide);
            const aprYear = document.getElementById('apr-year');
            if (aprYear)
                aprYear.innerText = ' СЕГО ДНЯ ';
        }
    }
    serializeForm(dataftf) {
        let d = [];
        const check = dataftf['fixed-date'].checked;
        if (check)
            sessionStorage.setItem('userCheck', 'check');
        else
            sessionStorage.removeItem('userCheck');
        const inputDate = dataftf['adate'].value;
        d = [+inputDate.slice(0, 4), +inputDate.slice(5, 7) - 1, +inputDate.slice(-2)];
        new OLY(d);
    }
    widthButton() {
        if (window.innerWidth < 660) {
            let inputElement = document.getElementById('submit');
            if (inputElement) {
                inputElement.value = '✔️';
                inputElement.style.backgroundColor = '#ffe6d3';
            }
        }
    }
    listener() {
        this.newDate.addEventListener('submit', (e) => {
            e.preventDefault();
            this.serializeForm(this.newDate);
        });
    }
}
let set = new SelectedDay();
