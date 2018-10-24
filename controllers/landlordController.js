const express = require("express");
const router = express.Router();
const Landlord = require("../models/landlords");

router.get("/", async (req, res) => {
    try {
        const foundLandlords = await Landlord.find({});
        res.render("landlords/index.ejs", {
            landlords: foundLandlords,
            user: req.session.name
        });
    }catch(err){
        res.send(err);
    };
});

router.get("/new", (req, res) => {
    res.render("landlords/new.ejs");
});

router.post("/search", async (req, res) => {
    const foundLandlords = await Landlord.find({name: req.body.q});
    res.render('landlords/search.ejs', {
        landlords: foundLandlords,
        query: req.body.q
    })
})



router.post("/", async (req, res) => {
    const newLandlord = await Landlord.create(req.body);
    res.redirect("/reviews/new");
});

// edit landlord
router.get("/:id/edit", async (req, res) => {
    try {
        const foundLandlord = await Landlord.findById(req.params.id);
        console.log(foundLandlord);
        res.render("landlords/edit.ejs", {
            landlord: foundLandlord
        });
    }catch(err){
        console.log("WHOOPSIE")
        res.send(err)
    }
});

// update landlord
router.put("/:id", async (req, res) => {
    try {
        const updatedLandlord = await Landlord.findByIdAndUpdate(req.params.id, req.body);
        res.redirect("/landlords");
    }catch(err){
        console.log("WHOOPSIE DAISY")
        res.send(err)
    }
});

// delete user
router.delete("/:id", async (req, res) => {
    console.log("Twerking");
    try{
        await Landlord.findByIdAndDelete(req.params.id);
        res.redirect("/landlords");
    }catch(err){
        console.log(err);
    }
});

module.exports = router;