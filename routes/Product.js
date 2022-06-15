const express = require("express");
const router = express.Router();
const product = require("../Models/Product");
const path = require("path");
const multer = require("multer");

// app.use('/uploads/images', express.static(path.join(__dirname, 'public')));

// Get all product
router.get("/", (req, res) => {
  product.findAll()
    .then((product) => {      
      res.json(product);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

// Get product information from id
router.get("/:id", (req, res) => {
  var { id } = req.params;
  product.findAll({
    where: {
      id: id
    },
  })
    .then((product) => {
      console.log(Object.keys(product).length);
      // if(Object.keys(customer).length == 1) {
      //   res.send(customer);
      // } else {
      //   res.sendStatus(400);
      // }
      res.json(product);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

// Get Shopper's Product from Shopper ID
router.get("/shopper/:id", (req, res) => {
  var { id } = req.params;
  product.findAll({
    where: {
      shopper_id: id
    },
  })
    .then((product) => {
      console.log(Object.keys(product).length);
      // if(Object.keys(customer).length == 1) {
      //   res.send(customer);
      // } else {
      //   res.sendStatus(400);
      // }
      res.json(product);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});



// Uploading images
var storage = multer.diskStorage({  
  destination: "./uploads/product_image",
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });


router.post("/add", upload.single("image"), (req, res) => {
  
  // Checking if file is empty or undefined
  if (req.file === 'undefined' || req.file == null) {
    return res.status(422).send("Image cannot be empty");
  }

  // Retrieving all necessary data
  const data = {
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    price: parseFloat(req.body.price),
    num_sold: 0,
    image: req.file.filename,
    shopper_id: req.body.shopper_id
  };

  let { name, description, category, price, num_sold, image, shopper_id } = data;

  // Inserting data into database
  product.create({
    name, description, category, price, num_sold, image, shopper_id
  }).then((product) => {
    res.send(product);
  });  
});

// Updating Product Info
router.patch("/update/:id", upload.single("image"), (req,res) => {
  var { id } = req.params;
  var data;

  if (req.file == null) {
    data = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,    
      image: req.body.image
    }
  } else {
    data = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,    
      image: req.file.filename
    }
  }

  let { name, description, price, category, image } = data;
  
  product.update({
    name: name,
    description: description,
    price: price,
    category: category,
    image: image
  }, {
    where: {
      id: id
    }
  }).then((product) => {
    res.json(product);
  }).catch((err) => {
    console.log(err);
    res.sendStatus(400);
  });
});

// Delete Product
router.delete("/delete/:id", (req,res) => {
  var { id } = req.params;
  product.destroy({
    where: {
      id: id
    }
  }).then(res.sendStatus(200));
});


module.exports = router;