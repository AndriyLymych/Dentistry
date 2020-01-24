'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

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

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
