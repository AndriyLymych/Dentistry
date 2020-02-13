const {DB_TABLE_NAME: {USER_SPECIALITY}} = require('../../constant');

module.exports = (sequelize, DataTypes) => {
    const UserSpeciality = sequelize.define('UserSpeciality', {
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
        tableName: USER_SPECIALITY,
        timestamps: false
    });

    return UserSpeciality;

};

