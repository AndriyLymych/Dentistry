const {DB_TABLE_NAME} = require('../../constant');
const db = require('../../dataBase').getInstance();

module.exports = async (obj, id) => {
    const UserModel = db.getModel(DB_TABLE_NAME.USER);

    await UserModel.update(obj, {
        where: {
            id
        }
    });


}