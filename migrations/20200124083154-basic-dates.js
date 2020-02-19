'use strict';
const {USER_ROLE,USER_STATUS,GENDER, DB_TABLE_NAME} = require('../constant');

// console.log(defaultAdminDates.password);
module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.sequelize.query(
      `INSERT INTO ${DB_TABLE_NAME.GENDER}( label) VALUES ( 'male'), ('female')`
    );

    await queryInterface.sequelize.query(
      `INSERT INTO ${DB_TABLE_NAME.USER_ROLE} (label) VALUES ( 'admin'), ('patient'), ('doctor')`
    );

    await queryInterface.sequelize.query(
      `INSERT INTO ${DB_TABLE_NAME.USER_STATUS} ( label) VALUES ('active'), ( 'blocked')`
    );

    await queryInterface.sequelize.query(
      `INSERT INTO ${DB_TABLE_NAME.USER_SPECIALITY} ( label) VALUES ( 'orthodontist'), ('orthopaedist'), ('therapist'), ('surgeon')`
    );

    await queryInterface.sequelize.query(
      `INSERT INTO ${DB_TABLE_NAME.USER}(
                    email,
                    password, 
                    name, 
                    middleName,
                    surname,
                    age,
                    city,
                    role_id, 
                    status_id,
                    gender_id
                 ) 
                  VALUE (
                    'lymychandriy@gmail.com',
                    '$2b$10$7z2WEkOZLLUzcQcTbEkeLuKaO6q9l8ou6uNiIposfpjdiO8kXAPG2',
                    'Андрій',
                    'Володимирович',
                    'Лимич',
                    26,
                    'Львів',
                    ${USER_ROLE.ADMIN},
                    ${USER_STATUS.ACTIVE},
                    ${GENDER.MALE}
                    
                 )`
    // $2b$10$7z2WEkOZLLUzcQcTbEkeLuKaO6q9l8ou6uNiIposfpjdiO8kXAPG2 -> Pa$$w0rd
    );
  }
  //TODO hash password
};
