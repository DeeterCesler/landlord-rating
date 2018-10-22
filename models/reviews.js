const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema ({
    address: {type: String, required: true},
    rating: {
        type     : Number,
        required : true,
        validate : {
            validator : Number.isInteger,
            message   : `{VALUE} is not an integer value`
        },
    },
    comment: {type:String} ,
    dateStart: {type: Date},
    dateEnd : {type: Date},
    // user: {type: mongoose.Schema.Types.ObjectId, required: "Users"},
    // landlord: {type: mongoose.Schema.Types.ObjectId, required: "Landord"}
})

module.exports = mongoose.model('Reviews', reviewsSchema);