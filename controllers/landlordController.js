const express = require("express");
const router = express.Router();
const Landlord = require("../models/landlords");

router.get("/", async (req, res) => {
    try {
        const foundLandlords = await Landlord.find({});
        res.render("landlords/index.ejs", {
            landlords: foundLandlords
        });
    }catch(err){
        res.send(err);
    };
});

router.get("/new", (req, res) => {
    res.render("landlords/new.ejs");
});

router.post("/", async (req, res) => {
    await Landlord.create(req.body);
    console.log(req.body);
    res.redirect("/landlords");
});

module.exports = router;