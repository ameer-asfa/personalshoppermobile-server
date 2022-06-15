const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./configs/database");
const clc = require("cli-color");
const morgan = require("morgan");
const order = require("./Models/Order");
const Cart = require("./Models/Cart");
const CartProduct = require("./Models/CartProduct");
const OrderProduct = require("./Models/OrderProduct");
const Shopper = require("./Models/Shopper");
const Order = require("./Models/Order");


// Logging activity
app.use(morgan("dev"));
app.use("/uploads/product_image", express.static("uploads/product_image"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
  
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });

  // Test DB
db.authenticate()
.then(() =>
  console.log(clc.blue(clc.cyan.bold("[server]") + " Database connected..."))
)
.catch((err) => console.log("Error: " + err));

  // General routes
app.use('/login', require("./routes/Login"));
app.use('/sign_up', require("./routes/Signup"));
app.use('/profile', require("./routes/Profile"));
app.use('/product', require("./routes/Product"));
app.use('/cart', require("./routes/Cart"));
app.use('/order', require("./routes/Order"));

// db.sync({force: true});

// Custom 404 handler
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
  });
  
  // Error response
  app.use((error, req, res, next) => {
    console.log(error);
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message,
      },
    });
  });

  
  
  module.exports = app;