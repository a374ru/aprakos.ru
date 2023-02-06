// @ts-nocheck
// -=-=-=-=-=-=-=-=-=-
// суббота,  4 февраля 2023 г. 23:07:37 (MSK)
// -=-=-=-=-=-=-=-=-=-
"use strict";
// источник данных bg
// var url = 'https://cdn.jsdelivr.net/gh/a374ru/aprakos.ru@latest/js/olhovka90blogger.json';
var url = 'https://aprakos.a374.ru/js/olhovka90blogger.json';

fetch(url).then(function (one) { return one.text(); }).then(function (two) { return tmbgr.backGroundChange(JSON.parse(two)); });
var TimeBackground = /** @class */ (function () {
    function TimeBackground(time) {
        if (time === void 0) { time = new Date().getHours(); }
        this.time = 0;
        this.time = time;
    }
    TimeBackground.prototype.backGroundChange = function (responsee) {
        var num = 0;
        console.log("СейЧас более: " + this.time + " часов");
        switch (this.time != false) {
            case this.time <= 5:
                num = 0;
                break;
            case this.time < 7:
                num = 2;
                break;
            case this.time < 15:
                var currentMonth1 = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr'];
                if (currentMonth1.indexOf(Date().slice(4, 7)) != -1) {
                    num = 7; // можно num = 8;
                    console.log('Сейчас сейчас зимний сезон под Москвой.');
                    break;
                }
                else {
                    num = 3;
                    console.log('Сейчас летний сезон.');
                    break;
                }
            case this.time < 18:
                var currentMonth2 = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr'];
                if (currentMonth2.indexOf(Date().slice(4, 7)) != -1) {
                    num = 8;
                    console.log('Сейчас зимний сезон под Москвой.');
                    break;
                }
                else if (Date().slice(4, 7) == 'Nov') {
                    num = 10;
                    console.log('Сейчас Ноябрь под Москвой.');
                    break;
                }
                else {
                    num = 4;
                    console.log('Сейчас летний сезон.');
                    44;
                    break;
                }
            case this.time < 22:
                var currentMonth3 = ['Jun', 'Jul', 'Aug'];
                if (currentMonth3.indexOf(Date().slice(4, 7)) != -1) {
                    num = 6;
                    console.log('Сейчас летний вечер под Москвой.');
                    break;
                }
                else {
                    num = 5;
                    console.log('Сейчас не зима и не лето.');
                    break;
                }
            case this.time < 23:
                var currentMonth = ['Dec', 'Jan', 'Feb'];
                if (currentMonth.indexOf(Date().slice(4, 7)) != -1) {
                    num = 1;
                    console.log('Сейчас ещё зима и поздний вечер под Москвой.');
                    break;
                }
                else {
                    num = 0;
                    console.log('It\'s winter now');
                    break;
                }
            default:
                num;
                break;
        }
        document.getElementsByClassName('bg-photo')[0].style.backgroundImage = responsee.surl[num];
        console.log(`Фоновая картиночка из массива из массива ${num} по URL ${responsee.surl[num]}`);
    };
    return TimeBackground;
}());
var tmbgr = new TimeBackground();