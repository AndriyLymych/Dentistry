const {DB_TABLE_NAME: {ACTION}} = require('../../constant');

module.exports = (sequelize, DataTypes) => {
    const Action = sequelize.define(ACTION, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        label: {
            type: DataTypes.STRING,
            allowNull: false
        }

    }, {
        tableName: ACTION,
        timestamps: false
    });

    return Action
};
