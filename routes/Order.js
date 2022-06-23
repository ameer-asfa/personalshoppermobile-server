const express = require("express");
const router = express.Router();
const order = require('../Models/Order');
const cart = require('../Models/Cart');
const OrderProduct = require("../Models/OrderProduct");
const product = require('../Models/Product');
const cartProduct = require('../Models/CartProduct');
const customer = require('../Models/Customer');

order.belongsToMany(product, { through: OrderProduct });
product.belongsToMany(order, { through: OrderProduct });


// Complete payment
router.post("/", (req, res) => {
    const data = {
        cartId: req.body.cartId,
        order_date: req.body.order_date,
        status: req.body.status,
        total: req.body.total
    };

    let { cartId, order_date, status, total } = data;

    var productIdArray = []; //Creating array of product to map to order

    cart.findOne({
        where: {
            id: cartId
        },
        include: [{
            model: product,
            through: { where: { status: 'in_cart' } }
        }]
    }).then((data) => {

        // Mapping product id for each order
        for (let i = 0; i < Object.keys(data.products).length; i++) {
            productIdArray.push(data.products[i]['id']);
        }

        order.create({
            cartId,
            order_date,
            status,
            total,
            quantity: productIdArray.length,
            shopperId: data.products[0]['shopper_id']
        }).then((orderData) => {
            for (let i = 0; i < productIdArray.length; i++) {
                OrderProduct.create({
                    orderId: orderData.id,
                    productId: productIdArray[i]
                });

                // Updating the number of product sold after each payment
                product.update({
                    num_sold: data.products[i]['num_sold'] + 1,
                }, {
                    where: {
                        id: productIdArray[i]
                    }
                });
            }

        }).catch((err) => {
            console.log(err);
        });

        // Updating existing product to completed after payment
        cartProduct.update({
            status: 'completed'
        }, {
            where: {
                cartId: cartId
            }
        });

        res.sendStatus(200);
    }).catch((err) => {
        console.log(err);
    });

});

// Get all order from CartId
router.get('/get/customer/:id', (req, res) => {
    var { id } = req.params;

    order.findAll({
        where: {
            cartId: id
        },
        order: [
            ['order_date', 'DESC'],
            ['status', 'DESC'],
        ],
    }).then((data) => {
        res.send(data);
    });
});

// Get all order from ShopperID
router.get('/get/shopper/:id', (req, res) => {
    var { id } = req.params;

    order.findAll({
        where: {
            shopperId: id
        },
        order: [
            ['order_date', 'DESC'],
            ['status', 'DESC'],
        ],
    }).then((data) => {
        res.send(data);
    });
});

// Get order from OrderId 
router.get('/getOrder/:id', (req, res) => {
    var { id } = req.params;

    order.findOne({
        where: {
            id: id
        },
    }).then((data) => {
        res.send(data);
    }).catch((err) => {
        console.log(err);
    });
});

// Get All Product from OrderId 
router.get('/getProduct/:id', (req, res) => {
    var { id } = req.params;

    order.findOne({
        where: {
            id: id
        },
        include: [{
            model: product
        }]
    }).then((data) => {
        res.send(data.products);
    }).catch((err) => {
        console.log(err);
    });
});

// Get customer address from OrderID
router.get('/getCustomer/:id', (req, res) => {
    var { id } = req.params;

    order.findOne({
        where: {
            id: id
        },
        attributes: ['cartId'],
        include: [{
            model: cart,
            attributes: ['customerId'],
            include: [{
                model: customer,
                attributes: ['address']
            }]
        }]
    }).then((data) => {
        res.send(data.cart.customer.address);
    }).catch((err) => {
        console.log(err);
    });
});

// Updating Tracking Number
router.patch('/update/:id', (req, res) => {
    var { id } = req.params;
   
    const data = {
        shipping_courier: req.body.shipping_courier,
        tracking_number: req.body.tracking_number,  
        shipping_date: req.body.shipping_date      
    };
    let { shipping_courier, tracking_number, shipping_date } = data;

    order.update({
        shipping_courier,
        tracking_number,
        shipping_date,
        status: 'In Shipping'
    }, {
        where: {
            id: id
        },
    }).then(() => {
        res.sendStatus(200);
    }).catch((err) => {
        console.log(err);
    });
});

// Update Completed Order 
router.patch('/update/order/:id', (req, res) => {
    var { id } = req.params;
   
    order.update({        
        status: 'Completed'
    }, {
        where: {
            id: id
        },
    }).then(() => {
        res.sendStatus(200);
    }).catch((err) => {
        console.log(err);
    });
});

module.exports = router;