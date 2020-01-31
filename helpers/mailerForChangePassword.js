const mailer = require('nodemailer');

const {EMAIL_DATES} = require('../constant');
const {tokenCreatorForChangePassword} = require('../helpers');

module.exports = async (user) => {
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
        subject: 'Change password on dentistry',
        text: 'hello'

    })

    function template() {
        const token = tokenCreatorForChangePassword();
        const msg =
            `<h1> Password change </h1>
         <br>
         <p>You want to change your password. Click on this link please:</p>
         <a href="http://localhost:3000/auth/users/password?t=${token}"></a>
         `;
        return msg;
    }
}