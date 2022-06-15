const express = require("express");
const router = express.Router();
const customer = require("../Models/Customer");
const shopper = require("../Models/Shopper");

router.post("/", (req, res) => {
    const data = {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        state: req.body.state,
        role: req.body.role
    };
    let { email, password, username, name, address, phone, state, role } = data;
    if(role == "Customer"){
        customer.create({
            email,
            password,
            username,
            name,
            address,
            phone,
            state,
            role
        }).then((customer) => {
            res.send(customer);
        });
    } else {
        shopper.create({
            email,
            password,
            username,
            name,
            address,
            phone,
            state,
            role
        }).then((shopper) => {
            res.send(shopper);
        });
    }    
});

module.exports = router;