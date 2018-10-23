const express = require('express');
const router = express.Router();
const requireLogin = require("../middleware/requireLogin");
const Reviews = require('../models/reviews');
const Landlords = require('../models/landlords')
const Users = require('../models/users')


// Reviews Index Route
router.get('/', async (req, res) => {
    try {
        const foundLandlords = await Landlords.find({});
        const foundReviews = await Reviews.find({}).populate("landlord");
        // const foundUsers = await Users.find({});
        res.render('reviews/index.ejs', {
           landlords: foundLandlords,
           reviews: foundReviews,
        //    users: foundUsers,
        })
    } catch (err) {
        res.send(err)
    }
  })

// Reviews New Route
router.get('/new', requireLogin, async (req,res) => {
    const foundLandlords = await Landlords.find({});
    res.render('reviews/new.ejs', {
        landlords: foundLandlords,
        user: req.session.userId
    })
})

// Create a review route
router.post('/', async (req, res)=> {
    try{
        console.log('gettin here')
        await Reviews.create(req.body);
        console.log(req.body)
        res.redirect('/reviews')
    }catch(err){
        res.send(err);
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
        await Reviews.findByIdAndDelete(req.params.id);
        console.log('deleting')
        res.redirect('/reviews');
    } catch(err){
        res.send(err);
    }
})

// Reviews Edit Route

router.get('/:id/edit', async (req, res)=>{
    try {
      const foundReview = await Reviews.findById(req.params.id);
      res.render('reviews/edit.ejs', {
        review: foundReview,
      });

    } catch (err){
        res.send(err)
    }
  });
  

router.put('/:id', async (req, res)=>{
   try {
    await Reviews.findOneAndUpdate(req.params.id, req.body);
    res.redirect('/reviews');
   } catch (err) {
    res.send(err)
   }
   
  });
  
  module.exports = router;