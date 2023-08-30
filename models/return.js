const mongoose = require('mongoose');

const returnSchema = new mongoose.Schema({
    issuedDetails:[{
        itemCode: String,
        qty: Number,
        projectName: String,
        issuedDate: Date
    }],
    
    returnDate:{
        type:String,
        required:true,
    },
    returnItem:{
        type:String,
        required:true,  

    },
    returnQty:{
        type:Number,
        required:true,
    },
    returnReason:{
        type:String,
        required:true,
    },
    returnStatus:{
        type:String,
        required:true,
    },
    returnApprovedBy:{
        type:String,
        required:true,
    }


});

module.exports = mongoose.model('returnItems',returnSchema);
