const express = require("express");
const router = express.Router();
const User = require("../models/users");
const bcrypt = require("bcryptjs");

router.get("/register", (req, res) => {
    res.render("auth/register.ejs", {
        user: null
    });
});

router.get("/login", (req, res) => {
    res.render("auth/login.ejs", {
        message: req.session.message,
        user: null
    });
});

router.post('/register', async (req, res) => {
    const password = req.body.password;
    const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(12));
    // Create an object to put into our database into the User Model
    const userEntry = {};
    userEntry.username = req.body.username;
    userEntry.password = passwordHash;
    userEntry.email = req.body.email;
    userEntry.name = req.body.name;
    const user = await User.create(userEntry);
    // initializing the session here
    req.session.username = req.body.username;
    req.session.name = req.body.name;
    req.session.logged   = true;
    req.session.message  = '';
    res.redirect('/');
});
  
  
router.post('/login', async (req, res) => {
    //first query the database to see if the user exists
    try {
        const foundUser = await User.findOne({username: req.body.username});
        if(foundUser){
        // if the users exists use the bcrypt compare password
        //to make sure the passwords match
            if(bcrypt.compareSync(req.body.password, foundUser.password)){
                req.session.logged = true;
                req.session.username = foundUser.username;
                req.session.name = foundUser.name;
                req.session.userId = foundUser._id;
                res.redirect('/')
            } else {
                req.session.message = 'Username or Password is Wrong';
                res.redirect('/auth/login');
            }
    } else {
            req.session.message = 'Username or Password is Wrong';
            res.redirect('/auth/login');
    } // end of foundUser
    } catch(err) {
        console.log(err);
        res.send(err);
    }
});
  
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err){
            res.send(err);
        } else {
            res.redirect('/')
        }
    });
});
  
  
module.exports = router;