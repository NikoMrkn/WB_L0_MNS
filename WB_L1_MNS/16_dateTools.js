//Импортириуем модуль, используя  ES6 Modules
import moment from 'moment';

export function formatDate(date, format) {
    return moment(date).format(format)
}

/*Используя CommonJS
const moment = require('moment');
function formatDate(date, format) {
    return moment(date).format(format);
}

module.exports = {formatDate};*/

