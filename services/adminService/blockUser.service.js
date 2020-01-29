const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME, USER_STATUS} = require('../../constant');

module.exports = async id => {
    const UserModel = db.getModel(DB_TABLE_NAME.USER);

    await UserModel.update({
            status_id: USER_STATUS.BLOCKED
        },
        {
            where: {
                id
            }
        }
    )
}