const cron = require('node-cron');
const requestPromise = require('request-promise');

const {EMAIL_DATES} = require('../../constant');
const {mailerTransport} = require('../../helpers');
const {HOST} = require('../../config/configs');
const {incrementCountMail} = require('../receptionService');

module.exports = async () => {

    const {transport} = mailerTransport();

    const records = JSON.parse(await requestPromise.get(HOST + ':3000/receptions'));
    cron.schedule('*/10 * * * * *', async () => {


        for (const record of records) {
        let {id, date, count_mail,email, name} = record;
        date = new Date(date);
        date.setDate(date.getDate() - 1);
            //TODO fix bug with cron
            while (count_mail === 0) {
                if (date) {
                    await transport.sendMail({
                        from: `Simstomat ${EMAIL_DATES.EMAIL} `,
                        to: email,
                        subject: 'Нагадування',
                        html: `<p>Добрий день, ${name}. Нагадуємо що у Вас завтра прийом у стоматології "Simstomat"!</p>`
                    });
                    await incrementCountMail({count_mail: 1}, id);
                }
            }
        }

    })


};
