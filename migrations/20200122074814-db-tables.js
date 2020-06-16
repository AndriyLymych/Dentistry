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
        USER_STATUS,
        DOCTOR_RATING
    }
} = require('../constant');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            // await queryInterface.sequelize.query(
            //     `ALTER DATABASE ${queryInterface.sequelize.config.database}
            //              CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;`
            // );

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

            await queryInterface.createTable(MEDICAL_SERVICE, medicalService);

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

            await queryInterface.createTable(GENDER, gender);

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

            await queryInterface.createTable(USER_ROLE, userRole);

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

            await queryInterface.createTable(USER_SPECIALITY, userSpeciality);

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

            await queryInterface.createTable(USER_STATUS, userStatus);

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
                        model: USER_ROLE,
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
                        model: USER_SPECIALITY,
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
                        model: USER_STATUS,
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
                        model: GENDER,
                        key: 'id'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            };

            await queryInterface.createTable(USER, user);

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
                        model: USER,
                        key: 'id'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            };

            await queryInterface.createTable(OAUTH_TOKEN, oAuthToken);

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
                email: {
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
                service_id: {
                    type: Sequelize.INTEGER,
                    foreignKey: true,
                    allowNull: false,
                    references: {
                        model: MEDICAL_SERVICE,
                        key: 'id'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                },
                count_mail: {
                    type: Sequelize.INTEGER,
                    allowNull: true,

                }
            };

            queryInterface.createTable(RECEPTION, reception);

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
                        model: USER,
                        key: 'id'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                },
                doctor_id: {
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

            queryInterface.createTable(COMMENT, comment);

            const doctorRating = {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                mark: {
                    type: Sequelize.INTEGER,
                    allowNull: false
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
                },
                doctor_id: {
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

            queryInterface.createTable(DOCTOR_RATING, doctorRating);

        } catch (e) {
            console.log(e);
        }
    },

    down: async (queryInterface, Sequelize) => {

        await queryInterface.dropTable(COMMENT);
        await queryInterface.dropTable(DOCTOR_RATING);
        await queryInterface.dropTable(OAUTH_TOKEN);
        await queryInterface.dropTable(RECEPTION);
        await queryInterface.dropTable(USER);
        await queryInterface.dropTable(USER_ROLE);
        await queryInterface.dropTable(USER_STATUS);
        await queryInterface.dropTable(USER_STATUS);
        await queryInterface.dropTable(GENDER);
        await queryInterface.dropTable(MEDICAL_SERVICE)

    }
};
