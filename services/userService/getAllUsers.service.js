const {DB_TABLE_NAME} = require('../../constant');
const db = require('../../dataBase').getInstance();

module.exports = async id => {

    const UserModel = db.getModel(DB_TABLE_NAME.USER);

    const users = await UserModel.findAll({
        attributes: ['id', 'name', 'surname'],
        raw: true
    });
    return users

};