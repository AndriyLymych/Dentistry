const {DB_TABLE_NAME} = require('../../constant');
const db = require('../../dataBase').getInstance();

module.exports = async markData => {

    const DoctorRatingModel = db.getModel(DB_TABLE_NAME.DOCTOR_RATING);

    await DoctorRatingModel.create(markData);

};