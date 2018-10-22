const express = require("express");
const router = express.Router();
const User = require("../models/users");

router.get("/",async (req, res) => {
    try {
        const foundUsers = await User.find();
        res.render("users/index.ejs", {
            user: foundUser
        })
    }catch(err){
        res.send(err)
    }
})


router.get("/new", async (req, res) => {
    try{
        res.render("users/new.ejs")

    } catch (err) {
        res.send(err)
    }
})
module.exports = router;