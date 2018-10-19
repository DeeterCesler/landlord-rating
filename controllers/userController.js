const express = require("express");
const router = express.Router();
// const User = require("../models/users");

router.get("/",async (req, res) => {
    try {
        const foundUsers = await User.find();
        res.render("users/index.ejs")
    }catch(err){
        res.send(err)
    }
})

module.exports = router;