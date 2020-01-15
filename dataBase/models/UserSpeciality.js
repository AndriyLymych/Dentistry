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
        tableName: 'user_speciality',
        timestamps: false
    });

    return UserSpeciality;

};

