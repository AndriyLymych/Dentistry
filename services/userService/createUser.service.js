const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME, USER_ROLE} = require('../../constant');

module.exports = async obj => {
    const UserModel = db.getModel(DB_TABLE_NAME.USER);

    const user = await UserModel.create(obj);

    return user && user.dataValues
}
