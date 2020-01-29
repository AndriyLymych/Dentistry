'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.sequelize.query(
        `INSERT INTO gender(
                    label
                 ) 
                  VALUE (
                     'male'
                 )`
    );
    await queryInterface.sequelize.query(
        `INSERT INTO gender(
                    label
                 ) 
                  VALUE (
                     'female'
                 )`
    );

    await queryInterface.sequelize.query(
        `INSERT INTO user_role(
                    label
                 ) 
                  VALUE (
                     'admin'
                 )`
    );

    await queryInterface.sequelize.query(
        `INSERT INTO user_role(
                    label
                 ) 
                  VALUE (
                     'patient'
                 )`
    );

    await queryInterface.sequelize.query(
        `INSERT INTO user_role(
                    label
                 ) 
                  VALUE (
                     'doctor'
                 )`
    );

    await queryInterface.sequelize.query(
        `INSERT INTO user_status(
                    label
                 ) 
                  VALUE (
                     'active'
                 )`
    );

    await queryInterface.sequelize.query(
        `INSERT INTO user_status(
                    label
                 ) 
                  VALUE (
                     'blocked'
                 )`
    );

    await queryInterface.sequelize.query(
        `INSERT INTO user_speciality(
                    label
                 ) 
                  VALUE (
                     'orthodontist'
                 )`
    );

    await queryInterface.sequelize.query(
        `INSERT INTO user_speciality(
                    label
                 ) 
                  VALUE (
                     'orthopaedist'
                 )`
    );

    await queryInterface.sequelize.query(
        `INSERT INTO user_speciality(
                    label
                 ) 
                  VALUE (
                     'therapist'
                 )`
    );

    await queryInterface.sequelize.query(
        `INSERT INTO user_speciality(
                    label
                 ) 
                  VALUE (
                     'surgeon'
                 )`
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
                    'Andriy', 
                    'Volodymyrovych', 
                    'Lymych',
                     25,
                    'Lviv',
                    1,
                    1,
                    1
                 )`
    );



  },


};
