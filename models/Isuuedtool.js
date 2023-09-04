const mongoose = require('mongoose');

const issuedToolsSchema = new mongoose.Schema({
    toolCode: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    personName:{
        type:String,
        required:true
    },
    issuedDate: {
        type: Date,
        required: true
    }
    // You can add more properties as needed
});

module.exports = mongoose.model('IssuedTools',issuedToolsSchema);
