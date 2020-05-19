const {DB_TABLE_NAME} = require('../../constant');
const db = require('../../dataBase').getInstance();

module.exports = async () => {
    const GenderModel = db.getModel(DB_TABLE_NAME.GENDER);

    const genders = await GenderModel.findAll({raw:true});

    return genders
}