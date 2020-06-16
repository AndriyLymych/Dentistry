const {DB_TABLE_NAME} = require('../../constant');
const db = require('../../dataBase').getInstance();

module.exports = async () => {

    const UserSpecialityModel = db.getModel(DB_TABLE_NAME.USER_SPECIALITY);

    const specialities = await UserSpecialityModel.findAll({raw:true});

    return specialities

};