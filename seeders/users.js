"use strict";
const uuid = require("uuid");
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          email: "jim@example.com",
          first_name: "Jim",
          last_name: "One",
          password: await bcrypt.hash("123123", 12),
          sex: "male",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          email: "mike@example.com",
          first_name: "Mike",
          last_name: "One",
          password: await bcrypt.hash("123123", 12),
          sex: "male",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          email: "mikel@example.com",
          first_name: "Mikel",
          last_name: "One",
          password: await bcrypt.hash("123123", 12),
          sex: "male",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          email: "maral@example.com",
          first_name: "Maral",
          last_name: "Kim",
          password: await bcrypt.hash("123123", 12),
          sex: "female",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          email: "jimT@example.com",
          first_name: "Jim",
          last_name: "Two",
          password: await bcrypt.hash("123123", 12),
          sex: "male",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          email: "jenny@example.com",
          first_name: "Jenny",
          last_name: "Lee",
          password: await bcrypt.hash("123123", 12),
          sex: "female",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          email: "candy@example.com",
          first_name: "Candy",
          last_name: "Crush",
          password: await bcrypt.hash("123123", 12),
          sex: "female",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          email: "son@example.com",
          first_name: "Son",
          last_name: "Nos",
          password: await bcrypt.hash("123123", 12),
          sex: "male",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          email: "alisha@example.com",
          first_name: "Alisha",
          last_name: "Man",
          password: await bcrypt.hash("123123", 12),
          sex: "female",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          email: "john@example.com",
          first_name: "John",
          last_name: "Nhoj",
          password: await bcrypt.hash("123123", 12),
          sex: "male",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          email: "anna@example.com",
          first_name: "Anna",
          last_name: "Bill",
          password: await bcrypt.hash("123123", 12),
          sex: "female",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          email: "caroline@example.com",
          first_name: "Caroline",
          last_name: "Bee",
          password: await bcrypt.hash("123123", 12),
          sex: "female",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
