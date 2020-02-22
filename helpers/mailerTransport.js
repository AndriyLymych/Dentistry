const mailer = require('nodemailer');

const {EMAIL_DATES: {EMAIL, PASSWORD}} = require('../constant')

module.exports = () => {
    const transport = mailer.createTransport({
        service: 'Gmail',
        auth: {
            user: EMAIL,
            pass: PASSWORD
        }
    });

    return {
        transport
    }
};