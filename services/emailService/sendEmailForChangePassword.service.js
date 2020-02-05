const mailer = require('nodemailer');

const {EMAIL_DATES} = require('../../constant');
const {tokenCreatorForChangePassword} = require('../../helpers');

module.exports = async (email) => {

    const transport = mailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL_DATES.EMAIL,
            pass: EMAIL_DATES.PASSWORD
        }
    });

    await transport.sendMail({
        from: `DENTISTRY👻 ${EMAIL_DATES.EMAIL}`,
        to: email,
        subject: 'Change password on dentistry',
        html: template()
    });


};

function template() {

    const {token_for_change_password} = tokenCreatorForChangePassword();

    return  `<h1> Password change </h1>
         <br>
         <p>You want to change your password. Click on this link please:</p>
         <a href="http://localhost:3000/auth/password-refresh?t=${token_for_change_password}" methods="post"> LINK </a>
         `;
}