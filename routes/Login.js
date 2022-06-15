const express = require("express");
const router = express.Router();
const customer = require("../Models/Customer");
const shopper = require("../Models/Shopper");

router.post("/", (req, res) => {
  var {email, password, role} = req.body;
  if(role == 'Customer'){
    customer.findOne({
      where: {
        email: email,
        password: password
      },
    })
      .then((customer) => {
        if(customer != null) {
          res.json(customer);
          res.sendStatus(200);
        } else {
          res.sendStatus(400);
        }
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  } else {
    shopper.findOne({
      where: {
        email: email,
        password: password
      },
    })
      .then((shopper) => {
        console.log(shopper);
        if(shopper != null) {
          res.json(shopper);
          res.sendStatus(200);
        } else {
          res.sendStatus(400);
        }
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  }
});


module.exports = router;