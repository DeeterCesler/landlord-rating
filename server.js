// requires
const express = require("express");
const app = express();
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const session        = require('express-session');
require("./db/db");
const userController = require("./controllers/userController");
const authController = require("./controllers/authController");
const landlordController = require("./controllers/landlordController");

// middleware
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: 'This is some random secret string',
    resave: false,
    saveUninitialized: false
  }));

// routes
app.use("/users", userController);
app.use("/auth", authController);
app.use("/landlords", landlordController);
app.get("/", (req, res)=> {
    res.render("index.ejs");
})

const port = 3000;
app.listen(port, () => {
    console.log(`LIVE @ ${port}`);
})