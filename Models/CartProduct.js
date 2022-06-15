const Sequelize = require("sequelize");
const db = require("../configs/database");
const Cart = require("../Models/Cart");
const Product = require("../Models/Product");

const CartProduct = db.define("cart_product", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    price: {
        type: Sequelize.FLOAT,
    },
    status: {
        type: Sequelize.STRING
    }
});

Cart.belongsToMany(Product, {through: CartProduct, targetKey: 'price'});
Product.belongsToMany(Cart, {through: CartProduct});


module.exports = CartProduct;