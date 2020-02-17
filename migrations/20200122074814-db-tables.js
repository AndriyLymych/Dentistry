'use strict';
const {
    DB_TABLE_NAME: {
        MEDICAL_SERVICE,
        USER_ROLE,
        COMMENT,
        GENDER,
        OAUTH_TOKEN,
        RECEPTION,
        USER,
        USER_SPECIALITY,
        USER_STATUS
    }
} = require('../constant');
// TODO dataBase table unification. created_at and middleName. Use some_text or someText; Not both!
// TODO replace database table names to constants !

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {



            const medicalService = {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                service: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    required: true
                },
                photo: {
                    type: Sequelize.STRING,
                    allowNull: true
                },
                description: {
                    type: Sequelize.TEXT,
                    allowNull: false
                },
                price: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                }
            };

            await queryInterface.createTable('medical_service', medicalService); // TODO databaseTablesEnum

            const gender = {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                label: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    required: true
                }
            };

            await queryInterface.createTable('gender', gender);

            const userRole = {
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

            await queryInterface.createTable('user_role', userRole);

            const userSpeciality = {
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

            await queryInterface.createTable('user_speciality', userSpeciality);

            const userStatus = {
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

            await queryInterface.createTable('user_status', userStatus);

            const user = {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                email: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true,
                    required: true
                },
                password: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    required: true
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    required: true
                },
                middleName: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    required: true
                },
                surname: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    required: true
                },
                age: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    required: true
                },
                city: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    required: true
                },
                avatar: {
                    type: Sequelize.STRING,
                    allowNull: true
                },
                created_at: {
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.fn('now')
                },
                role_id: {
                    type: Sequelize.INTEGER,
                    foreignKey: true,
                    allowNull: false,
                    references: {
                        model: 'user_role',
                        key: 'id'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                },
                speciality_id: {
                    type: Sequelize.INTEGER,
                    foreignKey: true,
                    allowNull: true,
                    references: {
                        model: 'user_speciality',
                        key: 'id'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                },
                status_id: {
                    type: Sequelize.INTEGER,
                    foreignKey: true,
                    allowNull: false,
                    references: {
                        model: 'user_status',
                        key: 'id'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                },
                gender_id: {
                    type: Sequelize.INTEGER,
                    foreignKey: true,
                    allowNull: false,
                    references: {
                        model: 'gender',
                        key: 'id'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            };

            await queryInterface.createTable('user', user);

            const oAuthToken = {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                access_token: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                refresh_token: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                user_id: {
                    type: Sequelize.INTEGER,
                    foreignKey: true,
                    allowNull: false,
                    references: {
                        model: 'user',
                        key: 'id'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            };

            await queryInterface.createTable('oauth_token', oAuthToken);

            const reception = {

                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                phone_number: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                date: {
                    type: Sequelize.DATE,
                    allowNull: true
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                middle_name: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                surname: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                age: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                service_id: {
                    type: Sequelize.INTEGER,
                    foreignKey: true,
                    allowNull: false,
                    references: {
                        model: 'medical_service',
                        key: 'id'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }

            };

            queryInterface.createTable('reception', reception);

            const comment = {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                commentText: {
                    type: Sequelize.TEXT,
                    allowNull: false
                },
                created_at: {
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.fn('now')
                },
                user_id: {
                    type: Sequelize.INTEGER,
                    foreignKey: true,
                    allowNull: false,
                    references: {
                        model: 'user',
                        key: 'id'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            };

            queryInterface.createTable('comment', comment);

        } catch (e) {
            console.log(e);
        }
    },

    down: async (queryInterface, Sequelize) => {

        await queryInterface.dropTable('comment');
        await queryInterface.dropTable('oauth_token');
        await queryInterface.dropTable('reception');
        await queryInterface.dropTable('user');
        await queryInterface.dropTable('user_role');
        await queryInterface.dropTable('user_status');
        await queryInterface.dropTable('user_speciality');
        await queryInterface.dropTable('gender');
        await queryInterface.dropTable('medical_service')

    }
};
