const express = require('express');
const router = express.Router();
const requireLogin = require("../middleware/requireLogin");
const Reviews = require('../models/reviews');
const Landlords = require('../models/landlords')
const Users = require('../models/users')


// Reviews Index Route
router.get('/', async (req, res) => {
    try {
        // const foundLandlords = await Landlords.find({});
        const foundReviews = await Reviews.find({}).populate("landlord");
        const foundUser = await Users.find({});
        res.render('reviews/index.ejs', {
        //    landlords: foundLandlords,
           reviews: foundReviews,
           user: req.session.name,
        })
    } catch (err) {
        res.send(err)
    }
  })

// Reviews New Route
router.get('/new', requireLogin, async (req,res) => {
    try {
        const foundLandlords = await Landlords.find({});
        res.render('reviews/new.ejs', {
            landlords: foundLandlords,
            user: req.session.userId
        })
    } catch(err){
        console.log(err);
    }
})

// Create a review route
router.post('/', async (req, res)=> {
    try{
        console.log(req.body.user);
        console.log("HERE");
        const newReview = await Reviews.create(req.body);
        console.log(req.body.user);
        console.log("HERE");
        const allUsers = await Users.find();
        console.log(allUsers);
        const foundUser = await Users.findById(req.body.user);
        console.log(foundUser);
        foundUser.reviews.push(newReview._id);
        foundUser.save();
        res.redirect('/reviews');
    }catch(err){
        console.log(err);
    }

 });
 

// Reviews Show Route
router.get('/:id', async (req, res) => {
    try {
    const foundReview = await Reviews.findById(req.params.id);
    // const foundLandlord = await Landlords.findOne({'reviews._id': req.params.id});
    const foundUser = await Users.findOne({'reviews._id': req.params.id});
    res.render('reviews/show.ejs', {
        review: foundReview,
        // landords: foundLandlord,
        user: foundUser,
        })
    } catch (err) {
        res.send(err);
    }
})

// Reviews Delete Route

router.delete('/:id', async (req, res) => {
    try {
        const foundReview = await Reviews.findById(req.params.id).populate("user");
        const foundUser = foundReview.user;
        for(let i=0; i< foundUser.reviews.length; i++){
            if(foundUser.reviews[i].toString() === req.params.id.toString()){
                await foundUser.reviews.splice(i,1);
                foundUser.save();
            };
        };
        await Reviews.findByIdAndDelete(req.params.id);
        console.log('deleting')
        res.redirect('/users');
    } catch(err){
        console.log(err);
        res.send(err);
    }
})

// Reviews Edit Route

router.get('/:id/edit', async (req, res)=>{
    try {
      const foundReview = await Reviews.findById(req.params.id);
      const foundLandlords = await Landlords.find();
      res.render('reviews/edit.ejs', {
        review: foundReview,
        landlords: foundLandlords
      });

    } catch (err){
        res.send(err)
    }
  });
  

router.put('/:id', async (req, res)=>{
   try {
    const editedReview = await Reviews.findOneAndUpdate(req.params.id, req.body);
    editedReview.save();
    res.redirect('/reviews');
   } catch (err) {
    console.log(err);
    res.send(err)
   }
   
  });
  
  module.exports = router;