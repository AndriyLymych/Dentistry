const mailer = require('nodemailer');

const {EMAIL_DATES} = require('../constant');
const {tokenCreatorForChangePassword} = require('../helpers');

//TODO REPLACE EMAIL SENDER TO SERVICE!!!
module.exports = async (user) => { // TODO user not used!
  const transport = mailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_DATES.EMAIL,
      pass: EMAIL_DATES.PASSWORD
    }
  });

  await transport.sendMail({
    from: EMAIL_DATES.EMAIL,
    to: 'kminvictor@gmail.com', // TODO SEND Email to real user email. NO MAGIC STRINGS
    subject: 'Change password on dentistry',
    html: template()
  });

  function template() {
    const token = tokenCreatorForChangePassword();
    return `<h1> Password change </h1>
         <br>
         <p>You want to change your password. Click on this link please:</p>
         <a href="http://localhost:3000/auth/users/password?t=${token}"> LINK </a>
         `;
  }
};
