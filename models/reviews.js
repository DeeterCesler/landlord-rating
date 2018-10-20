const mongoose = require('mongoose');

const rewiewsSchema = new mongoose.Schema ({
    name : {type: String, required: true},
    address: {type: String, required: true},
    rating: {
        type     : Number,
        required : true,
        unique   : true,
        validate : {
            validator : Number.isInteger,
            message   : `{VALUE} is not an integer value`
        },
    comment:{type: String},
    dateStart: {type: Date},
    dateEnd : {type: Date},
    user: {type: mongoose.Schema.Types.ObjectId, required: "Users"},
    landlord: {type: mongoose.Schema.Types.ObjectId, required: "Landord"}
}})

module.export = mongoose.model('Reviews', reviewsSchema);