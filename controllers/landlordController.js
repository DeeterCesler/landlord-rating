const express = require("express");
const router = express.Router();
const LandLord = require("../models/landlords");

router.get("/", async (req, res) => {
    try {
        const foundLandlords = await LandLord.find({});
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
    await LandLord.create(req.body);
    console.log(req.body);
    res.redirect("/landlords");
});

module.exports = router;