const express = require('express');
const router = express.Router();

const Reviews = require('../models/reviews');
const Landlords = require('../models/landlords')

router.get('/', async (req, res) => {
    try {
        const foundLandlords = await Landlord.find({});
        const foundReviews = await Reviews.find({});
        const foundUsers = await 
        res.render('reviews/index.ejs', {
           landords: foundLandlords,
           reviews: foundReviews
        })
    }

})


module.exports = router;