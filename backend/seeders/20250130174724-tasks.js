'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Tasks", [
      {
        date: new Date(),
        title: "Tarea 1",
        description: "Descripcion de tarea 1",
        content: "lorem ipsum dolor sit amet loremp ipsum dolor sit amet",
      },
      {
        date: new Date(),
        title: "Tarea 2",
        description: "Descripcion de tarea 2",
        content: "lorem ipsum dolor sit amet loremp ipsum dolor sit amet",
      },
      {
        date: new Date(),
        title: "Tarea 3",
        description: "Descripcion de tarea 3",
        content: "lorem ipsum dolor sit amet loremp ipsum dolor sit amet",
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
