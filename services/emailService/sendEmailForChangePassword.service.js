const mailer = require('nodemailer');

const {EMAIL_DATES} = require('../../constant');
const {resetPasswordTemplate} = require('../../helpers');
module.exports = async (email,name,middleName,token) => {

    const transport = mailer.createTransport({
        service: 'Gmail',
        auth: {
            user: EMAIL_DATES.EMAIL,
            pass: EMAIL_DATES.PASSWORD
        }
    });

    await transport.sendMail({
        from: `SIMSTOMAT👻 ${EMAIL_DATES.EMAIL}`,
        to: email,
        subject: 'Change password on dentistry',
        html: resetPasswordTemplate(name,middleName,token)
    });


};
