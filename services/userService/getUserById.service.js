const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME} = require('../../constant');

module.exports = async user_id => {
    const UserModel = db.getModel(DB_TABLE_NAME.USER);

    const user = await UserModel.findByPk(user_id);

    return user && user.dataValues
}