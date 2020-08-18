const mongoose = require ('mongoose');

const datadateSchema = new mongoose.Schema({
    letter : {
        type : String,
        required : true
    }, 
    frequency : {
        type : Number,
        required : true
    }
})

module.exports = mongoose.model('datadates', datadateSchema);