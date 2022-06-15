const Sequelize = require("sequelize");
const db = require("../configs/database");

const Product = db.define("product", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    category: {
        type: Sequelize.STRING,        
    },
    price: {
        type: Sequelize.FLOAT,
    },
    num_sold: {
        type: Sequelize.INTEGER,        
        defaultValue: 0,
    },    
    image: {
        type: Sequelize.STRING,
    },
    shopper_id: {
        type: Sequelize.UUID
    }    
});


module.exports = Product;