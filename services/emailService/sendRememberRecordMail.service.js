const cron = require('node-cron');

const {
    EMAIL_DATES: {
        EMAIL
    },
    DATES: {
        ONE_DAY
    }
} = require('../../constant');
const {mailerTransport} = require('../../helpers');
const {incrementCountMail, getFutureReceptions} = require('../receptionService');

module.exports = async () => {

    const {transport} = mailerTransport();

    cron.schedule('*/5 * * * * *', async () => {
        const nowTime = new Date();

        const records = await getFutureReceptions();
        for (const record of records) {

            const {id, date, email, name} = record;

            if ((date - nowTime) <= ONE_DAY) {

                await transport.sendMail({
                    from: `SIMSTOMAT 🦷 ${EMAIL} `,
                    to: email,
                    subject: 'Нагадування',
                    html: `<p>Добрий день, ${name}. Нагадуємо що у Вас завтра прийом у стоматології "Simstomat"!</p>`
                });

                await incrementCountMail({count_mail: 1}, id);

            }
        }
    })
};
