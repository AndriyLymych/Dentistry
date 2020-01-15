module.exports = (sequelize, DataTypes) => {
    const UserRole = sequelize.define('UserRole', {
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
        tableName: 'user_role',
        timestamps: false
    });

    return UserRole;

};