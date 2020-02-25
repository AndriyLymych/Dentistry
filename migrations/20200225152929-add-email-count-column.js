'use strict';
const {DB_TABLE_NAME: {RECEPTION}} = require('../constant');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            await queryInterface.addColumn(RECEPTION,
                'email_count',
                {
                    defaultValue: 0,
                    type: Sequelize.INTEGER
                })
        } catch (e) {
            console.log(e);
        }
    },

    down: async (queryInterface, Sequelize) => {
        try {
            await queryInterface.removeColumn(RECEPTION, 'email_count')
        } catch (e) {
            console.log(e);
        }
    }
};
