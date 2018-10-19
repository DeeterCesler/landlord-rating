const express = require("express");
const router = express.Router();
const LandLord = require("../models/landlords");

router.get("/", (req, res) => {
    res.render("landlords/new.ejs");
})


module.exports = router;