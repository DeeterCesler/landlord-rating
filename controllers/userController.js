const express = require("express");
const router = express.Router();
// const User = require("../models/users");

router.get("/",async (req, res) => {
    try {
        const foundUser = await User.find(req.session.id);
        res.render("users/index.ejs", {
            user: foundUser
        })
    }catch(err){
        res.send(err)
    }
})

module.exports = router;