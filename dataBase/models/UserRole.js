const {DB_TABLE_NAME: {USER_ROLE}} = require('../../constant');

module.exports = (sequelize, DataTypes) => {
    const UserRole = sequelize.define(USER_ROLE, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        label:{
            type: DataTypes.STRING,
            allowNull:false
        }

    }, {
        tableName: USER_ROLE,
        timestamps: false
    });

    return UserRole;

};
