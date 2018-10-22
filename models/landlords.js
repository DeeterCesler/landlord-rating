const mongoose = require("mongoose");

const landlordSchema = new mongoose.Schema({
    name: {type: String, required: true},
    rating: {
        type     : Number,
        required : true,
        validate : {
            validator : Number.isInteger,
            message   : `{VALUE} is not an integer value`
        }},
    zip: {
        type     : Number,
        required : true,
        validate : {
            validator : Number.isInteger,
            message   : `{VALUE} is not an integer value`
        }},
});

module.exports = mongoose.model("Landlord", landlordSchema);