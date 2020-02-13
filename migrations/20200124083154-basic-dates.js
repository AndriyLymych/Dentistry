'use strict';
const {USER_ROLE,USER_STATUS,GENDER,defaultAdminDates} =require('../constant');

console.log(defaultAdminDates.password);
module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.sequelize.query(
      `INSERT INTO gender( label) VALUES ( 'male'), ('female')`
    );

    await queryInterface.sequelize.query(
      `INSERT INTO user_role(label) VALUES ( 'admin'), ('patient'), ('doctor')`
    );

    await queryInterface.sequelize.query(
      `INSERT INTO user_status( label) VALUES ('active'), ( 'blocked')`
    );

    await queryInterface.sequelize.query(
      `INSERT INTO user_speciality( label) VALUES ( 'orthodontist'), ('orthopaedist'), ('therapist'), ('surgeon')`
    );

    await queryInterface.sequelize.query(
      `INSERT INTO user(
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
                    'Pa$$w0rd',
                    'Андрій',
                    'Володимирович',
                    'Лимич',
                    26,
                    'Львів',
                    ${USER_ROLE.ADMIN},
                    ${USER_STATUS.ACTIVE},
                    ${GENDER.MALE}
                    
                 )`
    );
  }
  //TODO hash password
};
