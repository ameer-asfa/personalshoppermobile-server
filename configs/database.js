const Sequelize = require("sequelize");
module.exports = new Sequelize("fypadmin", "root", "", {
  host: "localhost",
  port: "3306",
  dialect: "mysql",
  operatorsAliases: 0,
  logging: true,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    paranoid: true,
  },
});