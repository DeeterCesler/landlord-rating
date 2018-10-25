const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: ({type: String, required:true}),
    username: ({
        type: String, 
        required:true, 
        unique:true
    }),
    password: ({type: String, required: true}),
    email: ({type: String, required:true}),
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "Reviews"}]
})

module.exports = mongoose.model('Users', userSchema)


