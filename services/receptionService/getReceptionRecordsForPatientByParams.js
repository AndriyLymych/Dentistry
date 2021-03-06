const {DB_TABLE_NAME} = require('../../constant');
const db = require('../../dataBase').getInstance();

module.exports = async object => {
    const ReceptionModel = db.getModel(DB_TABLE_NAME.RECEPTION);

    const records = await ReceptionModel.findAll({
        where: object
    });
    return records && records.dataValues
}