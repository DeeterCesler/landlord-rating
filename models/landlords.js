const mongoose = require("mongoose");

const landlordSchema = new mongoose.Schema({
    name: {type: String, required: true},
    rating: {
        type     : Number,
        required : true,
        unique   : true,
        validate : {
            validator : Number.isInteger,
            message   : `{VALUE} is not an integer value`
        },
    zip: Number
}});

module.exports = mongoose.model("Landlord", landlordSchema);