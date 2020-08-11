const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME} = require('../../constant');

module.exports = async id => {
    const UserModel = db.getModel(DB_TABLE_NAME.USER);
    const UserSpecialityModel = db.getModel(DB_TABLE_NAME.USER_SPECIALITY);

    const user = await UserModel.findByPk(id, {
        include: [
            {
                model: UserSpecialityModel,
                attributes: ['label']
            }
        ]
    });

    return user && user.dataValues
}