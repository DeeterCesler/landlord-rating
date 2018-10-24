const express = require("express");
const router = express.Router();
const User = require("../models/users");
const Reviews = require("../models/reviews");

// show route
router.get("/", async (req, res) => {
    try {
        const foundUser = await User.findOne({username: req.session.username}).populate("reviews");;
        const userReviews = await Reviews.find({user: foundUser._id}).populate("landlord");
        console.log(foundUser);
        res.render("users/index.ejs", {
            user: foundUser,
            reviews: userReviews
        });
    }catch(err){
        console.log("WHOOPSIE")
        res.send(err)
    }
});

// new and post user is in the register route

// edit user
router.get("/edit", async (req, res) => {
    try {
        const foundUser = await User.findOne({username: req.session.username});
        res.render("users/edit.ejs", {
            user: foundUser
        });
    }catch(err){
        console.log("WHOOPSIE")
        res.send(err)
    }
});

// update user
router.put("/", async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate({username: req.session.username}, req.body, {new: true});
        req.session.username = updatedUser.username;
        res.redirect("/users");
    }catch(err){
        console.log("WHOOPSIE DAISY")
        res.send(err)
    }
});

// delete user
router.delete("/delete", async (req, res) => {
    console.log(req.session.userId);
    await User.findByIdAndDelete(req.session.userId);
    req.session.destroy();
    res.redirect("/");
});


router.get("/new", async (req, res) => {
    try{
        res.redirect("/auth/register")

    } catch (err) {
        res.send(err)
    }
})
module.exports = router;