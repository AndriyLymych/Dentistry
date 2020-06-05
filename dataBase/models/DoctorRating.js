const {DB_TABLE_NAME: {DOCTOR_RATING}} = require('../../constant');

module.exports = (sequelize, DataTypes) => {

    const DoctorRating = sequelize.define(DOCTOR_RATING, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        mark: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            foreignKey: true,
            allowNull: false
        },
        doctor_id: {
            type: DataTypes.INTEGER,
            foreignKey: true,
            allowNull: false
        },
        isEvaluated: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        tableName: DOCTOR_RATING,
        timestamps: false
    });

    const User = sequelize.import('./User');

    DoctorRating.belongsTo(User, {foreignKey: 'user_id', as: 'Critic'});
    DoctorRating.belongsTo(User, {foreignKey: 'doctor_id', as: 'Doctor'});


    return DoctorRating

};