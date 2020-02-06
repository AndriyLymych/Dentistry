const {DB_TABLE_NAME} = require('../../constant');
const db = require('../../dataBase').getInstance();

module.exports = async id => {
    const MedicalServiceModel = db.getModel(DB_TABLE_NAME.MEDICAL_SERVICE);

    const service = await MedicalServiceModel.findByPk(id);

    return service && service.dataValues
}