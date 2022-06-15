const express = require("express");
const router = express.Router();
const customer = require("../Models/Customer");
const shopper = require("../Models/Shopper");

// Get customer information from id
router.get("/customer/:id", (req, res) => {
  var { id } = req.params;
  customer.findOne({
    where: {
      id: id
    },
  })
    .then((customer) => {
      console.log(Object.keys(customer).length);
      // if(Object.keys(customer).length == 1) {
      //   res.send(customer);
      // } else {
      //   res.sendStatus(400);
      // }
      res.json(customer);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

// Get Shopper information from id
router.get("/shopper/:id", (req, res) => {
  var { id } = req.params;
  shopper.findOne({
    where: {
      id: id
    },
  })
    .then((shopper) => {     
      res.json(shopper);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

// Update customer info
router.patch("/update/customer/:id", (req, res) => {
  const data = {
    email: req.body.email,
    username: req.body.username,
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    state: req.body.state,
  };
  let { email, username, name, address, phone, state } = data;
  var { id } = req.params;
  customer.update({
    email: email,
    username: username,
    name: name,
    address: address,
    phone: phone,
    state: state,
  }, {
    where: {
      id: id
    }
  })
    .then((customer) => {
      console.log(Object.keys(customer).length);
      res.json(customer);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

// Update shopper info
router.patch("/update/shopper/:id", (req, res) => {
  const data = {
    email: req.body.email,
    username: req.body.username,
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    state: req.body.state,
  };
  let { email, username, name, address, phone, state } = data;
  var { id } = req.params;
  shopper.update({
    email: email,
    username: username,
    name: name,
    address: address,
    phone: phone,
    state: state,
  }, {
    where: {
      id: id
    }
  })
    .then((shopper) => {
      res.json(shopper);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

// Update customer password
router.patch("/update_password/customer/:id", (req, res) => {
  var { password } = req.body;  
  var { id } = req.params;
  customer.update({
    password: password
  }, {
    where: {
      id: id
    }
  })
    .then((customer) => {
      console.log(Object.keys(customer).length);
      res.json(customer);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

// Update shopee password
router.patch("/update_password/shopper/:id", (req, res) => {
  var { password } = req.body;  
  var { id } = req.params;
  shopper.update({
    password: password
  }, {
    where: {
      id: id
    }
  })
    .then((shopper) => {      
      res.json(shopper);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});


module.exports = router;