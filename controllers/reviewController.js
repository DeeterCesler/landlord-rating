const express = require('express');
const router = express.Router();

const Reviews = require('../models/reviews');
const Landlords = require('../models/landlords')
const Users = require('../models/users')

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

router.get('/new', async (req,res) => {
    const foundLandlords = await Landlords.find({});
    const foundUser = await Users.findById({});
    res.render('reviews/new.ejs', {
        landords: foundLandlords,
        users: foundUser,
    })
})

router.get('/:id', async (req, res) => {
    try {
    const foundReview = await Reviews.findById(req.params.id);
    const foundLandlord = await Landlords.findOne({'reviews._id': req.params.id});
    const foundUser = await Users.findOne({'reviews._id': req.params.id});
    res.render('reviews/show.ejs', {
        reviews: foundReview,
        landords: foundLandlord,
        user: foundUser,
        })
    } catch err {

    }
})



module.exports = router;