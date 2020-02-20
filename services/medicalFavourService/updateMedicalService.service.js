const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME} = require('../../constant');

module.exports = async (params, id) => {
    const MedicalServiceModel = db.getModel(DB_TABLE_NAME.MEDICAL_SERVICE);

    await MedicalServiceModel.update(params, {
        where: {
            id
        }
    })
}