const Sequelize = require("sequelize");
const db = require("../configs/database");
const Order = require("../Models/Order");
const Product = require("../Models/Product");

const OrderProduct = db.define("order_product", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
    }
});

Order.belongsToMany(Product, {through: OrderProduct});
Product.belongsToMany(Order, {through: OrderProduct});


module.exports = OrderProduct;