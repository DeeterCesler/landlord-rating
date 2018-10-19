const mongoose = require('mongoose');

const rewiewsSchema = new mongoose.Schema ({
    name : {type: String, required: true},
    address: {type: String, required: true},
    rating: {type: Number, required: true},
    comment:{type: String},
    dateStart: {type: Date},
    dateEnd : {type: Date},
    user: {type: mongoose.Schema.Types.ObjectId, required: "Users"},
    landlord: {type: mongoose.Schema.Types.ObjectId, required: "Landord"}
})