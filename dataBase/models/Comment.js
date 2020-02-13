const {DB_TABLE_NAME: {COMMENT}} = require('../../constant');

module.exports = (sequelize, DataTypes) => {

    const Comment = sequelize.define('Comment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        commentText: {
            type:DataTypes.TEXT,
            allowNull:false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('now')
        },
        user_id: {
            type: DataTypes.INTEGER,
            foreignKey: true,
            allowNull: false
        }
    }, {
        tableName: COMMENT,
        timestamps: false
    });

    const User = sequelize.import('./User');

    Comment.belongsTo(User, {foreignKey: 'user_id'});

    return Comment

};
