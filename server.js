// requires
const express = require("express");
const app = express();
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
// require("./db/db");
const userController = require("./controllers/userController");
const authController = require("./controllers/authController");
const landlordController = require("./controllers/landlordsController");

// middleware
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: false}));

// routes
app.use("/users", userController);
app.user("/auth", authController);
app.user("/landlords", authController);
app.get("/", (req, res)=> {
    res.send("THIS SHIT LIVE");
})

const port = 3000;
app.listen(port, () => {
    console.log(`LIVE @ ${port}`);
})