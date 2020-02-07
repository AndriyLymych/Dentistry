const {DB_TABLE_NAME} = require('../../constant');
const db = require('../../dataBase').getInstance();

module.exports = async () => {
    const MedicalServiceModel = db.getModel(DB_TABLE_NAME.MEDICAL_SERVICE);

    const services = await MedicalServiceModel.findAll({raw:true});

    return services
}