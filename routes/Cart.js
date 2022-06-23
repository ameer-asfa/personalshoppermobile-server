const express = require("express");
const router = express.Router();
const cart = require("../Models/Cart");
const product = require("../Models/Product");
const cartProduct = require("../Models/CartProduct");


cart.belongsToMany(product, {
    through: cartProduct
});
product.belongsToMany(cart, {
    through: cartProduct
});

// Add Item to Cart
router.post("/add", (req, res) => {

    let customer_id = req.body.customerId;
    let productId = req.body.productId;

    cart.findOrCreate({
        where: { customerId: customer_id },
        raw: true
        // customerId: customer_id
    }).then((data) => {
        cartProduct.create({
            cartId: data[0].id,
            productId: productId,
            status: "in_cart",
            price: parseFloat(req.body.price)
        }).catch((err) => {
            console.log(err);;
        });
        res.sendStatus(200);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(400);
    });
});

// Get all products from cart database for one customer
router.get("/get/:id", (req,res) => {

    var { id } = req.params;    

    cart.findOne({
        where: {
            customerId: id,
        },
        include: [{
            model: product,
            through: { where: {status: 'in_cart'} }
        }]
    }).then(cart => {        
        res.send(cart.products);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(400);
    });
});

router.get('/getId/:id', (req,res) => {

    var { id } = req.params;
    cart.findOne({
        where: {
            customerId: id
        }
    }).then((data) => {
        res.send(data.id);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(400);
    });
});

router.delete('/delete/:cartId/:productId', (req,res) => {

    cartProduct.destroy({
        where: {
            cartId: req.params.cartId,
            productId: req.params.productId,
            status: 'in_cart'
        }
    }).then(() => {
        res.sendStatus(200);
    });

});


module.exports = router;