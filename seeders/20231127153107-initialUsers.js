'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        Email: 'happyjungsoo@naver.com',
        NickName: 'Jade',
        Password: 'qweqaz123456',
      },
      {
        id: 2,
        Email: 'haeyeon@naver.com',
        NickName: 'Umi',
        Password: '123456qweqaz',
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  },
}
