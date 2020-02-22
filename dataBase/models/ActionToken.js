const {DB_TABLE_NAME: {ACTION_TOKEN}} = require('../../constant');

module.exports = (sequelize, DataTypes) => {

    const ActionToken = sequelize.define(ACTION_TOKEN, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        action_token: {
            type: DataTypes.STRING,
            allowNull: false
        },
        action_id: {
            type: DataTypes.INTEGER,
            foreignKey: true,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            foreignKey: true,
            allowNull: false
        }

    }, {
        tableName: ACTION_TOKEN,
        timestamps: false
    });

    const Action = sequelize.import('./Action');
    const User = sequelize.import('./User');

    ActionToken.belongsTo(Action, {foreignKey: 'action_id'});
    ActionToken.belongsTo(User, {foreignKey: 'user_id'});

    return ActionToken
}