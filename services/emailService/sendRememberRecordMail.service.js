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
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const records = await getFutureReceptions();

        for (const record of records) {
            const {id, date, email, name} = record;

            if (tomorrow - date <= ONE_DAY) { // I have to check this because liter not working correctly
                await transport.sendMail({
                    from: `Simstomat ${EMAIL} `,
                    to: email,
                    subject: 'Нагадування',
                    html: `<p>Добрий день, ${name}. Нагадуємо що у Вас завтра прийом у стоматології "Simstomat"!</p>`
                });
                await incrementCountMail({count_mail: 1}, id);
            }
        }
    })
};
