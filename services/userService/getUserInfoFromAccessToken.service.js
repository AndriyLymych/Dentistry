const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME} = require('../../constant');

module.exports = async id => {
    const UserModel = db.getModel(DB_TABLE_NAME.USER);
    const UserRoleModel = db.getModel(DB_TABLE_NAME.USER_ROLE);

    const user = await UserModel.findOne({
        where: {id},
        attributes: ['id', 'email', 'name', 'middleName', 'surname', 'age', 'city', 'avatar', 'role_id'],
        include: [{
            model: UserRoleModel,

        }
        ]
    });

    return user && user.dataValues
}