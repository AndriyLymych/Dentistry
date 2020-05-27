const {DB_TABLE_NAME: {RECEPTION}} = require('../../constant');

module.exports = (sequelize, DataTypes) => {

    const Reception = sequelize.define(RECEPTION, {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        middleName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        service_id: {
            type: DataTypes.INTEGER,
            foreignKey: true,
            allowNull: false
        },
        count_mail: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        chat_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        telegram_msg: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        tableName: RECEPTION,
        timestamps: false
    });

    const MedicalService = sequelize.import('./MedicalService');

    Reception.belongsTo(MedicalService, {foreignKey: 'service_id'});

    return Reception

};
