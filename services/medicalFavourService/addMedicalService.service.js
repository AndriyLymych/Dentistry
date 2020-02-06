const {DB_TABLE_NAME} = require('../../constant');
const db = require('../../dataBase').getInstance();

module.exports = async service => {

    const MedicalServiceModel = db.getModel(DB_TABLE_NAME.MEDICAL_SERVICE);

    const newService = await MedicalServiceModel.create(service);

    return newService && newService.dataValues

}