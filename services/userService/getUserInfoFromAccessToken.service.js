const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME} = require('../../constant');

module.exports = async id => {
    const UserModel = db.getModel(DB_TABLE_NAME.USER);

    const user = await UserModel.findOne({
        where: {id},
        attributes : ['id','name','middleName','surname','age','city','avatar']
    });

    return user && user.dataValues
}