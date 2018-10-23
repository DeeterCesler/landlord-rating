const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema ({
    landlord: {type: String},
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
    user: {type: mongoose.Schema.Types.ObjectId, ref: "Users"},
    landlord: {type: mongoose.Schema.Types.ObjectId, ref: "Landord"}
})

module.exports = mongoose.model('Reviews', reviewsSchema);