const {EMAIL_DATES} = require('../../constant');
const {mailerTransport} = require('../../helpers');

module.exports = async (email, name, middleName) => {

    const {transport} = mailerTransport();

    await transport.sendMail({
        from: `SIMSTOMAT👻 ${EMAIL_DATES.EMAIL} `,
        to: email,
        subject: 'Ласкаво просимо',
        html: template()
    });

    function template() {
        return `<h1> Реєстрація </h1>
         <br>
         <p>Добрий день, ${name} ${middleName}. Вітаємо Вас у "Simstomat"! Ваша реєстрація пройшла успішно.</p>
    
         `;
    }
};