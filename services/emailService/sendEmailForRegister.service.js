const mailer = require('nodemailer');

const {EMAIL_DATES} = require('../../constant');

module.exports = async (email, name, middleName) => {
    const transport = mailer.createTransport({
        service: 'Gmail',
        auth: {
            user: EMAIL_DATES.EMAIL,
            pass: EMAIL_DATES.PASSWORD
        }
    });

    await transport.sendMail({
        from: `Simstomat ${EMAIL_DATES.EMAIL} `,
        to: email,
        subject: 'Реєстрація',
        html: template()
    });

    function template() {
        return `<h1> Реєстрація </h1>
         <br>
         <p>Добрий день, ${name} ${middleName}. Вітаємо Вас у "Simstomat"! Ваша реєстрація пройшла успішно.</p>
    
         `;
    }
};