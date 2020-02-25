const cron = require('node-cron');
const requestPromise = require('request-promise');

const {EMAIL_DATES} = require('../../constant');
const {mailerTransport} = require('../../helpers');
const {HOST} = require('../../config/configs');

module.exports = async () => {

    const {transport} = mailerTransport();

    const records = JSON.parse(await requestPromise.get(HOST + ':3000/receptions'));
    records.forEach(record => {

        let date = new Date(record.date); // ШО ЗА НАХУЙ ?
        date.setDate(date.getDate() - 1); // ШО ЗА НАХУЙ ?
        record.date = date; // ШО ЗА НАХУЙ ?

        while (record.count_mail <= 1) {
            cron.schedule('* * * * * *', () => {
                if (record.date) { // ШО ЗА НАХУЙ ?

                    transport.sendMail({
                        from: `Simstomat ${EMAIL_DATES.EMAIL} `,
                        to: record.email,
                        subject: 'Нагадування',
                        html: `<p>Добрий день, ${record.name}. Нагадуємо що у Вас завтра прийом у стоматології "Simstomat"!</p>`
                    })

                }
            });
            record.count_mail++
        }
    })


};
