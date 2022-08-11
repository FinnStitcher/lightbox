const {DateTime} = require('luxon');

module.exports = {
    format_date: (date) => {
        const luxonDate = DateTime.fromJSDate(date);
        return luxonDate.toLocaleString(DateTime.DATE_FULL);
    },
    format_plural: (amount, noun) => {
        if (amount === 1) {
            return noun;
        } else {
            return noun + 's';
        }
    }
};