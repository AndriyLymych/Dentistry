const {DB_TABLE_NAME} = require('../../constant');
const db = require('../../dataBase').getInstance();

module.exports = async obj => {
    const UserModel = db.getModel(DB_TABLE_NAME.USER);

    const user = await UserModel.findOne({
        where: obj
    });

    return user&user.dataValues
}