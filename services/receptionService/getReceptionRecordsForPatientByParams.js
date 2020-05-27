const {DB_TABLE_NAME} = require('../../constant');
const db = require('../../dataBase').getInstance();

module.exports = async object => {
    const UserModel = db.getModel(DB_TABLE_NAME.RECEPTION);

    const records = await UserModel.findOne({
        where: object
    });
    return records && records.dataValues
}