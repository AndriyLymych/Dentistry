const {DB_TABLE_NAME} = require('../../constant');
const db = require('../../dataBase').getInstance();

module.exports = async () => {
    const ReceptionModel = db.getModel(DB_TABLE_NAME.RECEPTION);

    const records = await ReceptionModel.findAll({raw:true});

    return records
}