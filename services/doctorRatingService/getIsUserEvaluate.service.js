const db = require('../../dataBase').getInstance();

const {DB_TABLE_NAME} = require('../../constant');

module.exports = async (user_id,doctor_id) => {
    const DoctorRatingModel = db.getModel(DB_TABLE_NAME.DOCTOR_RATING);

    const isEvaluated = await DoctorRatingModel.findOne({
        where: {
            user_id,
            doctor_id
        }
    });
    if (!isEvaluated){
        return false
    }
    return true
}