const Sequelize = require("sequelize");
const db = require("../configs/database");

const Customer = db.define("customer", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    address: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    phone: {
        type: Sequelize.STRING,
    },
    state: {
        type: Sequelize.STRING,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

// Customer.sync({force:true});

module.exports = Customer;