const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME} = require('../../constant');

module.exports =async obj => {
    const UserModel = db.getModel(DB_TABLE_NAME.USER);
    const patient =await UserModel.create(obj);

    return patient & patient.dataValues
}