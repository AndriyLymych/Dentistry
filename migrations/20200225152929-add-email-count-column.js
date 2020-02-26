'use strict';
const {DB_TABLE_NAME: {RECEPTION}} = require('../constant');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            await queryInterface.addColumn(RECEPTION,
                'count_mail',
                {
                    defaultValue: 0,
                    type: Sequelize.INTEGER
                });

            await queryInterface.addColumn(RECEPTION,
                'chat_id',
                {
                    type: Sequelize.INTEGER
                })
        } catch (e) {
            console.log(e);
        }
    },

    down: async (queryInterface, Sequelize) => {
        try {
            await queryInterface.removeColumn(RECEPTION, 'email_count')

            await queryInterface.removeColumn(RECEPTION, 'chat_id')

        } catch (e) {
            console.log(e);
        }
    }
};
