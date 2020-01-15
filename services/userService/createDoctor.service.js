const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME, USER_ROLE} = require('../../constant');

module.exports = async doctorObject => {
    const UserModel = db.getModel(DB_TABLE_NAME.USER);
    doctorObject = {...doctorObject, role_id: USER_ROLE.DOCTOR};

    const patient = await UserModel.create(doctorObject);

    return patient && patient.dataValues
}
