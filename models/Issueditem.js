const mongoose = require('mongoose');

const issuedItemSchema = new mongoose.Schema({
    itemCode: {
        type: String,
        required: true
    },
     qty: {
        type: Number,
        required: true
    },
    projectName:{
        type:String,
        required:true
    },
    issuedDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
         
    }
    // You can add more properties as needed
});

module.exports = mongoose.model('IssuedItem', issuedItemSchema);
