const {EMAIL_DATES} = require('../../constant');
const {resetPasswordTemplate, mailerTransport} = require('../../helpers');
module.exports = async (email, name, middleName, token) => {

    const {transport} = mailerTransport();

    await transport.sendMail({
        from: `SIMSTOMAT👻 ${EMAIL_DATES.EMAIL}`,
        to: email,
        subject: 'Зміна паролю',
        html: resetPasswordTemplate(name, middleName, token)
    });
};
