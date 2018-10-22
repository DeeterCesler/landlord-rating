const express = require('express');
const router = express.Router();

const Reviews = require('../models/reviews');
const Landlords = require('../models/landlords')
const Users = require('../models/users')


// Reviews Index Route
router.get('/', async (req, res) => {
    try {
        const foundLandlords = await Landlords.find({});
        const foundReviews = await Reviews.find({});
        const foundUsers = await Users.find({});
        res.render('reviews/index.ejs', {
           landords: foundLandlords,
           reviews: foundReviews,
           users: foundUsers,
        })
    } catch (err) {
        res.send(err)
    }
  })


// Reviews New Route
router.get('/new', async (req,res) => {
    // const foundLandlords = await Landlords.find({});
    // const foundUser = await Users.findById({});
    res.render('/reviews/new.ejs', {
        // landords: foundLandlords,
        // users: foundUser,
    })
})


// Reviews Show Route
router.get('/:id', async (req, res) => {
    try {
    const foundReview = await Reviews.findById(req.params.id);
    const foundLandlord = await Landlords.findOne({'reviews._id': req.params.id});
    const foundUser = await Users.findOne({'reviews._id': req.params.id});
    res.render('/reviews/show.ejs', {
        reviews: foundReview,
        landords: foundLandlord,
        user: foundUser,
        })
    } catch (err) {
        res.send(err);
    }
})


// Create a review route
router.post('/', async (req, res)=> {
   const createdReview = await Reviews.create(req.body);
   res.redirect('/reviews')
});

module.exports = router;