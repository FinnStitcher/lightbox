const {DateTime} = require('luxon');
// this may or may not work

module.exports = {
    format_date: (date) => {
        const luxonTest = DateTime.fromJSDate(date);
        return luxonTest.toLocaleString(DateTime.DATE_FULL);
    },
    format_plural: (amount, noun) => {
        if (amount === 1) {
            return noun;
        } else {
            return noun + 's';
        }
    }
};