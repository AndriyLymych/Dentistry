const {DB_TABLE_NAME: {MEDICAL_SERVICE}} = require('../../constant');

module.exports = (sequelize, DataTypes) => {
    const MedicalService = sequelize.define(MEDICAL_SERVICE, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        service: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: MEDICAL_SERVICE,
        timestamps: false
    });

    return MedicalService

};
