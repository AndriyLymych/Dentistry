const {DB_TABLE_NAME: {OAUTH_TOKEN}} = require('../../constant');

module.exports = (sequelize, DataTypes) => {

    const OAuthToken = sequelize.define('OAuthToken', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        access_token: {
            type: DataTypes.STRING,
            allowNull: false
        },
        refresh_token: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id:{
            type:DataTypes.INTEGER,
            foreignKey:true,
            allowNull:false
        }

    }, {
        tableName: OAUTH_TOKEN,
        timestamps: false
    });

    const User = sequelize.import('./User');

    OAuthToken.belongsTo(User, {foreignKey: 'user_id'});

    return OAuthToken;

};
