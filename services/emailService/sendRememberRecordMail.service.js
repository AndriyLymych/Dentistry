const {EMAIL_DATES} = require('../../constant');
const {receptionService} = require('../../services');
const {mailerTransport} = require('../../helpers');

module.exports = async () => {

    const {transport} = mailerTransport();


    // await transport.sendMail({
    //     from: `Simstomat ${EMAIL_DATES.EMAIL} `,
    //     to: email,
    //     subject: 'Реєстрація',
    //     html: template()
    // });

    let records = await receptionService.getAllReceptionRecords();
    records.forEach(record => {
            record.date
        }
    )

//     function template() {
//         return `<h1> Реєстрація </h1>
//          <br>
//          <p>Добрий день, ${name} ${middleName}. Вітаємо Вас у "Simstomat"! Ваша реєстрація пройшла успішно.</p>
//
//          `;
//     }
//
};