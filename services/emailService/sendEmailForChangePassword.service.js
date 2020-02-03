const mailer = require('nodemailer');

const {EMAIL_DATES} = require('../../constant');
const {tokenCreatorForChangePassword} = require('../../helpers');

//TODO REPLACE EMAIL SENDER TO SERVICE!!!
module.exports = async () => { // TODO user not used!
    const transport = mailer.createTransport({
        service: 'Gmail',
        auth: {
            user: EMAIL_DATES.EMAIL,
            pass: EMAIL_DATES.PASSWORD
        }
    });

    await transport.sendMail({
        from: EMAIL_DATES.EMAIL,
        to: 't1one2000@ukr.net', // TODO SEND Email to real user email. NO MAGIC STRINGS
        subject: 'Change password on dentistry',
        html: template()
    });

    function template() {
        const token = tokenCreatorForChangePassword();
        return `<h1> Password change </h1>
         <br>
         <p>You want to change your password. Click on this link please:</p>
         <a href="http://localhost:3000/auth/password-refresh?t=${token}"> LINK </a>
         `;
    }
};