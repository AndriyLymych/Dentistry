const {DB_TABLE_NAME: {GENDER}} = require('../../constant');

module.exports = (sequelize, DataTypes) => {
    const Gender = sequelize.define('Gender', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        label:{
            type:DataTypes.STRING,
            allowNull:false
        }

    }, {
        tableName: 'gender',
        timestamps: false
    });

    return Gender
};
