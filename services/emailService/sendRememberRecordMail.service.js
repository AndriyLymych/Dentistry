const cron = require('node-cron');
const requestPromise = require('request-promise');

const {EMAIL_DATES} = require('../../constant');
const {mailerTransport} = require('../../helpers');
const {HOST} = require('../../config/configs');

module.exports = async () => {

    const {transport} = mailerTransport();

    const records = JSON.parse(await requestPromise.get(HOST + ':3000/receptions'));

    cron.schedule('* * * * * *', () => {
        records.forEach(async record => {
            let date = new Date(record.date);
            date.setDate(date.getDate() - 1);
            record.date = date;
            if (record.date) {
                try {
                    while (record.count_mail <= 1) {
                        await transport.sendMail({
                            from: `Simstomat ${EMAIL_DATES.EMAIL} `,
                            to: record.email,
                            subject: 'Нагадування',
                            html: `<p>Добрий день, ${record.name}. Нагадуємо що у Вас завтра прийом у стоматології "Simstomat"!</p>`
                        })

                        record.count_mail++

                    }
                } catch (e) {
                    console.log(e);

                }
            }
        })

    });


};