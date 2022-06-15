const Sequelize = require("sequelize");
const db = require("../configs/database");
const Cart = require("../Models/Cart");
const Shopper = require("../Models/Shopper");

const Order = db.define("order", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    order_date: {
        type: Sequelize.DATEONLY
    },
    status: {
        type: Sequelize.STRING
    },
    total: {
        type: Sequelize.FLOAT
    },
    quantity: {
        type: Sequelize.INTEGER
    },
    shipping_date: {
        type: Sequelize.DATEONLY,
        allowNull: true
    },
    shipping_courier: {
        type: Sequelize.STRING,
        allowNull: true
    },
    tracking_number: {
        type: Sequelize.STRING,
        allowNull: true
    }
    
    
});


Cart.hasOne(Order);
Order.belongsTo(Cart);

Shopper.hasMany(Order);
Order.belongsTo(Shopper);

module.exports = Order;