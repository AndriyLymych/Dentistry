'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.sequelize.query(
      `INSERT INTO gender(id, label) VALUES (1, 'male'), (2, 'female')`
    );

    await queryInterface.sequelize.query(
      `INSERT INTO user_role(id, label) VALUES (1, 'admin'), (2, 'patient'), (3, 'doctor')`
    );

    await queryInterface.sequelize.query(
      `INSERT INTO user_status(id, label) VALUES (1, 'active'), (2, 'blocked')`
    );

    await queryInterface.sequelize.query(
      `INSERT INTO user_speciality(id, label) VALUES (1, 'orthodontist'), (2, 'orthopaedist'), (3, 'therapist'), (4, 'surgeon')`
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
    ); //TODO roles and another constant have to takes from enums!
    // TODO you have bug with password. When you will login bcrypt will throw an error because Pa$$w0rd have not valid hash-sum
  }
};
