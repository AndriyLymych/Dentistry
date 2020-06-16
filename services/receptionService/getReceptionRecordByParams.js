const {DB_TABLE_NAME} = require('../../constant');
const db = require('../../dataBase').getInstance();

module.exports = async object => {
    const ReceptionModel = db.getModel(DB_TABLE_NAME.RECEPTION);

    const record = await ReceptionModel.findOne({
        where: object
    });
    return record && record.dataValues
}