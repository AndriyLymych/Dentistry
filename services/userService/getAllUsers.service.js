const {DB_TABLE_NAME} = require('../../constant');
const db = require('../../dataBase').getInstance();

module.exports = async status_id => {

    const UserModel = db.getModel(DB_TABLE_NAME.USER);
    const UserStatusModel = db.getModel(DB_TABLE_NAME.USER_STATUS);

    const users = await UserModel.findAll({
        where : {
            status_id
        },
        attributes: ['id', 'name', 'surname'],
        include: [{
            model: UserStatusModel,
            attributes: ['label'],
        }],
        raw: true
    });
    return users

};