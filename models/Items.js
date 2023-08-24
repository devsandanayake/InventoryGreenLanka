const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemCode:{
        type:String,
        required:true,
        
    },
    itemName:{
        type:String,
        required:true,
      
    },
    qty:{
        type:Number,
        required:true
    
    }
});

module.exports = mongoose.model('Item',itemSchema);