const express = require("express");
const router = express.Router();
const User = require("../models/users");
const bcrypt = require("bcryptjs");

router.get("/login", (req, res) => {
    res.render("users/login.ejs");
})

router.post('/register', async (req, res) => {
    const password = req.body.password;
    const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(12));
    console.log(passwordHash)
    // Create an object to put into our database into the User Model
    const userEntry = {};
    userEntry.username = req.body.username;
    userEntry.password = passwordHash;
  
    const user = await User.create(userEntry);
    console.log(user);
    // initializing the session here
    // req.session.username = req.body.username;
    req.session.logged   = true;
    req.session.message  = '';
    res.redirect('/authors');
  });
  
  
  router.post('/login', async (req, res) => {
    //first query the database to see if the user exists
    try {
            const foundUser = await User.findOne({username: req.body.username});
            console.log(foundUser)
  
            if(foundUser){
            // if the users exists use the bcrypt compare password
            //to make sure the passwords match
              if(bcrypt.compareSync(req.body.password, foundUser.password)){
                req.session.logged = true;
  
                res.redirect('/authors')
              } else {
  
                req.session.message = 'Username or Password is Wrong';
                res.redirect('/auth/login')
              }
  
  
          } else {
                req.session.message = 'Username or Password is Wrong';
                res.redirect('/auth/login')
          } // end of foundUser
  
  
  
  
    } catch(err) {
      res.send('error')
    }
  
  
  
  
  });
  
  
  
  
  router.get('/logout', (req, res) => {
    // this basically restarts the session
    // and clears out all the properties that we set
    // on the session object
    req.session.destroy((err) => {
      if(err){
        res.send(err);
      } else {
        res.redirect('/auth/login')
      }
    });
  });
  
  
  
  
  module.exports = router;