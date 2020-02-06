module.exports = (sequelize, DataTypes) => {
    const MedicalService = sequelize.define('MedicalService', {
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
        tableName: 'medical_service',
        timestamps: false
    });

    return MedicalService

};