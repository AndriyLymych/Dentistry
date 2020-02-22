const {DB_TABLE_NAME} = require('../../constant');
const db = require('../../dataBase').getInstance();

module.exports = async params => {
    const ActionTokenModel = db.getModel(DB_TABLE_NAME.ACTION_TOKEN);

    const obj = await ActionTokenModel.findOne({
        where: params
    });
    return obj && obj.dataValues
}