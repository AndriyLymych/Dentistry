const {DB_TABLE_NAME} = require('../../constant');
const db = require('../../dataBase').getInstance();

module.exports = async obj => {

    const UserModel = db.getModel(DB_TABLE_NAME.USER);
    const UserSpecialityModel = db.getModel(DB_TABLE_NAME.USER_SPECIALITY)

    const doctors = await UserModel.findAll({
        where: obj,
        raw: true,
        include: [{
            model:UserSpecialityModel,
            attributes: ['label']
        }]
    });
    return doctors

}