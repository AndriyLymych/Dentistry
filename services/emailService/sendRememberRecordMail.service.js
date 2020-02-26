const cron = require('node-cron');
const requestPromise = require('request-promise');

const {EMAIL_DATES} = require('../../constant');
const {mailerTransport} = require('../../helpers');
const {HOST} = require('../../config/configs');
const {incrementCountMail} = require('../receptionService');

module.exports = async () => {

    const {transport} = mailerTransport();

    const records = JSON.parse(await requestPromise.get(HOST + ':3000/receptions'));
    records.forEach(record => {
        let {id, date, count_mail, name} = record;
        date = new Date(date);
        date.setDate(date.getDate() - 1);

        while (count_mail <= 1) {
            cron.schedule('* * * * * *', () => {
                if (record.date) {

                    transport.sendMail({
                        from: `Simstomat ${EMAIL_DATES.EMAIL} `,
                        to: record.email,
                        subject: 'Нагадування',
                        html: `<p>Добрий день, ${record.name}. Нагадуємо що у Вас завтра прийом у стоматології "Simstomat"!</p>`
                    })

                }
            });
            incrementCountMail({count_mail: 1})
        }
    })


};
