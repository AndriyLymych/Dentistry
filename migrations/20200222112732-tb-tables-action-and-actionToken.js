'use strict';
const {DB_TABLE_NAME: {ACTION, ACTION_TOKEN, USER}} = require('../constant');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {

            const action = {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                label: {
                    type: Sequelize.STRING,
                    allowNull: false
                }
            };

            await queryInterface.createTable(ACTION, action);

            const actionToken = {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                action_token: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                action_id: {
                    type: Sequelize.INTEGER,
                    foreignKey: true,
                    allowNull: false,
                    references: {
                        model: ACTION,
                        key: 'id'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                },
                user_id: {
                    type: Sequelize.INTEGER,
                    foreignKey: true,
                    allowNull: false,
                    references: {
                        model: USER,
                        key: 'id'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }

            };

            await queryInterface.createTable(ACTION_TOKEN, actionToken);

            await queryInterface.sequelize.query(
                `INSERT INTO ${ACTION}(label) VALUES ('reset_password')`
            );

        } catch (e) {
            console.log(e);
        }
    },


    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable(ACTION_TOKEN);
        await queryInterface.dropTable(ACTION);
    }
};


