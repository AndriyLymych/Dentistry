const mailer = require('nodemailer');

const {EMAIL_DATES} = require('../constant');

module.exports = async () => {
    const transport = mailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL_DATES.EMAIL,
            pass: EMAIL_DATES.PASSWORD
        }

    }, {
        from: EMAIL_DATES.EMAIL
    });

    await transport.sendMail({
        to: 't1one2000@ukr.net',

    })
}