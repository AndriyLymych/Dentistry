module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            required: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },
        middleName: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
            required: true
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('now')
        },
        role_id: {
            type: DataTypes.INTEGER,
            foreignKey: true,
            allowNull: false
        },
        speciality_id: {
            type: DataTypes.INTEGER,
            foreignKey: true,
            allowNull: true
        },
        status_id: {
            type: DataTypes.INTEGER,
            foreignKey: true,
            allowNull: false
        },
        gender_id: {
            type: DataTypes.INTEGER,
            foreignKey: true,
            allowNull: false
        }
    }, {
        tableName: 'user',
        timestamps: false
    });

    const UserRole = sequelize.import('./UserRole.js');
    const UserSpeciality = sequelize.import('./UserSpeciality');
    const UserStatus = sequelize.import('./UserStatus');
    const Gender = sequelize.import('./Gender');

    User.belongsTo(UserRole, {foreignKey: 'role_id'});
    User.belongsTo(UserSpeciality, {foreignKey: 'speciality_id'})
    User.belongsTo(UserStatus, {foreignKey: 'status_id'});
    User.belongsTo(Gender, {foreignKey: 'gender_id'});

    return User

};