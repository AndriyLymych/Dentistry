const {DB_TABLE_NAME: {USER_STATUS}} = require('../../constant');

module.exports = (sequelize, DataTypes) => {
    const UserStatus = sequelize.define('UserStatus', {
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
        tableName: 'userstatus',
        timestamps: false
    });

    return UserStatus;

};

