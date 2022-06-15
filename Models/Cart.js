const Sequelize = require("sequelize");
const db = require("../configs/database");
const Customer = require("../Models/Customer");

const Cart = db.define("cart", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    }
});

Customer.hasOne(Cart, {
    foreignKey: 'customerId',
});
Cart.belongsTo(Customer);

module.exports = Cart;