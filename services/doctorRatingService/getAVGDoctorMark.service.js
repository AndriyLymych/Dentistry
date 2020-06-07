const db = require('../../dataBase').getInstance();
const Sequelize = require('sequelize');

const {DB_TABLE_NAME} = require('../../constant');

module.exports = async doctor_id => {
    const DoctorRatingModel = db.getModel(DB_TABLE_NAME.DOCTOR_RATING);

    const avgMark = await DoctorRatingModel.findOne({
        where :{
            doctor_id
        },
        attributes: [
            [Sequelize.fn('AVG', Sequelize.col('mark')), 'average_doctor_mark']
        ],

    });

    return avgMark && avgMark.dataValues
}