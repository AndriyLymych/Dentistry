const {Op, literal} = require('sequelize');

const {DB_TABLE_NAME} = require('../../constant');
const db = require('../../dataBase').getInstance();

module.exports = () => {
    const ReceptionModel = db.getModel(DB_TABLE_NAME.RECEPTION);

    return ReceptionModel.findAll({
        where: {
            count_mail: 0,
            date: {
                [Op.gte]: literal('NOW() - INTERVAL 1 DAY') // TODO need to fix in future
            }
        },
        raw: true
    })
};
